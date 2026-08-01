"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmartRecommend } from "@/lib/use-smart-recommend";

export default function SmartRecommend() {
  const pathname = usePathname();
  const recommends = useSmartRecommend(pathname);

  if (recommends.length === 0) return null;

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-xs font-semibold text-gray-800 mb-3">
        你可能还想看
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recommends.map((item) => (
          <Link
            key={item.site.id}
            href={`/${item.site.id}`}
            className="block p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition"
          >
            <div className="text-xs font-semibold text-gray-800">
              {item.site.name}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              {item.reason}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
