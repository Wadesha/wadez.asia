import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// POST /api/upload - 上传图片到 Supabase Storage
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "数据库未配置" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const poiId = formData.get("poiId") as string;

  if (!file || !poiId) {
    return NextResponse.json(
      { error: "缺少文件或 POI ID" },
      { status: 400 }
    );
  }

  // 验证文件类型
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "只支持图片文件" },
      { status: 400 }
    );
  }

  // 验证文件大小 (最大 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "图片大小不能超过 5MB" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${user.id}/${poiId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("poi-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("poi-images").getPublicUrl(fileName);

  // 记录到 poi_images 表
  const { error: dbError } = await supabase.from("poi_images").insert({
    poi_id: poiId,
    url: publicUrl,
    uploaded_by: user.id,
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ url: publicUrl }, { status: 201 });
}
