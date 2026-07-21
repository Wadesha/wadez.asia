"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";
import { POI, POICategory } from "@/lib/types";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import POIPanel from "@/components/POIPanel";
import POIDetail from "@/components/POIDetail";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-400">地图加载中...</p>
    </div>
  ),
});

export default function MapPage() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [poiImages, setPoiImages] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<POICategory | "all">(
    "all"
  );
  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 获取用户状态
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ? { id: user.id, email: user.email! } : null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email! }
          : null
      );
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // 获取 POI 列表
  const fetchPois = useCallback(async () => {
    const url =
      activeCategory === "all"
        ? "/api/poi"
        : `/api/poi?category=${activeCategory}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setPois(data);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchPois();
  }, [fetchPois]);

  // 获取选中 POI 的图片
  useEffect(() => {
    if (!selectedPoi) {
      setPoiImages([]);
      return;
    }
    fetch(`/api/poi/${selectedPoi.id}/images`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPoiImages(data.map((img: { url: string }) => img.url));
        }
      });
  }, [selectedPoi]);

  // 地图点击（添加模式）
  const handleMapClick = useCallback((lng: number, lat: number) => {
    setNewLocation({ lng, lat });
  }, []);

  // 保存 POI
  const handleSave = async (data: {
    name: string;
    category: POICategory;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
  }) => {
    if (isEditing && selectedPoi) {
      const res = await fetch(`/api/poi/${selectedPoi.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedPoi(updated);
      }
    } else {
      const res = await fetch("/api/poi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newPoi = await res.json();
        setSelectedPoi(newPoi);
      }
    }
    setIsAdding(false);
    setIsEditing(false);
    setNewLocation(null);
    fetchPois();
  };

  // 删除 POI
  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这个地点吗？")) return;
    const res = await fetch(`/api/poi/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSelectedPoi(null);
      fetchPois();
    }
  };

  // 上传图片
  const handleUploadImage = async (file: File) => {
    if (!selectedPoi) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("poiId", selectedPoi.id);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      setPoiImages((prev) => [url, ...prev]);
    }
    setUploading(false);
  };

  const isOwner = user != null && selectedPoi?.created_by === user.id;

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Header user={user} />

      <MapView
        pois={pois}
        selectedPoi={selectedPoi}
        onSelectPoi={(poi) => {
          setSelectedPoi(poi);
          setIsAdding(false);
          setIsEditing(false);
        }}
        onMapClick={handleMapClick}
        isAdding={isAdding}
      />

      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isAdding={isAdding}
        onToggleAdd={() => {
          setIsAdding(!isAdding);
          setNewLocation(null);
          setSelectedPoi(null);
          setIsEditing(false);
        }}
        isLoggedIn={!!user}
        poiCount={pois.length}
      />

      {/* POI 详情 */}
      {selectedPoi && !isEditing && (
        <POIDetail
          poi={selectedPoi}
          images={poiImages}
          isOwner={isOwner}
          onEdit={() => setIsEditing(true)}
          onClose={() => setSelectedPoi(null)}
          onUploadImage={handleUploadImage}
          uploading={uploading}
        />
      )}

      {/* 添加/编辑面板 */}
      {(isAdding || isEditing) && (
        <POIPanel
          poi={isEditing ? selectedPoi : null}
          isAdding={isAdding}
          newLocation={newLocation}
          onClose={() => {
            setIsAdding(false);
            setIsEditing(false);
            setNewLocation(null);
          }}
          onSave={handleSave}
          onDelete={handleDelete}
          isOwner={isOwner}
        />
      )}
    </div>
  );
}
