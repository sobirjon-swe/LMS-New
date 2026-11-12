# AIS HKTB — offline demo

ZIPni oching va eksport papkasidagi `index.html` faylini Edge, Chrome yoki Firefox’da ishga tushiring. Butun eksport papkasini birga saqlang. Internet, server, npm, token, CDN yoki ma’lumotlar bazasi talab qilinmaydi. Bu autentifikatsiya tizimi emas, faqat sintetik frontend prototipi.

## 12 rol

Har biri `index.html?rol=KALIT` orqali ochiladi. Sahifadagi rol tanlovchisi ham ishlaydi.

| Rol | Yo‘l |
|---|---|
| Muassasa administratori | `index.html?rol=institution` |
| O‘qituvchi | `index.html?rol=teacher` |
| Kursant | `index.html?rol=learner` |
| Kafedra rahbariyati | `index.html?rol=chair` |
| Kadrlar bo‘limi | `index.html?rol=hr` |
| Axborot xavfsizligi | `index.html?rol=security` |
| UPVK boshlig‘i | `index.html?rol=upvk` |
| Oliy rahbariyat | `index.html?rol=oversight` |
| O‘quv bo‘limi | `index.html?rol=academic` |
| Bo‘linma qo‘mondoni | `index.html?rol=commander` |
| Tizim administratori | `index.html?rol=platform` |
| Muassasa rahbariyati | `index.html?rol=leader` |

## 9 modul

Barchasini administrator rolida quyidagi yo‘llar orqali ochish mumkin. Boshqa rollarda faqat ruxsatli modullar menyuda ko‘rinadi; kursant jadvali o‘z guruhiga, o‘qituvchi jadvali o‘z pedagogiga cheklangan.

| Modul | Yo‘l |
|---|---|
| Guruh dars jadvali | `index.html?rol=institution&modul=class-routine` |
| Darslarni rejalash | `index.html?rol=institution&modul=schedule-classes` |
| Akademik kalendar | `index.html?rol=institution&modul=academic-calendar` |
| Guruh fanlari | `index.html?rol=institution&modul=class-subjects` |
| O‘quv rejalari | `index.html?rol=institution&modul=curriculum` |
| Akademik dars jadvali | `index.html?rol=institution&modul=academic-timetable` |
| Pedagog jadvali | `index.html?rol=institution&modul=teacher-timetable` |
| Muassasa profili | `index.html?rol=institution&modul=institution-profile` |
| O‘quv yili | `index.html?rol=institution&modul=academic-year` |

## Saqlash va amallar

- `localStorage` kaliti: `ais-hktb-demo-v2`. Murojaatlar, UPVK javoblari, davomat, yangi dars/tadbir, topshiriq, xabar, ruxsat so‘rovi, muassasa profili va ko‘rinish sozlamalari shu brauzerda saqlanadi.
- Ko‘rinish uchun alohida `ais-hktb-appearance-v1` kaliti ishlatiladi. O‘ngdagi sozlamalar tugmasi → **Standartga qaytarish** faqat maket, rang va rejimni tiklaydi; demo yozuvlarini o‘chirmaydi.
- `file://` uchun saqlash brauzer siyosatiga bog‘liq. Saqlash cheklansa pastda ogohlantirish chiqadi; sahifa joriy sessiyada ishlashda davom etadi. Papkani ko‘chirish yoki boshqa brauzerga o‘tish saqlangan ma’lumotlarni ko‘chirmaydi.
- Global qidiruv: header yoki Ctrl/Cmd+K. Escape modalni yopadi; fokus boshlovchi tugmaga, u yo‘q bo‘lsa sarlavhaga qaytadi.
- Demo davri: 2026-yil noyabr. «Bugun» shu sintetik davrdagi 12-noyabrga qaytaradi. Yangi darslarda guruh/pedagog/xona to‘qnashuvi tekshiriladi.
- Formadagi ish matni va xabarlar faqat demo yozuv sifatida saqlanadi; fayl yuklash, haqiqiy jo‘natish, to‘lov yoki karta ma’lumotlari yo‘q.

## Fayllar

`index.html`, `base.css`, `dashboard.css`, `features.css`, `bootstrap.js`, `dashboard.js`, `modules.js`, `dashboard-sections.js`, `translations.js`, `app-features.js`, `teacher-data.js`, `teacher-dashboard.js`, `appearance.js`, `teacher.css`, ushbu `README.md` va `assets/` (mahalliy shriftlar, ikonka shrifti, logotip, 3 bayroq, xarita ma’lumotlari). Hech qanday tashqi skript yoki fetch ishlatilmaydi.

## Yangilangan o‘qituvchi dashboardi

