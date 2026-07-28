"use client";

import { useState } from "react";
import { POI, POICategory, CATEGORY_LABELS } from "@/lib/types";

interface POIPanelProps {
  poi: POI | null;
  isAdding: boolean;
  newLocation: { lng: number; lat: number } | null;
  onClose: () => void;
  onSave: (data: {
    name: string;
    category: POICategory;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
  }) => void;
  onDelete: (id: string) => void;
  isOwner: boolean;
}

export default function POIPanel({
  poi,
  isAdding,
  newLocation,
  onClose,
  onSave,
  onDelete,
  isOwner,
}: POIPanelProps) {
  const [name, setName] = useState(poi?.name || "");
  const [category, setCategory] = useState<POICategory>(
    poi?.category || "bus"
  );
  const [description, setDescription] = useState(poi?.description || "");
  const [address, setAddress] = useState(poi?.address || "");

  const isEditing = isAdding || poi;

  const handleSave = () => {
    if (!name.trim()) return;
    const lng = isAdding ? newLocation?.lng : poi?.longitude;
    const lat = isAdding ? newLocation?.lat : poi?.latitude;
    if (lng == null || lat == null) return;

    onSave({
      name: name.trim(),
      category,
      description: description.trim(),
      address: address.trim(),
      longitude: lng,
      latitude: lat,
    });
  };

  if (!isEditing) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-xl z-20 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          {isAdding ? "添加兴趣点" : "编辑兴趣点"}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-3">
        {isAdding && newLocation && (
          <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            坐标: {newLocation.lng.toFixed(6)}, {newLocation.lat.toFixed(6)}
          </p>
        )}
        {isAdding && !newLocation && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            请在地图上点击选择位置
          </p>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            名称 *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="例如：顺丰速运成都仓库"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            分类
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as POICategory)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            地址
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="详细地址"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            描述
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="补充描述信息..."
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSave}
            disabled={!name.trim() || (isAdding && !newLocation)}
            className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            保存
          </button>
          {poi && isOwner && (
            <button
              onClick={() => onDelete(poi.id)}
              className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded-lg font-medium hover:bg-red-100 transition"
            >
              删除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
