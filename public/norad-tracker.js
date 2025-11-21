(function () {
  
  const NORAD_ENDPOINT = "https://www.fortyonebuilt.com/api/norad/track";






  function getDeviceId() {
    let id = localStorage.getItem("norad_device_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("norad_device_id", id);
    }
    return id;
  }

  function getSessionId() {
    let id = sessionStorage.getItem("norad_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("norad_session_id", id);
    }
    return id;
  }

  async function sendEvent(eventType, extras = {}) {
    try {
      await fetch(NORAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          projectId: "gp31",
          eventType,
          timestamp: Date.now(),
          origin: location.origin,
          path: location.pathname,
          referrer: document.referrer || null,
          deviceId: getDeviceId(),
          sessionId: getSessionId(),
          dataSourceName: "client",
          ...extras,
        }),
      });
    } catch (err) {
      console.warn("NORAD tracker failed:", err);
    }
  }

  window.addEventListener("load", () => sendEvent("pageview"));

  let lastPath = location.pathname;
  setInterval(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      sendEvent("pageview");
    }
  }, 800);
})();
