# v0 uchun prompt

ZIPni oching va quyidagi blokni v0 chatiga nusxalang. Rasmlarni [galereyadagi](index.html) tartibda, papkama-papka biriktiring. Har yuborishda papka nomini yozing; bitta papka bir xabarga sig‘masa, uni tartibini saqlagan holda bo‘lib yuboring.

```text
AIS HKTB uchun PreSkool uslubida 12 rolli, bosib ishlatish mumkin bo‘lgan mahalliy LMS frontend prototipini yarat. Loyihaning nomi LMS-New. Interfeys tili o‘zbek lotin yozuvida.

ASOSIY REFERENS

Admin: https://preskool.dreamstechnologies.com/html/index.html
O‘qituvchi: https://preskool.dreamstechnologies.com/html/teacher-dashboard.html
Kursant: https://preskool.dreamstechnologies.com/html/student-dashboard.html

22–26 papkalari asosiy vizual referens. Bir dashboardning ketma-ket skrinshotlari sahifaning pastga siljitilgan bo‘laklari: ustma-ust tushgan kartalarni bir marta joylashtir va ketma-ketlikni saqla. 01–07 — umumiy PreSkool ko‘rinishi va detal uchun qo‘shimcha; URL ochilmasa biriktirilgan rasmlarga tayan. 08 — faqat tungi ranglar. 09–21 — AIS HKTB rollari, mazmuni va ish oqimlari. Yangi rasmlar tashqi ko‘rinishni, AIS referenslari va quyidagi rol talablari esa mazmun hamda ruxsat doirasini belgilaydi.

RASMLAR TARTIBI

Papkalar rasmlar/ ichida. Quyidagi ID har bir `Screenshot 2026-11-12 <ID>.png` faylining vaqt qismi. Shu tartibda ishlat:

22-admin-dashboard — Admin dashboardi:
100407: Header, profil paneli, KPI va ustuvor kartalar
100444: Davomat issiqlik xaritasi va trendlar
100708: Faoliyat, xabarlar va o‘sish ko‘rsatkichlari
100738: Kutubxona grafiklari va mavjudlik
100804: Ommabop yozuvlar, toifalar va kombinatsiyalangan grafik
100840: Resurs ko‘rsatkichlari, xarita va yon panellar
100851: Holat kartalari, vaqt chizig‘i va xarita

23-teacher-dashboard — O‘qituvchi dashboardi:
101340: Profil, tezkor amallar va KPI
101421: Bugungi jadval, tahlil va natija kartalari
101441: Guruh natijalari va «Guruhlarim»
101505: Topshiriqlar, imtihonlar va baholash
101536: Davomat va muloqot
101612: Kursantlar, yutuqlar, kalendar va bildirishnomalar

24-student-dashboard — Kursant dashboardi:
101828: Profil, tezkor amallar va KPI
101939: Bugungi jadval va o‘qish bo‘yicha tahlil
102014: Fan natijalari va o‘sish dinamikasi
102051: Topshiriqlar va imtihonlar
102109: Davomat, to‘lov ko‘rinishi va o‘qish jarayoni
102133: O‘qish jarayoni va maqsadlar
102151: Yutuqlar va pedagoglar
102209: Muloqot, kutubxona va transport panellari
102222: Kalendar, faoliyat tarixi va bildirishnomalar

25-sidebar-modal-buttons — Header menyulari va modal oynalar:
102519: O‘quv yili tanlovi
102532: Bayroqli til tanlovi
102541: Headerdagi qo‘shish menyusi
102629: Bildirishnomalar paneli
102648: Xabarlar paneli
102703: Bo‘limlarga tez o‘tish paneli
102724: Profil menyusi
102804: Dashboarddagi tezkor qo‘shish
102819: Yon dizayn sozlamalari paneli
102908: Tezkor amallar oynasi
103000: Bugungi jadval oynasi
103105: Topshiriq yuborish oynasi
103124: Imtihon natijalari oynasi
103135: Kutubxona oynasi
103148: To‘lov oynasining vizual namunasi
103201: Pedagogga xabar yuborish oynasi
103211: Ruxsat so‘rash oynasi

26-modules — Modul sahifalari:
103353: Guruh dars jadvali (Class Routine)
103426: Darslarni rejalash (Schedule Classes)
103446: Akademik kalendar
103506: Guruh fanlari jadvali
103517: O‘quv rejalarini boshqarish
103711: Akademik dars jadvali
103724: Pedagogning dars jadvali
103855: Muassasa profili va sozlamalari
103906: O‘quv yili sozlamalari

1:1 TALABI

Maqsad 1440 px desktop kengligida PreSkool ekranlariga imkon qadar piksel darajasida mos natija. Sayt va rasmlarni tekshirib, bir xil viewportda sahifa fonini, chap menyu kengligini, header balandligini, bloklarning x/y joylashuvini, qatorlar sonini, oraliqlarni, shrift o‘lchami va vaznini, radius, soya va ikonka o‘lchamlarini mosla. Yakuniy sahifa haqiqiy HTML komponentlaridan tuzilsin. Referens rasmlarni ekran foni yoki statik maket sifatida qo‘yma. Menyu, kartalar, ro‘yxatlar va grafiklarda AIS HKTB nomlari hamda namunaviy LMS ma’lumotlari ishlatilsin. PreSkool logosi, namuna shaxslarining ismi yoki fotosini olib o‘tma. Alohida litsenziyalangan asset berilsa, undan foydalan.

UMUMIY QOBIQ

- Desktopda chap menyu kengligi va yuqori panel balandligini yangi to‘liq ekran referenslariga qarab mosla. Header ichida chapda global qidiruv, o‘ngda o‘quv yili va semestr, tillar bayroqlari, tezkor qo‘shish, kunduzgi/tungi rejim, bildirishnomalar, xabarlar, bo‘limlar va profil. Logotip va muassasa nomi yonma-yon, ixcham bo‘lsin; yon menyu ochiq yoki yopiq holatda sarlavha va kartalar uning tagida qolmasin. Hisobotlar va modullar ham shu qobiqdan foydalansin.
- Header tugmalari bir xil o‘lchamda va ixcham joylashsin. Bayroqlar UZB lotin va kirill uchun O‘zbekiston, RU uchun Rossiya, EN uchun Buyuk Britaniya. Til almashtirish ishlasa, statik interfeys matni ham tanlovga mos almashsin. Tungi ranglar 08 dagi ko‘mirrang fon, kulrang panel va ko‘k aksentga mos.
- Menyu faqat tanlangan rolga tegishli bo‘limlarni ko‘rsatsin. Mobil ekranda yig‘iladigan menyu, gorizontal chiqib ketmaydigan header va o‘qiladigan kartalar bo‘lsin. Klaviatura fokusi ko‘rinsin. Holat faqat rang bilan ifodalanmasin.
- Rol tanlovchisi prototipni tekshirish uchun. Har rol o‘z URL kaliti bilan ochilsin. Masalan index.html?rol=teacher. Tanlangan rolning menyusi, ko‘rsatkichlari va tezkor amallari birga o‘zgarsin.

ROLLAR VA EKRANLAR

1. institution — Muassasa administratori (mazmun 09, dizayn 22; qo‘shimcha 01 va 04). PreSkool admin profil bloki, davr filtrlari, tezkor amallar va to‘rtta ixcham ko‘rsatkich. Uch ustunda ustuvor vazifalar, kurslar bo‘yicha taqsimot, davomat va o‘zlashtirish. UPVKga murojaat yuborish.
2. teacher — O‘qituvchi (mazmun 10, dizayn 23; qo‘shimcha 02 va 05–07). Profil panelida kichik ko‘rsatkichlar va tezkor amallar. Undan keyin desktopda ikki qator, har birida beshta KPI. Bugungi darslar chapda, tahlil o‘ngda. Jadvalda vaqt, davomiylik, fan, guruh, xona, holat va amal. O‘tilgan, joriy va navbatdagi darslar alohida rang hamda matn bilan belgilansin. Dars tafsiloti, davomat jurnali, topshiriqlar, olti kartali guruh natijalari va rangli sarlavhali “Guruhlarim” kartalari. Guruh kartasida kursantlar soni, davomat va o‘rtacha baho.
3. learner — Kursant (mazmun 11, dizayn 24; qo‘shimcha 03). Profil, qisqa ko‘rsatkichlar, tezkor amallar, baho, davomat, topshiriq va jadval. Jadval tepasida o‘tilgan, joriy va keyingi darslar hamda umumiy dars vaqti. Kursant faqat o‘z natijalari va guruhiga tegishli jadvalni ko‘rsin.
4. chair — Kafedra rahbariyati (12). Kafedra, fanlar bo‘yicha e’lon qilingan natijalar, o‘rtacha baho / 100 va hisobdagi baholar soni, pedagoglar yuklamasi va darslar. Natija bo‘lmasa “Baholar e’lon qilinmagan”. “Mening kafedram” menyusi bir marta ko‘rinsin.
5. hr — Kadrlar bo‘limi (13). Xodimlar reyestri, shtat jadvali va hujjatlar navbati. Holatlar “Tekshirish kerak”, “Hujjat kutilmoqda”, “Yakunlangan”.
6. security — Axborot xavfsizligi administratori (14). Kirish jurnali, rad etilgan urinishlar filtri, hisob va rol o‘zgarishlari hamda audit tafsiloti. Faqat namunaviy yozuvlar.
7. upvk — UPVK boshlig‘i (15). Avval ruxsatli muassasalar ro‘yxati va qidiruv. AKT20261 tanlangach “Umumiy holat”, “Kursantlar”, “Kadrlar”, “O‘quv jarayoni” va “Murojaatlar”. Muassasa admini yuborgan namunaviy murojaat bildirishnomadan aynan shu muassasada ochilsin. Javob va holatni o‘zgartirish mumkin bo‘lsin.
8. oversight — Oliy rahbariyat (16 va 21). Umumiy muassasalar tahlili va alohida muassasa doirasi. Muassasa almashtirilganda kursantlar, xodimlar, jadval va ko‘rsatkichlar o‘sha tanlovga mos o‘zgarsin. Muassasaga qaytish va ro‘yxatga chiqish aniq bo‘lsin.
9. academic — O‘quv bo‘limi (17). Jadval, guruhga fan va pedagog biriktirish navbati, qaydnomalar va joriy semestr ishlari.
10. commander — O‘quv bo‘linmasi qo‘mondoni (18). Biriktirilgan guruhlar, kunlik davomat va davomat qaydi kutilayotgan guruhlar.
11. platform — Tizim administratori (19). Platforma xizmatlari, navbatdagi ishlar va muassasalar. Texnik monitoring matnlari aniq bo‘lsin.
12. leader — Muassasa rahbariyati (20). Muassasaning umumiy ta’lim natijalari, kafedralar bo‘yicha davomat, baholar va hisobotlar.

YANGI REFERENSLARNI AIS HKTBGA MOSLASH

- 22: admin sahifasida rangli kartalar, grafiklar, faollik lentasi va ixcham ro‘yxatlar geometriyasidan foydalan. Xarita joylashuvi bo‘yicha AIS talabi ustun: chapda to‘liq O‘zbekiston xaritasi, o‘ngda ketma-ket «Manbalar mavjudligi», «Biriktirish vazifalari», «Joriy semestr», pastda grafiklar. Mahalliy xaritada namunaviy saqlangan manzilga mos hudud ajralsin, markerda muassasa nomi chiqsin. Kutubxona va transport misollarini dizayn usuli sifatida ol; rolga aloqasiz modullarni kiritma.
- 23–24: profil, tezkor amallar, jadval, natijalar va quyi bo‘limlarning vizual tartibini saqla. AI ko‘rsatkichi o‘rniga sintetik demo yozuvlaridan hisoblangan o‘quv ko‘rsatkichini qo‘y. Vazifaga mos kelmagan PreSkool bo‘limlarini majburan qo‘shma.
- 25: o‘quv yili, til, qo‘shish, bildirishnoma, xabar, bo‘limlar va profil paneli o‘z tugmasiga bog‘lanib ochilsin. Yon sozlamalar paneli va markaziy modal bir-biridan farq qilsin. Modallarda fokus oynaga o‘tsin, Escape bilan yopilsin va yopilganda boshlovchi tugmaga qaytsin. Jadval, topshiriq, natija, kutubxona, xabar va ruxsat oynalari tegishli tugmadan ochilsin; demo formalar majburiy maydonlarni tekshirsin va natijani ko‘rsatsin. To‘lov rasmini faqat forma dizayni namunasi sifatida ishlat; karta raqami/CVV qabul qilma, saqlama va haqiqiy tranzaksiya qo‘shma.
- 26: to‘qqiz modul uchun alohida ochiladigan sahifa yarat. Guruh va pedagog jadvalida kun/hafta va tegishli guruh/pedagog tanlovi ishlasin. Kalendar sana va ko‘rinish tanloviga javob bersin. Fanlar jadvali va o‘quv rejalari qidiruv, filtr va yozuv tafsilotini ochsin. Muassasa profili va o‘quv yili sozlamalari faqat tegishli demo rollarga ochilsin, tahrir natijasi demo doirasida ko‘rinsin. Navigatsiya dashboarddagi tezkor amallar bilan ham bog‘lansin.

INTERAKSIYA VA MA’LUMOT

Faqat sintetik ma’lumot ishlat. Qidiruv, rol almashishi, jadval kunlari, o‘qituvchi davomat formasi, guruh kartalari, audit filtri va muassasa tanlash oqimlari haqiqatan bosib ishlasin. Yuborilgan murojaat demo holatida yangi bildirishnoma sifatida ko‘rinsin. Saqlash kerak bo‘lsa localStorage ishlat va “Demo ma’lumotlarini tiklash” amalini ber. Tanlangan muassasa doirasi tab o‘zgarganda saqlansin. Yozuvlar ko‘payganda panel ichida sahifalash yoki “Barchasini ko‘rish” ishlat, yonidagi asosiy bloklar joylashuvini saqla. Bo‘sh natija, to‘la jadval va uzun nomlarni ham sinab ko‘r. Tabiiy foydalanuvchi matni ishlat, soxta AI baholarini kiritma.

EKSPORT

Asosiy topshiriq — yuklab olib Windows’dagi LMS-New papkasida internetsiz ochish mumkin bo‘lgan HTML, CSS va oddiy JavaScript frontend. Barcha media va shriftlar lokal assets/ ichida. CDN, API, token, haqiqiy baza yoki server talab qilinmasin. Barcha yo‘llar nisbiy bo‘lsin. file:// orqali ishlashi uchun lokal ma’lumotni fetch() orqali o‘qishdan saqlan.

Yuklab olinadigan loyiha ZIP’ida quyidagi fayllar bo‘lsin:
  index.html
  assets/styles.css
  assets/app.js
  assets/demo-data.js
  assets/ (kerakli lokal shrift, belgi va rasm fayllari)
  README.md

Agar v0 preview uchun Next.js qobig‘i kerak bo‘lsa, u orqali shu fayllarni ko‘rsat va eksportda tayyor statik nusxani v0-export/ papkasiga joyla, shunda uni mahalliy LMS-New/ ichiga ko‘chirib qo‘yish mumkin bo‘ladi. Statik fayllar Next.js, npm yoki Vercel’siz ochilsin. Vercel’ga deploy qilma. Faqat preview va manba fayllarni eksport qil. Eksport natijasida demo fayllarining haqiqiy tarkibini sanab ber.

QABUL TEKSHIRUVI

Avval 22–24 asosida admin, o‘qituvchi va kursant sahifalarini, keyin 25 dagi boshqaruvlar va 26 dagi modullarni tayyorla. Umumiy komponentlarni qolgan to‘qqiz rolga ham qo‘lla. 1440, 1024 va 390 px da kunduzgi va tungi holatlarni tekshir. 1440 px da uch dashboardning barcha bo‘laklari, ochilgan panel/modallar va modul sahifalarini tegishli referens bilan yonma-yon solishtir. Uzun matn va ko‘p yozuvda karta yonidagisini surib yubormasin. Qolgan rollarda navigatsiya, mazmun va ruxsat doirasini tekshir. Natijada 12 rol va 9 modulning ochiladigan yo‘llari, eksport fayllari va qolgan farqlarni qisqa ro‘yxatda ber. Tekshirilmagan joyni 1:1 deb belgilama.
```
