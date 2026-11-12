"use strict";

function verticalChart(title, labels, values, color = "") {
  return panel(
    title,
    `<div class="body"><div class="chart-legend"><span class="legend-dot ${color}"></span>Namunaviy qaydlar · foiz</div><div class="column-chart" role="img" aria-label="${esc(labels.map((l, i) => `${l}: ${values[i]}%`).join(", "))}">${labels.map((l, i) => `<div class="chart-column"><span>${values[i]}%</span><i class="${color}" style="height:${values[i]}%"></i><small>${esc(l)}</small></div>`).join("")}</div></div>`,
  );
}
function heatmap() {
  return panel(
    "Davomat issiqlik xaritasi",
    `<div class="body"><div class="heatmap-scroll"><div class="heatmap"><span></span>${Array.from({ length: 14 }, (_, i) => `<small>${i + 1}</small>`).join("")}${demoGroups
      .map(
        (g, j) =>
          `<strong>${g}</strong>${Array.from({ length: 14 }, (_, i) => {
            const v = 80 + ((i * 7 + j * 3) % 21);
            return `<span class="heat-cell level-${Math.floor((v - 80) / 7)}" title="${g} · ${i + 1}-noyabr · ${v}%" aria-label="${g}, ${i + 1}-noyabr, ${v}%">${v}</span>`;
          }).join("")}`,
      )
      .join(
        "",
      )}</div></div><div class="chart-legend">1–14 noyabr · <span class="legend-dot green"></span>90% va yuqori <span class="legend-dot amber"></span>90% dan past</div></div>`,
  );
}
function activityPanel() {
  const activity = [
    ...demo.activity.slice(0, 4),
    { title: "Davomat qayd etildi", meta: "Axborot tizimlari · 09:20" },
    { title: "Natijalar e’lon qilindi", meta: "Joriy semestr · 09:00" },
    { title: "Yangi o‘quv rejasi", meta: "Raqamli texnologiyalar · Kecha" },
  ];
  return panel(
    "Faoliyat tarixi",
    `<ol class="timeline body">${activity
      .slice(0, 7)
      .map(
        (a) =>
          `<li><strong>${esc(a.title)}</strong><small>${esc(a.meta)}</small></li>`,
      )
      .join("")}</ol>`,
  );
}
function miniCalendar() {
  return panel(
    "Kalendar",
    `<div class="event-list">${calendarEvents()
      .slice(0, 5)
      .map(
        (e) =>
          `<div class="event-row"><time><strong>${Number(e.date.slice(-2))}</strong><small>NOY</small></time><div><h3>${esc(e.title)}</h3><small>${esc(e.type)}</small></div></div>`,
      )
      .join("")}</div>`,
    "",
    moduleLink("academic-calendar", "Barchasi"),
  );
}
function notificationPanel() {
  return panel(
    "Bildirishnomalar",
    rows([
      ["Oraliq nazorat", "16-noyabr · Axborot tizimlari", "Ko‘rish"],
      ["Jadval yangilandi", "12-noyabr · Kuzgi semestr", "Ko‘rish"],
      ["Topshiriq muddati", "18-noyabr · 3-kurs", "Ko‘rish"],
    ]),
    "",
    button("Barchasi", "notifications"),
  );
}
function taskPanel(learner) {
  const tasks = learner
    ? [
        ["Mustaqil ish", "Axborot tizimlari · 18-noyabrgacha", "Topshirish"],
        [
          "Ma’lumotlar modeli",
          "Ma’lumotlar bazasi · 20-noyabrgacha",
          "Topshirish",
        ],
        [
          "Amaliy topshiriq",
          "Tarmoq xavfsizligi · 23-noyabrgacha",
          "Topshirish",
        ],
      ]
    : [
        ["Mustaqil ish", "AT-3/3-26 · 3 ta ish tekshirilmagan", "Baholash"],
        ["Amaliy topshiriq", "AT-3/4-26 · 2 ta ish tekshirilmagan", "Baholash"],
        [
          "Ma’lumotlar modeli",
          "AT-3/5-26 · 1 ta ish tekshirilmagan",
          "Baholash",
        ],
      ];
  return panel(
    "Topshiriqlar",
    `<div class="task-tabs"><span class="active">Joriy</span><span>${demo.submissions.filter((s) => s.role === state.role).length} ta saqlangan</span></div>${tasks.map(([title, meta, action]) => `<div class="row"><span class="stat-icon amber">${glyph("task")}</span><div class="grow"><h3>${title}</h3><small>${meta}</small></div>${button(action, learner ? "submit-task" : "grade-task", title)}</div>`).join("")}`,
    "",
    learner ? "" : button("Topshiriq yaratish", "create-task", "", "primary"),
  );
}
function examsPanel() {
  return panel(
    "Imtihonlar va baholash",
    `<div class="body"><div class="mini-stat-grid">${metric("E’lon qilingan", "2", "Joriy semestr")}${metric("O‘rtacha", "82 / 100", "2 ta sintetik qayd")}</div></div>${rows(
      [
        ["Axborot tizimlari", "16-noyabr · 10:00 · 204-xona", "Tafsilot"],
        ["Ma’lumotlar bazasi", "24-noyabr · 09:00 · 307-xona", "Tafsilot"],
      ],
    )}`,
    "",
    button("Natijalar", "results"),
  );
}
function communicationPanel() {
  const sent = demo.submissions.filter(
    (s) => s.role === state.role && s.kind === "message",
  );
  return panel(
    "Muloqot",
    `<div class="body"><div class="mini-stat-grid">${metric("Yuborilgan", sent.length, "Demo xabarlar")}${metric("Qabul qiluvchi", state.role === "learner" ? "Pedagog" : "Kafedra", "Ichki muloqot")}</div></div>${rows(
      [
        ["Kafedra e’loni", "Oraliq nazoratga tayyorgarlik", "Ko‘rish"],
        ["Pedagog xabari", "Mustaqil ish bo‘yicha eslatma", "Ko‘rish"],
      ],
    )}<div class="foot">${button("Xabar yuborish", "send-message", "", "primary")}</div>`,
  );
}
function achievementsPanel() {
  return panel(
    "Yutuqlar",
    `<div class="body achievement-grid">${[
      ["book", "Faol o‘quvchi", "12 ta resurs"],
      ["check", "Davomat", "4 / 5 dars"],
      ["task", "Mustaqil ish", "O‘z vaqtida"],
      ["chart", "O‘sish", "+8 ball"],
      ["journal", "Yakunlangan", "2 ta modul"],
      ["group", "Hamkorlik", "Guruh ishi"],
    ]
      .map(
        ([icon, name, meta], i) =>
          `<div><span class="stat-icon ${["amber", "green", "", "violet", "cyan", "rose"][i]}">${glyph(icon)}</span><strong>${name}</strong><small>${meta}</small></div>`,
      )
      .join("")}</div>`,
  );
}
function attendanceCenter(learner) {
  return panel(
    "Davomat markazi",
    `<div class="body">${bars(
      learner
        ? [
            ["Shaxsiy davomat · 4 / 5", 80],
            ["O‘tgan hafta · 9 / 10", 90],
            ["Reja bajarilishi · 8 / 10", 80],
          ]
        : [
            ["AT-3/3-26 · 13 / 15", 87],
            ["AT-3/4-26 · 13 / 14", 93],
            ["AT-3/5-26 · 14 / 16", 88],
          ],
      "%",
    )}<div class="attendance-days">${Array.from({ length: 20 }, (_, i) => `<span class="${i % 7 === 0 ? "absent" : "present"}" title="${i + 1}-noyabr">${i + 1}</span>`).join("")}</div><p class="muted">${learner ? "Shaxsiy demo qaydlar" : "Biriktirilgan guruhlar"} · holat yozuvlarda ham ko‘rsatilgan.</p></div>`,
    "",
    learner
      ? button("Ruxsat so‘rash", "request-leave")
      : button("Davomat qaydi", "journal-today", "09:00", "primary"),
  );
}
function studentResults() {
  const sorted = [...subjectResults].sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
  const passed = subjectResults.filter(row => parseInt(row[1]) >= 60).length;
  return panel(
    "Fanlar bo‘yicha natijalar",
    `<div class="body academic-results">
      <section class="academic-summary" aria-label="Umumiy o‘quv natijasi"><span class="dial" style="--value:${averageResult()}"><b>${averageResult()}</b></span><strong>O‘rtacha natija / 100</strong><small>E’lon qilingan demo baholar</small><div class="academic-summary-stats"><div><b>${subjectResults.length}</b><small>Baholangan fan</small></div><div><b>${passed} / ${subjectResults.length}</b><small>60 balldan yuqori</small></div><div><b>80%</b><small>Davomat</small></div><div><b>3-kurs</b><small>AT-3/3-26</small></div></div><p class="muted">Baholanmagan fanlar o‘rtacha natijaga kiritilmaydi.</p></section>
      <div class="academic-subjects"><small class="academic-eyebrow">${glyph("book")} FANLAR KESIMIDA</small>${subjectResults.map(([name, score, status], i) => `<article class="subject-result ${i % 2 ? "blue" : "green"}"><span class="stat-icon">${glyph("book")}</span><div><div class="subject-result-title"><h3>${esc(name)}</h3><strong>${esc(score)}</strong></div><progress value="${parseInt(score)}" max="100" aria-label="${esc(name)}: ${esc(score)}"></progress><small>${esc(status)}</small></div></article>`).join("")}<div class="subject-highlights"><div><small>ENG YUQORI NATIJA</small><strong>${esc(sorted[0]?.[0] || "—")}</strong></div><div><small>TAKRORLASH UCHUN</small><strong>${esc(sorted.at(-1)?.[0] || "—")}</strong></div></div><div class="study-note">${glyph("task")} O‘quv tavsiyasi: ${esc(sorted.at(-1)?.[0] || "fanlar")} bo‘yicha mustaqil ishni takrorlang.</div></div>
      <div class="academic-trend"><small class="academic-eyebrow">${glyph("chart")} O‘SISH DINAMIKASI</small><div class="trend-current"><strong>${averageResult()}<small> / 100</small></strong><span>Noyabr · demo natija</span></div><div class="result-columns" role="img" aria-label="Demo oylik natijalar: sentabr 74, oktabr 78, noyabr ${averageResult()}">${[["Sent.",74],["Okt.",78],["Noy.",averageResult()]].map(([label, score]) => `<div><b>${score}</b><i style="height:${score}px"></i><small>${label}</small></div>`).join("")}</div><div class="study-note green">${glyph("chart")} Sentabrdan +${averageResult() - 74} ball</div><small class="muted">Sintetik oylik ko‘rsatkichlar</small></div>
    </div>`,
    "student-performance",
    button("To‘liq natijalar", "results"),
    "chart",
  );
}
function dashboardSections() {
  if (state.role === "teacher")
    return stack(
      grid(taskPanel(false), examsPanel(), "schedule-side"),
      grid(attendanceCenter(false), communicationPanel(), "pair"),
      grid(
        panel(
          "Kursantlar natijalari",
          rows([
            ["Lokal test kursanti", "AT-3/3-26 · 86 / 100", "Tafsilot"],
            ["Namunaviy kursant A", "AT-3/4-26 · 78 / 100", "Tafsilot"],
            [
              "Namunaviy kursant B",
              "AT-3/5-26 · Baholar e’lon qilinmagan",
              "Tafsilot",
            ],
          ]),
        ),
        achievementsPanel(),
        "pair",
      ),
      `<div class="three-columns">${miniCalendar()}${activityPanel()}${notificationPanel()}</div>`,
    );
  if (state.role === "learner")
    return stack(
      studentResults(),
      grid(taskPanel(true), examsPanel(), "schedule-side"),
      grid(
        attendanceCenter(true),
        panel(
          "O‘qish jarayoni",
          bars(
            [
              ["O‘quv modullari · 8 / 10", 80],
              ["Mustaqil ishlar · 3 / 4", 75],
              ["Amaliy mashg‘ulot · 9 / 10", 90],
            ],
            "%",
          ),
        ),
        "pair",
      ),
      grid(
        panel(
          "O‘quv maqsadlari",
          rows([
            ["Mustaqil ishni yakunlash", "18-noyabrgacha", "Ko‘rish"],
            [
              "Oraliq nazoratga tayyorgarlik",
              "Axborot tizimlari · 16-noyabr",
              "Ko‘rish",
            ],
          ]),
        ),
        achievementsPanel(),
        "pair",
      ),
      grid(
        communicationPanel(),
        panel(
          "Pedagoglar va kutubxona",
          rows([
            ["Namunaviy o‘qituvchi", "Axborot tizimlari", "Tafsilot"],
            ["Namunaviy pedagog", "Ma’lumotlar bazasi", "Tafsilot"],
          ]) +
            `<div class="foot">${button("Kutubxonani ochish", "library")}${button("Pedagogga xabar", "send-message")}</div>`,
        ),
        "pair",
      ),
      `<div class="three-columns">${miniCalendar()}${activityPanel()}${notificationPanel()}</div>`,
    );
  if (state.role === "institution")
    return stack(
      grid(
        heatmap(),
        verticalChart(
          "Semestr davomati",
          ["Sent.", "Okt.", "Noy.", "Dek."],
          [90, 92, 94, 96],
          "green",
        ),
        "pair",
      ),
      `<div class="three-columns">${activityPanel()}${notificationPanel()}${panel(
        "O‘sish ko‘rsatkichlari",
        bars(
          [
            ["Davomat", 94],
            ["O‘rtacha baho", 82],
            ["Fan bilan qamrov", 91],
          ],
          "%",
        ),
      )}</div>`,
      grid(
        verticalChart(
          "O‘quv resurslaridan foydalanish",
          ["1-kurs", "3-kurs", "5-kurs"],
          [68, 86, 75],
        ),
        panel(
          "Ommabop o‘quv resurslari",
          rows([
            [
              "Axborot tizimlari asoslari",
              "O‘quv qo‘llanma · 84 marta",
              "Ko‘rish",
            ],
            ["Tarmoq xavfsizligi", "Amaliy qo‘llanma · 62 marta", "Ko‘rish"],
            ["Ma’lumotlar bazasi", "Mustaqil ish · 47 marta", "Ko‘rish"],
          ]),
        ),
        "pair",
      ),
      grid(
        panel(
          "Resurs toifalari",
          bars(
            [
              ["O‘quv qo‘llanmalar", 55],
              ["Amaliy ishlar", 30],
              ["Me’yoriy hujjatlar", 15],
            ],
            "%",
          ),
        ),
        panel(
          "Semestr holati",
          rows([
            ["Fanlar biriktirildi", "31 / 33 guruh", "Ko‘rish"],
            ["Pedagoglar biriktirildi", "32 / 33 guruh", "Ko‘rish"],
            ["Jadval e’lon qilindi", "Joriy semestr", "Ko‘rish"],
          ]),
        ),
        "pair",
      ),
    );
  return "";
}
