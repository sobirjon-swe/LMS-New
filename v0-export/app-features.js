"use strict";

const storageKey = "ais-hktb-demo-v2";
const initialDemo = () => ({
  year: "2026 / 2027",
  semester: "Kuzgi semestr",
  yearStart: "2026-09-02",
  yearEnd: "2027-01-20",
  language: 0,
  night: false,
  density: "comfortable",
  classes: [],
  events: [],
  submissions: [],
  activity: [],
  messages: null,
  attendance: [],
  scope: {},
  profile: {
    name: institutionList[0].name,
    address: "Toshkent viloyati, Chirchiq shahri",
    email: "demo@example.com",
    phone: "+998 00 000 00 00",
  },
});
let demo = initialDemo(),
  storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
  if (saved && typeof saved === "object") {
    demo = {
      ...demo,
      ...saved,
      profile: { ...demo.profile, ...saved.profile },
    };
    ["classes", "events", "submissions", "activity", "attendance"].forEach(
      (k) => {
        if (!Array.isArray(demo[k])) demo[k] = [];
      },
    );
  }
} catch {
  storageAvailable = false;
}
if (Array.isArray(demo.messages))
  messages.splice(
    0,
    messages.length,
    ...demo.messages.filter(
      (m) => m && typeof m.title === "string" && Array.isArray(m.replies),
    ),
  );
demo.attendance.forEach(([k, v]) => attendanceDraft.set(k, v));
state.module = "";
const requestedModule = new URLSearchParams(location.search).get("modul");
if (moduleCatalog[requestedModule]?.roles.includes(state.role))
  state.module = requestedModule;
if (["upvk", "oversight"].includes(state.role))
  state.institution =
    institutionList.find((i) => i.id === demo.scope?.[state.role]) || null;
if (state.role === "learner") moduleState.group = demoGroups[0];
let lastLauncher = null;
const originalRender = render,
  originalShow = show;
