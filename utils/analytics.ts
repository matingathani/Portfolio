export const trackEvent = (event: string, payload?: Record<string, string | number>) => {
  if (typeof window === "undefined") return;

  try {
    const body = JSON.stringify({ event, payload });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", body);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    // Ignore analytics errors
  }
};
