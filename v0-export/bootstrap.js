"use strict";

(async function startApplication() {
  const scripts = [
    "assets/js/prototype-uzbekistan-map.js",
    "dashboard.js",
    "modules.js",
    "dashboard-sections.js",
    "translations.js",
    "app-features.js",
  ];
  try {
    for (const source of scripts) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = source;
        script.async = false;
        script.onload = resolve;
        script.onerror = () => reject(new Error(source));
        document.body.append(script);
      });
    }
  } catch (error) {
    const notice = document.createElement("p");
    notice.className = "notice rose";
    notice.setAttribute("role", "alert");
    notice.textContent = `Dastur to‘liq yuklanmadi: ${error.message}. ZIP faylini to‘liq oching va barcha fayllarni bir papkada saqlang. `;
    const retry = document.createElement("button");
    retry.className = "btn";
    retry.type = "button";
    retry.textContent = "Qayta yuklash";
    retry.addEventListener("click", () => location.reload());
    notice.append(retry);
    (document.querySelector("main") || document.body).prepend(notice);
  }
})();
