"use strict";

const roles = {
  teacher: {
    name: "O‘qituvchi",
    title: "O‘qituvchi dashboardi",
    scope: "AKT · Biriktirilgan guruhlar",
    menu: [
      "Bosh sahifa",
      "Dars jadvali",
      "Jurnal",
      "Topshiriqlar",
      "Guruhlarim",
    ],
    icon: "◷",
  },
  learner: {
    name: "Kursant",
    title: "Kursant dashboardi",
    scope: "AKT · Shaxsiy o‘quv ma’lumotlari",
    menu: [
      "Bosh sahifa",
      "Dars jadvali",
      "Natijalarim",
      "Davomatim",
      "Topshiriqlar",
    ],
    icon: "◷",
  },
  chair: {
    name: "Kafedra rahbariyati",
    title: "Kafedra natijalari",
    scope: "AKT · Raqamli texnologiyalar kafedrasi",
    menu: [
      "Bosh sahifa",
      "Mening kafedram",
      "Natijalar",
      "Yuklama",
      "Mening darslarim",
    ],
    icon: "▤",
  },
  hr: {
    name: "Kadrlar bo‘limi",
    title: "Kadrlar bo‘yicha ishlar",
    scope: "AKT · Kadrlar bo‘limi",
    menu: ["Bosh sahifa", "Xodimlar", "Hujjatlar", "Shtat jadvali"],
    icon: "▤",
  },
  security: {
    name: "Axborot xavfsizligi administratori",
    title: "Kirish va audit",
    scope: "AKT · Audit doirasi",
    menu: ["Bosh sahifa", "Kirish jurnali", "Hisob o‘zgarishlari"],
    icon: "◇",
  },
  upvk: {
    name: "UPVK boshlig‘i",
    title: "Muassasalar monitoringi",
    scope: "Vakolat doirasidagi muassasalar",
    menu: ["Muassasalar", "Murojaatlar"],
    icon: "▦",
  },
  oversight: {
    name: "Oliy rahbariyat",
    title: "Ta’lim natijalari",
    scope: "Vakolat doirasidagi muassasalar",
    menu: ["Umumiy natijalar", "Muassasalar"],
    icon: "▦",
  },
  institution: {
    name: "Muassasa administratori",
    title: "Muassasa boshqaruvi",
    scope: "AKT · Muassasa doirasi",
    menu: [
      "Bosh sahifa",
      "Manbalar",
      "Biriktirish",
      "Joriy semestr",
      "Murojaatlar",
    ],
    icon: "▦",
  },
  academic: {
    name: "O‘quv bo‘limi",
    title: "O‘quv jarayonidagi vazifalar",
    scope: "AKT · Kuzgi semestr",
    menu: ["Bosh sahifa", "Dars jadvali", "Biriktirish", "Qaydnomalar"],
    icon: "▤",
  },
  commander: {
    name: "O‘quv bo‘linmasi qo‘mondoni",
    title: "Bo‘linma davomati",
    scope: "AKT · Biriktirilgan bo‘linma",
    menu: ["Bosh sahifa", "Guruhlar", "Davomat"],
    icon: "◷",
  },
  platform: {
    name: "Tizim administratori",
    title: "Platforma holati",
    scope: "Platforma · Texnik monitoring",
    menu: ["Bosh sahifa", "Xizmatlar", "Navbat", "Muassasalar"],
    icon: "◇",
  },
  leader: {
    name: "Muassasa rahbariyati",
    title: "Muassasa natijalari",
    scope: "AKT · Joriy semestr",
    menu: ["Bosh sahifa", "Kafedralar", "Davomat", "Hisobotlar"],
    icon: "▤",
  },
};
const institutionList = [
  {
    id: "AKT20261",
    name: "Axborot-kommunikatsiya texnologiyalari va harbiy aloqa instituti",
    short: "AKT",
    location: "Toshkent viloyati, Chirchiq shahri",
    attendance: 94,
    score: 82,
    cadets: 247,
    staff: 113,
  },
  {
    id: "NAMUNA02",
    name: "Harbiy institut · namuna",
    short: "Harbiy institut",
    location: "Samarqand viloyati",
    attendance: 89,
    score: 78,
    cadets: 181,
    staff: 72,
  },
  {
    id: "NAMUNA03",
    name: "Harbiy akademiya · namuna",
    short: "Harbiy akademiya",
    location: "Toshkent shahri",
    attendance: 96,
    score: 87,
    cadets: 164,
    staff: 68,
  },
];
const days = [
  {
    date: "11-noyabr, chorshanba",
    lessons: [
      [
        "09:00",
        "10:20",
        "Axborot tizimlari",
        "AT-3/3-26 · 204-xona",
        "O‘tildi",
      ],
      [
        "11:00",
        "12:20",
        "Ma’lumotlar bazasi",
        "AT-3/3-26 · 205-xona",
        "Joriy dars",
      ],
      [
        "14:00",
        "15:20",
        "Lokal test fani",
        "AT-3/3-26 · 307-xona",
        "Navbatdagi dars",
      ],
      [
        "15:30",
        "16:50",
        "Amaliy mashg‘ulot",
        "AT-3/4-26 · 307-xona",
        "Rejalashtirilgan",
      ],
    ],
  },
  {
    date: "12-noyabr, payshanba",
    lessons: [
      [
        "10:00",
        "11:20",
        "Lokal test fani",
        "AT-3/3-26 · 307-xona",
        "Rejalashtirilgan",
      ],
    ],
  },
  { date: "13-noyabr, juma", lessons: [] },
];
const teacherGroups = [
  {
    code: "AT-3/3-26",
    subject: "Axborot tizimlari",
    count: 15,
    attendance: 87,
    marks: 84,
    color: "",
  },
  {
    code: "AT-3/4-26",
    subject: "Amaliy mashg‘ulot",
    count: 14,
    attendance: 93,
    marks: 82,
    color: "blue",
  },
  {
    code: "AT-3/5-26",
    subject: "Ma’lumotlar bazasi",
    count: 16,
    attendance: 90,
    marks: 86,
    color: "amber",
  },
];
const teacherTasks = [
  [
    "Davomatni kiriting",
    "Axborot tizimlari · AT-3/3-26 · 09:00",
    "Jurnalni ochish",
  ],
  [
    "Topshiriqlarni tekshiring",
    "Lokal test fani · 3 ta ish topshirilgan",
    "Ishlarni ko‘rish",
  ],
];
const learnerTasks = [
  [
    "Lokal test topshirig‘i",
    "Lokal test fani · 18-noyabrgacha",
    "Topshiriqni ochish",
  ],
];
const subjectResults = [
  ["Lokal test fani", "86 / 100", "E’lon qilingan"],
  ["Axborot tizimlari", "78 / 100", "E’lon qilingan"],
];
const averageResult = () =>
  subjectResults.length
    ? Math.round(
        subjectResults.reduce((sum, row) => sum + parseInt(row[1], 10), 0) /
          subjectResults.length,
      )
    : 0;
