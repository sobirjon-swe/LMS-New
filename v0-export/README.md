# AIS HKTB — offline demo

ZIPni Windows’da oching va `v0-export/index.html` faylini Edge, Chrome yoki Firefox’da ishga tushiring. Butun `v0-export/` papkasini birga saqlang. Internet, server, npm, token, CDN yoki ma’lumotlar bazasi talab qilinmaydi. Bu autentifikatsiya tizimi emas, faqat sintetik frontend prototipi.

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
- Tiklash: o‘ngdagi sozlamalar tugmasi → **Demo ma’lumotlarini tiklash** → tasdiqlash.
- `file://` uchun saqlash brauzer siyosatiga bog‘liq. Saqlash cheklansa pastda ogohlantirish chiqadi; sahifa joriy sessiyada ishlashda davom etadi. Papkani ko‘chirish yoki boshqa brauzerga o‘tish saqlangan ma’lumotlarni ko‘chirmaydi.
- Global qidiruv: header yoki Ctrl/Cmd+K. Escape modalni yopadi; fokus boshlovchi tugmaga, u yo‘q bo‘lsa sarlavhaga qaytadi.
- Demo davri: 2026-yil noyabr. «Bugun» shu sintetik davrdagi 12-noyabrga qaytaradi. Yangi darslarda guruh/pedagog/xona to‘qnashuvi tekshiriladi.
- Formadagi ish matni va xabarlar faqat demo yozuv sifatida saqlanadi; fayl yuklash, haqiqiy jo‘natish, to‘lov yoki karta ma’lumotlari yo‘q.

## Fayllar

`index.html`, `base.css`, `dashboard.css`, `features.css`, `dashboard.js`, `modules.js`, `dashboard-sections.js`, `translations.js`, `app-features.js`, ushbu `README.md` va `assets/` (mahalliy shriftlar, ikonka shrifti, logotip, 3 bayroq, xarita ma’lumotlari). Hech qanday tashqi skript yoki fetch ishlatilmaydi.

## Tekshiruvlar va qolgan farqlar

- 22–26 referenslari ko‘rildi: mos ravishda **7, 6, 9, 17, 9** ta. Referens rasmlar sahifaga fon sifatida qo‘yilmagan.
- JavaScript sintaksisi va 18 ta ajratilgan DOM/mantiq tekshiruvi o‘tdi: 12 rol menyusi, 9 modul URL’i, ruxsatlar, kun/hafta, bo‘sh jadval, kalendar, dars konflikti/saqlash, qidiruv/sahifalash, davomat, topshiriq/ruxsat formasi, murojaat–UPVK javobi, muassasa doirasi, audit, uzun matnni xavfsiz chiqarish, til/rejim va saqlash cheklangan file URL ishga tushishi.
- Haqiqiy brauzerda o‘qituvchi dashboardi 1296×817 da, kunduzgi/tungi rejim, inglizcha navigatsiya, davomat saqlash, header oynasi va Escape/fokus tekshirildi. 1440 px da modul va dars formasi ochildi.
- Dars formasi tekshiruvida brauzer avtomatizatsiyasi CDP timeout bilan to‘xtadi. 1440/1024/390 px dagi barcha sahifa va modallarning to‘liq vizual sinovi, Windows’dagi haqiqiy file:// sinovi va native brauzerdagi barcha forma oqimlari yakunlanmagan. DOM sinovlari vizual sinov o‘rnini bosmaydi.
- Natija **piksel darajasidagi 1:1 nusxa emas**. Kartalar tartibi va PreSkool uslubi AIS mazmuniga moslangan; grafiklar soddalashtirilgan sintetik ko‘rsatkichlardir. Aloqasiz transport/to‘lov modullari qo‘shilmagan.
- UZB lotin asosiy til; kirill transliteratsiya qilinadi. RU/EN menyu, sarlavha, boshqaruv va asosiy formalarda ishlaydi; ayrim yordamchi/demo matnlar o‘zbekcha qoladi. To‘liq professional lokalizatsiya tugallanmagan.
- Profil manzili demo matn sifatida tahrirlanadi, xarita Toshkent viloyati/AKTga bog‘langan; geokodlash yo‘q.
- Publish/Deploy bajarilmadi. Lokal preview serveri eksportga kerak emas.
