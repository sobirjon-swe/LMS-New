"use strict";

const moduleCatalog = {
  "class-routine": {
    name: "Guruh dars jadvali",
    icon: "calendar",
    roles: [
      "institution",
      "academic",
      "teacher",
      "learner",
      "commander",
      "leader",
    ],
  },
  "schedule-classes": {
    name: "Darslarni rejalash",
    icon: "clock",
    roles: ["institution", "academic"],
  },
  "academic-calendar": {
    name: "Akademik kalendar",
    icon: "calendar",
    roles: [
      "institution",
      "academic",
      "teacher",
      "learner",
      "chair",
      "commander",
      "leader",
    ],
  },
  "class-subjects": {
    name: "Guruh fanlari jadvali",
    icon: "book",
    roles: ["institution", "academic", "teacher", "chair", "leader"],
  },
  curriculum: {
    name: "O‘quv rejalari",
    icon: "journal",
    roles: ["institution", "academic", "chair", "leader"],
  },
  "academic-timetable": {
    name: "Akademik dars jadvali",
    icon: "calendar",
    roles: ["institution", "academic", "chair", "leader"],
  },
  "teacher-timetable": {
    name: "Pedagogning dars jadvali",
    icon: "person",
    roles: ["institution", "academic", "teacher", "chair", "leader"],
  },
  "institution-profile": {
    name: "Muassasa profili",
    icon: "building",
    roles: ["institution", "leader"],
  },
  "academic-year": {
    name: "O‘quv yili sozlamalari",
    icon: "calendar",
    roles: ["institution", "academic"],
  },
};
const moduleState = {
  date: "2026-11-12",
  view: "week",
  group: "AT-3/3-26",
  teacher: "Namunaviy o‘qituvchi",
  search: "",
  status: "all",
  page: 0,
  calendar: "month",
};
const subjects = [
  "Axborot tizimlari",
  "Ma’lumotlar bazasi",
  "Tarmoq xavfsizligi",
  "Algoritmlash asoslari",
  "Harbiy aloqa tizimlari",
  "Amaliy mashg‘ulot",
];
const demoGroups = ["AT-3/3-26", "AT-3/4-26", "AT-3/5-26"];
const demoTeachers = [
  "Namunaviy o‘qituvchi",
  "Namunaviy pedagog",
  "Kafedra pedagogi",
];
const allowedModules = () =>
  Object.entries(moduleCatalog).filter(([, m]) => m.roles.includes(state.role));
const canEditAcademic = () => ["institution", "academic"].includes(state.role);
const moduleLink = (id, label, css = "") =>
  button(label || moduleCatalog[id].name, "module", id, css);
const field = (label, input) =>
  `<label class="field"><span>${esc(label)}</span>${input}</label>`;
const selectInput = (name, values, selected, attrs = "") =>
  `<select name="${name}" ${attrs}>${values
    .map((v) => {
      const [value, label] = Array.isArray(v) ? v : [v, v];
      return `<option value="${esc(value)}" ${value === selected ? "selected" : ""}>${esc(label)}</option>`;
    })
    .join("")}</select>`;
