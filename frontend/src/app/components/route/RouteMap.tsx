"use client";

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../../context/ThemeContext';
import { RouteTimelineItem } from '../../lib/types';

// Fix Leaflet marker asset paths
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Known coordinates for Indian cities & transit corridor waypoints
const CITY_COORDINATES: Record<string, [number, number]> = {
  pune: [18.5204, 73.8567],
  mumbai: [19.0760, 72.8777],
  lonavala: [18.7557, 73.4091],
  khopoli: [18.7904, 73.3424],
  panvel: [18.9894, 73.1175],
  nashik: [20.0059, 73.7797],
  igatpuri: [19.6967, 73.5624],
  kalyan: [19.2403, 73.1305],
  thane: [19.2183, 72.9781],
  sinnar: [19.8458, 73.9982],
  sangamner: [19.5772, 74.2091],
  narayangaon: [19.1235, 73.9785],
  satara: [17.6805, 73.9996],
  kolhapur: [16.7050, 74.2433],
  solapur: [17.6599, 75.9064],
  nagpur: [21.1458, 79.0882],
  aurangabad: [19.8762, 75.3433],
  chhatrapatisambhajinagar: [19.8762, 75.3433],
  goa: [15.2993, 74.1240],
  panaji: [15.4909, 73.8278],
  delhi: [28.7041, 77.1025],
  jaipur: [26.9124, 75.7873],
  bengaluru: [12.9716, 77.5946],
  mysuru: [12.2958, 76.6394],
  hyderabad: [17.3850, 78.4867],
  chennai: [13.0827, 80.2707],
  ahmedabad: [23.0225, 72.5714],
  surat: [21.1702, 72.8311],
  kolkata: [22.5726, 88.3639],
};

function getCoordsForName(
  name: string,
  index: number,
  total: number,
  fallbackStart: [number, number],
  fallbackEnd: [number, number]
): [number, number] {
  const clean = name.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (CITY_COORDINATES[clean]) {
    return CITY_COORDINATES[clean];
  }
  const ratio = total > 1 ? index / (total - 1) : 0.5;
  const lat = fallbackStart[0] + (fallbackEnd[0] - fallbackStart[0]) * ratio;
  const lon = fallbackStart[1] + (fallbackEnd[1] - fallbackStart[1]) * ratio;
  return [lat, lon];
}