const workload = [
  ["Raqamli texnologiyalar", "48 / 64 soat", "16 soat qoldi"],
  ["Axborot tizimlari", "32 / 40 soat", "8 soat qoldi"],
];
const personnel = [
  ["Namunaviy pedagog", "Pedagog · Raqamli texnologiyalar", "Faol"],
  ["Namunaviy uslubchi", "O‘quv bo‘limi · Uslubchi", "Faol"],
  ["Namunaviy mutaxassis", "Kadrlar bo‘limi · Mutaxassis", "Faol"],
];
const hrStages = [
  [
    "Tekshirish kerak",
    [["Mehnat shartnomasi", "Namunaviy pedagog · tugash sanasi 17-noyabr"]],
  ],
  [
    "Hujjat kutilmoqda",
    [["Malaka hujjati", "Namunaviy uslubchi · nusxa biriktirilmagan"]],
  ],
  ["Yakunlangan", [["Lavozim yangilandi", "Namunaviy mutaxassis · 10-noyabr"]]],
];
const events = [
  ["09:20", "Kirish rad etildi", "Namunaviy hisob A", "Tekshirish kerak"],
  ["09:18", "Kirish muvaffaqiyatli", "Namunaviy hisob B", "Yozib olindi"],
  ["08:54", "Hisob roli o‘zgardi", "Namunaviy hisob C", "Audit yozuvi"],
  ["08:43", "Kirish rad etildi", "Namunaviy hisob A", "Tekshirish kerak"],
];
const sourceRows = [
  ["O‘quv rejasi", "Tasdiqlangan"],
  ["Guruhlar", "Shakllantirilgan"],
  ["Fanlar", "Kiritilgan"],
  ["Pedagoglar", "Kiritilgan"],
  ["Dars jadvali", "E’lon qilingan"],
  ["Fan biriktirish", "2 ta guruh kutmoqda"],
  ["Pedagog biriktirish", "1 ta fan kutmoqda"],
];
const linking = [
  ["Lokal test fani", "AT-3/3-26 · pedagog biriktirilmagan", "Biriktirish"],
  ["Ma’lumotlar bazasi", "AT-3/4-26 · fan biriktirilmagan", "Biriktirish"],
];
const registers = [
  ["Kuzgi nazorat qaydnomasi", "AT-3/3-26 · baholar kiritilmoqda", "Ko‘rish"],
  ["Davomat jurnali", "AT-3/4-26 · 1 ta yozuv kutilmoqda", "Ko‘rish"],
];
const groupAttendance = [
  ["AT-3/3-26", "13 / 15", "2 ta kelmagan"],
  ["AT-3/4-26", "13 / 14", "1 ta kelmagan"],
  ["AT-3/5-26", "—", "Qayd kutilmoqda"],
];
const services = [
  ["Ma’lumotlar bazasi", "Ulanish faol", "Ishlamoqda"],
  ["Vazifalar navbati", "2 ta ish navbatda", "Ishlamoqda"],
  ["Ichki bildirishnomalar", "1 ta jo‘natish kechikkan", "Tekshirish kerak"],
];
const languages = [
  ["UZB (lotin)", "uz"],
  ["ЎЗБ (кирилл)", "uz"],
  ["RU", "ru"],
  ["EN", "gb"],
];
const $ = (selector) => document.querySelector(selector);
const roleSelect = $("#role");
const workspace = $("#workspace");
const modal = $("#dialog");
const queryRole = new URLSearchParams(location.search).get("rol");
const state = {
  role: Object.hasOwn(roles, queryRole) ? queryRole : "teacher",
  page: 0,
  day: 0,
  institution: null,
  tab: "Umumiy holat",
  audit: "all",
};
const messages = [
  {
    id: 1,
    institution: "AKT20261",
    title: "Jadvaldagi to‘qnashuv",
    body: "AT-3/3-26 guruhi uchun 12-noyabr kuni ikkita dars bitta vaqtda turibdi. Jadvalni ko‘rib chiqishda yordam so‘raymiz.",
    status: "Yangi",
    unread: true,
    replies: [],
  },
];
const attendanceDraft = new Map();
const iconCodes = {
  home: "f009",
  calendar: "f133",
  journal: "f328",
  task: "f0ae",
  person: "f007",
  group: "f0c0",
  building: "f1ad",
  chart: "f080",
  book: "f02d",
  clock: "f017",
  check: "f00c",
  shield: "f3ed",
  mail: "f0e0",
  server: "f233",
  pin: "f3c5",
  moon: "f186",
  sun: "f185",
};
const glyph = (name) =>
  `<span class="glyph" aria-hidden="true">&#x${iconCodes[name] ?? iconCodes.home};</span>`;
let openers = [];

const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const button = (label, action, value = "", css = "") =>
  `<button type="button" class="btn ${css}" data-action="${action}" data-value="${esc(value)}">${esc(label)}</button>`;
const pill = (text, color = "") =>
  `<span class="status ${color}">${esc(text)}</span>`;
const panel = (heading, content, extra = "", actions = "", icon = "") =>
  `<section class="panel ${extra}"><div class="section-head"><h2>${icon ? glyph(icon) : ""}${esc(heading)}</h2>${actions}</div>${content}</section>`;
const empty = (heading, content) =>
  `<p class="empty"><strong>${esc(heading)}</strong>${esc(content)}</p>`;
const detailButton = (label, title, text, css = "") => {
  const i = openers.push([title, text]) - 1;
  return button(label, "detail", i, css);
};
const rows = (items, css = "bounded") =>
  `<div class="${css}" ${css.includes("bounded") ? 'tabindex="0" role="region" aria-label="Yozuvlar"' : ""}>${items
    .map(
      ([name, meta, action]) =>
        `<div class="row"><div><h3>${esc(name)}</h3><small>${esc(meta)}</small></div>${action ? detailButton(action, name, meta) : ""}</div>`,
    )
    .join("")}</div>`;
const table = (heads, data, cls = "") =>
  `<div class="registry ${cls}" tabindex="0" role="region" aria-label="${esc(heads.join(", "))}"><table><thead><tr>${heads.map((head) => `<th scope="col">${esc(head)}</th>`).join("")}</tr></thead><tbody>${data.map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<th scope="row" style="background:transparent">${cell}</th>` : `<td>${cell}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`;
const simpleTable = (heads, data, cls = "") =>
  table(
    heads,
    data.map((row) => row.map(esc)),
    cls,
  );
const metric = (label, value, meta) =>
  `<div class="feature"><small>${esc(label)}</small><strong>${esc(value)}</strong><p>${esc(meta)}</p></div>`;
const bars = (items, unit) =>
  `<div class="body measure">${items.map(([label, value]) => `<div><label><span>${esc(label)}</span><strong>${value}${esc(unit)}</strong></label><progress aria-label="${esc(label)}" max="100" value="${value}"></progress></div>`).join("")}<div class="axis"><span>0${esc(unit)}</span><span>100${esc(unit)}</span></div></div>`;
const grid = (a, b, css = "") => `<div class="grid ${css}">${a}${b}</div>`;
const stack = (...parts) => `<div class="stack">${parts.join("")}</div>`;
function teacherGroupCards() {
  return panel(
    "Guruhlarim",
    `<div class="body teacher-groups">${teacherGroups
      .map(
        (group) => `
    <article class="teacher-group">
      <div class="group-head ${group.color}"><span class="stat-icon">${glyph("group")}</span><div><h3>${esc(group.code)}</h3><small>${esc(group.subject)}</small></div></div>
      <div class="group-stats"><div><strong>${group.count}</strong><small>Kursantlar</small></div><div><strong>${group.attendance}%</strong><small>Davomat</small></div><div><strong>${group.marks} / 100</strong><small>O‘rtacha baho</small></div></div>
      <div class="group-actions">${["Davomat", "Baholar", "Guruh tafsiloti"].map((label) => detailButton(label, `${group.code} · ${label}`, `${group.subject} · ${group.count} kursant · ${group.attendance}% davomat · ${group.marks}/100 o‘rtacha baho`)).join("")}</div>
    </article>`,
      )
      .join("")}</div>`,
    "",
    "",
    "group",
  );
}

