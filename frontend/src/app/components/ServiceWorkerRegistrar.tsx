"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Purge legacy caches (v1 and v2) to prevent stale bundles
      if ("caches" in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            if (name.startsWith("weathergpt-v1") || name.startsWith("weathergpt-v2")) {
              caches.delete(name);
              console.log("[WeatherGPT] Purged legacy cache:", name);
            }
          }
        });
      }

      // In development (localhost), unregister any stale service workers
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
            console.log("[WeatherGPT] Dev mode: Unregistered Service Worker");
          }
        });
        return;
      }

      // In production, register and trigger an update
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("[WeatherGPT] Service Worker registered:", reg.scope);
          reg.update();
        })
        .catch((err) => {
          console.warn("[WeatherGPT] Service Worker registration failed:", err);
        });
    }
  }, []);

  return null;
}
