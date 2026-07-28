export type FacilityType =
  | "park"
  | "school"
  | "hospital"
  | "shopping"
  | "metro"
  | "bus"
  | "library"
  | "gym";

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  lng: number;
  lat: number;
  size: number;
  capacity?: number;
  rating?: number;
}

export interface IsochroneRing {
  timeMin: number;
  path: [number, number][];
  facilityCount: number;
}

export interface AccessibilityArea {
  id: string;
  name: string;
  city: string;
  center: [number, number];
  facilities: Facility[];
}

const FACILITY_LABELS: Record<FacilityType, string> = {
  park: "公园绿地",
  school: "学校教育",
  hospital: "医疗健康",
  shopping: "购物消费",
  metro: "轨道交通",
  bus: "公交站点",
  library: "图书馆",
  gym: "体育健身",
};

const FACILITY_COLORS: Record<FacilityType, string> = {
  park: "#10b981",
  school: "#3b82f6",
  hospital: "#ef4444",
  shopping: "#f59e0b",
  metro: "#8b5cf6",
  bus: "#06b6d4",
  library: "#6366f1",
  gym: "#ec4899",
};

const FACILITY_ICONS: Record<FacilityType, string> = {
  park: "🌳",
  school: "🏫",
  hospital: "🏥",
  shopping: "🛒",
  metro: "🚇",
  bus: "🚌",
  library: "📚",
  gym: "🏃",
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface AreaTemplate {
  id: string;
  name: string;
  city: string;
  center: [number, number];
  sizeKm: number;
  facilityCounts: Record<FacilityType, number>;
}

const AREA_TEMPLATES: AreaTemplate[] = [
  {
    id: "chaoyang",
    name: "北京朝阳区",
    city: "北京",
    center: [116.46, 39.92],
    sizeKm: 4,
    facilityCounts: {
      park: 15,
      school: 25,
      hospital: 12,
      shopping: 30,
      metro: 18,
      bus: 60,
      library: 8,
      gym: 20,
    },
  },
  {
    id: "pudong",
    name: "上海浦东新区",
    city: "上海",
    center: [121.52, 31.23],
    sizeKm: 4,
    facilityCounts: {
      park: 12,
      school: 22,
      hospital: 10,
      shopping: 28,
      metro: 15,
      bus: 55,
      library: 6,
      gym: 18,
    },
  },
];

function generateFacilities(template: AreaTemplate, seed: number): Facility[] {
  const rand = seededRandom(seed);
  const facilities: Facility[] = [];
  const degreesPerKm = 0.009;
  const halfSize = (template.sizeKm * degreesPerKm) / 2;

  let id = 0;
  (Object.entries(template.facilityCounts) as [FacilityType, number][]).forEach(
    ([type, count]) => {
      for (let i = 0; i < count; i++) {
        const dist = Math.sqrt(rand()) * halfSize;
        const angle = rand() * Math.PI * 2;
        const lng = template.center[0] + Math.cos(angle) * dist;
        const lat = template.center[1] + Math.sin(angle) * dist;

        const centerBias = 1 - dist / halfSize * 0.5;

        facilities.push({
          id: `${template.id}-${type}-${id++}`,
          name: `${FACILITY_LABELS[type]}（${type === "park" ? "公园" : type === "school" ? "学校" : type === "hospital" ? "医院" : "设施"}${i + 1}）`,
          type,
          lng: Math.round(lng * 100000) / 100000,
          lat: Math.round(lat * 100000) / 100000,
          size: Math.round((2000 + rand() * 8000) * centerBias),
          capacity: Math.round((100 + rand() * 500) * centerBias),
          rating: Math.round((3.5 + rand() * 1.5) * 10) / 10,
        });
      }
    }
  );

  return facilities;
}

let areas: AccessibilityArea[] | null = null;

function getAccessibilityAreas(): AccessibilityArea[] {
  if (!areas) {
    areas = AREA_TEMPLATES.map((template, idx) => ({
      id: template.id,
      name: template.name,
      city: template.city,
      center: template.center,
      facilities: generateFacilities(template, idx * 1000 + 5),
    }));
  }
  return areas;
}

function getAccessibilityArea(id: string): AccessibilityArea | undefined {
  return getAccessibilityAreas().find((a) => a.id === id);
}

function calculateIsochrones(
  centerLng: number,
  centerLat: number,
  facilities: Facility[],
  activeTypes: FacilityType[],
  walkSpeedKmh: number = 4.5
): IsochroneRing[] {
  const degreesPerKm = 0.009;
  const times = [5, 10, 15, 30];

  const activeFacilities =
    activeTypes.length > 0
      ? facilities.filter((f) => activeTypes.includes(f.type))
      : facilities;

  return times.map((timeMin) => {
    const radiusKm = (walkSpeedKmh / 60) * timeMin;
    const radiusDeg = radiusKm * degreesPerKm;

    const points = 36;
    const path: [number, number][] = [];

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const r = radiusDeg * (0.85 + Math.sin(angle * 3) * 0.1 + Math.cos(angle * 5) * 0.05);
      path.push([
        Math.round((centerLng + Math.cos(angle) * r) * 100000) / 100000,
        Math.round((centerLat + Math.sin(angle) * r) * 100000) / 100000,
      ]);
    }

    const facilityCount = activeFacilities.filter((f) => {
      const dx = f.lng - centerLng;
      const dy = f.lat - centerLat;
      const distDeg = Math.sqrt(dx * dx + dy * dy);
      return distDeg <= radiusDeg;
    }).length;

    return { timeMin, path, facilityCount };
  });
}