function teacherPerformance() {
  const indicators = [
    ["Davomat", 90, "check", "green"],
    ["O‘rtacha baho", 84, "chart", ""],
    ["Topshiriq bajarilishi", 88, "task", "amber"],
    ["Jurnal to‘liqligi", 91, "journal", "violet"],
    ["Reja bajarilishi", 82, "book", "cyan"],
    ["Qayta aloqa", 92, "mail", ""],
  ];
  return panel(
    "Guruhlar natijalari",
    `<div class="body teacher-groups">${indicators
      .map(
        ([label, value, icon, color]) => `
    <div class="teacher-indicator"><span class="stat-icon ${color}">${glyph(icon)}</span><strong>${value}%</strong><small>${label}</small><progress value="${value}" max="100" aria-label="${label}"></progress></div>`,
      )
      .join("")}</div>`,
    "",
    "",
    "chart",
  );
}
const stats = (values, style = "") =>
  `<div class="stats-strip ${style}">${values.map(([label, value, icon, color = ""]) => `<div class="stat-card"><span class="stat-icon ${color}">${glyph(icon)}</span><div><strong>${esc(value)}</strong><small>${esc(label)}</small></div></div>`).join("")}</div>`;
const quickAction = (icon, label, action, value, style = "") =>
  button(label, action, value, style).replace(
    `>${esc(label)}</button>`,
    `>${glyph(icon)} ${esc(label)}</button>`,
  );

function personalWelcome(learner) {
  const today = days[0].lessons.filter(
    (lesson) => !learner || lesson[3].includes("AT-3/3-26"),
  );
  const duration = `${Math.floor((today.length * 80) / 60)} soat ${(today.length * 80) % 60} daq.`;
  const summary = learner
    ? [
        ["Davomat", "80%", "check", "green"],
        ["O‘rtacha baho", "86 / 100", "chart"],
        ["Bugungi darslar", "2", "calendar"],
        ["Dars vaqti", "2 soat 40 daq.", "clock", "cyan"],
        ["Navbatdagi dars", "14:00", "book", "violet"],
        ["Topshiriq muddati", "18-noyabr", "task", "amber"],
      ]
    : [
        ["Bugungi darslar", "3", "calendar"],
        ["Dars vaqti", "4 soat", "clock", "cyan"],
        ["Oldindagi darslar", "2", "book", "amber"],
        ["Qaydlar bo‘yicha", "90%", "check", "green"],
        ["Biriktirilgan guruhlar", "2", "group"],
        ["Fanlar", "3", "journal", "violet"],
      ];
  const metrics = learner
    ? [
        ["Joriy natija", "86 / 100", "chart"],
        ["Davomat", "80%", "check", "green"],
        ["Ochiq topshiriq", "1", "task", "amber"],
        ["Bugungi darslar", "2", "book"],
        ["Kelgusi nazorat", "1", "journal", "violet"],
        ["Qatnashilgan", "4", "check", "cyan"],
        ["Qatnashilmagan", "1", "calendar", "rose"],
        ["E’lon qilingan baholar", "1", "chart", "amber"],
        ["Guruh", "AT-3/3-26", "group"],
        ["Kurs", "3", "building", "green"],
      ]
    : [
        ["Bugungi darslar", "3", "book"],
        ["Qatnashganlar", "27", "group", "green"],
        ["Qatnashmaganlar", "3", "person", "rose"],
        ["Tekshiriladigan ishlar", "3", "task", "amber"],
        ["Topshirilgan ishlar", "12", "check"],
        ["Kelgusi nazoratlar", "2", "journal", "violet"],
        ["Davomat qaydi kerak", "1", "calendar", "rose"],
        ["O‘tilgan dars", "1", "check", "amber"],
        ["Guruhlar davomati", "90%", "chart", "cyan"],
        ["Dars vaqti", "4 soat", "clock"],
      ];
  for (const items of [summary, metrics])
    for (const item of items) {
      if (item[0] === "Bugungi darslar") item[1] = String(today.length);
      if (item[0] === "Dars vaqti") item[1] = duration;
      if (item[0] === "Biriktirilgan guruhlar")
        item[1] = String(teacherGroups.length);
      if (item[0] === "O‘rtacha baho" || item[0] === "Joriy natija")
        item[1] = `${averageResult()} / 100`;
      if (item[0] === "E’lon qilingan baholar")
        item[1] = String(subjectResults.length);
      if (item[0] === "Davomat qaydi kerak")
        item[1] = attendanceDraft.has("0:09:00") ? "0" : "1";
    }
  return `<div class="overview">
    <section class="welcome"><div class="welcome-head"><div class="welcome-person"><span class="avatar-symbol">${glyph(learner ? "book" : "person")}</span><div><small>AKT · ${learner ? "Kursant" : "Pedagog"}</small><h2>${learner ? "Lokal test kursanti" : "Namunaviy o‘qituvchi"}</h2><div class="hero-facts">${pill(learner ? "AT-3/3-26" : "Raqamli texnologiyalar kafedrasi")}${pill(learner ? "3-kurs" : `${teacherGroups.length} ta biriktirilgan guruh`)}${pill("Kuzgi semestr")}</div></div></div><p class="welcome-date"><strong>11-noyabr</strong>Chorshanba, 2026</p></div>
    ${stats(summary, "hero-strip")}
    <div class="quick"><span class="label">Tezkor amallar</span>${
      learner
        ? quickAction("calendar", "Jadvalni ochish", "menu", 1, "primary") +
          quickAction("task", "Topshiriqlar", "menu", 4) +
          quickAction("chart", "Natijalarim", "menu", 2) +
          quickAction("check", "Davomatim", "menu", 3)
        : quickAction(
            "check",
            "Davomatni qayd etish",
            "journal-today",
            "09:00",
            "primary",
          ) +
          quickAction("book", "Navbatdagi dars", "journal-today", "14:00") +
          quickAction("task", "Topshiriqlarni tekshirish", "menu", 3) +
          quickAction("journal", "Jurnalni ochish", "menu", 2) +
          quickAction("calendar", "To‘liq jadval", "menu", 1)
    }
    </div></section>${stats(metrics, "metric-grid")}</div>`;
}

function roleOverview(role) {
  const summary = {
    chair: [
      ["E’lon qilingan natijalar", "32", "chart"],
      ["Reja bo‘yicha yuklama", "104 soat", "clock"],
      ["Qolgan yuklama", "24 soat", "task", "amber"],
    ],
    hr: [
      ["Hujjatni tekshirish", "1", "task", "amber"],
      ["Hujjat kutilmoqda", "1", "journal"],
      ["Yakunlangan", "1", "check", "green"],
    ],
    security: [
      ["So‘nggi kirish urinishlari", "3", "shield"],
      ["Rad etilgan kirishlar", "2", "task", "amber"],
      ["Hisob o‘zgarishi", "1", "person"],
    ],
    academic: [
      ["Bugungi darslar", "3", "calendar"],
      ["Biriktirish navbati", "2", "task", "amber"],
      ["Joriy qaydnomalar", "2", "journal"],
    ],
    commander: [
      ["Biriktirilgan guruhlar", "3", "group"],
      ["Davomat kiritilgan", "2 / 3", "check", "green"],
      ["Kiritilmagan", "1", "task", "amber"],
    ],
    platform: [
      ["Xizmatlar", "3", "server"],
      ["Navbatdagi ishlar", "2", "task"],
      ["Tekshirish kerak", "1", "shield", "amber"],
    ],
    leader: [
      ["Kursantlar", "247", "group"],
      ["Davomat", "94%", "check", "green"],
      ["Kafedralar", "10", "building"],
    ],
    upvk: [
      ["Muassasalar", "3", "building"],
      [
        "Ochiq murojaatlar",
        String(messages.filter((msg) => msg.status !== "Hal qilindi").length),
        "mail",
        "amber",
      ],
    ],
    oversight: [
      ["Muassasalar", "3", "building"],
      ["Kursantlar", "592", "group"],
      ["Pedagog va xodimlar", "253", "person"],
    ],
  }[role];
  return summary ? `<div class="overview">${stats(summary)}</div>` : "";
}

