"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { POI, POICategory, BusRoute } from "@/lib/types";
import { CITIES_WITH_CENTER, getCityById } from "@/lib/city-data";
import { ALL_ROUTES, SEGMENT_ICONS } from "@/lib/route-data";
import { getCacheStats } from "@/lib/route-cache";
import Header from "@/components/Header";
import POIPanel from "@/components/POIPanel";
import POIDetail from "@/components/POIDetail";
import LineMarquee from "@/components/LineMarquee";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-400">地图加载中...</p>
    </div>
  ),
});

type Mode = "city" | "intercity";

export default function MapPage() {
  const supabaseConfigured = isSupabaseConfigured();
  const supabase = useMemo(() => {
    try {
      return supabaseConfigured ? createClient() : null;
    } catch {
      return null;
    }
  }, [supabaseConfigured]);

  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [poiImages, setPoiImages] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<POICategory | "all">("all");
  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 模式：市内公交 / 城际线路
  const [mode, setMode] = useState<Mode>("city");

  // 市内：当前城市
  const [cityId, setCityId] = useState("beijing");
  const city = getCityById(cityId)!;

  // 市内：起终点（默认市政府）
  const [originText, setOriginText] = useState(city.centerName);
  const [destinationText, setDestinationText] = useState("");
  const [origin, setOrigin] = useState<{ lng: number; lat: number } | null>({
    lng: city.center[0],
    lat: city.center[1],
  });
  const [destination, setDestination] = useState<{ lng: number; lat: number } | null>(null);

  // 城际：出发/到达城市
  const [fromCityId, setFromCityId] = useState("beijing");
  const [toCityId, setToCityId] = useState("shanghai");

  // 公交路线结果
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [searching, setSearching] = useState(false);
  const [cacheCount, setCacheCount] = useState(0);

  // 城际线路
  const [intercityPath, setIntercityPath] = useState<[number, number][] | null>(null);

  // 线路滚动展示数据
  const [marqueeLines, setMarqueeLines] = useState<Array<{
    name: string;
    fromStation: string;
    toStation: string;
    distance: number;
    city: string;
  }>>([]);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    client.auth.getUser().then((result: { data: { user: any } }) => {
      const u = result.data.user;
      setUser(u ? { id: u.id, email: u.email! } : null);
    });
    const { data } = client.auth.onAuthStateChange((_e: any, session: any) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email! } : null);
    });
    return () => data.subscription?.unsubscribe();
  }, [supabase]);

  const fetchPois = useCallback(async () => {
    const url = activeCategory === "all" ? "/api/poi" : `/api/poi?category=${activeCategory}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setPois(Array.isArray(data) ? data : []);
      } else {
        console.warn(`[fetchPois] HTTP ${res.status}: ${res.statusText}`);
        setPois([]);
      }
    } catch (err) {
      console.warn("[fetchPois] 请求失败（已使用 fallback 数据）:", (err as Error).message);
      setPois([]);
    }
  }, [activeCategory]);

  useEffect(() => { fetchPois(); }, [fetchPois]);

  useEffect(() => {
    if (!selectedPoi) { setPoiImages([]); return; }
    fetch(`/api/poi/${selectedPoi.id}/images`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setPoiImages(d.map((i: { url: string }) => i.url)); })
      .catch(() => {});
  }, [selectedPoi]);

  // 切换城市时更新起终点默认值
  useEffect(() => {
    if (mode !== "city") return;
    const c = getCityById(cityId);
    if (!c) return;
    setOriginText(c.centerName);
    setOrigin({ lng: c.center[0], lat: c.center[1] });
    setDestinationText("");
    setDestination(null);
    setBusRoutes([]);
    setSelectedRoute(null);
  }, [cityId, mode]);

  // 切换模式时清空
  useEffect(() => {
    if (mode === "intercity") {
      setBusRoutes([]);
      setSelectedRoute(null);
      setOrigin(null);
      setDestination(null);
      const fromCity = getCityById(fromCityId);
      const toCity = getCityById(toCityId);
      if (fromCity && toCity) {
        setIntercityPath([fromCity.center, toCity.center]);
      }
    } else {
      setIntercityPath(null);
      const c = getCityById(cityId);
      if (c) {
        setOrigin({ lng: c.center[0], lat: c.center[1] });
        setOriginText(c.centerName);
      }
    }
  }, [mode, fromCityId, toCityId, cityId]);

  // 更新缓存计数
  useEffect(() => {
    const update = () => setCacheCount(getCacheStats().count);
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  // 加载真实政府数据用于线路滚动展示
  useEffect(() => {
    async function loadMarqueeData() {
      try {
        const res = await fetch("/bus-data-official/beijing/lines.json");
        if (res.ok) {
          const data = await res.json();
          const lines = data.slice(0, 100).map((l: any) => ({
            name: l.name,
            fromStation: l.fromStation,
            toStation: l.toStation,
            distance: Math.round(l.stations.up.length * 0.8),
            city: l.city,
          }));
          setMarqueeLines(lines);
        }
      } catch {
        try {
          const res = await fetch("/bus-data-tencent/北京/bus-lines.json");
          if (res.ok) {
            const data = await res.json();
            setMarqueeLines(data.map((l: any) => ({
              name: l.name,
              fromStation: l.fromStation,
              toStation: l.toStation,
              distance: l.distance,
              city: l.city,
            })));
          }
        } catch {
          // 静默失败
        }
      }
    }
    loadMarqueeData();
  }, []);

  const handleMapClick = useCallback((lng: number, lat: number) => {
    setNewLocation({ lng, lat });
  }, []);

  // 市内：搜索终点
  const handleCitySearch = useCallback(async () => {
    if (!destinationText.trim()) return;
    setSearching(true);
    const AMap = (window as any).AMap;
    if (!AMap) { setSearching(false); return; }

    const geocoder = new AMap.Geocoder({ city: city.name });
    geocoder.getLocation(destinationText, (status: string, result: any) => {
      if (status === "complete" && result.geocodes?.[0]) {
        const loc = result.geocodes[0].location;
        setDestination({ lng: loc.lng, lat: loc.lat });
      } else {
        alert("未找到该地点，请尝试更详细的名称");
      }
      setSearching(false);
    });
  }, [destinationText, city.name]);

  // 市内：搜索起点（用户修改起点时）
  const handleOriginSearch = useCallback(async () => {
    if (!originText.trim()) return;
    const AMap = (window as any).AMap;
    if (!AMap) return;
    const geocoder = new AMap.Geocoder({ city: city.name });
    geocoder.getLocation(originText, (status: string, result: any) => {
      if (status === "complete" && result.geocodes?.[0]) {
        const loc = result.geocodes[0].location;
        setOrigin({ lng: loc.lng, lat: loc.lat });
      }
    });
  }, [originText, city.name]);

  const onRouteResult = useCallback((routes: BusRoute[], cached: boolean) => {
    setBusRoutes(routes);
    setFromCache(cached);
    setSearching(false);
    if (routes.length > 0 && !selectedRoute) {
      setSelectedRoute(routes[0]);
    }
    setCacheCount(getCacheStats().count);
  }, [selectedRoute]);

  const isOwner = user != null && selectedPoi?.created_by === user.id;

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}分钟`;
    const h = Math.floor(m / 60);
    return m % 60 > 0 ? `${h}小时${m % 60}分钟` : `${h}小时`;
  };
  const formatDistance = (m: number) => (m < 1000 ? `${m}米` : `${(m / 1000).toFixed(1)}公里`);

  // 城际线路列表
  const intercityRoutes = useMemo(() => {
    const fromCity = getCityById(fromCityId)?.name;
    const toCity = getCityById(toCityId)?.name;
    if (!fromCity || !toCity) return [];
    return ALL_ROUTES.filter((r) => r.fromCity === fromCity && r.toCity === toCity);
  }, [fromCityId, toCityId]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Header user={user} />

      {/* 顶部控制面板 */}
      <div className="absolute top-20 left-4 right-4 z-30">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4">
          {/* 模式切换 */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setMode("city")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                mode === "city" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🚌 市内公交
            </button>
            <button
              onClick={() => setMode("intercity")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                mode === "intercity" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🚄 城际线路
            </button>
            <div className="ml-auto text-xs text-gray-400 self-center">
              已缓存 {cacheCount} 条线路
            </div>
          </div>

          {mode === "city" ? (
            /* 市内公交搜索 */
            <div className="flex items-center gap-3">
              <div className="w-32 shrink-0">
                <label className="block text-xs text-gray-400 mb-1">城市</label>
                <select
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CITIES_WITH_CENTER.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">起点（默认市政府）</label>
                <input
                  type="text"
                  value={originText}
                  onChange={(e) => setOriginText(e.target.value)}
                  onBlur={handleOriginSearch}
                  placeholder="起点地点"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleOriginSearch()}
                />
              </div>

              <button
                onClick={() => {
                  const t = originText;
                  setOriginText(destinationText);
                  setDestinationText(t);
                  const to = destination;
                  setDestination(origin);
                  setOrigin(to);
                }}
                className="mt-5 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition shrink-0"
                title="交换"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" />
                </svg>
              </button>

              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">终点</label>
                <input
                  type="text"
                  value={destinationText}
                  onChange={(e) => setDestinationText(e.target.value)}
                  placeholder="输入终点地点"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleCitySearch()}
                />
              </div>

              <button
                onClick={handleCitySearch}
                disabled={searching}
                className="mt-5 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 shrink-0"
              >
                {searching ? "查询中..." : "查询"}
              </button>
            </div>
          ) : (
            /* 城际线路选择 */
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">出发城市</label>
                <select
                  value={fromCityId}
                  onChange={(e) => setFromCityId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CITIES_WITH_CENTER.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  const t = fromCityId;
                  setFromCityId(toCityId);
                  setToCityId(t);
                }}
                className="mt-5 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition shrink-0"
                title="交换"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" />
                </svg>
              </button>

              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">到达城市</label>
                <select
                  value={toCityId}
                  onChange={(e) => setToCityId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CITIES_WITH_CENTER.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5 px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-600 shrink-0">
                {intercityRoutes.length} 条线路
              </div>
            </div>
          )}
        </div>

        {/* 线路滚动展示 */}
        {marqueeLines.length > 0 && (
          <div className="mt-3">
            <LineMarquee
              lines={marqueeLines}
              title="北京公交线路"
              speed="normal"
              theme="light"
            />
          </div>
        )}
      </div>

      <MapView
        pois={pois}
        selectedPoi={selectedPoi}
        onSelectPoi={(p) => { setSelectedPoi(p); setIsAdding(false); setIsEditing(false); }}
        onMapClick={handleMapClick}
        isAdding={isAdding}
        cityName={city.name}
        cityCenter={city.center}
        origin={origin}
        destination={destination}
        onRouteResult={onRouteResult}
        selectedRoute={selectedRoute}
        intercityPath={intercityPath}
      />

      {/* 市内公交路线列表 */}
      {mode === "city" && busRoutes.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">
                公交换乘方案 ({busRoutes.length} 条) {fromCache && <span className="text-xs text-green-600 ml-2">· 来自缓存</span>}
              </h3>
              <button
                onClick={() => { setBusRoutes([]); setSelectedRoute(null); setDestination(null); setDestinationText(""); }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                清空
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {busRoutes.map((route) => (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`flex-shrink-0 w-56 p-3 rounded-xl border-2 cursor-pointer transition ${
                    selectedRoute?.id === route.id ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-white hover:border-blue-200"
                  }`}
                >
                  <div className="text-sm font-semibold text-gray-800 mb-2 truncate">{route.summary || `方案 ${route.id}`}</div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-blue-600 font-bold">¥{route.totalPrice}</span>
                    <span className="text-gray-400">{formatDuration(route.totalDuration)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>🚶 {formatDistance(route.walkDistance)}</span>
                    <span>|</span>
                    <span>🔄 {route.transferCount}次换乘</span>
                  </div>
                  {route.legs.filter((l) => l.type !== "walk").slice(0, 3).map((leg, i) => (
                    <div key={i} className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${leg.type === "metro" ? "bg-red-500" : "bg-blue-500"}`} />
                      <span className="text-xs text-gray-600 truncate">{leg.lineName}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 城际线路列表 */}
      {mode === "intercity" && intercityRoutes.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {getCityById(fromCityId)?.name} → {getCityById(toCityId)?.name} ({intercityRoutes.length} 条)
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {intercityRoutes.map((route) => (
                <div key={route.id} className="flex-shrink-0 w-64 p-3 rounded-xl border-2 border-gray-100 bg-white hover:border-blue-200 transition">
                  <div className="flex items-center gap-2 mb-2">
                    {route.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{tag}</span>
                    ))}
                  </div>
                  {route.segments.map((seg, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <span>{SEGMENT_ICONS[seg.type]}</span>
                        <span>{seg.name}</span>
                      </div>
                      <div className="text-xs text-gray-500 ml-6">
                        {seg.departure} 出发 → {seg.arrival} 到达 · {seg.duration} · {seg.price}
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-400">总时长 {route.totalDuration}</span>
                    <span className="text-blue-600 font-bold">{route.totalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 市内路线详情 */}
      {mode === "city" && selectedRoute && (
        <div className="absolute top-56 left-4 z-30 w-80 max-h-[50vh] overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">路线详情</h4>
              <button onClick={() => setSelectedRoute(null)} className="text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400">总耗时</p>
                <p className="text-lg font-bold text-gray-800">{formatDuration(selectedRoute.totalDuration)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">票价</p>
                <p className="text-lg font-bold text-blue-600">¥{selectedRoute.totalPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">步行</p>
                <p className="text-lg font-bold text-gray-800">{formatDistance(selectedRoute.walkDistance)}</p>
              </div>
            </div>
            <div className="space-y-3">
              {selectedRoute.legs.map((leg, i) => (
                <div key={i} className="relative">
                  {i < selectedRoute.legs.length - 1 && <div className="absolute left-3 top-6 w-0.5 h-full bg-gray-200" />}
                  <div className="relative flex gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${leg.type === "metro" ? "bg-red-500" : leg.type === "bus" ? "bg-blue-500" : "bg-gray-400"}`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{leg.lineName}</span>
                        <span className="text-xs text-gray-400">{leg.type === "metro" ? "地铁" : leg.type === "bus" ? "公交" : "步行"}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{formatDistance(leg.distance)}</span>
                        <span>{formatDuration(leg.duration)}</span>
                        {leg.price > 0 && <span>¥{leg.price}</span>}
                      </div>
                      {leg.stops.length > 0 && (
                        <div className="mt-1 text-xs text-gray-400">
                          <span className="font-medium text-gray-600">{leg.stops[0].name}</span>
                          <span className="text-gray-300 mx-1">→</span>
                          <span className="font-medium text-gray-600">{leg.stops[leg.stops.length - 1].name}</span>
                          {leg.stops.length > 2 && <span className="ml-2">途经 {leg.stops.length} 站</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPoi && !isEditing && (
        <POIDetail
          poi={selectedPoi}
          images={poiImages}
          isOwner={isOwner}
          onEdit={() => setIsEditing(true)}
          onClose={() => setSelectedPoi(null)}
          onUploadImage={async (file) => {
            if (!selectedPoi) return;
            setUploading(true);
            const fd = new FormData();
            fd.append("file", file);
            fd.append("poiId", selectedPoi.id);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            if (res.ok) { const { url } = await res.json(); setPoiImages((p) => [url, ...p]); }
            setUploading(false);
          }}
          uploading={uploading}
        />
      )}

      {(isAdding || isEditing) && (
        <POIPanel
          poi={isEditing ? selectedPoi : null}
          isAdding={isAdding}
          newLocation={newLocation}
          onClose={() => { setIsAdding(false); setIsEditing(false); setNewLocation(null); }}
          onSave={async (data) => {
            if (isEditing && selectedPoi) {
              const res = await fetch(`/api/poi/${selectedPoi.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
              if (res.ok) setSelectedPoi(await res.json());
            } else {
              const res = await fetch("/api/poi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
              if (res.ok) setSelectedPoi(await res.json());
            }
            setIsAdding(false); setIsEditing(false); setNewLocation(null); fetchPois();
          }}
          onDelete={async (id) => {
            if (!confirm("确定要删除这个地点吗？")) return;
            const res = await fetch(`/api/poi/${id}`, { method: "DELETE" });
            if (res.ok) { setSelectedPoi(null); fetchPois(); }
          }}
          isOwner={isOwner}
        />
      )}

      <div className="absolute bottom-24 right-4 z-10">
        <a
          href="/versions"
          className="text-[10px] text-gray-400 hover:text-gray-600 transition opacity-50 hover:opacity-100"
        >
          v1.0.0 · 版本历史
        </a>
      </div>
    </div>
  );
}
