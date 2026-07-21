import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/poi - 获取所有 POI
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = supabase.from("pois").select("*").order("created_at", {
    ascending: false,
  });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/poi - 创建新 POI
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const body = await request.json();
  const { name, category, description, address, longitude, latitude } = body;

  if (!name || longitude == null || latitude == null) {
    return NextResponse.json(
      { error: "名称和坐标为必填项" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("pois")
    .insert({
      name,
      category: category || "other",
      description: description || null,
      address: address || null,
      longitude,
      latitude,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