function schedule(learner) {
  const day = days[state.day];
  const lessons = learner
    ? day.lessons.filter((lesson) => lesson[3].includes("AT-3/3-26"))
    : day.lessons;
  const dates = `<div class="cluster">${state.day > 0 ? button("←", "day", -1, "icon").replace("data-action", 'aria-label="Oldingi kun" data-action') : ""}${state.day < days.length - 1 ? button("→", "day", 1, "icon").replace("data-action", 'aria-label="Keyingi kun" data-action') : ""}${["teacher", "learner", "academic"].includes(state.role) && state.page === 0 ? button("To‘liq jadval", "menu", 1) : ""}</div>`;
  const body = lessons.length
    ? lessons
        .map(
          ([start, end, title, meta, status]) => `
    <div class="time-row ${status === "Joriy dars" ? "current" : status === "Navbatdagi dars" ? "featured" : status === "O‘tildi" ? "done" : "planned"}"><time datetime="${start}">${start}<small>${end}</small></time><div class="lesson-info"><h3>${esc(title)}</h3><small>${glyph("group")} ${esc(meta)} · 80 daqiqa</small></div><div class="lesson-actions">${pill(status, status === "O‘tildi" ? "green" : status === "Joriy dars" ? "rose" : status === "Navbatdagi dars" ? "amber" : "")}${learner || state.role !== "teacher" ? detailButton("Tafsilot", title, `${start}–${end} · ${meta} · ${status}`) : button(status === "O‘tildi" ? "Jurnal" : "Darsni ochish", "journal", start, status === "Joriy dars" ? "primary" : "")}</div></div>`,
        )
        .join("")
    : empty("Bu kunga dars rejalashtirilmagan", "Boshqa kunni tanlang.");
  const progress =
    learner && lessons.length
      ? `<div class="schedule-summary">${[
          [
            "O‘tildi",
            lessons.filter((lesson) => lesson[4] === "O‘tildi").length,
            "green",
          ],
          [
            "Joriy dars",
            lessons.filter((lesson) => lesson[4] === "Joriy dars").length,
            "rose",
          ],
          [
            "Keyingi",
            lessons.filter((lesson) =>
              ["Navbatdagi dars", "Rejalashtirilgan"].includes(lesson[4]),
            ).length,
            "amber",
          ],
          ["Dars vaqti", `${lessons.length * 80} daqiqa`, ""],
        ]
          .map(
            ([label, value, color]) =>
              `<div class="${color}"><strong>${value}</strong><small>${label}</small></div>`,
          )
          .join("")}</div>`
      : "";
  return panel(
    "Dars jadvali",
    `<div class="facts"><strong>${esc(day.date)}</strong><span>${lessons.length} ta dars</span></div>${progress}<div class="schedule-list">${body}</div>`,
    "schedule",
    dates,
    "calendar",
  );
}

function personal(learner, page) {
  if (page === "Dars jadvali") return schedule(learner);
  if (!learner && page === "Guruhlarim") return teacherGroupCards();
  const pending = attendanceDraft.has("0:09:00")
    ? empty("Davomat saqlandi", "Axborot tizimlari · AT-3/3-26")
    : `<div class="row"><div><h3>Davomatni kiriting</h3><small>Axborot tizimlari · AT-3/3-26 · 09:00</small></div>${button("Jurnalni ochish", "journal-today", "09:00")}</div>`;
  if (page === "Jurnal")
    return panel(
      "Guruh jurnallari",
      `<div class="row"><div><h3>Axborot tizimlari</h3><small>AT-3/3-26 · 11-noyabr, 09:00</small></div>${button("Jurnalni ochish", "journal-today", "09:00")}</div>`,
    );
  if (page === "Topshiriqlar")
    return panel(
      learner ? "Mening topshiriqlarim" : "Tekshiriladigan ishlar",
      rows(learner ? learnerTasks : teacherTasks.slice(1)),
    );
  if (page === "Natijalarim")
    return panel(
      "E’lon qilingan natijalar",
      simpleTable(["Fan", "Natija", "Holat"], subjectResults),
    );
  if (page === "Davomatim")
    return panel(
      "Joriy semestr davomati",
      `<div class="body">${metric("Davomat", "80%", "4 ta qatnashgan · 5 ta qayd")}</div>`,
    );
  const analysis = (title, value, caption, meta, details) =>
    panel(
      title,
      `<div class="body"><div class="insight-lead"><span class="dial" style="--value:${value}"><b>${value}</b></span><div><h3>${caption}</h3><small>${meta}</small></div></div><div class="insight-details">${details}</div></div>`,
      "insights",
      pill("DEMO TAHLIL"),
      "chart",
    );
  const right = learner
    ? analysis(
        "O‘quv natijasi",
        averageResult(),
        "E’lon qilingan natijalar",
        `${subjectResults.length} ta sintetik baho · o‘rtacha ${averageResult()} / 100`,
        rows(learnerTasks),
      )
    : analysis(
        "Guruhlar davomati",
        90,
        "30 ta davomat qaydi",
        "27 ta qatnashgan · 3 ta qatnashmagan",
        pending + rows(teacherTasks.slice(1)),
      );
  const daily = grid(schedule(learner), right, "schedule-side");
  return (
    personalWelcome(learner) +
    (learner ? daily : stack(daily, teacherPerformance(), teacherGroupCards()))
  );
}

function chair(page) {
  const results = panel(
    "Fanlar bo‘yicha e’lon qilingan natijalar",
    simpleTable(
      ["Fan", "O‘rtacha", "Natijalar soni"],
      [
        ["Lokal test fani", "86 / 100", "16 ta"],
        ["Axborot tizimlari", "78 / 100", "16 ta"],
        ["Tarmoq xavfsizligi", "Baholar e’lon qilinmagan", "0 ta"],
      ],
    ),
  );
  const loads = panel(
    "Pedagoglar yuklamasi",
    simpleTable(["Yo‘nalish", "Bajarilgan / reja", "Qoldiq"], workload),
  );
  if (page === "Natijalar") return results;
  if (page === "Yuklama") return loads;
  if (page === "Mening darslarim") return schedule(false);
  if (page === "Mening kafedram")
    return grid(loads, panel("Biriktirilgan pedagoglar", rows([personnel[0]])));
  return stack(
    grid(
      results,
      panel(
        "Kafedra ko‘rsatkichi",
        `<div class="body">${metric("O‘rtacha baho", "82 / 100", "32 ta e’lon qilingan natija · Kuzgi semestr")}</div>`,
      ),
    ),
    loads,
  );
}

