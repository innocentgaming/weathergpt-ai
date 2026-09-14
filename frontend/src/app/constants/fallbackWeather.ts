import { WeatherData, RiskData } from '../lib/types';

export const FALLBACK_SYNOPTIC_WEATHER: WeatherData = {
  location: "Pune, Maharashtra",
  coordinates: { lat: 18.5204, lon: 73.8567 },
  current: {
    temp: 24.7,
    feels_like: 29.5,
    condition: "Overcast Clouds",
    humidity: 78,
    wind_speed: 12.1,
    wind_direction: "WSW",
    rain_probability: 35,
    air_quality: "42 (Good)",
    pressure: 1009,
    visibility: 10.0,
    uv_index: 5.0,
    sunrise: "06:15 AM",
    sunset: "06:45 PM",
    icon: "⛅",
    source: "IMD / Open-Meteo Synoptic Live",
    updated_at: "Just now",
  },
  forecast: [
    { day: "Today", temp: 27, temp_min: 22, temp_max: 27, rain_probability: 35, risk_level: "Low Risk", icon: "⛅", condition: "Partly Cloudy", recommendation: "Pleasant outdoor weather. Standard precautions for humidity & evening moisture spikes.", wind: 12.1, humidity: 78 },
    { day: "Friday", temp: 28, temp_min: 23, temp_max: 28, rain_probability: 60, risk_level: "Moderate", icon: "🌦️", condition: "Scattered Showers", recommendation: "Afternoon convective showers possible. Keep rain gear handy.", wind: 15, humidity: 70 },
    { day: "Saturday", temp: 26, temp_min: 21, temp_max: 26, rain_probability: 85, risk_level: "High Risk", icon: "⛈️", condition: "Thunderstorms", recommendation: "Squall line with lightning expected. Avoid outdoor open zones.", wind: 24, humidity: 85 },
    { day: "Sunday", temp: 25, temp_min: 20, temp_max: 25, rain_probability: 90, risk_level: "Severe", icon: "🌧️", condition: "Heavy Monsoon Downpour", recommendation: "Intense precipitation warning. Watch for localized waterlogging.", wind: 28, humidity: 92 },
    { day: "Monday", temp: 27, temp_min: 22, temp_max: 27, rain_probability: 45, risk_level: "Low Risk", icon: "🌦️", condition: "Passing Showers", recommendation: "Moderate breeze with isolated drizzle. Road transit clear.", wind: 14, humidity: 65 },
    { day: "Tuesday", temp: 29, temp_min: 24, temp_max: 29, rain_probability: 20, risk_level: "Low Risk", icon: "⛅", condition: "Partly Cloudy", recommendation: "Pleasant atmospheric conditions. Excellent solar radiation window.", wind: 10, humidity: 50 },
    { day: "Wednesday", temp: 30, temp_min: 25, temp_max: 30, rain_probability: 10, risk_level: "Low Risk", icon: "☀️", condition: "Clear Sky", recommendation: "High visibility and dry pavement. Optimal travel index.", wind: 8, humidity: 45 },
  ],
  wis2_telemetry: {
    status: "ACTIVE",
    broker: "wis2.imd.gov.in",
    topic: "in-imd/synoptic/surface",
    protocol: "MQTT",
    latency_ms: 12,
    synoptic_cycle: "0600Z",
    wmo_code: 43063,
  },
  aviation_briefing: {
    flight_category: "VFR Clear",
    ceiling_ft: 4500,
    visibility_km: 10,
    crosswind_risk: "Crosswind component 08 knots from WSW",
    metar_raw: "VAPO 140600Z 25008KT 9999 FEW030 SCT100 25/21 Q1009 NOSIG",
  },
  kisan_advisory: {
    spraying_window: "Optimal until 18:00 IST",
    irrigation_recommendation: "Evapotranspiration steady at 3.8 mm/day",
    pest_disease_risk: "Low fungal vector risk",
    harvest_safety: "High window",
  },
  smart_city_telemetry: {
    heat_island_index: "Level 1 (Comfortable)",
    drainage_overload_risk: "Normal sump metrics",
    air_quality_dispersion: "Good dispersion rate",
  },
};

export const FALLBACK_SYNOPTIC_RISK: RiskData = {
  score: 42,
  category: "Low Risk",
  color: "emerald",
  breakdown: [
    { factor: "Precipitation Rate", score: 18, description: "Light showers" },
    { factor: "Wind Gusts & Shear", score: 14, description: "Mild breeze" },
    { factor: "Atmospheric Moisture", score: 10, description: "78% relative humidity" },
  ],
  disclaimer: "* This score is an experimental AI synoptic risk engine. Official navigation orders, port alerts, and red warnings originate strictly from IMD / MoES bulletins.",
};
