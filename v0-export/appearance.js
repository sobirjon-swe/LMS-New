"use strict";

const appearanceKey='ais-hktb-appearance-v1';
const appearanceDefaults={layout:'standard',top:'default',sidebar:'default',accent:'blue',mode:'light'};
const appearanceOptions={layout:['standard','mini','boxed','rtl'],top:['default','navy','blue','gray'],sidebar:['default','navy','blue','slate','ocean'],accent:['blue','violet','pink','orange','green','red'],mode:['light','dark']};
const appearancePalette={default:'#ffffff',navy:'#202b4b',blue:'#4355db',gray:'#e9edf5',slate:'#3a4565',ocean:'#083d72',violet:'#7041bd',pink:'#c52c77',orange:'#a94b12',green:'#187957',red:'#bf303c'};
let appearance={...appearanceDefaults},appearanceSaved=false;
try {const stored=JSON.parse(localStorage.getItem(appearanceKey)||'null');if(stored&&typeof stored==='object'){for(const key of Object.keys(appearanceOptions))if(appearanceOptions[key].includes(stored[key]))appearance[key]=stored[key];appearanceSaved=true;}}catch{}
function saveAppearance(){appearanceSaved=true;try{localStorage.setItem(appearanceKey,JSON.stringify(appearance));}catch{notify('Brauzer sozlamalarni saqlashni chekladi. Tanlov joriy sessiyada qo‘llandi.');}}
function applyAppearance(){
  if(!appearanceSaved)appearance.mode=demo.night?'dark':'light';
  const root=document.documentElement,night=appearance.mode==='dark';
  root.dataset.layout=appearance.layout;root.dir=appearance.layout==='rtl'?'rtl':'ltr';root.toggleAttribute('data-night',night);demo.night=night;
  root.style.setProperty('--primary',appearancePalette[appearance.accent]);root.style.setProperty('--accent',night?`color-mix(in srgb, ${appearancePalette[appearance.accent]} 45%, white)`:appearancePalette[appearance.accent]);
  root.style.setProperty('--soft',`color-mix(in srgb, ${appearancePalette[appearance.accent]} ${night?'20%':'9%'}, var(--paper))`);
  for(const [key,selector] of [['top','.top'],['sidebar','#rail']]){const el=document.querySelector(selector),value=appearance[key];el.dataset.customColor=value;el.style.setProperty('--surface-color',value==='default'?'var(--paper)':appearancePalette[value]);el.style.setProperty('--surface-ink',['default','gray'].includes(value)?'var(--ink)':'#ffffff');}
  document.getElementById('theme').setAttribute('aria-pressed',String(night));document.getElementById('theme').setAttribute('aria-label',night?'Kunduzgi rejim':'Tungi rejim');document.getElementById('theme').innerHTML=glyph(night?'sun':'moon');
  document.querySelectorAll('[data-action="appearance-option"]').forEach(b=>{const [key,value]=b.dataset.value.split(':');b.setAttribute('aria-pressed',String(appearance[key]===value));});
  document.querySelectorAll('#rail .nav button').forEach(b=>{const copy=b.cloneNode(true);copy.querySelectorAll('[aria-hidden="true"]').forEach(icon=>icon.remove());const label=copy.textContent.trim();b.title=label;b.setAttribute('aria-label',label);});
}
function appearanceChoice(key,value,label,content='') {return `<button type="button" class="appearance-choice ${key==='layout'?'layout-choice':key==='mode'?'mode-choice':'color-choice'}" data-action="appearance-option" data-value="${key}:${value}" aria-label="${esc(label)}" aria-pressed="${appearance[key]===value}" title="${esc(label)}">${content||`<span class="color-sample" style="--swatch:${appearancePalette[value]}"></span><span class="sr-only">${esc(label)}</span>`}</button>`;}
function openAppearanceSettings(){
  const labels={default:'Standart',navy:'To‘q ko‘k',blue:'Ko‘k',gray:'Och kulrang',slate:'Kulrang-ko‘k',ocean:'Dengiz ko‘k',violet:'Binafsha',pink:'Pushti',orange:'To‘q sariq',green:'Yashil',red:'Qizil'};
  const group=(title,content)=>`<details class="appearance-section" open><summary>${title}</summary><div class="appearance-options">${content}</div></details>`;
  show('Ko‘rinish sozlamalari',`<p class="muted appearance-intro">Maket va ranglarni tanlang. Tanlov shu brauzerda saqlanadi.</p>${group('Joylashuv',[['standard','Standart'],['mini','Ixcham'],['boxed','Ramkali'],['rtl','RTL']].map(([value,label])=>appearanceChoice('layout',value,label,`<span class="layout-preview ${value}" aria-hidden="true"><i></i><b></b><span><em></em><em></em><em></em></span></span><span>${label}</span>`)).join(''))}${group('Yuqori panel rangi',appearanceOptions.top.map(v=>appearanceChoice('top',v,'Yuqori panel: '+labels[v])).join(''))}${group('Rejim',[['light','Kunduzgi','sun'],['dark','Tungi','moon']].map(([v,label,icon])=>appearanceChoice('mode',v,label,glyph(icon)+' '+label)).join(''))}${group('Yon menyu rangi',appearanceOptions.sidebar.map(v=>appearanceChoice('sidebar',v,'Yon menyu: '+labels[v])).join(''))}${group('Asosiy rang',appearanceOptions.accent.map(v=>appearanceChoice('accent',v,'Asosiy rang: '+labels[v])).join(''))}<div class="appearance-footer">${button('Standartga qaytarish','appearance-reset')}${button('Tayyor','teacher-close','','primary')}</div>`);
  modal.classList.add('settings-drawer','appearance-drawer');applyAppearance();
}
function handleAppearanceAction(action,value){
  if(action==='appearance-option'){const [key,option]=value.split(':');if(appearanceOptions[key]?.includes(option)){appearance[key]=option;saveAppearance();applyAppearance();persistDemo();}return true;}
  if(action==='appearance-reset'){appearance={...appearanceDefaults};demo.density='comfortable';document.documentElement.dataset.density='comfortable';saveAppearance();applyAppearance();persistDemo();notify('Faqat ko‘rinish sozlamalari tiklandi. Demo ma’lumotlari saqlandi.');return true;}
  return false;
}
