import beijingLines from './beijing/lines.json';
import beijingMetadata from './beijing/metadata.json';

export interface BusLine {
  name: string;
  city: string;
  fromStation: string;
  toStation: string;
  stations: {
    up: string[];
    down: string[];
  };
  source: string;
  lastUpdate: string;
  quality: string;
}

export interface CityMetadata {
  city: string;
  source: string;
  sourceUrl: string;
  lastUpdate: string;
  totalLines: number;
  totalStations: number;
  quality: string;
  format: string;
}

export const CITY_DATA: Record<string, {
  lines: BusLine[];
  metadata: CityMetadata;
}> = {
  '北京': {
    lines: beijingLines as unknown as BusLine[],
    metadata: beijingMetadata as unknown as CityMetadata,
  },
};

export const ALL_LINES: BusLine[] = Object.values(CITY_DATA).flatMap(c => c.lines);

export function getLinesByCity(city: string): BusLine[] {
  return CITY_DATA[city]?.lines || [];
}

export function getCityMetadata(city: string): CityMetadata | undefined {
  return CITY_DATA[city]?.metadata;
}

export function getAllCities(): string[] {
  return Object.keys(CITY_DATA);
}

export const TOTAL_LINE_COUNT = ALL_LINES.length;
export const TOTAL_CITY_COUNT = getAllCities().length;