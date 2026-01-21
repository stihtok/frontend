// Lightweight service-worker registration with auto-update + auto-reload.
// Goal: after deploy, users get the new version without requiring hard refresh.

(function () {
  if (!("serviceWorker" in navigator)) return;

  // Avoid infinite reload loops if something goes wrong.
  const RELOAD_GUARD_KEY = "sw-reload-guard";

  const forceReloadOnce = () => {
    try {
      if (sessionStorage.getItem(RELOAD_GUARD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
    } catch (_) {
      // ignore
    }
    window.location.reload();
  };

  const sendSkipWaiting = (registration) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      return true;
    }
    return false;
  };

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        // If there's already a waiting worker (e.g. user opened after deploy), activate it.
        sendSkipWaiting(registration);

        // When a new SW is found, wait for it to install and then activate immediately.
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;

          installing.addEventListener("statechange", () => {
            if (installing.state !== "installed") return;
            // If we already have a controller, this is an update (not first install).
            if (navigator.serviceWorker.controller) {
              sendSkipWaiting(registration);
            }
          });
        });

        // Proactively check for updates when the tab becomes visible.
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            registration.update().catch(() => {});
          }
        });
      })
      .catch(() => {
        // ignore registration errors
      });

    // When the active SW changes, reload so the new assets are actually used.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      forceReloadOnce();
    });
  });
})();


