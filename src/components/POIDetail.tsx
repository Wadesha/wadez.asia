"use client";

import { POI, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/types";

interface POIDetailProps {
  poi: POI;
  images: string[];
  isOwner: boolean;
  onEdit: () => void;
  onClose: () => void;
  onUploadImage: (file: File) => void;
  uploading: boolean;
}

export default function POIDetail({
  poi,
  images,
  isOwner,
  onEdit,
  onClose,
  onUploadImage,
  uploading,
}: POIDetailProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-xl z-20 overflow-hidden max-h-[60vh] flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-start justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {CATEGORY_ICONS[poi.category]}
            </span>
            <h3 className="font-semibold text-gray-900">{poi.name}</h3>
          </div>
          <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
            {CATEGORY_LABELS[poi.category]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="p-4 overflow-y-auto space-y-3">
        {poi.address && (
          <p className="text-sm text-gray-600">
            <span className="text-gray-400">地址：</span>
            {poi.address}
          </p>
        )}
        {poi.description && (
          <p className="text-sm text-gray-600">{poi.description}</p>
        )}
        <p className="text-xs text-gray-400">
          坐标: {poi.longitude.toFixed(6)}, {poi.latitude.toFixed(6)}
        </p>

        {/* 图片区域 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              图片 ({images.length})
            </span>
            {isOwner && (
              <label className="text-xs text-blue-600 hover:underline cursor-pointer">
                {uploading ? "上传中..." : "上传图片"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUploadImage(file);
                  }}
                />
              </label>
            )}
          </div>
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${poi.name} 图片 ${i + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">暂无图片</p>
          )}
        </div>
      </div>

      {isOwner && (
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onEdit}
            className="w-full py-2 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-200 transition"
          >
            编辑此地点
          </button>
        </div>
      )}
    </div>
  );
}