function calculateAccessibilityScore(
  centerLng: number,
  centerLat: number,
  facilities: Facility[],
  activeTypes: FacilityType[]
): {
  totalScore: number;
  scores: Record<FacilityType, number>;
  grade: string;
  gradeLabel: string;
} {
  const activeFacilities =
    activeTypes.length > 0
      ? facilities.filter((f) => activeTypes.includes(f.type))
      : facilities;

  const degreesPerKm = 0.009;

  const scores: Record<FacilityType, number> = {
    park: 0,
    school: 0,
    hospital: 0,
    shopping: 0,
    metro: 0,
    bus: 0,
    library: 0,
    gym: 0,
  };

  activeFacilities.forEach((f) => {
    const dx = f.lng - centerLng;
    const dy = f.lat - centerLat;
    const distDeg = Math.sqrt(dx * dx + dy * dy);
    const distKm = distDeg / degreesPerKm;

    if (distKm < 1) {
      scores[f.type] += 3 * (1 + f.size / 5000);
    } else if (distKm < 2) {
      scores[f.type] += 2 * (1 + f.size / 5000);
    } else if (distKm < 3) {
      scores[f.type] += 1 * (1 + f.size / 5000);
    }
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  let grade = "C";
  let gradeLabel = "一般";
  if (totalScore > 200) {
    grade = "A+";
    gradeLabel = "极优";
  } else if (totalScore > 150) {
    grade = "A";
    gradeLabel = "优秀";
  } else if (totalScore > 100) {
    grade = "B+";
    gradeLabel = "良好";
  } else if (totalScore > 70) {
    grade = "B";
    gradeLabel = "较好";
  } else if (totalScore > 40) {
    grade = "C";
    gradeLabel = "一般";
  } else {
    grade = "D";
    gradeLabel = "待提升";
  }

  return { totalScore: Math.round(totalScore), scores, grade, gradeLabel };
}

function getFacilityCountByType(
  facilities: Facility[],
  types: FacilityType[]
): Record<FacilityType, number> {
  const filtered =
    types.length > 0 ? facilities.filter((f) => types.includes(f.type)) : facilities;
  const counts: Record<FacilityType, number> = {
    park: 0,
    school: 0,
    hospital: 0,
    shopping: 0,
    metro: 0,
    bus: 0,
    library: 0,
    gym: 0,
  };
  filtered.forEach((f) => {
    counts[f.type]++;
  });
  return counts;
}

export {
  FACILITY_LABELS,
  FACILITY_COLORS,
  FACILITY_ICONS,
  AREA_TEMPLATES,
  getAccessibilityAreas,
  getAccessibilityArea,
  calculateIsochrones,
  calculateAccessibilityScore,
  getFacilityCountByType,
};