const createWaypointIcon = (color: string, label: string, isEndpoint: boolean = false) => {
  const colorMap: Record<string, string> = {
    red: '#f43f5e',
    orange: '#f97316',
    amber: '#f59e0b',
    emerald: '#10b981',
    green: '#10b981',
    blue: '#3b82f6',
  };
  const hex = colorMap[color] || '#3b82f6';

  return L.divIcon({
    className: 'custom-route-marker',
    html: `
      <div class="relative flex items-center justify-center pointer-events-auto">
        <span class="absolute inline-flex ${isEndpoint ? 'h-9 w-9 opacity-70' : 'h-6 w-6 opacity-40'} animate-ping rounded-full" style="background-color: ${hex}"></span>
        <div class="relative flex h-7 px-2 items-center justify-center rounded-full border-2 ${isEndpoint ? 'border-white ring-2 ring-emerald-400 font-black' : 'border-white font-bold'} text-[10px] text-white shadow-xl whitespace-nowrap cursor-pointer hover:scale-110 transition-transform" style="background-color: ${hex}">
          ${label}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

function RouteAutoBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
    }
  }, [positions, map]);
  return null;
}

function RouteMapResize() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

interface RouteMapProps {
  timeline: RouteTimelineItem[];
  fromLocation: string;
  toLocation: string;
  highestRiskColor?: string;
}

export default function RouteMap({
  timeline,
  fromLocation,
  toLocation,
  highestRiskColor = 'emerald',
}: RouteMapProps) {
  const { isDark } = useTheme();

  const fallbackStart: [number, number] = useMemo(() => {
    const clean = fromLocation.trim().toLowerCase().replace(/[^a-z]/g, '');
    return CITY_COORDINATES[clean] || [19.9975, 73.7898];
  }, [fromLocation]);

  const fallbackEnd: [number, number] = useMemo(() => {
    const clean = toLocation.trim().toLowerCase().replace(/[^a-z]/g, '');
    return CITY_COORDINATES[clean] || [18.9894, 72.8777];
  }, [toLocation]);

  const waypointsWithCoords = useMemo(() => {
    return timeline.map((pt, idx) => {
      const coords = getCoordsForName(pt.name, idx, timeline.length, fallbackStart, fallbackEnd);
      return {
        ...pt,
        coords,
      };
    });
  }, [timeline, fallbackStart, fallbackEnd]);

  const polylineCoords = useMemo(() => {
    return waypointsWithCoords.map((w) => w.coords);
  }, [waypointsWithCoords]);

  const defaultCenter: [number, number] = useMemo(() => {
    if (polylineCoords.length > 0) {
      return polylineCoords[Math.floor(polylineCoords.length / 2)];
    }
    return [19.0, 73.5];
  }, [polylineCoords]);

  return (
    <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative flex flex-col bg-slate-950">
      {/* Top Banner with Leaflet indicator */}
      <div className="z-[500] px-4 py-2 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1.5 text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Corridor Route GIS
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            🍃 Leaflet Engine
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
          {fromLocation} ➔ {toLocation} ({timeline.length} Waypoints)
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <MapContainer
          center={defaultCenter}
          zoom={8}
          style={{ height: '100%', width: '100%', background: '#090d16' }}
          scrollWheelZoom={false}
        >
          <RouteMapResize />
          <RouteAutoBounds positions={polylineCoords} />

          <TileLayer
            key={isDark ? 'carto-dark-route' : 'carto-voyager-route'}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>'
            url={
              isDark
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            }
            maxZoom={19}
          />

          {/* Polyline Route Line */}
          <Polyline
            positions={polylineCoords}
            pathOptions={{
              color: highestRiskColor === 'red' ? '#f43f5e' : (highestRiskColor === 'orange' ? '#f97316' : '#10b981'),
              weight: 4,
              opacity: 0.85,
              dashArray: '6, 8',
            }}
          />

          {/* Markers */}
          {waypointsWithCoords.map((pt, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === waypointsWithCoords.length - 1;
            const isEndpoint = isFirst || isLast;
            const pinColor = isFirst ? 'emerald' : (isLast ? 'blue' : (pt.color || 'amber'));
            const icon = createWaypointIcon(pinColor, `${pt.name}`, isEndpoint);

            return (
              <Marker key={`${pt.name}-${idx}`} position={pt.coords} icon={icon}>
                <Popup>
                  <div className="text-slate-900 dark:text-slate-100 font-sans p-1 min-w-[170px]">
                    <h4 className="font-bold text-sm border-b border-slate-200 dark:border-slate-700 pb-1 text-slate-800 dark:text-slate-100 flex items-center justify-between">
                      <span>{pt.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">
                        {isFirst ? 'Origin' : isLast ? 'Destination' : `Stop #${idx + 1}`}
                      </span>
                    </h4>
                    <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <p><span className="font-bold text-slate-700 dark:text-slate-200">Temp:</span> {pt.temp}°C</p>
                      <p><span className="font-bold text-slate-700 dark:text-slate-200">Condition:</span> {pt.condition}</p>
                      <p><span className="font-bold text-slate-700 dark:text-slate-200">Precipitation:</span> {pt.rain_probability}%</p>
                      <p><span className="font-bold text-slate-700 dark:text-slate-200">Risk:</span> <strong className="uppercase">{pt.risk_level}</strong></p>
                      {pt.recommendation && (
                        <p className="mt-1 text-[11px] bg-slate-100 dark:bg-slate-800 p-1.5 rounded font-semibold text-slate-700 dark:text-slate-300">
                          {pt.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