function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function dateText(date) {
  return new Intl.DateTimeFormat("uz-Latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
function moveModuleDate(amount) {
  const d = parseDate(moduleState.date);
  d.setDate(d.getDate() + amount);
  moduleState.date = dateKey(d);
  render();
}
function moduleFilters(extra = "") {
  return `<div class="module-toolbar">${field("Sana", `<input type="date" id="module-date" value="${moduleState.date}" required>`)}${extra}<div class="segmented" aria-label="Jadval ko‘rinishi">${button("Kun", "view", "day", moduleState.view === "day" ? "primary" : "")}${button("Hafta", "view", "week", moduleState.view === "week" ? "primary" : "")}</div><div class="cluster">${button("←", "module-date", -1).replace("data-action", 'aria-label="Oldingi davr" data-action')}${button("Bugun", "module-today")}${button("→", "module-date", 1).replace("data-action", 'aria-label="Keyingi davr" data-action')}</div></div>`;
}
function groupFilter() {
  const groups = state.role === "learner" ? demoGroups.slice(0, 1) : demoGroups;
  return field(
    "Guruh",
    selectInput("group", groups, moduleState.group, 'id="module-group"'),
  );
}
function lessonRecords(date) {
  const d = parseDate(date),
    day = d.getDay();
  const base =
    day === 0 || day === 6
      ? []
      : Array.from({ length: 4 }, (_, i) => ({
          id: `${date}-${i}`,
          date,
          start: ["08:30", "10:00", "11:30", "14:00"][i],
          end: ["09:50", "11:20", "12:50", "15:20"][i],
          subject: subjects[(day + i) % subjects.length],
          group: moduleState.group,
          teacher: demoTeachers[(day + i) % 3],
          room: `${201 + i}-xona`,
          status:
            i === 0 ? "O‘tildi" : i === 1 ? "Joriy dars" : "Rejalashtirilgan",
        }));
  return [
    ...base,
    ...demo.classes.filter(
      (c) => c.date === date && c.group === moduleState.group,
    ),
  ].filter(
    (c) =>
      state.module !== "teacher-timetable" || c.teacher === moduleState.teacher,
  );
}
function timetableModule() {
  const teacher = state.module === "teacher-timetable";
  const extra =
    groupFilter() +
    (teacher
      ? field(
          "Pedagog",
          selectInput(
            "teacher",
            state.role === "teacher" ? demoTeachers.slice(0, 1) : demoTeachers,
            moduleState.teacher,
            'id="module-teacher"',
          ),
        )
      : "");
  const controls = moduleFilters(extra);
  const start = parseDate(moduleState.date);
  if (moduleState.view === "week")
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const dates = Array.from(
    { length: moduleState.view === "week" ? 5 : 1 },
    (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    },
  );
  const count = dates.reduce((n, d) => n + lessonRecords(dateKey(d)).length, 0);
  const body =
    moduleState.view === "week"
      ? `<div class="week-scroll"><div class="week-board">${dates
          .map(
            (d) =>
              `<section class="week-day"><h3>${["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"][d.getDay()]}<small>${dateText(d)}</small></h3>${
                lessonRecords(dateKey(d))
                  .map(
                    (c, i) =>
                      `<button class="lesson-tile tone-${i % 3}" data-action="lesson-detail" data-date="${c.date}" data-value="${esc(c.id)}"><time>${esc(c.start)} – ${esc(c.end)}</time><strong>${esc(c.subject)}</strong><small>${esc(c.group)} · ${esc(c.room)}</small><small>${esc(c.teacher)}</small><span>${esc(c.status)}</span></button>`,
                  )
                  .join("") || '<p class="empty">Dars rejalashtirilmagan</p>'
              }</section>`,
          )
          .join("")}</div></div>`
      : table(
          ["Vaqt", "Fan / guruh", "Pedagog", "Xona", "Holat", "Amal"],
          lessonRecords(moduleState.date).map((c) => [
            `${esc(c.start)}–${esc(c.end)}`,
            `${esc(c.subject)}<small class="block">${esc(c.group)}</small>`,
            esc(c.teacher),
            esc(c.room),
            pill(c.status, c.status === "O‘tildi" ? "green" : "amber"),
            button("Tafsilot", "lesson-detail", c.id).replace(
              "data-value",
              `data-date="${c.date}" data-value`,
            ),
          ]),
        );
  return (
    controls +
    stats([
      ["Darslar", count, "calendar"],
      ["Guruh", moduleState.group, "group"],
      ["Dars davomiyligi", `${count * 80} daqiqa`, "clock"],
    ]) +
    panel(
      teacher ? "Pedagog jadvali" : "Guruh jadvali",
      count
        ? body
        : empty("Bu davrda dars yo‘q", "Boshqa sana yoki pedagogni tanlang."),
      "module-panel",
      canEditAcademic()
        ? button("Dars qo‘shish", "new-class", "", "primary")
        : "",
    )
  );
}
function planClassesModule() {
  const controls = moduleFilters(groupFilter());
  const records =
    moduleState.view === "week"
      ? Array.from({ length: 5 }, (_, i) => {
          const d = parseDate(moduleState.date);
          d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + i);
          return lessonRecords(dateKey(d));
        }).flat()
      : lessonRecords(moduleState.date);
  return (
    controls +
    stats([
      ["Rejalashtirilgan darslar", records.length, "calendar"],
      ["Fanlar", new Set(records.map((x) => x.subject)).size, "book"],
      ["Guruh", moduleState.group, "group"],
    ]) +
    panel(
      "Darslarni rejalash",
      records.length
        ? table(
            ["Sana", "Vaqt", "Fan", "Pedagog", "Xona", "Amal"],
            records.map((c) => [
              esc(c.date),
              `${c.start}–${c.end}`,
              esc(c.subject),
              esc(c.teacher),
              esc(c.room),
              button("Dars tafsiloti", "lesson-detail", c.id).replace(
                "data-value",
                `data-date="${c.date}" data-value`,
              ),
            ]),
            "table-scroll",
          )
        : empty("Darslar yo‘q", "Yangi dars qo‘shishingiz mumkin."),
      "module-panel",
      button("Dars qo‘shish", "new-class", "", "primary"),
    )
  );
}
function calendarEvents() {
  return [
    { date: "2026-11-12", title: "Kafedra yig‘ilishi", type: "Yig‘ilish" },
    {
      date: "2026-11-16",
      title: "Axborot tizimlari · oraliq nazorat",
      type: "Imtihon",
    },
    {
      date: "2026-11-18",
      title: "Mustaqil ish topshirish muddati",
      type: "Topshiriq",
    },
    { date: "2026-11-24", title: "Amaliy seminar", type: "Tadbir" },
    ...demo.events,
  ];
}
function calendarModule() {
  const date = parseDate(moduleState.date),
    y = date.getFullYear(),
    m = date.getMonth();
  const first = new Date(y, m, 1, 12),
    offset = (first.getDay() + 6) % 7,
    daysCount = new Date(y, m + 1, 0).getDate();
  const events = calendarEvents();
  const visible = events.filter((e) =>
    moduleState.calendar === "day"
      ? e.date === moduleState.date
      : e.date.startsWith(`${y}-${String(m + 1).padStart(2, "0")}`),
  );
  const toolbar = `<div class="module-toolbar">${field("Sana", `<input type="date" id="module-date" value="${moduleState.date}">`)}<div class="cluster">${button("←", "calendar-month", -1)}<strong>${new Intl.DateTimeFormat("uz", { month: "long", year: "numeric" }).format(date)}</strong>${button("→", "calendar-month", 1)}</div><div class="segmented">${["month", "day", "list"].map((v, i) => button(["Oy", "Kun", "Ro‘yxat"][i], "calendar-view", v, v === moduleState.calendar ? "primary" : "")).join("")}</div>${canEditAcademic() ? button("Tadbir qo‘shish", "new-event", "", "primary") : ""}</div>`;
  const calendar = `<div class="calendar-scroll"><div class="month-grid">${["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d) => `<div class="weekday">${d}</div>`).join("")}${Array.from({ length: offset }, () => '<div class="calendar-day outside"></div>').join("")}${Array.from(
    { length: daysCount },
    (_, i) => {
      const key = dateKey(new Date(y, m, i + 1, 12));
      return `<div class="calendar-day ${key === moduleState.date ? "selected" : ""}"><button class="date-number" data-action="calendar-select" data-value="${key}" aria-label="${dateText(new Date(y, m, i + 1))}">${i + 1}</button>${events
        .filter((e) => e.date === key)
        .map(
          (e) =>
            `<button class="calendar-event" data-action="event-detail" data-value="${esc(e.title)}">${esc(e.title)}</button>`,
        )
        .join("")}</div>`;
    },
  ).join("")}</div></div>`;
  return (
    toolbar +
    panel(
      "Akademik kalendar",
      moduleState.calendar === "month"
        ? calendar
        : visible.length
          ? rows(
              visible.map((e) => [
                e.title,
                `${e.date} · ${e.type}`,
                "Tafsilot",
              ]),
            )
          : empty(
              "Tadbirlar yo‘q",
              "Tanlangan davr uchun tadbir rejalashtirilmagan.",
            ),
    )
  );
}
function curriculumRecords() {
  return Array.from({ length: 24 }, (_, i) => ({
    id: `REJA-${String(i + 1).padStart(3, "0")}`,
    subject: subjects[i % 6],
    group: demoGroups[i % 3],
    teacher: demoTeachers[i % 3],
    hours: 48 + (i % 3) * 16,
    semester: i % 2 ? "Bahorgi" : "Kuzgi",
    status: i % 4 ? "Tasdiqlangan" : "Tasdiq kutilmoqda",
  }));
}
function recordModule() {
  const isPlan = state.module === "curriculum";
  const records = curriculumRecords().filter(
    (r) =>
      (state.role !== "teacher" || r.teacher === demoTeachers[0]) &&
      `${r.id} ${r.subject} ${r.group} ${r.teacher}`
        .toLocaleLowerCase()
        .includes(moduleState.search.toLocaleLowerCase()) &&
      (moduleState.status === "all" || r.status === moduleState.status),
  );
  const pages = Math.max(1, Math.ceil(records.length / 8));
  moduleState.page = Math.min(moduleState.page, pages - 1);
  return (
    `<div class="module-toolbar">${field("Qidiruv", `<input type="search" id="record-search" value="${esc(moduleState.search)}" placeholder="Fan, guruh yoki kod">`)}${field("Holat", selectInput("status", [["all", "Barcha holatlar"], "Tasdiqlangan", "Tasdiq kutilmoqda"], moduleState.status, 'id="record-status"'))}<span class="muted">${records.length} ta yozuv</span></div>` +
    panel(
      isPlan ? "O‘quv rejalari" : "Guruh fanlari",
      records.length
        ? table(
            [
              "Kod",
              "Fan",
              "Guruh",
              "Pedagog",
              isPlan ? "Soat" : "Semestr",
              "Holat",
              "Amal",
            ],
            records
              .slice(moduleState.page * 8, moduleState.page * 8 + 8)
              .map((r) => [
                esc(r.id),
                esc(r.subject),
                esc(r.group),
                esc(r.teacher),
                esc(isPlan ? r.hours : r.semester),
                pill(r.status, r.status === "Tasdiqlangan" ? "green" : "amber"),
                button("Tafsilot", "record-detail", r.id),
              ]),
          )
        : empty("Yozuv topilmadi", "Qidiruv yoki holat filtrini o‘zgartiring."),
    ) +
    `<div class="pagination">${button("Oldingi", "record-page", -1).replace("data-action", `${moduleState.page === 0 ? "disabled " : ""}data-action`)}<span>${moduleState.page + 1} / ${pages}</span>${button("Keyingi", "record-page", 1).replace("data-action", `${moduleState.page >= pages - 1 ? "disabled " : ""}data-action`)}</div>`
  );
}
function institutionProfileModule() {
  const p = demo.profile;
  return `<div class="grid profile-layout">${panel("Muassasa ma’lumotlari", `<form class="body form-grid" id="institution-form">${field("Muassasa nomi", `<input name="name" value="${esc(p.name)}" maxlength="180" required>`)}${field("Muassasa kodi", '<input value="AKT20261" readonly>')}${field("Hudud", '<input value="Toshkent viloyati" readonly>')}${field("Manzil", `<input name="address" value="${esc(p.address)}" maxlength="160" required>`)}${field("Elektron pochta", `<input type="email" name="email" value="${esc(p.email)}" required>`)}${field("Telefon", `<input type="tel" name="phone" value="${esc(p.phone)}" maxlength="30" required>`)}<div class="form-footer"><p class="muted">Faqat shu brauzerdagi demo ma’lumotlar o‘zgaradi.</p><button class="btn primary" type="submit">O‘zgarishlarni saqlash</button></div></form>`)}${panel("Muassasa profili", `<div class="body profile-preview"><img src="assets/mo-logo-compact.png" width="72" height="72" alt=""><h2>${esc(p.name)}</h2>${pill("AKT20261", "green")}<p>${esc(p.address)}</p><small>${esc(p.email)}</small><small>${esc(p.phone)}</small></div>`)}</div>`;
}
function academicYearModule() {
  return (
    panel(
      "O‘quv yili sozlamalari",
      `<form class="body form-grid" id="year-form">${field("O‘quv yili", selectInput("year", ["2025 / 2026", "2026 / 2027", "2027 / 2028"], demo.year))}${field("Semestr", selectInput("semester", ["Kuzgi semestr", "Bahorgi semestr"], demo.semester))}${field("Boshlanish sanasi", `<input type="date" name="start" value="${esc(demo.yearStart)}" required>`)}${field("Tugash sanasi", `<input type="date" name="end" value="${esc(demo.yearEnd)}" required>`)}<div class="form-footer"><p class="muted">Tanlov umumiy panel va semestr ma’lumotlariga qo‘llanadi.</p><button class="btn primary" type="submit">Saqlash</button></div></form>`,
    ) +
    panel(
      "Davrlar",
      simpleTable(
        ["O‘quv yili", "Semestr", "Holat"],
        [
          [demo.year, demo.semester, "Joriy"],
          ["2025 / 2026", "Bahorgi semestr", "Yakunlangan"],
        ],
      ),
      "module-panel",
    )
  );
}
function renderModule() {
  if (!moduleCatalog[state.module]?.roles.includes(state.role))
    return panel(
      "Ruxsat doirasi",
      empty(
        "Bu modul rolga biriktirilmagan",
        "Rolga tegishli menyudan foydalaning.",
      ),
    );
  if (
    ["class-routine", "teacher-timetable", "academic-timetable"].includes(
      state.module,
    )
  )
    return timetableModule();
  if (state.module === "schedule-classes") return planClassesModule();
  if (state.module === "academic-calendar") return calendarModule();
  if (["curriculum", "class-subjects"].includes(state.module))
    return recordModule();
  if (state.module === "institution-profile") return institutionProfileModule();
  return academicYearModule();
}
function newClassForm() {
  show(
    "Dars qo‘shish",
    `<form id="class-form" class="form-grid">${field("Fan", selectInput("subject", subjects, subjects[0]))}${field("Guruh", selectInput("group", demoGroups, moduleState.group))}${field("Pedagog", selectInput("teacher", demoTeachers, demoTeachers[0]))}${field("Sana", `<input type="date" name="date" value="${moduleState.date}" required>`)}${field("Boshlanish vaqti", '<input type="time" name="start" value="16:00" required>')}${field("Tugash vaqti", '<input type="time" name="end" value="17:20" required>')}${field("Xona", '<input name="room" value="204-xona" maxlength="40" required>')}<p class="form-error" role="alert"></p><button class="btn primary" type="submit">Darsni saqlash</button></form>`,
  );
}