function hr(page) {
  if (page === "Xodimlar")
    return panel(
      "Xodimlar reyestri",
      simpleTable(["Xodim", "Bo‘lim va lavozim", "Holat"], personnel),
    );
  if (page === "Shtat jadvali")
    return panel(
      "Shtat jadvali",
      simpleTable(
        ["Lavozim", "Band", "Bo‘sh"],
        [
          ["Pedagog", "96", "2"],
          ["Uslubchi", "3", "1"],
          ["Mutaxassis", "14", "0"],
        ],
      ),
    );
  return panel(
    "Hujjatlar bo‘yicha navbat",
    `<div class="board">${hrStages
      .map(
        ([stage, items]) =>
          `<div><h3>${esc(stage)}</h3>${rows(
            items.map(([name, meta]) => [name, meta, "Hujjatni ochish"]),
            "bounded compact",
          )}</div>`,
      )
      .join("")}</div>`,
    "",
    button("Xodimlar reyestri", "menu", 1),
  );
}

function security(page) {
  const filtered = events.filter((event) =>
    page === "Hisob o‘zgarishlari"
      ? event[3] === "Audit yozuvi"
      : page === "Kirish jurnali"
        ? event[3] !== "Audit yozuvi" &&
          (state.audit === "all" || event[3] === "Tekshirish kerak")
        : state.audit === "all" || event[3] === "Tekshirish kerak",
  );
  const filters =
    page === "Hisob o‘zgarishlari"
      ? ""
      : `<div class="tabs" style="margin:0">${button("Hammasi", "audit", "all", state.audit === "all" ? "primary" : "")}${button("Rad etilgan", "audit", "failed", state.audit === "failed" ? "primary" : "")}</div>`;
  return panel(
    "So‘nggi audit yozuvlari",
    table(
      ["Vaqt", "Hodisa", "Hisob", "Holat"],
      filtered.map(([time, event, account, status]) => [
        esc(time),
        detailButton(event, event, `${time} · ${account}`),
        esc(account),
        pill(status, status === "Tekshirish kerak" ? "amber" : "green"),
      ]),
    ),
    "",
    filters,
  );
}

function academic(page) {
  if (page === "Dars jadvali") return schedule(false);
  if (page === "Biriktirish")
    return panel("Biriktirish navbati", rows(linking));
  if (page === "Qaydnomalar")
    return panel("Joriy qaydnomalar", rows(registers));
  return grid(
    stack(
      panel("Biriktirish navbati", rows(linking)),
      panel("Qaydnomalar", rows(registers)),
    ),
    schedule(false),
  );
}

function commander(page) {
  const attendance = panel(
    "Guruhlar bo‘yicha bugungi davomat",
    simpleTable(["Guruh", "Qatnashgan", "Holat"], groupAttendance),
  );
  if (page === "Davomat") return attendance;
  if (page === "Guruhlar")
    return panel(
      "Biriktirilgan guruhlar",
      simpleTable(
        ["Guruh", "Kursantlar soni"],
        [
          ["AT-3/3-26", 15],
          ["AT-3/4-26", 14],
          ["AT-3/5-26", 16],
        ],
      ),
    );
  return grid(
    attendance,
    panel(
      "Tekshirish kerak",
      rows([
        [
          "AT-3/3-26",
          "2 ta kelmagan · davomat qayd etilgan",
          "Davomatni ko‘rish",
        ],
        ["AT-3/5-26", "Bugungi davomat hali kiritilmagan", "Guruhni ochish"],
      ]),
    ),
  );
}

function platform(page) {
  if (page === "Muassasalar")
    return panel(
      "Muassasalar",
      simpleTable(
        ["Kod", "Muassasa"],
        institutionList.map((inst) => [inst.id, inst.name]),
      ),
    );
  const servicePanel = panel(
    "Xizmatlar holati",
    simpleTable(["Xizmat", "Oxirgi tekshiruv", "Holat"], services),
  );
  const jobs = panel(
    "Vazifalar navbati",
    rows([
      ["Ichki bildirishnoma", "Qayta urinish kutilmoqda · 09:18", "Tafsilot"],
      ["Hisobot tayyorlash", "Navbatda · 09:21", "Tafsilot"],
    ]),
  );
  if (page === "Xizmatlar") return servicePanel;
  if (page === "Navbat") return jobs;
  return grid(servicePanel, jobs);
}

function leader(page) {
  const faculty = panel(
    "Kafedralar kesimida",
    simpleTable(
      ["Kafedra", "O‘rtacha natija", "Davomat"],
      [
        ["Raqamli texnologiyalar", "82 / 100", "94%"],
        ["Axborot tizimlari", "79 / 100", "91%"],
      ],
    ),
  );
  const attendance = panel(
    "Kafedralar davomati",
    bars(
      [
        ["Raqamli texnologiyalar", 94],
        ["Axborot tizimlari", 91],
      ],
      "%",
    ),
  );
  if (page === "Kafedralar") return faculty;
  if (page === "Davomat") return attendance;
  if (page === "Hisobotlar")
    return panel(
      "Joriy hisobotlar",
      rows([["Kafedralar natijasi", "Kuzgi semestr", "Hisobotni ko‘rish"]]),
    );
  return grid(faculty, attendance);
}

function locationMap() {
  const shape = window.LMS_UZ_REGIONS || [];
  return panel(
    "O‘zbekiston xaritasi",
    `<div class="map-area"><svg viewBox="0 0 860 570" role="img" aria-label="O‘zbekiston xaritasi. Toshkent viloyati ajratilgan. AKT joylashuvi taxminiy.">
    ${shape.map((region) => `<path class="${region.id === "UZ-TO" ? "highlight" : ""}" d="${region.path}"/>`).join("")}
    <circle cx="702" cy="278" r="8"/><text x="718" y="274">AKT</text></svg></div><div class="address"><strong>Saqlangan manzil</strong><p>Toshkent viloyati, Chirchiq shahri · taxminiy joylashuv</p></div>`,
  );
}

