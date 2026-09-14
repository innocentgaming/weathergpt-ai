"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getBackendUrl } from '../utils/apiUrl';

// Fix Leaflet marker asset paths
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface MapLocationData {
  name: string;
  lat: number;
  lon: number;
  temp: string;
  condition: string;
  wind_speed: string;
  rain_prob: string;
  risk: string;
  color: string;
  alert: string;
}

const INITIAL_LOCATIONS: MapLocationData[] = [
  { name: "Pune", lat: 18.5204, lon: 73.8567, temp: "27°C", condition: "Heavy Rain", wind_speed: "18 km/h", rain_prob: "92%", risk: "SEVERE", color: "red", alert: "Red Alert: Extreme Rainfall Watch" },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777, temp: "29°C", condition: "Moderate Rain", wind_speed: "22 km/h", rain_prob: "80%", risk: "HIGH", color: "orange", alert: "Orange Warning: High Tide Ingress" },
  { name: "Nashik", lat: 20.0059, lon: 73.7797, temp: "26°C", condition: "Moderate Rain", wind_speed: "16 km/h", rain_prob: "65%", risk: "MODERATE", color: "amber", alert: "Yellow Watch: Active Rainfall" },
  { name: "Lonavala", lat: 18.7557, lon: 73.4091, temp: "21°C", condition: "Torrential Rain", wind_speed: "28 km/h", rain_prob: "98%", risk: "SEVERE", color: "red", alert: "Red Alert: Landslide Watch" },
  { name: "Khopoli", lat: 18.7904, lon: 73.3424, temp: "25°C", condition: "Heavy Rain", wind_speed: "22 km/h", rain_prob: "90%", risk: "HIGH", color: "orange", alert: "Orange Alert: River Level Surge" },
  { name: "Panvel", lat: 18.9894, lon: 73.1175, temp: "27°C", condition: "Moderate Rain", wind_speed: "16 km/h", rain_prob: "75%", risk: "MODERATE", color: "amber", alert: "Yellow Watch: Active Precipitation" },
  { name: "Delhi", lat: 28.7041, lon: 77.1025, temp: "38°C", condition: "Heatwave", wind_speed: "12 km/h", rain_prob: "5%", risk: "SEVERE", color: "red", alert: "Red Alert: Thermal Stress" },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946, temp: "24°C", condition: "Drizzle", wind_speed: "10 km/h", rain_prob: "30%", risk: "LOW", color: "green", alert: "None" },
  { name: "Chennai", lat: 13.0827, lon: 80.2707, temp: "31°C", condition: "Partly Cloudy", wind_speed: "14 km/h", rain_prob: "20%", risk: "LOW", color: "green", alert: "None" },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867, temp: "29°C", condition: "Partly Cloudy", wind_speed: "11 km/h", rain_prob: "15%", risk: "LOW", color: "green", alert: "None" },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873, temp: "35°C", condition: "Sunny", wind_speed: "14 km/h", rain_prob: "10%", risk: "LOW", color: "green", alert: "None" },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639, temp: "32°C", condition: "Humid", wind_speed: "16 km/h", rain_prob: "45%", risk: "MODERATE", color: "amber", alert: "None" }
];

// Helper to recolor marker pin programmatically using Leaflet divIcon
const createCustomIcon = (color: string, label: string, isCurrent: boolean = false) => {
  const markerColors: Record<string, string> = {
    red: '#f43f5e',     // rose-500
    orange: '#f97316',  // orange-500
    amber: '#f59e0b',   // amber-500
    green: '#10b981'    // emerald-500
  };

  const hexColor = markerColors[color] || '#10b981';
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center pointer-events-auto">
        <span class="absolute inline-flex ${isCurrent ? 'h-10 w-10 opacity-75' : 'h-7 w-7 opacity-40'} animate-ping rounded-full" style="background-color: ${hexColor}"></span>
        <div class="relative flex h-8 px-2.5 items-center justify-center rounded-full border-2 ${isCurrent ? 'border-amber-300 ring-2 ring-emerald-400' : 'border-white'} text-[10px] font-bold text-white shadow-2xl whitespace-nowrap cursor-pointer transition-transform hover:scale-110" style="background-color: ${hexColor}">
          ${isCurrent ? '📍 ' : ''}${label}
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, Math.max(map.getZoom(), 8), {
      duration: 1.2
    });
  }, [center, map]);
  return null;
}

