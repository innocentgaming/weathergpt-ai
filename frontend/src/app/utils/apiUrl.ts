/**
 * WeatherGPT Dynamic Backend API URL Resolver
 * 
 * Automatically resolves:
 * 1. If running in browser on Render (e.g. weathergpt-frontend-*.onrender.com), dynamically routes to matching weathergpt-backend-*.onrender.com
 * 2. If running in browser on Vercel, routes to Render backend
 * 3. If running in browser on localhost, routes to localhost:8000
 * 4. NEXT_PUBLIC_API_URL if configured and not overridden by environment
 * 5. Default http://localhost:8000
 */
export function getBackendUrl(): string {
  // 1. If NEXT_PUBLIC_API_URL is explicitly configured and not default localhost, use it
  if (
    process.env.NEXT_PUBLIC_API_URL &&
    !process.env.NEXT_PUBLIC_API_URL.includes("localhost:8000") &&
    process.env.NEXT_PUBLIC_API_URL.startsWith("http")
  ) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    const host = window.location.host;
    const protocol = window.location.protocol;

    // If on render.com
    if (host.includes(".onrender.com")) {
      return "https://weathergpt-backend-hvop.onrender.com";
    }

    // If on Vercel
    if (host.includes("vercel.app")) {
      return "https://weathergpt-backend-hvop.onrender.com";
    }

    // If running locally in browser
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:8000";
    }
  }

  if (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost:8000")) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return process.env.NEXT_PUBLIC_API_URL || "https://weathergpt-backend-hvop.onrender.com";
}

export const BACKEND_URL = getBackendUrl();

export function getWsUrl(): string {
  if (
    process.env.NEXT_PUBLIC_WS_URL &&
    !process.env.NEXT_PUBLIC_WS_URL.includes("localhost:8000") &&
    process.env.NEXT_PUBLIC_WS_URL.startsWith("ws")
  ) {
    return process.env.NEXT_PUBLIC_WS_URL.replace(/\/+$/, "");
  }
  const httpUrl = getBackendUrl();
  return httpUrl.replace(/^http/, "ws");
}

export const WS_URL = getWsUrl();
