"use strict";

const teacherDemoDate = "2026-11-11";
const teacherProfile = {
  id: "teacher-demo", name: "Namunaviy o‘qituvchi", institution: "AKT",
  faculty: "Axborot texnologiyalari fakulteti", facultyDemo: true,
  department: "Raqamli texnologiyalar kafedrasi", position: "Pedagog",
  subjects: ["Axborot tizimlari", "Ma’lumotlar bazasi", "Lokal test fani", "Amaliy mashg‘ulot"],
};
const teacherUI = { task: "review", attendance: "day", date: teacherDemoDate, group: "all", ranking: teacherGroups[0].code };
const teacherAssignments = [
  { id:"task-1", title:"Mustaqil ish", group:"AT-3/3-26", due:"2026-11-18", submitted:5, review:3, graded:2, late:0 },
  { id:"task-2", title:"Amaliy topshiriq", group:"AT-3/4-26", due:"2026-11-10", submitted:4, review:2, graded:2, late:1 },
  { id:"task-3", title:"Ma’lumotlar modeli", group:"AT-3/5-26", due:"2026-11-20", submitted:3, review:1, graded:2, late:0 },
];
const teacherExams = [
  { id:"exam-1", subject:"Axborot tizimlari", group:"AT-3/3-26", date:"2026-11-16", time:"10:00", room:"204-xona" },
  { id:"exam-2", subject:"Ma’lumotlar bazasi", group:"AT-3/5-26", date:"2026-11-24", time:"09:00", room:"307-xona" },
  { id:"exam-3", subject:"Lokal test fani", group:"AT-3/3-26", date:"2026-11-10", time:"09:00", room:"307-xona" },
  { id:"exam-4", subject:"Axborot tizimlari", group:"AT-3/4-26", date:"2026-11-09", time:"11:00", room:"204-xona" },
];
const teacherGradeRecords = [
  { student:"Lokal test kursanti", group:"AT-3/3-26", subject:"Lokal test fani", score:86, exam:"exam-3", teacher:"teacher-demo", year:"2026 / 2027", semester:"Kuzgi semestr", published:true },
  { student:"Namunaviy kursant A", group:"AT-3/4-26", subject:"Axborot tizimlari", score:78, exam:"exam-4", teacher:"teacher-demo", year:"2026 / 2027", semester:"Kuzgi semestr", published:true },
];
const teacherAttendanceSeed = [
  ["2026-11-03","AT-3/3-26",8,0,2], ["2026-11-03","AT-3/4-26",9,1,0],
  ["2026-11-05","AT-3/3-26",7,1,2], ["2026-11-05","AT-3/5-26",8,1,1],
  ["2026-11-09","AT-3/3-26",7,0,3], ["2026-11-09","AT-3/4-26",9,0,1], ["2026-11-09","AT-3/5-26",9,1,0],
  ["2026-11-10","AT-3/3-26",9,0,1], ["2026-11-10","AT-3/4-26",8,1,1], ["2026-11-10","AT-3/5-26",9,0,1],
  ["2026-11-11","AT-3/3-26",8,1,1], ["2026-11-11","AT-3/4-26",9,0,1], ["2026-11-11","AT-3/5-26",8,1,1],
].map(([date,group,present,late,absent])=>({date,group,present,late,absent}));
const teacherNotices = [
  { id:"notice-1", title:"Oraliq nazorat", body:"Axborot tizimlari bo‘yicha oraliq nazoratga tayyorgarlik.", date:"2026-11-16", icon:"book", tone:"rose", unread:true },
  { id:"notice-2", title:"Jadval yangilandi", body:"Kuzgi semestrning yangilangan dars jadvali.", date:"2026-11-12", icon:"calendar", tone:"cyan", unread:true },
  { id:"notice-3", title:"Topshiriq muddati", body:"3-kurs mustaqil ishlarini topshirish muddati.", date:"2026-11-18", icon:"task", tone:"amber", unread:false },
];
const teacherCommunications = [
  { id:"comm-1", type:"announcement", from:"Kafedra", title:"Kafedra e’loni", body:"Oraliq nazoratga tayyorgarlik", date:"2026-11-11", unread:true, icon:"building", tone:"violet" },
  { id:"comm-2", type:"message", from:"Namunaviy pedagog", title:"Pedagog xabari", body:"Mustaqil ish bo‘yicha eslatma", date:"2026-11-10", unread:true, icon:"person", tone:"cyan" },
];
function teacherAssigned(group) { return teacherGroups.some(g=>g.code===group); }
function teacherGrades(group, exam) {
  return teacherGradeRecords.filter(r=>r.published && r.teacher===teacherProfile.id && teacherAssigned(r.group) && teacherProfile.subjects.includes(r.subject) && r.year===demo.year && r.semester===demo.semester && (!group || r.group===group) && (!exam || r.exam===exam));
}
function teacherMean(records) { return records.length ? Math.round(records.reduce((n,r)=>n+r.score,0)/records.length*10)/10 : null; }
function teacherTaskRecords() {
  return [...teacherAssignments, ...demo.submissions.filter(s=>s.role==="teacher" && s.kind==="create-task" && teacherAssigned(s.group)).map(s=>({id:String(s.id),title:s.title,group:s.group,due:s.date,submitted:0,review:0,graded:0,late:0}))];
}
function teacherAttendanceRecords() {
  const records = teacherAttendanceSeed.map(r=>({...r}));
  const status=attendanceDraft.get("0:09:00");
  if (status && status!=="Qatnashdi") { const r=records.find(r=>r.date===teacherDemoDate && r.group==="AT-3/3-26"); r.present--; r.absent++; }
  return records;
}
function teacherAttendanceTotals(records) {
  const t=records.reduce((s,r)=>({present:s.present+r.present,late:s.late+r.late,absent:s.absent+r.absent}),{present:0,late:0,absent:0});
  t.attended=t.present+t.late; t.total=t.attended+t.absent; t.percent=t.total ? Math.round(t.attended/t.total*100) : null; return t;
}
function teacherPeriod() {
  const start=parseDate(teacherUI.date), end=parseDate(teacherUI.date);
  if(teacherUI.attendance==="week") { start.setDate(start.getDate()-(start.getDay()+6)%7); end.setTime(start.getTime()); end.setDate(end.getDate()+6); }
  if(teacherUI.attendance==="month") { start.setDate(1); end.setMonth(end.getMonth()+1,0); }
  const dates=[]; for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)) dates.push(dateKey(d));
  const records=teacherAttendanceRecords().filter(r=>r.date>=dateKey(start)&&r.date<=dateKey(end)&&(teacherUI.group==="all"||r.group===teacherUI.group));
  return {start:dateKey(start),end:dateKey(end),dates,records,...teacherAttendanceTotals(records)};
}
function teacherReadSet(kind) { return Array.isArray(demo[kind]) ? demo[kind] : []; }
function teacherIsUnread(item,kind) { return item.unread && !teacherReadSet(kind).includes(item.id); }
const teacherMonths=['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'];
function teacherShortDate(value) { const [year,month,day]=value.split('-').map(Number); return `${day}-${teacherMonths[month-1]} ${year}`; }