// Invalidate map size so Leaflet never renders gray or 0-height tiles
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const timer1 = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [map]);
  return null;
}

interface WeatherMapProps {
  activeLayer?: string; // 'temp', 'rain', 'wind', 'risk'
  searchCenter?: [number, number];
  activeLocation?: string;
  onMarkerClick?: (locationName: string) => void;
}

type MapLayer = 'temp' | 'rain' | 'wind' | 'risk';

export default function WeatherMap({ 
  activeLayer: initialActiveLayer = 'temp', 
  searchCenter = [20.0059, 73.7797], 
  activeLocation = "Nashik",
  onMarkerClick 
}: WeatherMapProps) {
  const [selectedLayer, setSelectedLayer] = useState<MapLayer>(
    (initialActiveLayer as MapLayer) || 'temp'
  );
  const [mapLocations, setMapLocations] = useState<MapLocationData[]>(INITIAL_LOCATIONS);
  const [loading, setLoading] = useState(false);

  // Fetch live weather data dynamically for map markers
  useEffect(() => {
    let isMounted = true;
    const fetchLiveMapData = async () => {
      setLoading(true);
      try {
        const backendBase = getBackendUrl();
        const targetList = [...INITIAL_LOCATIONS];
        const exists = targetList.some(l => l.name.toLowerCase() === activeLocation.toLowerCase());
        
        if (!exists && activeLocation && searchCenter) {
          targetList.push({
            name: activeLocation,
            lat: searchCenter[0],
            lon: searchCenter[1],
            temp: "27°C",
            condition: "Live Telemetry",
            wind_speed: "14 km/h",
            rain_prob: "50%",
            risk: "LOW",
            color: "green",
            alert: "None"
          });
        }

        // 1. Try batch endpoint first
        try {
          const batchRes = await fetch(`${backendBase}/api/weather/batch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locations: targetList.map(l => l.name) }),
            signal: AbortSignal.timeout(6000),
          });
          if (batchRes.ok) {
            const batchData = await batchRes.json();
            interface BatchItemResult {
              success: boolean;
              location: string;
              weather?: {
                current?: {
                  temp?: number;
                  condition?: string;
                  wind_speed?: number;
                  rain_probability?: number;
                };
                coordinates?: {
                  lat?: number;
                  lon?: number;
                };
              };
              risk?: {
                score?: number;
              };
            }
            const resultMap = new Map<string, BatchItemResult>();
            (batchData.results || []).forEach((r: BatchItemResult) => {
              if (r.success) {
                resultMap.set(r.location.toLowerCase(), r);
              }
            });

            const updated = targetList.map((loc) => {
              const resObj = resultMap.get(loc.name.toLowerCase());
              if (resObj && resObj.weather) {
                const curr = resObj.weather.current || {};
                const rData = resObj.risk || {};
                const coords = resObj.weather.coordinates || {};
                const score = rData.score || 35;
                
                let col = "green";
                let rLvl = "LOW";
                if (score > 75) { col = "red"; rLvl = "SEVERE"; }
                else if (score > 50) { col = "orange"; rLvl = "HIGH"; }
                else if (score > 25) { col = "amber"; rLvl = "MODERATE"; }

                return {
                  ...loc,
                  lat: coords.lat || loc.lat,
                  lon: coords.lon || loc.lon,
                  temp: `${Math.round(curr.temp ?? 27)}°C`,
                  condition: curr.condition || loc.condition,
                  wind_speed: `${Math.round(curr.wind_speed ?? 15)} km/h`,
                  rain_prob: `${Math.round(curr.rain_probability ?? 40)}%`,
                  risk: rLvl,
                  color: col
                };
              }
              return loc;
            });

            if (isMounted) {
              setMapLocations(updated);
              setLoading(false);
            }
            return;
          }
        } catch {
          // Batch fetch error, proceed to fallback
        }

        if (isMounted) {
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveMapData();
    return () => { isMounted = false; };
  }, [activeLocation, searchCenter]);

  return (
    <div className="relative w-full h-[650px] lg:h-[calc(100vh-140px)] min-h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col bg-slate-950">
      {/* Top Header & Layer Switcher Toolbar */}
      <div className="z-[1000] bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left: Status & Title */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">radar</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              IMD Synoptic GIS Radar & Telemetry Map
              {loading && <span className="text-[10px] text-emerald-400 font-mono animate-pulse">Syncing...</span>}
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Live AWS observation nodes • Centered: <strong className="text-emerald-400">{activeLocation}</strong>
            </p>
          </div>
        </div>

        {/* Center: Layer Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedLayer('temp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedLayer === 'temp'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🌡️</span>
            <span>Temperature</span>
          </button>
          <button
            onClick={() => setSelectedLayer('rain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedLayer === 'rain'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>🌧️</span>
            <span>Rainfall Radar</span>
          </button>
          <button
            onClick={() => setSelectedLayer('wind')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedLayer === 'wind'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>💨</span>
            <span>Wind Flow</span>
          </button>
          <button
            onClick={() => setSelectedLayer('risk')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedLayer === 'risk'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>⚠️</span>
            <span>Severe Risk</span>
          </button>
        </div>

        {/* Right: Legend Pills */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Low Risk
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Moderate
          </span>
          <span className="flex items-center gap-1 text-orange-400">
            <span className="h-2 w-2 rounded-full bg-orange-500" /> High Alert
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Severe Red
          </span>
        </div>
      </div>

      {/* Map Body Container */}
      <div className="flex-1 w-full relative min-h-[480px]">
        <MapContainer 
          center={searchCenter} 
          zoom={8} 
          style={{ height: '100%', width: '100%', background: '#090d16' }}
          scrollWheelZoom={true}
        >
          <MapResizeHandler />
          <ChangeView center={searchCenter} />
          
          {/* High-Performance CartoDB Dark Matter Tiles for Sleek IMD Dark Cockpit View */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />

          {mapLocations.map((loc) => {
            let label = `${loc.name}: ${loc.temp}`;
            const pinColor = loc.color;
            const isCurrentSelected = activeLocation.toLowerCase().includes(loc.name.toLowerCase()) || loc.name.toLowerCase().includes(activeLocation.toLowerCase());

            if (selectedLayer === 'rain') {
              label = `${loc.name}: 🌧️ ${loc.rain_prob}`;
            } else if (selectedLayer === 'wind') {
              label = `${loc.name}: 💨 ${loc.wind_speed}`;
            } else if (selectedLayer === 'risk') {
              label = `${loc.name}: ⚠️ ${loc.risk.substring(0, 3)}`;
            }

            const icon = createCustomIcon(pinColor, label, isCurrentSelected);

            return (
              <Marker 
                key={`${loc.name}-${loc.lat}-${loc.lon}`} 
                position={[loc.lat, loc.lon]} 
                icon={icon}
                eventHandlers={{
                  click: () => {
                    if (onMarkerClick) {
                      onMarkerClick(loc.name);
                    }
                  }
                }}
              >
                <Popup>
                  <div className="text-slate-900 font-sans p-1 min-w-[190px]">
                    <h3 className="font-bold text-base border-b pb-1 text-slate-800 flex items-center justify-between">
                      <span>{loc.name}</span>
                      {isCurrentSelected && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Active Focus</span>
                      )}
                    </h3>
                    <div className="mt-2 space-y-1 text-xs text-slate-600">
                      <p><span className="font-semibold text-slate-700">Live Temp:</span> {loc.temp}</p>
                      <p><span className="font-semibold text-slate-700">Condition:</span> {loc.condition}</p>
                      <p><span className="font-semibold text-slate-700">Rain Prob:</span> {loc.rain_prob}</p>
                      <p><span className="font-semibold text-slate-700">Wind Speed:</span> {loc.wind_speed}</p>
                      <p>
                        <span className="font-semibold text-slate-700">Risk Level:</span> 
                        <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white
                          ${loc.risk === 'SEVERE' ? 'bg-red-500' : 
                            loc.risk === 'HIGH' ? 'bg-orange-500' : 
                            loc.risk === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'}
                        `}>
                          {loc.risk}
                        </span>
                      </p>
                      {loc.alert !== "None" && (
                        <p className="mt-1.5 text-[11px] text-red-600 bg-red-50 p-1.5 rounded font-semibold border border-red-200">
                          ⚠️ {loc.alert}
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