- Profil: salomlashuv, alohida fakultet/kafedra, fanlar, Toshkent soati va tasdiqlanmagan kampus holati. Dashboard hisoboti 11-noyabr 2026 demo sanasiga tegishli; soat haqiqiy vaqtni ko‘rsatadi.
- Vidjet modallari, guruhga bog‘langan haftalik jadval, beshta topshiriq tabi, imtihonlar, davomat davrlari, top-3, muloqot va pastki uch karta yangilandi.
- O‘rtacha ball va top-3 faqat biriktirilgan guruhlar, joriy o‘quv davri va e’lon qilingan baholardan olinadi. Tarixiy davomat — aniq belgilangan sintetik demo qaydlari. Qayd yo‘q kunlar kelmaganlardan alohida ko‘rsatiladi.
- 1440 va 390 px ko‘rinishlari, 835 px tungi holat, modalni Enter/Escape bilan boshqarish va fokusning qaytishi tekshirildi. Ikki guruh jadvali, beshta topshiriq tabi, uchta davomat davri, top-3 bo‘sh holati, taqvim/bildirishnoma tafsiloti va mavjud formalar ochilishi tekshirildi.
- Ixcham/Ramkali/RTL, rang va rejim boshqaruvlari tekshirildi; maket/rang qayta yuklashda saqlandi. Ko‘rinishni tiklash demo yozuvlarini o‘chirmasligi tekshirildi.
- Yangilangan eksport Linux Chromium’da haqiqiy `file://` orqali ochildi: 0 ta tashqi HTTP resursi, 0 ta buzilgan rasm. Dars modali va undan to‘liq jadvalga o‘tish ishladi; konsol xatolari qayd etilmadi.

## Oldingi bosqich tekshiruvlari va qolgan farqlar

- Ushbu moslashuvda topshiriqda ko‘rsatilgan 18 referens ochildi: 22–24 guruhlaridagi 7 asosiy rasm, 12–21 rasmlari va 08 tungi ranglar referensi. Qo‘shimcha, bu bosqichda ochilmagan rasmlarning yo‘llari taqqoslash hisobotida keltirilgan. Referenslar sahifaga fon sifatida qo‘yilmagan.
- JavaScript sintaksisi qayta tekshirildi. Avvalgi bosqichda 18 ta ajratilgan DOM/mantiq tekshiruvi o‘tgan: 12 rol menyusi, 9 modul URL’i, ruxsatlar, kun/hafta, bo‘sh jadval, kalendar, dars konflikti/saqlash, qidiruv/sahifalash, davomat, topshiriq/ruxsat formasi, murojaat–UPVK javobi, muassasa doirasi, audit, uzun matnni xavfsiz chiqarish, til/rejim va saqlash cheklangan file URL ishga tushishi.
- Birinchi ekranlar asl referens kengligida solishtirildi: administrator 1917×945, o‘qituvchi 1919×943, kursant 1915×942; oldingi va yangi kadrlar scrollY=0 da. O‘qituvchi jadvali 733.4 px, kursantniki 760.4 px da boshlanadi. Referenslarda ular taxminan 734 va 760 px.
- Qolgan 9 rol 1440×1000 da alohida ochilib, skrinshotlar orqali ko‘rildi. Brauzerda 1440/1024/390 px va och/tungi holatlar bo‘yicha 72 rol hamda 54 modul tekshiruvi o‘tdi: umumiy gorizontal chiqib ketish va sidebar overlap topilmadi. Rol ekranlaridagi tekshirilgan holat belgilarining eng past kontrasti 5.39:1.
- Rol almashtirish, modul ochish, davomatni saqlash va sahifani qayta yuklash, muassasa qidiruvi/tanlash hamda kursant–kadr–murojaat tablari tekshirildi. 390 px menyu ochilganda kontentni pastga suradi; Escape uni yopib, fokusni menyu tugmasiga qaytaradi.
- Linux Chromium’da haqiqiy file:// eksport ochildi; Kutubxona modali ochilib yopildi, tashqi HTTP resurslari va buzilgan rasmlar aniqlanmadi. Windows, Firefox va Safari alohida sinovdan o‘tkazilmadi. Barcha formalar va modallarning har bir breakpointdagi to‘liq vizual sinovi bajarilgani da’vo qilinmaydi.
- Natija **piksel darajasidagi 1:1 nusxa emas**. Kartalar tartibi va PreSkool uslubi AIS mazmuniga moslangan; grafiklar soddalashtirilgan sintetik ko‘rsatkichlardir. Aloqasiz transport/to‘lov modullari qo‘shilmagan.
- UZB lotin asosiy til; kirill transliteratsiya qilinadi. RU/EN menyu, sarlavha, boshqaruv va asosiy formalarda ishlaydi; ayrim yordamchi/demo matnlar o‘zbekcha qoladi. To‘liq professional lokalizatsiya tugallanmagan.
- Profil manzili demo matn sifatida tahrirlanadi, xarita Toshkent viloyati/AKTga bog‘langan; geokodlash yo‘q.
- Publish/Deploy bajarilmadi. Lokal preview serveri eksportga kerak emas.