function institutionAdmin(page) {
  const resources = panel(
    "Manbalar mavjudligi",
    `<div class="facts"><strong>5 / 7 tayyor</strong><span>2 ta manba to‘ldirilmoqda</span></div>${rows(page === "Manbalar" ? sourceRows : sourceRows.slice(-2), "bounded compact")}`,
    "",
    page === "Manbalar" ? "" : button("Barchasini ko‘rish", "menu", 1),
  );
  const assign = panel(
    "Biriktirish vazifalari",
    rows(
      page === "Biriktirish" ? linking : linking.slice(0, 2),
      "bounded compact",
    ),
    "",
    page === "Biriktirish" ? "" : button("Barchasini ko‘rish", "menu", 2),
  );
  const semester = panel(
    "Joriy semestr",
    `<div class="facts"><strong>Kuzgi semestr</strong><span>02.09.2026 – 20.01.2027</span></div>`,
  );
  if (page === "Manbalar") return resources;
  if (page === "Biriktirish") return assign;
  if (page === "Joriy semestr") return semester;
  if (page === "Murojaatlar") return requestPanel("AKT20261");
  const adminIntro = `<section class="admin-intro"><div><div class="welcome-person"><span class="avatar-symbol">${glyph("building")}</span><div><h2>Muassasa administratori</h2><small>AKT · 11-noyabr 2026 · Kuzgi semestr</small></div></div><div class="quick">${quickAction("task", "Biriktirish", "menu", 2, "primary")}${quickAction("book", "Manbalar", "menu", 1)}${quickAction("mail", "Murojaat", "compose", "")}</div></div>
    ${stats([
      ["Davomat", "94%", "check", "green"],
      ["Kursantlar", "247", "group"],
      ["Pedagoglar", "113", "person", "amber"],
      ["O‘quv guruhlari", "33", "book", "violet"],
    ])}</section>`;
  const highlights = `<div class="stack"><article class="highlight-card"><div><small>${glyph("check")} Muassasa tayyorgarligi</small><h2>5 / 7 manba tayyor</h2><small>Joriy semestr bo‘yicha</small></div>${button("Manbalarni ochish", "menu", 1)}</article>
    <article class="highlight-card blue"><div><small>${glyph("task")} O‘quv jarayoni</small><h2>Biriktirish vazifalari</h2><small>Fan va pedagog biriktiruvlari</small></div>${button("Vazifalarni ochish", "menu", 2)}</article></div>`;
  const distribution = panel(
    "Kurslar bo‘yicha taqsimot",
    `<div class="body"><h3>247 kursant</h3><small>33 ta o‘quv guruhi</small></div>${bars(
      [
        ["1-kurs · 74 kursant", 30],
        ["3-kurs · 89 kursant", 36],
        ["5-kurs · 84 kursant", 34],
      ],
      "%",
    )}`,
    "",
    "",
    "group",
  );
  const points = [
    [52, 49],
    [57, 56],
    [62, 60],
    [68, 68],
    [72, 63],
    [77, 72],
    [81, 77],
    [85, 73],
    [89, 82],
    [92, 87],
    [94, 81],
    [96, 93],
  ];
  const matrix = panel(
    "Davomat va o‘zlashtirish",
    `<div class="body"><h3>Guruhlar kesimida</h3><small>Y o‘qi — o‘rtacha baho / 100</small><div class="matrix" role="img" aria-label="Namunaviy 12 guruhning davomat va baho ko‘rsatkichlari">${points.map(([x, y], i) => `<i class="${i < 5 ? "warn" : ""}" style="--x:${x};--y:${y}" title="Davomat ${x}% · baho ${y}/100"></i>`).join("")}</div><div class="matrix-axis"><span>0%</span><span>Davomat</span><span>100%</span></div><p class="matrix-caption">Kuzgi semestr · 12 ta namunaviy guruh</p></div>`,
    "",
    "",
    "chart",
  );
  return (
    adminIntro +
    stack(
      `<div class="admin-columns">${highlights}${distribution}${matrix}</div>`,
      grid(
        locationMap(),
        stack(resources, assign, semester),
        "institution-grid",
      ),
      grid(
        panel(
          "Guruhlar davomati",
          bars(
            [
              ["1-kurs", 92],
              ["3-kurs", 94],
              ["5-kurs", 96],
            ],
            "%",
          ),
        ),
        panel(
          "Fan bilan qamrov",
          bars(
            [
              ["1-kurs", 83],
              ["3-kurs", 90],
              ["5-kurs", 100],
            ],
            "%",
          ),
        ),
        "pair",
      ),
      grid(
        panel(
          "O‘quv guruhlari va to‘ldirilishi",
          simpleTable(
            ["Guruh", "Kursantlar", "Sig‘im"],
            [
              ["AT-3/3-26", "15", "16"],
              ["AT-3/4-26", "14", "16"],
            ],
          ),
        ),
        panel(
          "Kafedralar",
          simpleTable(
            ["Kafedra", "Pedagoglar", "Fanlar"],
            [
              ["Raqamli texnologiyalar", "22", "28"],
              ["Axborot tizimlari", "18", "32"],
            ],
          ),
        ),
        "pair",
      ),
    )
  );
}

function institutionRegistry() {
  return panel(
    "Muassasalar",
    table(
      ["Muassasa", "Hudud", "Davomat", "Amal"],
      institutionList.map((inst) => [
        `<strong>${esc(inst.name)}</strong><br><small>${esc(inst.id)}</small>`,
        esc(inst.location),
        `${inst.attendance}%`,
        button("Ochish", "institution", inst.id),
      ]),
      "table-scroll",
    ),
    "",
    '<input id="institution-search" class="search" type="search" aria-label="Muassasani qidirish" placeholder="Nomi yoki kodi bo‘yicha qidiring">',
  );
}

function requestPanel(institution) {
  const relevant = messages.filter(
    (msg) => !institution || msg.institution === institution,
  );
  const body = relevant.length
    ? `<div class="bounded" tabindex="0" role="region" aria-label="Murojaatlar">${relevant
        .map(
          (msg) =>
            `<div class="row"><div><h3>${esc(msg.title)}</h3><small>${esc(msg.institution)} · ${esc(msg.status)}${msg.unread && state.role === "upvk" ? " · O‘qilmagan" : ""}</small></div>${button("Murojaatni ochish", "request", msg.id)}</div>`,
        )
        .join("")}</div>`
    : empty("Murojaat yo‘q", "Bu muassasa uchun murojaat yuborilmagan.");
  return panel(
    "Murojaatlar",
    body,
    "",
    state.role === "institution"
      ? button("Yangi murojaat", "compose", "", "primary")
      : "",
  );
}

function scoped(inst) {
  const sectionNames = [
    "Umumiy holat",
    "Kursantlar",
    "Kadrlar",
    "O‘quv jarayoni",
  ];
  if (state.role === "upvk") sectionNames.push("Murojaatlar");
  const tabs = `<nav class="tabs" aria-label="Muassasa bo‘limlari">${sectionNames.map((section) => button(section, "tab", section).replace("data-action", `${state.tab === section ? 'aria-current="page" ' : ""}data-action`)).join("")}</nav>`;
  const demo = inst.id === "AKT20261";
  switch (state.tab) {
    case "Kursantlar":
      return (
        tabs +
        panel(
          "Kursantlar",
          simpleTable(
            ["Kursant", "Guruh", "Holat"],
            demo
              ? [["Lokal test kursanti", "AT-3/3-26", "Faol"]]
              : [[`Namunaviy kursant · ${inst.short}`, "1-guruh", "Faol"]],
          ),
        )
      );
    case "Kadrlar":
      return (
        tabs +
        panel(
          "Kadrlar",
          simpleTable(
            ["Xodim", "Bo‘lim va lavozim", "Holat"],
            demo
              ? personnel
              : [
                  [
                    `Namunaviy pedagog · ${inst.short}`,
                    "O‘quv bo‘limi",
                    "Faol",
                  ],
                ],
          ),
        )
      );
    case "O‘quv jarayoni":
      return (
        tabs +
        panel(
          "O‘quv jarayoni",
          simpleTable(
            ["Fan", "Guruh", "Holat"],
            [
              [
                demo ? "Lokal test fani" : "Namunaviy mashg‘ulot",
                demo ? "AT-3/3-26" : "1-guruh",
                "Rejalashtirilgan",
              ],
            ],
          ),
        )
      );
    case "Murojaatlar":
      return tabs + requestPanel(inst.id);
    default:
      return (
        tabs +
        grid(
          panel(
            "Joriy semestr",
            simpleTable(
              ["Ko‘rsatkich", "Qiymat"],
              [
                ["Kursantlar", inst.cadets],
                ["Xodimlar", inst.staff],
                ["Davomat", `${inst.attendance}%`],
                ["O‘rtacha natija", `${inst.score} / 100`],
              ],
            ),
          ),
          state.role === "upvk"
            ? requestPanel(inst.id)
            : panel(
                "Muassasa manzili",
                `<div class="body">${esc(inst.location)}</div>`,
              ),
        )
      );
  }
}

