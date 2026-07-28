import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Fallback 模拟数据（Supabase 未配置时使用）
const FALLBACK_POIS = [
  {
    id: "fallback-1",
    name: "天安门广场",
    category: "landmark",
    description: "中华人民共和国的心脏，北京的标志性地点",
    address: "北京市东城区东长安街",
    longitude: 116.397428,
    latitude: 39.90923,
    created_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    name: "故宫博物院",
    category: "landmark",
    description: "明清两代的皇家宫殿，世界上最大的宫殿建筑群",
    address: "北京市东城区景山前街4号",
    longitude: 116.397026,
    latitude: 39.918058,
    created_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    name: "北京站",
    category: "station",
    description: "中国铁路北京局集团有限公司管辖的特等站",
    address: "北京市东城区毛家湾胡同甲13号",
    longitude: 116.427391,
    latitude: 39.902765,
    created_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-4",
    name: "首都国际机场",
    category: "station",
    description: "中国三大门户复合枢纽之一",
    address: "北京市朝阳区首都机场",
    longitude: 116.609505,
    latitude: 40.080111,
    created_by: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-5",
    name: "六里桥客运站",
    category: "station",
    description: "北京主要长途汽车站之一",
    address: "北京市丰台区六里桥",
    longitude: 116.31092,
    latitude: 39.87421,
    created_by: null,
    created_at: new Date().toISOString(),
  },
];

// GET /api/poi - 获取所有 POI
export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    // Supabase 未配置时返回 fallback 数据，避免浏览器 ERR_ABORTED
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    if (category && category !== "all") {
      return NextResponse.json(
        FALLBACK_POIS.filter((p) => p.category === category)
      );
    }
    return NextResponse.json(FALLBACK_POIS);
  }

  try {
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
      console.warn("[api/poi] Supabase error:", error.message);
      return NextResponse.json(FALLBACK_POIS);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.warn("[api/poi] Exception:", (err as Error).message);
    return NextResponse.json(FALLBACK_POIS);
  }
}

// POST /api/poi - 创建新 POI
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "数据库未配置，POI 创建功能不可用。可在 .env.local 配置 Supabase 后启用。" },
      { status: 503 }
    );
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "未登录（开发模式下可在 .env.local 配置 Supabase Auth 后启用）" },
        { status: 401 }
      );
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
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
