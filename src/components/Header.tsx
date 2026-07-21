"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user: { email: string } | null;
}

export default function Header({ user }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2.5">
          <h1 className="text-lg font-bold text-gray-900">
            Wadez<span className="text-blue-600">.asia</span>
          </h1>
          <p className="text-[10px] text-gray-400 -mt-0.5">物流地图平台</p>
        </div>

        {/* 用户操作 */}
        <div className="pointer-events-auto">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hover:bg-white transition"
              >
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.email[0].toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user.email}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="bg-blue-600 text-white rounded-xl shadow-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition block"
            >
              登录
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