function monitoring(page) {
  if (state.institution) return scoped(state.institution);
  if (page === "Murojaatlar") return requestPanel(null);
  if (state.role === "upvk" || page === "Muassasalar")
    return institutionRegistry();
  return stack(
    grid(
      panel(
        "Muassasalar bo‘yicha o‘rtacha natija",
        bars(
          institutionList.map((inst) => [inst.short, inst.score]),
          " / 100",
        ),
      ),
      panel(
        "Davomat",
        bars(
          institutionList.map((inst) => [inst.short, inst.attendance]),
          "%",
        ),
      ),
      "pair",
    ),
    institutionRegistry(),
  );
}

function render() {
  const profile = roles[state.role];
  const page = profile.menu[state.page];
  const heading =
    state.institution?.name || (state.page === 0 ? profile.title : page);
  const scope = state.institution
    ? `${state.institution.id} · ${state.institution.location}`
    : profile.scope;
  const topAction = state.institution
    ? button("← Muassasalarga qaytish", "return")
    : state.role === "institution"
      ? button("UPVKga murojaat", "compose", "", "primary")
      : "";
  $("#role-name").textContent = profile.name;
  $("#rail-account-name").textContent = profile.name;
  $("#rail-org").textContent =
    state.institution?.short ||
    (["upvk", "oversight", "platform"].includes(state.role)
      ? "AIS HKTB"
      : "AKT");
  $("#scope").textContent = `Dashboard / ${scope}`;
  $("#title").innerHTML =
    `<div><h1 tabindex="-1">${esc(heading)}</h1>${state.role === "commander" && state.page === 0 ? "<p>11-noyabr 2026, chorshanba</p>" : ""}</div>${topAction}`;
  const menuIcons = {
    "Dars jadvali": "calendar",
    Jurnal: "journal",
    Topshiriqlar: "task",
    Natijalarim: "chart",
    Davomatim: "check",
    "Mening kafedram": "building",
    Natijalar: "chart",
    Yuklama: "clock",
    "Mening darslarim": "calendar",
    Xodimlar: "group",
    Hujjatlar: "journal",
    "Shtat jadvali": "task",
    "Kirish jurnali": "shield",
    "Hisob o‘zgarishlari": "person",
    Muassasalar: "building",
    Murojaatlar: "mail",
    "Umumiy natijalar": "chart",
    Manbalar: "book",
    Biriktirish: "group",
    "Joriy semestr": "calendar",
    Qaydnomalar: "journal",
    Guruhlar: "group",
    Davomat: "check",
    Xizmatlar: "server",
    Navbat: "task",
    Kafedralar: "building",
    Hisobotlar: "chart",
  };
  $("#nav").innerHTML =
    '<p class="nav-caption">ASOSIY</p>' +
    profile.menu
      .map(
        (entry, i) =>
          `${i === 1 ? '<p class="nav-caption">ISH BO‘LIMLARI</p>' : ""}<button type="button" data-action="menu" data-value="${i}" ${i === state.page ? 'aria-current="page"' : ""}><b aria-hidden="true">${glyph(menuIcons[entry] || "home")}</b>${esc(entry)}</button>`,
      )
      .join("");
  const unread = messages.filter((msg) => msg.unread).length;
  $("#inbox").hidden = state.role !== "upvk";
  $("#unread").textContent = unread || "";
  $("#inbox").setAttribute(
    "aria-label",
    unread ? `Bildirishnomalar, ${unread} ta yangi` : "Bildirishnomalar",
  );
  openers = [];
  switch (state.role) {
    case "teacher":
      workspace.innerHTML = personal(false, page);
      break;
    case "learner":
      workspace.innerHTML = personal(true, page);
      break;
    case "chair":
      workspace.innerHTML = chair(page);
      break;
    case "hr":
      workspace.innerHTML = hr(page);
      break;
    case "security":
      workspace.innerHTML = security(page);
      break;
    case "academic":
      workspace.innerHTML = academic(page);
      break;
    case "commander":
      workspace.innerHTML = commander(page);
      break;
    case "platform":
      workspace.innerHTML = platform(page);
      break;
    case "leader":
      workspace.innerHTML = leader(page);
      break;
    case "institution":
      workspace.innerHTML = institutionAdmin(page);
      break;
    default:
      workspace.innerHTML = monitoring(page);
  }
  if (
    state.page === 0 &&
    !state.institution &&
    !["teacher", "learner"].includes(state.role)
  ) {
    workspace.insertAdjacentHTML("afterbegin", roleOverview(state.role));
  }
}

function show(title, html) {
  $("#dialog-title").textContent = title;
  $("#dialog-body").innerHTML = html;
  if (!modal.open) modal.showModal();
}

function openRequest(id) {
  const msg = messages.find((item) => item.id === id);
  if (!msg) return;
  const upvk = state.role === "upvk";
  if (upvk) {
    msg.unread = false;
    state.institution = institutionList.find(
      (item) => item.id === msg.institution,
    );
    state.page = 0;
    state.tab = "Murojaatlar";
    render();
    $(".titlebar h1").focus();
  }
  const replies = msg.replies
    .map(
      (reply) =>
        `<div class="row"><div><strong>UPVK boshlig‘i</strong><p class="message">${esc(reply)}</p></div></div>`,
    )
    .join("");
  const response = upvk
    ? `<form class="stack" id="reply" data-id="${msg.id}">
    <label>Holati<select name="status" required>${["Yangi", "Ko‘rib chiqilmoqda", "Hal qilindi"].map((status) => `<option ${status === msg.status ? "selected" : ""}>${esc(status)}</option>`).join("")}</select></label>
    <label>Javob<textarea name="message" maxlength="500"></textarea></label><button class="btn primary" type="submit">Saqlash</button></form>`
    : "";
  show(
    msg.title,
    `<div class="stack"><p><strong>${esc(msg.institution)}</strong> · ${esc(msg.status)}</p><p class="message">${esc(msg.body)}</p>${replies}${response}</div>`,
  );
}

function showInbox() {
  show(
    "Bildirishnomalar",
    messages
      .map(
        (msg) =>
          `<div class="row"><div><h3>${esc(msg.title)}</h3><small>${esc(msg.institution)} · ${msg.unread ? "Yangi bildirishnoma" : "O‘qilgan"}</small></div>${button("Ochish", "request", msg.id)}</div>`,
      )
      .join(""),
  );
}

function composeRequest() {
  show(
    "UPVKga murojaat",
    `<form class="stack" id="compose">
    <p class="muted">AKT20261 → UPVK boshlig‘i</p>
    <label>Mavzu<input name="title" required maxlength="100"></label>
    <label>Murojaat matni<textarea name="message" required maxlength="500"></textarea></label>
    <button class="btn primary" type="submit">Maketda yuborish</button>
  </form>`,
  );
}