function persistDemo() {
  demo.messages = messages;
  demo.attendance = Array.from(attendanceDraft);
  demo.scope ||= {};
  demo.scope[state.role] = state.institution?.id || null;
  try {
    localStorage.setItem(storageKey, JSON.stringify(demo));
  } catch {
    storageAvailable = false;
  }
}
function updateURL() {
  const url = new URL(location.href);
  url.searchParams.set("rol", state.role);
  if (state.module) url.searchParams.set("modul", state.module);
  else url.searchParams.delete("modul");
  try {
    history.replaceState(null, "", url);
  } catch {
    /* file:// browsers may restrict history replacement; links remain directly openable. */
  }
}
function recordActivity(title) {
  demo.activity.unshift({
    title,
    meta: `${roles[state.role].name} · Hozirgina`,
  });
  demo.activity = demo.activity.slice(0, 30);
}
function notify(text) {
  $("#feedback").textContent = text;
}
function goModule(id) {
  if (!moduleCatalog[id]?.roles.includes(state.role)) return;
  state.module = id;
  moduleState.search = "";
  moduleState.page = 0;
  if (state.role === "learner") moduleState.group = demoGroups[0];
  if (state.role === "teacher") moduleState.teacher = demoTeachers[0];
  if (modal.open) modal.close();
  closeHeaderPanels();
  render();
  $(".titlebar h1").focus();
  if (mobileNavigation.matches) setSidebarOpen(false);
}
function closeHeaderPanels() {
  document.querySelectorAll(".top details").forEach((d) => (d.open = false));
}
render = function () {
  originalRender();
  $("#nav").insertAdjacentHTML(
    "beforeend",
    allowedModules().length
      ? '<p class="nav-caption">O‘QUV MODULLARI</p>' +
          allowedModules()
            .map(
              ([id, m]) =>
                `<button type="button" data-action="module" data-value="${id}" ${state.module === id ? 'aria-current="page"' : ""}><b>${glyph(m.icon)}</b><span>${esc(m.name)}</span></button>`,
            )
            .join("")
      : "",
  );
  if (state.module) {
    $("#nav")
      .querySelectorAll('[data-action="menu"]')
      .forEach((b) => b.removeAttribute("aria-current"));
    $("#title").innerHTML =
      `<div><h1 tabindex="-1">${esc(moduleCatalog[state.module]?.name || "Modul")}</h1></div>${button("Dashboardga qaytish", "dashboard")}`;
    $("#scope").textContent =
      `Dashboard / ${moduleCatalog[state.module]?.name || "Modul"}`;
    workspace.innerHTML = renderModule();
  } else if (
    ["teacher", "learner"].includes(state.role) &&
    roles[state.role].menu[state.page] === "Topshiriqlar"
  ) {
    workspace.innerHTML =
      taskPanel(state.role === "learner") +
      panel(
        "Saqlangan demo ishlar",
        demo.submissions.filter(
          (s) =>
            s.role === state.role &&
            ["submit-task", "grade-task", "create-task"].includes(s.kind),
        ).length
          ? rows(
              demo.submissions
                .filter(
                  (s) =>
                    s.role === state.role &&
                    ["submit-task", "grade-task", "create-task"].includes(
                      s.kind,
                    ),
                )
                .slice(-8)
                .map((s) => [
                  s.title,
                  s.score ? `${s.score} / 100` : s.body,
                  "Tafsilot",
                ]),
            )
          : empty("Hali ishlar yo‘q", "Yuqoridagi formadan foydalaning."),
        "module-panel",
      );
  } else if (state.page === 0 && !state.institution)
    workspace.insertAdjacentHTML(
      "beforeend",
      `<div class="dashboard-lower">${dashboardSections()}</div>`,
    );
  const quick = workspace.querySelector(".quick");
  if (quick && ["teacher", "learner"].includes(state.role))
    quick.insertAdjacentHTML(
      "beforeend",
      button("Ko‘proq amallar", "quick-modal"),
    );
  $("#inbox").hidden = false;
  const unread =
    state.role === "upvk"
      ? messages.filter((m) => m.unread).length
      : state.role === "institution"
        ? messages.filter((m) => m.replies.length).length
        : 2;
  $("#unread").textContent = unread || "";
  $("#inbox").setAttribute(
    "aria-label",
    unread ? `Bildirishnomalar, ${unread} ta yangi` : "Bildirishnomalar",
  );
  $("#period-label").textContent = demo.year;
  $("#period-semester").textContent = demo.semester;
  workspace
    .querySelectorAll(".address p")
    .forEach(
      (p) => (p.textContent = `${demo.profile.address} · taxminiy joylashuv`),
    );
  workspace.querySelectorAll(".facts").forEach((f) => {
    if (f.textContent.includes("02.09.2026"))
      f.innerHTML = `<strong>${esc(demo.semester)}</strong><span>${esc(demo.yearStart)} – ${esc(demo.yearEnd)}</span>`;
  });
  workspace.querySelectorAll(".hero-facts .status").forEach((el) => {
    if (el.textContent === "Kuzgi semestr") el.textContent = demo.semester;
  });
  $("#rail-org").textContent =
    state.institution?.short ||
    (["upvk", "oversight", "platform"].includes(state.role)
      ? "AIS HKTB"
      : "AKT");
  $(".notice").textContent = storageAvailable
    ? "AIS HKTB · Sintetik demo ma’lumotlar · Faqat shu brauzerda saqlanadi"
    : "AIS HKTB · Brauzer saqlashni cheklagan: o‘zgarishlar faqat joriy sessiyada qoladi";
  document.documentElement.toggleAttribute("data-night", Boolean(demo.night));
  document.documentElement.dataset.density = demo.density;
  $("#theme").setAttribute("aria-pressed", String(Boolean(demo.night)));
  $("#theme").setAttribute(
    "aria-label",
    demo.night ? "Kunduzgi rejim" : "Tungi rejim",
  );
  $("#theme").innerHTML = glyph(demo.night ? "sun" : "moon");
  setLanguage(demo.language || 0);
  updateURL();
  persistDemo();
  translateUI();
};
show = function (title, html) {
  modal.className = "";
  modal.style.removeProperty("--popup-right");
  originalShow(title, html);
  translateUI(modal);
  requestAnimationFrame(() => {
    (
      modal.querySelector(
        '#dialog-body input:not([type="hidden"]), #dialog-body select, #dialog-body textarea, #dialog-body button',
      ) || modal.querySelector("button")
    ).focus();
  });
};
function showHeader(title, html, launcher) {
  show(title, html);
  modal.classList.add("header-popup");
  const rect = launcher?.getBoundingClientRect();
  if (rect)
    modal.style.setProperty(
      "--popup-right",
      `${Math.max(12, innerWidth - rect.right)}px`,
    );
}
function showSettings() {
  show(
    "Dizayn sozlamalari",
    `<div class="stack"><p class="muted">Ko‘rinish ushbu brauzer uchun saqlanadi.</p>${field(
      "Rang rejimi",
      selectInput(
        "theme",
        [
          ["light", "Kunduzgi"],
          ["dark", "Tungi"],
        ],
        demo.night ? "dark" : "light",
        'id="design-theme"',
      ),
    )}${field(
      "Zichlik",
      selectInput(
        "density",
        [
          ["comfortable", "Qulay"],
          ["compact", "Ixcham"],
        ],
        demo.density,
        'id="design-density"',
      ),
    )}<hr><h3>Demo ma’lumotlari</h3><p>Murojaatlar, davomat, formalar va sozlamalarni boshlang‘ich holatga qaytarish.</p>${button("Demo ma’lumotlarini tiklash", "reset-confirm", "", "danger")}</div>`,
  );
  modal.classList.add("settings-drawer");
}
function roleQuickActions() {
  const personalActions =
    state.role === "learner"
      ? [
          ["submit-task", "Topshiriq yuborish"],
          ["results", "Imtihon natijalari"],
          ["library", "Kutubxona"],
          ["send-message", "Pedagogga xabar"],
          ["request-leave", "Ruxsat so‘rash"],
        ]
      : state.role === "teacher"
        ? [
            ["create-task", "Topshiriq yaratish"],
            ["results", "Imtihon natijalari"],
            ["send-message", "Xabar yuborish"],
            ["journal-today", "Davomatni qayd etish"],
          ]
        : state.role === "institution"
          ? [["compose", "UPVKga murojaat"]]
          : [];
  return `<div class="shortcut-grid">${personalActions.map(([a, l]) => button(l, a, a === "journal-today" ? "09:00" : "")).join("")}${allowedModules()
    .map(([id, m]) => moduleLink(id, m.name))
    .join("")}</div>`;
}
function resultsModal() {
  show(
    "Imtihon natijalari",
    simpleTable(["Fan", "Natija", "Holat"], subjectResults) +
      `<p class="muted modal-note">${state.role === "learner" ? "Faqat shaxsiy" : "Biriktirilgan guruhlar bo‘yicha"} e’lon qilingan sintetik natijalar.</p>`,
  );
}
function formModal(kind, title, value = "") {
  let fields = "";
  if (kind === "submit-task")
    fields =
      field(
        "Topshiriq",
        `<input name="title" value="${esc(value || "Mustaqil ish")}" required maxlength="100">`,
      ) +
      field(
        "Ish matni",
        '<textarea name="body" required minlength="10" maxlength="2000" placeholder="Yechim yoki izohingizni kiriting"></textarea>',
      );
  if (kind === "grade-task")
    fields =
      field(
        "Topshiriq",
        `<input name="title" value="${esc(value)}" readonly>`,
      ) +
      field(
        "Baho / 100",
        '<input type="number" name="score" min="0" max="100" required>',
      ) +
      field(
        "Izoh",
        '<textarea name="body" required maxlength="500"></textarea>',
      );
  if (kind === "create-task")
    fields =
      field("Topshiriq nomi", '<input name="title" required maxlength="100">') +
      field("Guruh", selectInput("group", demoGroups, moduleState.group)) +
      field("Muddat", '<input type="date" name="date" required>') +
      field(
        "Tavsif",
        '<textarea name="body" required minlength="10" maxlength="2000"></textarea>',
      );
  if (kind === "message")
    fields =
      field(
        "Qabul qiluvchi",
        selectInput(
          "recipient",
          state.role === "learner"
            ? demoTeachers
            : ["Kafedra rahbariyati", "O‘quv bo‘limi"],
          demoTeachers[0],
        ),
      ) +
      field("Mavzu", '<input name="title" required maxlength="100">') +
      field(
        "Xabar",
        '<textarea name="body" required minlength="3" maxlength="1000"></textarea>',
      );
  if (kind === "leave")
    fields =
      field("Boshlanish sanasi", '<input type="date" name="start" required>') +
      field("Tugash sanasi", '<input type="date" name="end" required>') +
      field(
        "Sabab",
        '<textarea name="body" required minlength="5" maxlength="500"></textarea>',
      );
  show(
    title,
    `<form id="demo-form" data-kind="${kind}" class="stack">${fields}<p class="form-error" role="alert"></p><p class="muted">Demo forma. Ma’lumotlar faqat shu brauzerda saqlanadi.</p><button class="btn primary" type="submit">${kind === "grade-task" ? "Bahoni saqlash" : "Yuborish"}</button></form>`,
  );
}
function showNotifications(launcher) {
  const list =
    state.role === "upvk"
      ? messages
      : state.role === "institution"
        ? messages.filter((m) => m.replies.length)
        : [];
  const content = list.length
    ? list
        .map(
          (m) =>
            `<div class="row"><div><h3>${esc(m.title)}</h3><small>${esc(m.institution)} · ${esc(m.status)}</small></div>${button("Ochish", "request", m.id)}</div>`,
        )
        .join("")
    : rows([
        ["Oraliq nazorat", "16-noyabr · 10:00", "Tafsilot"],
        ["Jadval yangilandi", "Kuzgi semestr · Bugun", "Tafsilot"],
      ]);
  showHeader("Bildirishnomalar", content, launcher);
}
function showLibrary() {
  show(
    "Kutubxona",
    `<div class="stack">${field("Resurs qidiruvi", '<input type="search" id="library-search" placeholder="Resurs nomini kiriting">')}<div id="library-list">${["Axborot tizimlari asoslari", "Tarmoq xavfsizligi", "Ma’lumotlar bazasi", "Algoritmlash asoslari"].map((name, i) => `<div class="row"><div><h3>${name}</h3><small>Mahalliy demo qo‘llanma · ${i + 1}-bo‘lim</small></div>${button("O‘qish", "library-read", name)}</div>`).join("")}</div><p id="library-empty" hidden>Resurs topilmadi.</p></div>`,
  );
}
function openModuleSearch() {
  show(
    "Bo‘limni qidirish",
    `<div class="stack"><input type="search" id="menu-search" aria-label="Bo‘lim nomi" placeholder="Bo‘lim nomini yozing"><div class="search-results" id="search-results">${roles[state.role].menu.map((label, i) => button(label, "menu", i)).join("")}${allowedModules()
      .map(([id, m]) => moduleLink(id, m.name))
      .join(
        "",
      )}</div><p id="search-empty" hidden>Bu nomdagi bo‘lim topilmadi.</p></div>`,
  );
}
function handleFeatureAction(action, value, control) {
  if (action === "module") {
    goModule(value);
    return true;
  }
  if (action === "dashboard") {
    state.module = "";
    state.page = 0;
    render();
    return true;
  }
  if (action === "search") {
    openModuleSearch();
    return true;
  }
  if (action === "language") {
    demo.language = Number(value);
    $(".languages").open = false;
    render();
    $("#language").focus();
    return true;
  }
  if (action === "period") {
    showHeader(
      "O‘quv davri",
      `<form id="period-form" class="stack">${field("O‘quv yili", selectInput("year", ["2025 / 2026", "2026 / 2027", "2027 / 2028"], demo.year))}${field("Semestr", selectInput("semester", ["Kuzgi semestr", "Bahorgi semestr"], demo.semester))}<button class="btn primary" type="submit">Qo‘llash</button></form>`,
      control,
    );
    return true;
  }
  if (action === "shortcuts") {
    showHeader("Tezkor qo‘shish", roleQuickActions(), control);
    return true;
  }
  if (action === "quick-modal") {
    show("Tezkor amallar", roleQuickActions());
    return true;
  }
  if (action === "sections") {
    showHeader(
      "Bo‘limlar",
      `<div class="search-results">${roles[state.role].menu.map((l, i) => button(l, "menu", i)).join("")}${allowedModules()
        .map(([id]) => moduleLink(id))
        .join("")}</div>`,
      control,
    );
    return true;
  }
  if (action === "profile") {
    showHeader(
      "Profil",
      `<div class="profile-preview"><span class="avatar-symbol">${glyph("person")}</span><h3>${esc(roles[state.role].name)}</h3><p>${esc(roles[state.role].scope)}</p></div><div class="search-results">${button("Rolni almashtirish", "role-picker")}${button("Dizayn sozlamalari", "settings")}${button("Demo ma’lumotlarini tiklash", "reset-confirm")}</div>`,
      control,
    );
    return true;
  }
  if (action === "settings") {
    showSettings();
    return true;
  }
  if (action === "notifications") {
    showNotifications(control);
    return true;
  }
  if (action === "messages") {
    const sent = demo.submissions.filter(
      (s) => s.role === state.role && s.kind === "message",
    );
    showHeader(
      "Xabarlar",
      sent.length
        ? rows(
            sent
              .slice(-8)
              .reverse()
              .map((s) => [s.title, s.recipient, "Tafsilot"]),
          )
        : empty(
            "Yuborilgan xabarlar yo‘q",
            "Yangi demo xabar yozishingiz mumkin.",
          ),
      control,
    );
    $("#dialog-body").insertAdjacentHTML(
      "beforeend",
      `<div class="foot">${button("Xabar yozish", "send-message", "", "primary")}</div>`,
    );
    translateUI(modal);
    return true;
  }
  if (action === "results") {
    resultsModal();
    return true;
  }
  if (action === "submit-task") {
    if (state.role === "learner")
      formModal("submit-task", "Topshiriq yuborish", value);
    return true;
  }
  if (action === "grade-task") {
    if (state.role === "teacher")
      formModal("grade-task", "Ishni baholash", value);
    return true;
  }
  if (action === "create-task") {
    if (state.role === "teacher")
      formModal("create-task", "Topshiriq yaratish");
    return true;
  }
  if (action === "send-message") {
    formModal(
      "message",
      state.role === "learner" ? "Pedagogga xabar" : "Xabar yuborish",
    );
    return true;
  }
  if (action === "request-leave") {
    if (state.role === "learner") formModal("leave", "Ruxsat so‘rash");
    return true;
  }
  if (action === "library") {
    showLibrary();
    return true;
  }
  if (action === "library-read") {
    show(
      value,
      `<div class="stack"><p>Ushbu mahalliy namunaviy bo‘lim o‘quv resursini ochish oqimini ko‘rsatadi.</p><h3>Asosiy tushunchalar</h3><p>Axborotning yaxlitligi, ma’lumotlarni tartiblash va tizimlar o‘rtasida ishonchli almashish.</p><h3>Mustaqil ish</h3><p>Guruh loyihasi uchun ma’lumotlar modelini yarating va bog‘lanishlarni izohlang.</p>${button("Resurslarga qaytish", "library")}</div>`,
    );
    return true;
  }
  if (action === "view") {
    moduleState.view = value;
    render();
    return true;
  }
  if (action === "module-date") {
    moveModuleDate(Number(value) * (moduleState.view === "week" ? 7 : 1));
    return true;
  }
  if (action === "module-today") {
    moduleState.date = "2026-11-12";
    render();
    return true;
  }
  if (action === "calendar-month") {
    const d = parseDate(moduleState.date);
    d.setDate(1);
    d.setMonth(d.getMonth() + Number(value));
    moduleState.date = dateKey(d);
    render();
    return true;
  }
  if (action === "calendar-view") {
    moduleState.calendar = value;
    render();
    return true;
  }
  if (action === "calendar-select") {
    moduleState.date = value;
    moduleState.calendar = "day";
    render();
    return true;
  }
  if (action === "event-detail") {
    show(
      value,
      `<p>${esc(calendarEvents().find((e) => e.title === value)?.date || "")} · Akademik kalendar</p>`,
    );
    return true;
  }
  if (action === "new-class") {
    if (canEditAcademic()) newClassForm();
    return true;
  }
  if (action === "new-event") {
    if (canEditAcademic())
      show(
        "Tadbir qo‘shish",
        `<form id="event-form" class="stack">${field("Tadbir nomi", '<input name="title" required maxlength="120">')}${field("Sana", `<input name="date" type="date" value="${moduleState.date}" required>`)}${field("Turi", selectInput("type", ["Tadbir", "Yig‘ilish", "Imtihon"], "Tadbir"))}<button class="btn primary" type="submit">Saqlash</button></form>`,
      );
    return true;
  }
  if (action === "lesson-detail") {
    const c = lessonRecords(control.dataset.date || moduleState.date).find(
      (c) => c.id === value,
    );
    if (c)
      show(
        c.subject,
        simpleTable(
          ["Maydon", "Qiymat"],
          [
            ["Sana", c.date],
            ["Vaqt", `${c.start}–${c.end}`],
            [
              "Davomiylik",
              `${Number(c.end.slice(0, 2)) * 60 + Number(c.end.slice(3)) - (Number(c.start.slice(0, 2)) * 60 + Number(c.start.slice(3)))} daqiqa`,
            ],
            ["Guruh", c.group],
            ["Pedagog", c.teacher],
            ["Xona", c.room],
            ["Holat", c.status],
          ],
        ),
      );
    return true;
  }
  if (action === "record-page") {
    moduleState.page += Number(value);
    render();
    return true;
  }
  if (action === "record-detail") {
    const r = curriculumRecords().find((r) => r.id === value);
    if (r)
      show(
        r.subject,
        simpleTable(
          ["Maydon", "Qiymat"],
          [
            ["Kod", r.id],
            ["Guruh", r.group],
            ["Pedagog", r.teacher],
            ["Soat", r.hours],
            ["Semestr", r.semester],
            ["Holat", r.status],
          ],
        ),
      );
    return true;
  }
  if (action === "reset-confirm") {
    show(
      "Demo ma’lumotlarini tiklash",
      `<div class="stack"><p>Barcha saqlangan demo murojaatlar, javoblar, davomat va formalar o‘chiriladi. Davom etasizmi?</p>${button("Ha, tiklash", "reset-demo", "", "danger")}</div>`,
    );
    return true;
  }
  if (action === "reset-demo") {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    location.reload();
    return true;
  }
  return false;
}
document.addEventListener(
  "click",
  (event) => {
    const control = event.target.closest("button,summary,a");
    if (control && !modal.contains(control)) lastLauncher = control;
    if (event.target.closest("#inbox")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showNotifications(event.target.closest("#inbox"));
      return;
    }
    if (control?.id === "theme") {
      demo.night = !demo.night;
      persistDemo();
      return;
    }
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const { action, value } = el.dataset;
    if (action === "menu") {
      if (
        roles[state.role].menu[Number(value)] === "Dars jadvali" &&
        allowedModules().some(([id]) => id === "class-routine")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goModule("class-routine");
        return;
      }
      state.module = "";
      if (
        state.institution &&
        ["upvk", "oversight"].includes(state.role) &&
        Number(value) === roles[state.role].menu.indexOf("Murojaatlar")
      ) {
        state.tab = "Murojaatlar";
        render();
        event.stopImmediatePropagation();
        return;
      }
    }
    if (action === "role-picker" && modal.open) modal.close();
    if (handleFeatureAction(action, value, el)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);
modal.addEventListener("close", () => {
  modal.className = "";
  const replacement = lastLauncher?.dataset.action
    ? Array.from(document.querySelectorAll("[data-action]")).find(
        (b) =>
          !modal.contains(b) &&
          b.dataset.action === lastLauncher.dataset.action &&
          b.dataset.value === lastLauncher.dataset.value,
      )
    : null;
  if (lastLauncher?.isConnected) lastLauncher.focus();
  else if (replacement) replacement.focus();
  else $(".titlebar h1")?.focus();
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    const r = modal.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      modal.close();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeHeaderPanels();
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    openModuleSearch();
  }
});
roleSelect.addEventListener("change", () => {
  state.module = "";
  state.institution = ["upvk", "oversight"].includes(state.role)
    ? institutionList.find((i) => i.id === demo.scope[state.role]) || null
    : null;
  moduleState.group = demoGroups[0];
  moduleState.teacher = demoTeachers[0];
  render();
});
document.addEventListener("change", (e) => {
  const id = e.target.id,
    v = e.target.value;
  if (id === "module-date" && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    moduleState.date = v;
    render();
  }
  if (id === "module-group") {
    moduleState.group = v;
    render();
  }
  if (id === "module-teacher") {
    moduleState.teacher = v;
    render();
  }
  if (id === "record-status") {
    moduleState.status = v;
    moduleState.page = 0;
    render();
  }
  if (id === "design-theme") {
    demo.night = v === "dark";
    render();
  }
  if (id === "design-density") {
    demo.density = v;
    render();
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "record-search") {
    const pos = e.target.selectionStart;
    moduleState.search = e.target.value;
    moduleState.page = 0;
    render();
    $("#record-search").focus();
    $("#record-search").setSelectionRange(pos, pos);
  }
  if (e.target.id === "library-search") {
    const q = e.target.value.toLocaleLowerCase();
    $("#library-list")
      .querySelectorAll(".row")
      .forEach(
        (r) => (r.hidden = !r.textContent.toLocaleLowerCase().includes(q)),
      );
    $("#library-empty").hidden = Boolean($("#library-list .row:not([hidden])"));
  }
  if (e.target.id === "institution-search") {
    let p = $("#institution-empty");
    if (!p) {
      workspace.insertAdjacentHTML(
        "beforeend",
        '<p id="institution-empty" class="empty" hidden>Muassasa topilmadi.</p>',
      );
      p = $("#institution-empty");
    }
    p.hidden = Boolean(workspace.querySelector("tbody tr:not([hidden])"));
  }
});
document.addEventListener("submit", (e) => {
  const form = e.target;
  if (
    ![
      "period-form",
      "demo-form",
      "class-form",
      "event-form",
      "institution-form",
      "year-form",
    ].includes(form.id)
  )
    return;
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  Object.keys(d).forEach((k) => {
    if (typeof d[k] === "string") d[k] = d[k].trim();
  });
  const error = (text) => {
    let target = form.querySelector(".form-error");
    if (!target) {
      form.insertAdjacentHTML(
        "beforeend",
        '<p class="form-error" role="alert"></p>',
      );
      target = form.querySelector(".form-error");
    }
    target.textContent = text;
  };
  if (
    Array.from(form.querySelectorAll("[required]")).some(
      (el) => !el.value.trim(),
    )
  )
    return error("Majburiy maydonlarni to‘ldiring.");
  if (
    d.start &&
    d.end &&
    d.end <= d.start &&
    ["year-form", "class-form"].includes(form.id)
  )
    return error("Tugash boshlanishdan keyin bo‘lishi kerak.");
  if (form.id === "period-form") {
    demo.year = d.year;
    demo.semester = d.semester;
  }
  if (form.id === "demo-form") {
    if (form.dataset.kind === "leave" && d.end < d.start)
      return error("Tugash sanasi boshlanishdan oldin bo‘lishi mumkin emas.");
    demo.submissions.push({
      ...d,
      id: Date.now(),
      role: state.role,
      kind: form.dataset.kind,
    });
    recordActivity(`${$("#dialog-title").textContent} · saqlandi`);
  }
  if (form.id === "class-form") {
    if (!canEditAcademic()) return;
    const conflict = [
      ...lessonRecords(d.date),
      ...demo.classes.filter((c) => c.date === d.date),
    ].some(
      (c) =>
        (c.group === d.group || c.teacher === d.teacher || c.room === d.room) &&
        d.start < c.end &&
        d.end > c.start,
    );
    if (conflict)
      return error(
        "Bu vaqtda guruh, pedagog yoki xona band. Boshqa vaqtni tanlang.",
      );
    demo.classes.push({
      ...d,
      id: `custom-${Date.now()}`,
      status: "Rejalashtirilgan",
    });
    moduleState.date = d.date;
    moduleState.group = d.group;
    recordActivity("Yangi dars rejalashtirildi");
  }
  if (form.id === "event-form") {
    if (!canEditAcademic()) return;
    demo.events.push(d);
    recordActivity("Kalendar tadbiri qo‘shildi");
  }
  if (form.id === "institution-form") {
    if (!["institution", "leader"].includes(state.role)) return;
    demo.profile = { ...demo.profile, ...d };
    recordActivity("Muassasa profili yangilandi");
  }
  if (form.id === "year-form") {
    if (!canEditAcademic()) return;
    demo.year = d.year;
    demo.semester = d.semester;
    demo.yearStart = d.start;
    demo.yearEnd = d.end;
    recordActivity("O‘quv yili yangilandi");
  }
  if (modal.open) modal.close();
  render();
  notify(
    form.id === "demo-form" && form.dataset.kind === "leave"
      ? "Ruxsat so‘rovi saqlandi. Holati: ko‘rib chiqilmoqda."
      : "Demo ma’lumotlari saqlandi.",
  );
  translateUI($("#feedback"));
});
render();
