"use strict";

function teacherStat(label,value,icon,action,tone="") {
  return `<button type="button" class="stat-card" data-action="teacher-widget" data-value="${action}"><span class="stat-icon ${tone}">${glyph(icon)}</span><span><strong>${esc(value)}</strong><small>${esc(label)}</small></span></button>`;
}
function teacherWelcome() {
  const lessons=days[0].lessons, attendance=teacherAttendanceTotals(teacherAttendanceRecords().filter(r=>r.date===teacherDemoDate));
  const minutes=lessons.reduce((sum,[start,end])=>sum+Number(end.slice(0,2))*60+Number(end.slice(3))-Number(start.slice(0,2))*60-Number(start.slice(3)),0);
  const duration=`${Math.floor(minutes/60)} soat ${minutes%60} daq.`, tasks=teacherTaskRecords();
  const summary=[['Bugungi darslar',lessons.length,'calendar','today'],['Dars vaqti',duration,'clock','duration','cyan'],['Oldindagi darslar',lessons.filter(l=>['Navbatdagi dars','Rejalashtirilgan'].includes(l[4])).length,'book','next','amber'],['Qaydlar bo‘yicha',`${attendance.percent}%`,'check','attendance','green'],['Biriktirilgan guruhlar',teacherGroups.length,'group','groups'],['Fanlar',teacherProfile.subjects.length,'journal','subjects','violet']];
  const metrics=[['Bugungi darslar',lessons.length,'book','today'],['Qatnashganlar',attendance.attended,'group','present','green'],['Qatnashmaganlar',attendance.absent,'person','absent','rose'],['Tekshiriladigan ishlar',tasks.filter(t=>t.review>0).length,'task','review','amber'],['Topshirilgan ishlar',tasks.reduce((n,t)=>n+t.submitted,0),'check','submitted'],['Kelgusi nazoratlar',teacherExams.filter(e=>e.date>teacherDemoDate).length,'journal','upcoming-exams','violet'],['Davomat qaydi kerak',attendanceDraft.has('0:09:00')?0:1,'calendar','missing-attendance','rose'],['O‘tilgan dars',lessons.filter(l=>l[4]==='O‘tildi').length,'check','completed','amber'],['Guruhlar davomati',`${attendance.percent}%`,'chart','attendance','cyan'],['Dars vaqti',duration,'clock','duration']];
  const chips=[['building','Muassasa',teacherProfile.institution],['group','Fakultet',`${teacherProfile.faculty} · demo`],['person','Lavozim',teacherProfile.position],['book','Fanlar',`${teacherProfile.subjects[0]} +${teacherProfile.subjects.length-1}`]];
  return `<div class="overview teacher-overview"><section class="welcome teacher-welcome"><div class="welcome-head"><div class="welcome-person"><span class="avatar-symbol">${glyph('person')}</span><div><small class="teacher-greeting">Xayrli kun</small><h2>${esc(teacherProfile.name)}</h2><div class="teacher-profile-chips">${chips.map(([icon,label,value])=>`<span title="${esc(label==='Fanlar'?teacherProfile.subjects.join(', '):label+': '+value)}">${glyph(icon)}<span><span class="sr-only">${label}: </span>${esc(value)}</span></span>`).join('')}</div><small class="teacher-department">Kafedra: ${esc(teacherProfile.department)}</small></div></div><div class="teacher-clock"><time id="teacher-clock"></time><small id="teacher-date"></small>${pill('Holat noma’lum')}<small>Hisobot: 11-noyabr 2026 · demo</small></div></div><div class="stats-strip hero-strip">${summary.map(x=>teacherStat(...x)).join('')}</div><div class="quick"><span class="label">Tezkor amallar</span>${quickAction('check','Davomatni qayd etish','journal-today','09:00','primary')}${quickAction('book','Navbatdagi dars','teacher-widget','next')}${quickAction('task','Topshiriqlarni tekshirish','teacher-open-tasks','review')}${quickAction('journal','Jurnalni ochish','menu',2)}${quickAction('calendar','To‘liq jadval','menu',1)}</div></section><div class="stats-strip metric-grid">${metrics.map(x=>teacherStat(...x)).join('')}</div></div>`;
}
function updateTeacherClock() {
  const clock=document.getElementById('teacher-clock'); if(!clock) return;
  const now=new Date(); clock.dateTime=now.toISOString(); clock.textContent=new Intl.DateTimeFormat('uz-Latn',{timeZone:'Asia/Tashkent',hour:'2-digit',minute:'2-digit'}).format(now);
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tashkent',weekday:'long',day:'numeric',month:'2-digit',year:'numeric'}).formatToParts(now).map(p=>[p.type,p.value]));
  const weekdays={Monday:'Dushanba',Tuesday:'Seshanba',Wednesday:'Chorshanba',Thursday:'Payshanba',Friday:'Juma',Saturday:'Shanba',Sunday:'Yakshanba'};
  document.getElementById('teacher-date').textContent=`${weekdays[parts.weekday]}, ${Number(parts.day)}-${teacherMonths[Number(parts.month)-1]} ${parts.year} · Toshkent`;
}
setInterval(updateTeacherClock,1000);
function teacherTabs(action,items,selected,id) {
  return `<div class="teacher-tabs" role="tablist" aria-label="${id==='teacher-task'?'Topshiriq holati':id==='teacher-attendance'?'Davomat davri':'Kursantlar guruhi'}">${items.map(([value,label])=>`<button type="button" role="tab" id="${id}-${esc(value)}" aria-selected="${selected===value}" aria-controls="${id}-content" tabindex="${selected===value?0:-1}" data-action="${action}" data-value="${esc(value)}">${esc(label)}</button>`).join('')}</div>`;
}
function teacherCompactCard(icon,tone,title,meta,end='',extra='') {
  return `<article class="teacher-card"><span class="stat-icon ${tone}">${glyph(icon)}</span><div class="teacher-card-copy"><h3>${esc(title)}</h3><small>${esc(meta)}</small>${extra}</div>${end?`<div class="teacher-card-end">${end}</div>`:''}</article>`;
}
function teacherTaskCards(tasks,mode='review') {
  const filtered=tasks.filter(t=>mode==='deadlines'||mode==='submitted'&&t.submitted>0||mode==='review'&&t.review>0||mode==='late'&&(t.late>0||t.due<teacherDemoDate&&t.submitted===0)||mode==='graded'&&t.graded>0).sort((a,b)=>a.due.localeCompare(b.due));
  return filtered.length ? filtered.map(t=>teacherCompactCard('task','amber',t.title,`${t.group} · ${t.submitted} ta ish yuborilgan`,pill(mode==='review'?`${t.review} ta kutilmoqda`:mode==='graded'?`${t.graded} ta baholangan`:mode==='late'?'Kechikkan':mode==='submitted'?'Yuborildi':'Muddat',mode==='late'?'rose':'amber')+`<small>${esc(teacherShortDate(t.due))}</small>`)).join('') : empty('Bu holatda topshiriq yo‘q','Boshqa tabni tanlang.');
}
function teacherTaskPanel() {
  const items=[['review','Ko‘rib chiqish kutilmoqda'],['submitted','Yuborildi'],['late','Kechikkan'],['deadlines','Muddatlar'],['graded','Baholangan']];
  return panel('Topshiriqlar',teacherTabs('teacher-task-tab',items,teacherUI.task,'teacher-task')+`<div id="teacher-task-content" role="tabpanel" aria-labelledby="teacher-task-${teacherUI.task}" class="teacher-card-list">${teacherTaskCards(teacherTaskRecords(),teacherUI.task)}</div>`,'teacher-tasks',quickAction('plus','Topshiriq yaratish','create-task','','primary'),'task');
}
function teacherExamCards(exams) {
  return exams.length?exams.map(e=>{const records=teacherGrades(e.group,e.id),past=e.date<=teacherDemoDate; return teacherCompactCard('book',past?'green':'violet',e.subject,e.group,pill(past?'O‘tkazilgan':teacherShortDate(e.date),past?'green':'amber'),`<small>${past?records.length?`${records.length} ta e’lon qilingan natija · o‘rtacha ${teacherMean(records)} / 100`:'Natija e’lon qilinmagan':`${e.time} · ${esc(e.room)}`}</small>${button('Tafsilot →','teacher-exam',e.id,'text-link')}`)}).join(''):empty('Imtihon yo‘q','Bu bo‘limda demo qayd yo‘q.');
}
function teacherExamsPanel() {
  const grades=teacherGrades(),upcoming=teacherExams.filter(e=>teacherAssigned(e.group)&&e.date>teacherDemoDate),past=teacherExams.filter(e=>teacherAssigned(e.group)&&e.date<=teacherDemoDate);
  return panel('Imtihonlar va baholash',`<div class="body"><div class="mini-stat-grid">${metric('Yaqinlashayotgan imtihonlar',upcoming.length,'Demo taqvim')}${metric('O‘tkazilgan imtihonlar',past.length,'Demo taqvim')}${metric('O‘rtacha ball',teacherMean(grades)===null?'—':teacherMean(grades)+' / 100','E’lon qilingan baholar')}${metric('Natijasi e’lon qilingan guruhlar',new Set(grades.map(r=>r.group)).size,'Biriktirilgan guruhlar')}</div><h3 class="teacher-subtitle">Yaqinlashayotgan imtihonlar</h3>${teacherExamCards(upcoming)}<h3 class="teacher-subtitle">O‘tkazilgan imtihonlar</h3>${teacherExamCards(past)}</div>`,'teacher-exams',button('Natijalar va hisobotlar →','results','','text-link'),'book');
}
function teacherAttendancePanel() {
  const p=teacherPeriod();
  const summary=p.total?`<div class="teacher-attendance-total"><strong>${p.percent}%</strong><span>${p.total} ta qayd · ${p.attended} qatnashgan</span><progress value="${p.percent}" max="100" aria-label="Tanlangan davr davomati ${p.percent}%"></progress></div><div class="teacher-counts">${metric('Qatnashganlar',p.attended,'Kechikkanlar ham kiradi')}${metric('Kechikkanlar',p.late,'Qatnashganlar ichida')}${metric('Kelmaganlar',p.absent,'Qayd mavjud')}</div>`:empty('Bu davr uchun davomat qaydi yo‘q','Qayd yo‘q kunlar kelmagan kun sifatida hisoblanmaydi.');
  let breakdown='';
  if(teacherUI.attendance==='month') breakdown=`<div class="teacher-heatmap" aria-label="Oylik davomat">${p.dates.map(date=>{const t=teacherAttendanceTotals(p.records.filter(r=>r.date===date));const tone=t.total?t.attended===0?'absent':t.percent>=90?'high':'low':'no-record';return `<span class="${tone}" tabindex="0" title="${date}: ${t.total?`${t.percent}% · ${t.attended}/${t.total}`:'Qayd yo‘q'}" aria-label="${date}: ${t.total?`${t.percent} foiz, ${t.absent} kelmagan`:'Qayd yo‘q'}">${Number(date.slice(-2))}</span>`}).join('')}</div><div class="heatmap-legend"><span><i class="high"></i>90% va yuqori</span><span><i class="low"></i>1–89%</span><span><i class="absent"></i>0% · kelmagan</span><span><i class="no-record"></i>Qayd yo‘q</span></div>`;
  else if(teacherUI.attendance==='week') breakdown=p.dates.map(date=>{const t=teacherAttendanceTotals(p.records.filter(r=>r.date===date));return `<div class="teacher-period-row"><span>${esc(teacherShortDate(date))}</span><strong>${t.total?t.percent+'%':'Qayd yo‘q'}</strong><small>${t.total?`${t.attended} qatnashgan · ${t.late} kechikkan · ${t.absent} kelmagan`:''}</small></div>`}).join('');
  else breakdown=p.records.map(r=>{const t=teacherAttendanceTotals([r]);return `<div class="teacher-period-row"><span>${r.group}</span><strong>${t.percent}%</strong><small>${t.attended} qatnashgan · ${t.late} kechikkan · ${t.absent} kelmagan</small></div>`}).join('');
  return panel('Davomat markazi',teacherTabs('teacher-period',[['day','Kunlik'],['week','Haftalik'],['month','Oylik']],teacherUI.attendance,'teacher-attendance')+`<div class="body"><div class="teacher-filters">${field('Sana',`<input id="teacher-attendance-date" type="date" value="${teacherUI.date}" required>`)}${field('Guruh',selectInput('attendance-group',[['all','Barcha biriktirilgan guruhlar'],...teacherGroups.map(g=>[g.code,g.code])],teacherUI.group,'id="teacher-attendance-group"'))}</div><div id="teacher-attendance-content" role="tabpanel" aria-labelledby="teacher-attendance-${teacherUI.attendance}"><h3 class="teacher-subtitle">${esc(teacherShortDate(p.start))}${p.end!==p.start?' — '+esc(teacherShortDate(p.end)):''}</h3>${summary}${breakdown}<p class="muted teacher-footnote">${teacherUI.attendance==='week'?'Hafta':teacherUI.attendance==='month'?'Oy':'Kun'} yakuni · ${p.total} ta sintetik davomat qaydi. Qayd yo‘q kunlar hisobga olinmaydi.</p></div></div>`,'teacher-attendance',button('Davomat qaydi','journal-today','09:00','primary'),'check');
}
function teacherRankings() {
  const grouped=new Map(); teacherGrades(teacherUI.ranking).forEach(r=>{const list=grouped.get(r.student)||[];list.push(r);grouped.set(r.student,list)});
  const ranked=[...grouped].map(([name,records])=>({name,average:teacherMean(records)})).sort((a,b)=>b.average-a.average||a.name.localeCompare(b.name)).slice(0,3);
  return panel('Kursantlar natijalari',teacherTabs('teacher-rank',teacherGroups.map(g=>[g.code,g.code]),teacherUI.ranking,'teacher-ranking')+`<div class="teacher-card-list" id="teacher-ranking-content" role="tabpanel" aria-labelledby="teacher-ranking-${teacherUI.ranking}">${ranked.length?ranked.map((r,i)=>`<article class="teacher-card"><span class="rank-number">${i+1}</span><span class="initial-avatar">${esc(r.name.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase())}</span><div class="teacher-card-copy"><h3>${esc(r.name)}</h3><small>${teacherUI.ranking}</small></div><strong>${r.average} / 100</strong></article>`).join(''):empty('Bu guruhda baholar hali e’lon qilinmagan','Faqat joriy semestrning e’lon qilingan baholari olinadi.')}<p class="teacher-footnote muted">Joriy semestr · o‘qituvchining fanlari · eng yuqori 3 natijagacha</p></div>`,'teacher-rankings','','group');
}
function teacherCommunicationPanel() {
  const sent=demo.submissions.filter(s=>s.role==='teacher'&&s.kind==='message');
  const cards=items=>items.map(m=>teacherCompactCard(m.icon,m.tone,m.from,`${m.title} · ${m.body}`,pill(teacherIsUnread(m,'teacherReadMessages')?'Yangi':'O‘qilgan',teacherIsUnread(m,'teacherReadMessages')?'rose':'')+`<small>${esc(teacherShortDate(m.date))}</small>`,button('Ko‘rish','teacher-message',m.id,'text-link'))).join('');
  return panel('Muloqot',`<div class="body"><div class="mini-stat-grid">${metric('O‘qilmagan',teacherCommunications.filter(m=>teacherIsUnread(m,'teacherReadMessages')).length,'Kafedra va pedagoglardan')}${metric('Yuborilgan',sent.length,'Shu brauzerdagi demo xabarlar')}</div><h3 class="teacher-subtitle">So‘nggi xabarlar</h3>${cards(teacherCommunications.filter(m=>m.type==='message'))}${sent.slice(-3).reverse().map(s=>teacherCompactCard('mail','green',s.title,`${s.recipient} · ${s.body}`,pill('Yuborilgan','green'),button('Ko‘rish','teacher-sent',s.id,'text-link'))).join('')}<h3 class="teacher-subtitle">E’lonlar</h3>${cards(teacherCommunications.filter(m=>m.type==='announcement'))}<div class="teacher-panel-footer">${quickAction('mail','Xabar yuborish','send-message','','primary')}</div></div>`,'teacher-communication','','mail');
}
function teacherCalendarPanel() {
  const tones={'Yig‘ilish':'','Imtihon':'violet','Topshiriq':'amber','Tadbir':'green'};
  return panel('Taqvim',`<div class="body">${calendarEvents().slice().sort((a,b)=>a.date.localeCompare(b.date)).slice(0,6).map(e=>`<button class="teacher-calendar-row" data-action="event-detail" data-value="${esc(e.title)}"><time class="stat-icon ${tones[e.type]||''}" datetime="${e.date}"><strong>${Number(e.date.slice(-2))}</strong><small>${esc(teacherMonths[Number(e.date.slice(5,7))-1].slice(0,3))}</small></time><span><strong>${esc(e.title)}</strong><small>${esc(e.type)}</small></span>${e.date===teacherDemoDate?pill('Bugun','amber'):''}</button>`).join('')}</div>`,'',moduleLink('academic-calendar','Ko‘rish'),'calendar');
}
function teacherActivityPanel() {
  const activity=[...demo.activity.slice(0,4),{title:'Davomat qayd etildi',meta:'Axborot tizimlari · 09:20'},{title:'Natijalar e’lon qilindi',meta:'Joriy semestr · 09:00'},{title:'Yangi o‘quv rejasi',meta:'Raqamli texnologiyalar · Kecha'}];
  return panel('Faoliyat tarixi',`<ol class="teacher-timeline body">${activity.map(a=>{const [icon,tone]=/davomat/i.test(a.title)?['check','green']:/natija|baho/i.test(a.title)?['chart','violet']:['journal','cyan'];const pieces=a.meta.split(' · ');return `<li><span class="stat-icon ${tone}">${glyph(icon)}</span><div><h3>${esc(a.title)}</h3><small>${esc(pieces.slice(0,-1).join(' · '))}</small></div><time>${esc(pieces.at(-1))}</time></li>`}).join('')}</ol>`,'','','chart');
}
function teacherNoticeCards() {
  return teacherNotices.map(n=>`<button class="teacher-card teacher-notice" data-action="teacher-notice" data-value="${n.id}"><span class="stat-icon ${n.tone}">${glyph(n.icon)}</span><span class="teacher-card-copy"><strong>${esc(n.title)}</strong><small>${esc(n.body)} · ${esc(teacherShortDate(n.date))}</small></span>${teacherIsUnread(n,'teacherReadNotices')?'<span class="unread-dot" aria-label="O‘qilmagan"></span>':''}</button>`).join('');
}
function teacherNotificationsPanel() {
  const count=teacherNotices.filter(n=>teacherIsUnread(n,'teacherReadNotices')).length;
  return panel('Bildirishnomalar',`<div class="body">${teacherNoticeCards()}</div>`,'',button(`Barchasini ko‘rish · ${count}`,'teacher-notices','','text-link'),'bell');
}
function teacherSections() {
  return stack(grid(teacherTaskPanel(),teacherExamsPanel(),'schedule-side'),grid(teacherAttendancePanel(),teacherCommunicationPanel(),'pair'),grid(teacherRankings(),achievementsPanel(),'pair'),`<div class="three-columns teacher-bottom">${teacherCalendarPanel()}${teacherActivityPanel()}${teacherNotificationsPanel()}</div>`);
}
function teacherLessonCards(lessons) {
  return lessons.length?`<div class="teacher-lesson-list">${lessons.map(([start,end,title,meta,status])=>`<article class="time-row ${status==='O‘tildi'?'done':status==='Joriy dars'?'current':status==='Navbatdagi dars'?'featured':'planned'}"><time>${start}<small>${Number(end.slice(0,2))*60+Number(end.slice(3))-Number(start.slice(0,2))*60-Number(start.slice(3))} daqiqa</small></time><div class="lesson-info"><h3>${esc(title)}</h3><small>${glyph('group')} ${esc(meta)}</small></div><div class="lesson-actions">${pill(status,status==='O‘tildi'?'green':status==='Joriy dars'?'rose':'amber')}${status==='O‘tildi'?button('Davomat','journal-today',start):''}</div></article>`).join('')}</div>`:empty('Dars yo‘q','Bu holatda demo dars qaydi yo‘q.');
}
function teacherWidgetModal(key) {
  const today=days[0].lessons, tasks=teacherTaskRecords(); let title='',body='',icon='chart';
  if(['today','duration','next','completed','missing-attendance'].includes(key)) {
    title={today:'Bugungi darslar',duration:'Dars vaqti',next:'Oldindagi darslar',completed:'O‘tilgan darslar','missing-attendance':'Davomat qaydi kerak'}[key]; icon='calendar';
    const selected=today.filter(l=>key==='completed'?l[4]==='O‘tildi':key==='next'?['Navbatdagi dars','Rejalashtirilgan'].includes(l[4]):key==='missing-attendance'?l[0]==='09:00'&&!attendanceDraft.has('0:09:00'):true);
    body=`<p class="teacher-footnote muted">11-noyabr 2026 · demo jadval</p>${teacherLessonCards(selected)}<div class="teacher-modal-footer">${button('To‘liq jadval','menu',1)}${button('Yopish','teacher-close','','primary')}</div>`;
  } else if(['present','absent','attendance'].includes(key)) {
    title={present:'Qatnashganlar',absent:'Qatnashmaganlar',attendance:'Guruhlar davomati'}[key];
    body=teacherAttendanceRecords().filter(r=>r.date===teacherDemoDate).map(r=>{const t=teacherAttendanceTotals([r]);return teacherCompactCard('group',key==='absent'?'rose':'green',r.group,`${t.total} ta qayd · 11-noyabr`,pill(key==='present'?`${t.attended} qatnashgan`:key==='absent'?`${t.absent} kelmagan`:`${t.percent}%`,key==='absent'?'rose':'green'))}).join('')+'<p class="muted teacher-footnote">Guruhlar kesimidagi sintetik qaydlar. Shaxsiy ro‘yxat mavjud emas.</p>';
  } else if(['review','submitted'].includes(key)) { title=key==='review'?'Tekshiriladigan ishlar':'Topshirilgan ishlar';icon='task';body=teacherTaskCards(tasks,key); }
  else if(key==='upcoming-exams') {title='Kelgusi nazoratlar';icon='book';body=teacherExamCards(teacherExams.filter(e=>e.date>teacherDemoDate));}
  else if(key==='groups') {title='Biriktirilgan guruhlar';icon='group';body=teacherGroups.map(g=>teacherCompactCard('group',g.color,g.code,g.subject,pill(`${g.count} kursant`))).join('');}
  else if(key==='subjects') {title='O‘qitadigan fanlar';icon='book';body=teacherProfile.subjects.map(s=>teacherCompactCard('book','',s,'Namunaviy o‘qituvchi')).join('');}
  if(!title) return; show(title,body); modal.classList.add('teacher-modal');document.getElementById('dialog-title').insertAdjacentHTML('afterbegin',glyph(icon)+' ');
}
function teacherReports(group='') {
  const records=teacherGrades(group);
  const html=(group?teacherGroups.filter(g=>g.code===group):teacherGroups).map(g=>{const values=records.filter(r=>r.group===g.code);return `<h3 class="teacher-subtitle">${g.code}</h3>${values.length?values.map(r=>teacherCompactCard('chart','green',r.student,r.subject,pill(`${r.score} / 100`,'green'))).join(''):empty('Bu guruhda baholar hali e’lon qilinmagan','Joriy semestr bo‘yicha.')}`}).join('');
  show('Natijalar va hisobotlar',html+'<p class="teacher-footnote muted">Faqat biriktirilgan guruhlar va o‘qituvchi fanlari · joriy semestr</p>');
}
function refreshTeacher(action,value) {
  const top=scrollY; render(); window.scrollTo({top,behavior:'instant'});
  [...document.querySelectorAll('[data-action]')].find(e=>!modal.contains(e)&&e.dataset.action===action&&e.dataset.value===value)?.focus({preventScroll:true});
}
function handleTeacherAction(action,value,control) {
  if(action==='teacher-close'){modal.close();return true;}
  if(state.role!=='teacher') return false;
  if(action==='teacher-widget') {teacherWidgetModal(value);return true;}
  if(action==='teacher-task-tab') {if(['review','submitted','late','deadlines','graded'].includes(value))teacherUI.task=value;refreshTeacher(action,value);return true;}
  if(action==='teacher-period') {if(['day','week','month'].includes(value))teacherUI.attendance=value;refreshTeacher(action,value);return true;}
  if(action==='teacher-rank') {if(teacherAssigned(value))teacherUI.ranking=value;refreshTeacher(action,value);return true;}
  if(action==='teacher-open-tasks') {teacherUI.task=value;state.page=3;state.module='';render();return true;}
  if(action==='teacher-group-week') {if(teacherAssigned(value)){moduleState.group=value;moduleState.date=teacherDemoDate;moduleState.view='week';goModule('class-routine');}return true;}
  if(action==='teacher-group-grades') {if(teacherAssigned(value))teacherReports(value);return true;}
  if(action==='teacher-group-attendance'||action==='teacher-group-detail') {
    const g=teacherGroups.find(g=>g.code===value);if(!g)return true;
    const t=teacherAttendanceTotals(teacherAttendanceRecords().filter(r=>r.group===value&&r.date===teacherDemoDate));
    show(`${g.code} · ${action==='teacher-group-detail'?'Guruh tafsiloti':'Davomat'}`,teacherCompactCard('group',g.color,g.subject,`${g.count} kursant · Namunaviy o‘qituvchi`)+teacherCompactCard('check','green',`${t.percent??'—'}% davomat`,`${t.total} ta demo qayd · ${t.attended} qatnashgan · ${t.absent} kelmagan`));return true;
  }
  if(action==='teacher-exam') {const e=teacherExams.find(e=>e.id===value&&teacherAssigned(e.group));if(e){const grades=teacherGrades(e.group,e.id);show(`${e.subject} · ${e.group}`,teacherExamCards([e])+(grades.length?grades.map(r=>teacherCompactCard('person','',r.student,e.group,pill(`${r.score} / 100`,'green'))).join(''):empty('Natija e’lon qilinmagan','Faqat e’lon qilingan baholar hisoblanadi.')));document.querySelector('#dialog-body [data-action="teacher-exam"]')?.remove();}return true;}
  if(action==='teacher-notices') {show('Bildirishnomalar',teacherNoticeCards());return true;}
  if(action==='teacher-notice'||action==='teacher-message') {const notice=action==='teacher-notice',list=notice?teacherNotices:teacherCommunications,item=list.find(n=>n.id===value);if(item){const key=notice?'teacherReadNotices':'teacherReadMessages';demo[key]=[...new Set([...teacherReadSet(key),value])];render();show(item.title,teacherCompactCard(item.icon,item.tone,notice?item.title:item.from,item.body,pill(teacherShortDate(item.date))));}return true;}
  if(action==='teacher-sent') {const s=demo.submissions.find(s=>String(s.id)===value&&s.role==='teacher'&&s.kind==='message');if(s)show(s.title,teacherCompactCard('mail','green',s.recipient,s.body,pill('Yuborilgan','green')));return true;}
  return false;
}
function afterTeacherRender() {
  if(state.role!=='teacher') return;
  updateTeacherClock();
  if(state.module==='class-routine'&&moduleState.view==='week') {const start=parseDate(moduleState.date);start.setDate(start.getDate()-(start.getDay()+6)%7);const end=new Date(start);end.setDate(end.getDate()+4);document.querySelector('.titlebar h1').textContent=`${moduleState.group} · ${teacherShortDate(dateKey(start))} — ${teacherShortDate(dateKey(end))}`;}
}
document.addEventListener('change',e=>{
  if(state.role!=='teacher')return;
  if(e.target.id==='teacher-attendance-date'){if(!/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)){e.target.value=teacherUI.date;return;}teacherUI.date=e.target.value;render();document.getElementById(e.target.id)?.focus();}
  if(e.target.id==='teacher-attendance-group'&&(e.target.value==='all'||teacherAssigned(e.target.value))){teacherUI.group=e.target.value;render();document.getElementById(e.target.id)?.focus();}
});
document.addEventListener('keydown',e=>{
  const tab=e.target.closest('.teacher-tabs [role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  const tabs=[...tab.parentElement.querySelectorAll('[role="tab"]')],index=tabs.indexOf(tab),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;e.preventDefault();tabs[next].click();
});