function openJournal(start, day = state.day) {
  const lesson = days[day].lessons.find((item) => item[0] === start);
  if (!lesson) return;
  const [, end, title, meta, status] = lesson;
  const key = `${day}:${start}`;
  const journal =
    status === "O‘tildi"
      ? `<form class="stack" id="journal" data-key="${key}">
    <label>Lokal test kursanti<select name="attendance" required><option value="">Davomatni tanlang</option>${["Qatnashdi", "Qatnashmadi", "Uzrli"].map((value) => `<option ${attendanceDraft.get(key) === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>
    <button class="btn primary" type="submit">Davomatni saqlash</button>
  </form>`
      : `<p>${esc(status)}. Davomat dars o‘tilgach qayd etiladi.</p>`;
  show(
    title,
    `<div class="stack"><p>${start}–${end} · ${esc(meta)}</p>${journal}</div>`,
  );
}

function flag(index) {
  const [name, country] = languages[index];
  return `<img class="flag" src="assets/images/flags/${country}.svg" width="21" height="15" alt=""> <span>${name}</span>`;
}
function setLanguage(index) {
  $("#language").innerHTML =
    flag(index) + '<span class="glyph" aria-hidden="true">&#xf107;</span>';
  $("#language").setAttribute("aria-label", `Til: ${languages[index][0]}`);
}
setLanguage(0);
$("#languages").innerHTML = languages
  .map(
    (item, i) =>
      `<button type="button" data-action="language" data-value="${i}">${flag(i)}</button>`,
  )
  .join("");
roleSelect.innerHTML = Object.entries(roles)
  .map(([key, role]) => `<option value="${key}">${role.name}</option>`)
  .join("");
roleSelect.value = state.role;
roleSelect.addEventListener("change", () => {
  Object.assign(state, {
    role: roleSelect.value,
    page: 0,
    day: 0,
    institution:
      typeof demo !== "undefined"
        ? institutionList.find(
            (i) => i.id === demo.scope?.[roleSelect.value],
          ) || null
        : null,
    tab: "Umumiy holat",
    audit: "all",
    module: "",
  });
  $("#feedback").textContent = "";
  $(".role-picker").open = false;
  render();
});

$("#theme").addEventListener("click", (event) => {
  const night = document.documentElement.toggleAttribute("data-night");
  event.currentTarget.setAttribute("aria-pressed", String(night));
  event.currentTarget.setAttribute(
    "aria-label",
    night ? "Kunduzgi rejim" : "Tungi rejim",
  );
  event.currentTarget.innerHTML = glyph(night ? "sun" : "moon");
});
const mobileNavigation = matchMedia("(max-width:767px)");
const headerObserver = new ResizeObserver(([entry]) => {
  document.documentElement.style.setProperty(
    "--header-height",
    `${entry.target.getBoundingClientRect().height}px`,
  );
});
headerObserver.observe($(".top"));
function setSidebarOpen(open, restoreFocus = false) {
  $("#frame").classList.toggle("folded", !open);
  $("#toggle").setAttribute("aria-expanded", String(open));
  $("#main").inert = mobileNavigation.matches && open;
  if (restoreFocus) $("#toggle").focus();
}
$("#toggle").addEventListener("click", () => {
  const open = $("#frame").classList.contains("folded");
  setSidebarOpen(open);
  if (open && mobileNavigation.matches) $("#nav button")?.focus();
});
$(".rail-backdrop").addEventListener("click", () => setSidebarOpen(false, true));
$("#nav").addEventListener("click", (event) => {
  if (mobileNavigation.matches && event.target.closest("button"))
    setSidebarOpen(false, true);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileNavigation.matches && !modal.open)
    setSidebarOpen(false, true);
});
mobileNavigation.addEventListener("change", () => setSidebarOpen(!mobileNavigation.matches));
setSidebarOpen(!mobileNavigation.matches);
$("#inbox").addEventListener("click", showInbox);
document.addEventListener("input", (event) => {
  if (event.target.id === "menu-search") {
    const term = event.target.value.trim().toLocaleLowerCase("uz");
    $("#search-results")
      .querySelectorAll("button")
      .forEach((item) => {
        item.hidden = !item.textContent.toLocaleLowerCase("uz").includes(term);
      });
    $("#search-empty").hidden = Boolean(
      $("#search-results button:not([hidden])"),
    );
    return;
  }
  if (event.target.id !== "institution-search") return;
  const value = event.target.value.trim().toLocaleLowerCase("uz");
  workspace.querySelectorAll("tbody tr").forEach((row) => {
    row.hidden = !row.textContent.toLocaleLowerCase("uz").includes(value);
  });
});

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;
  const { action, value } = control.dataset;
  if (action === "detail") {
    const [title, text] = openers[Number(value)];
    show(title, `<p>${esc(text)}</p>`);
    return;
  }
  if (action === "compose") return composeRequest();
  if (action === "request") return openRequest(Number(value));
  if (action === "journal") return openJournal(value);
  if (action === "journal-today") return openJournal(value, 0);
  if (action === "role-picker") {
    $(".role-picker").open = true;
    roleSelect.focus();
    return;
  }
  if (action === "shortcuts") {
    show(
      "Tezkor amallar",
      `<div class="search-results">${roles[state.role].menu
        .slice(1)
        .map((label, index) => button(label, "menu", index + 1))
        .join("")}</div>`,
    );
    return;
  }
  if (action === "search") {
    show(
      "Bo‘limni qidirish",
      `<div class="stack"><input type="search" id="menu-search" aria-label="Bo‘lim nomi" placeholder="Bo‘lim nomini yozing"><div class="search-results" id="search-results">${roles[state.role].menu.map((label, index) => button(label, "menu", index)).join("")}</div><p id="search-empty" hidden>Bu nomdagi bo‘lim topilmadi.</p></div>`,
    );
    $("#menu-search").focus();
    return;
  }
  if (action === "language") {
    setLanguage(Number(value));
    $(".languages").open = false;
    $("#language").focus();
    $("#feedback").textContent =
      "Maketda til tugmasi va bayroqlar namoyish qilinadi. Sahifa matni o‘zbek tilida qoladi.";
    return;
  }
  $("#feedback").textContent = "";
  if (action === "day") state.day += Number(value);
  if (action === "audit") state.audit = value;
  if (action === "menu") {
    if (modal.open) modal.close();
    Object.assign(state, {
      page: Number(value),
      institution: null,
      day: 0,
      audit: "all",
    });
  }
  if (action === "institution")
    Object.assign(state, {
      institution: institutionList.find((inst) => inst.id === value),
      tab: "Umumiy holat",
    });
  if (action === "tab") state.tab = value;
  if (action === "return")
    Object.assign(state, {
      institution: null,
      tab: "Umumiy holat",
      page: state.role === "upvk" ? 0 : 1,
    });
  render();
  if (action === "day" || action === "audit") {
    (
      Array.from(workspace.querySelectorAll(`[data-action="${action}"]`)).find(
        (item) => item.dataset.value === value,
      ) || workspace.querySelector(`[data-action="${action}"]`)
    )?.focus();
  } else if (action === "tab") {
    workspace.querySelector("[aria-current]")?.focus();
  } else $(".titlebar h1").focus();
});

modal.addEventListener("submit", (event) => {
  if (event.target.id === "journal") {
    event.preventDefault();
    attendanceDraft.set(
      event.target.dataset.key,
      new FormData(event.target).get("attendance"),
    );
    modal.close();
    $("#feedback").textContent = "Davomat maketda saqlandi.";
    render();
    $(".titlebar h1").focus();
    return;
  }
  if (event.target.id !== "compose" && event.target.id !== "reply") return;
  event.preventDefault();
  const data = new FormData(event.target);
  const body = data.get("message").trim();
  if (event.target.id === "compose") {
    const title = data.get("title").trim();
    if (!title || !body) return;
    messages.unshift({
      id: Date.now(),
      institution: "AKT20261",
      title,
      body,
      status: "Yangi",
      unread: true,
      replies: [],
    });
    state.page = roles.institution.menu.indexOf("Murojaatlar");
    $("#feedback").textContent =
      "Murojaat maketda yuborildi. UPVK rolida bildirishnomani oching.";
  } else {
    const msg = messages.find(
      (item) => item.id === Number(event.target.dataset.id),
    );
    msg.status = data.get("status");
    if (body) msg.replies.push(body);
    $("#feedback").textContent = "Murojaat maketda yangilandi.";
  }
  modal.close();
  render();
  $(".titlebar h1").focus();
});

render();
