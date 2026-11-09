export interface TermItem {
  id: string;
  acronym: string;
  fullNameEn: string;
  fullNameUz: string;
  category: "Protsessor" | "Xotira" | "Tizim va Shina" | "Mikrodastur" | "Quvvat";
  definition: string;
  analogyOrTip: string;
  teacherNote: string;
  // Multiple-choice challenge for this term
  question: string;
  options: {
    id: "A" | "B" | "C";
    text: string;
  }[];
  correctOption: "A" | "B" | "C";
}

export const TERMS_DATABASE: TermItem[] = [
  {
    id: "cpu",
    acronym: "CPU",
    fullNameEn: "Central Processing Unit",
    fullNameUz: "Markaziy Protsessor Qurilmasi",
    category: "Protsessor",
    definition: "Kompyuterning asosiy mikrosxemasi bo'lib, dasturiy buyruqlarni qabul qiladi, hisoblash amallarini bajaradi va boshqa barcha bloklar ishini muvofiqlashtiradi.",
    analogyOrTip: "Kompyuterning yuragi va miyasi. Barcha arifmetik hisob-kitoblar va mantiqiy qarorlar uning ichida kechadi.",
    teacherNote: "Isoqov Muzaffar: 'CPU sotib olayotganda faqat gigagersga emas, uning arxitekturasi va kesh xotirasi hajmiga ham qarang!'",
    question: "CPU atamasining to'liq kengaytmasi va uning asosiy vazifasi qaysi variantda to'g'ri ko'rsatilgan?",
    options: [
      { id: "A", text: "Central Processing Unit — kompyuterning barcha hisoblash va boshqaruv ishlarini bajaruvchi markaziy miyasi" },
      { id: "B", text: "Computer Personal Utility — faqat fayllarni arxivlovchi kichik dastur" },
      { id: "C", text: "Cable Power Unit — elektr kabelini rozetkaga ulovchi shteker" }
    ],
    correctOption: "A"
  },
  {
    id: "ram",
    acronym: "RAM",
    fullNameEn: "Random Access Memory",
    fullNameUz: "Ixtiyoriy Murojaat Xotirasi (Operativ Xotira)",
    category: "Xotira",
    definition: "Protsessor ayni paytda ishlayotgan dasturlar va oraliq ma'lumotlarni saqlovchi o'ta tezkor, biroq energetikaga bog'liq (uchuvchan) xotira.",
    analogyOrTip: "Ishchi stol. Ishchi qanchalik ko'p hujjat bilan ishlasa, stol shunchalik keng bo'lishi kerak. Tok o'chsa stol ustidagi barcha qog'ozlar uchib ketadi.",
    teacherNote: "Isoqov Muzaffar: 'Kompyuteringiz dasturlarni sekin ochayotgan bo'lsa, birinchi navbatda RAM yetishmovchiligi yoki uning bir kanalli rejimda ishlayotganini tekshiring!'",
    question: "RAM xotiraning eng asosiy xususiyati nimada?",
    options: [
      { id: "A", text: "Undagi fayllar tok o'chsa ham 10 yil saqlanib qoladi" },
      { id: "B", text: "U o'ta tez ishlaydi, ammo elektr toki uzilishi bilan barcha ma'lumotlar o'chib ketadi" },
      { id: "C", text: "Faqat videoroliklarni monitorga uzatish uchun ishlatiladi" }
    ],
    correctOption: "B"
  },
  {
    id: "rom",
    acronym: "ROM",
    fullNameEn: "Read Only Memory",
    fullNameUz: "Faqat O'qish Uchun Xotira (Doimiy Xotira)",
    category: "Xotira",
    definition: "Energiya manbaiga bog'liq bo'lmagan, kompyuterni ishga tushirish uchun zarur bo'lgan mikrodasturlar (masalan, BIOS kodi) saqlanadigan xotira.",
    analogyOrTip: "Bosilgan kitob varag'i — undan faqat o'qish mumkin, oddiy sharoitda ustiga yangi ma'lumot yozib bo'lmaydi.",
    teacherNote: "Isoqov Muzaffar: 'Zamonaviy platalarda ROM o'rniga qayta dasturlanuvchi Flash-xotira ishlatiladi, shu sababli biz BIOS ni yangilay olamiz.'",
    question: "ROM xotiraning RAM dan tub farqi nimada?",
    options: [
      { id: "A", text: "ROM tok uzilganda ham ma'lumotlarni saqlab qoladi va unga erkin yozib bo'lmaydi" },
      { id: "B", text: "ROM har doim RAM dan 100 baravar tezroq ishlaydi" },
      { id: "C", text: "ROM faqat tashqi USB fleshkalarda bo'ladi" }
    ],
    correctOption: "A"
  },
  {
    id: "alu",
    acronym: "ALU",
    fullNameEn: "Arithmetic Logic Unit",
    fullNameUz: "Arifmetik-Mantiqiy Qurilma",
    category: "Protsessor",
    definition: "Protsessor ichidagi mikrosxema bloki bo'lib, qo'shish, ayirish, mantiqiy solishtirish (AND, OR, NOT, XOR) operatsiyalarini bevosita amalga oshiradi.",
    analogyOrTip: "Protsessor miyasi ichidagi cho'ntak kalkulyatori va mantiqiy tarozisi.",
    teacherNote: "Isoqov Muzaffar: 'ALU buyruqlarni bajarishda registrlardan foydalanadi, shuning uchun registrlar protsessorning eng tez nuqtasidir.'",
    question: "ALU qanday vazifani bajarish uchun mas'ul?",
    options: [
      { id: "A", text: "Sovutish kulerining aylanish tezligini boshqarish" },
      { id: "B", text: "Arifmetik hisoblashlar va mantiqiy taqqoslash amallarini bajarish" },
      { id: "C", text: "Qattiq diskni formatlash" }
    ],
    correctOption: "B"
  },
  {
    id: "bios",
    acronym: "BIOS",
    fullNameEn: "Basic Input/Output System",
    fullNameUz: "Boshlang'ich Kiritish-Chiqarish Tizimi",
    category: "Mikrodastur",
    definition: "Ona platadagi mikrosxemada saqlanuvchi, kompyuter yoqilganda barcha qurilmalarni tekshiruvchi va operatsion tizimni yuklovchi dasturiy ta'minot.",
    analogyOrTip: "Kompyuterning birinchi uyg'onish instinkti va pasport tekshiruvchisi.",
    teacherNote: "Isoqov Muzaffar: 'BIOS sozlamalariga kirish uchun odatda yoqilish paytida Del yoki F2 tugmalari ishlatiladi.'",
    question: "BIOS tizimining asosiy vazifasi nima?",
    options: [
      { id: "A", text: "Apparat qismlarini birlamchi tekshirib (POST), operatsion tizimni ishga tushirish" },
      { id: "B", text: "Internetdan yangi filmlarni avtomatik yuklab olish" },
      { id: "C", text: "Protsessorni sovutish uchun elektr tokini 0 ga tushirish" }
    ],
    correctOption: "A"
  },
  {
    id: "post",
    acronym: "POST",
    fullNameEn: "Power-On Self-Test",
    fullNameUz: "Yoqilgandagi O'z-o'zini Tekshirish Sinovi",
    category: "Mikrodastur",
    definition: "Kompyuter yoqilishi bilan BIOS tomonidan CPU, RAM, Video, klaviatura va boshqa apparat qismlarining ishga yaroqliligini tekshiruvchi avtomatik test.",
    analogyOrTip: "Uchuvchining parvozdan oldin samolyot barcha datchiklarini ro'yxat bo'yicha ko'zdan kechirishi.",
    teacherNote: "Isoqov Muzaffar: 'Agar POST muvaffaqiyatli o'tsa — bitta qisqa beep eshitasiz. Agar xatolik bo'lsa — signal kodi orqali qaysi detal nosozligini bilib olasiz!'",
    question: "Kompyuter quvvat tugmasi bosilganda birinchi bo'lib qaysi jarayon ishga tushadi?",
    options: [
      { id: "A", text: "Antivirus to'liq tekshiruvi" },
      { id: "B", text: "POST (apparat qismlarini o'z-o'zini sinovdan o'tkazish jarayoni)" },
      { id: "C", text: "Telegram dasturining yuklanishi" }
    ],
    correctOption: "B"
  },
  {
    id: "cmos",
    acronym: "CMOS",
    fullNameEn: "Complementary Metal-Oxide-Semiconductor",
    fullNameUz: "Komplementar Metall-Oksid Yarimo'tkazgich (Parametrlar xotirasi)",
    category: "Xotira",
    definition: "BIOS sozlamalari, sana, vaqt va apparat konfiguratsiyalarini saqlovchi kam quvvatli mikrosxema. CR2032 batareykasidan oziqlanadi.",
    analogyOrTip: "Elektr uzilganda ham o'z vaqtini unutmaydigan mitti soat mexanizmi.",
    teacherNote: "Isoqov Muzaffar: 'Ona platadagi Clear CMOS kontaktlarini biriktirish orqali unutilgan BIOS parolini tiklash mumkin.'",
    question: "CMOS xotirasi nimasi bilan ajralib turadi?",
    options: [
      { id: "A", text: "U BIOS parametrlarini va real vaqt soatini batareyka quvvati yordamida uzluksiz saqlab turadi" },
      { id: "B", text: "U faqat o'yin grafikalarini saqlaydi" },
      { id: "C", text: "U kompyuter klaviaturasi ichida joylashgan" }
    ],
    correctOption: "A"
  },
  {
    id: "pcie",
    acronym: "PCIe",
    fullNameEn: "Peripheral Component Interconnect Express",
    fullNameUz: "Periferiya Komponentlarini Tezkor Ulash Shinasi",
    category: "Tizim va Shina",
    definition: "Zamonaviy ona platalarda kengaytmalar (videokartalar, NVMe SSD, tarmoq kartalari)ni yuqori tezlikda ulash uchun ishlatiladigan ketma-ket nuqtadan-nuqtaga shina.",
    analogyOrTip: "Ko'p polosali tezyurar pullik trassa: x1, x4, x8, x16 yo'laklari mavjud.",
    teacherNote: "Isoqov Muzaffar: 'Videokarta to'liq quvvatda ishlashi uchun har doim PCIe x16 slotiga ulanishi shart.'",
    question: "PCIe interfeysi asosan qaysi komponentlarni yuqori tezlikda ulash uchun xizmat qiladi?",
    options: [
      { id: "A", text: "Videokartalar (GPU) va tezkor NVMe drayverlar" },
      { id: "B", text: "Sichqoncha va sichqoncha gilamchasi" },
      { id: "C", text: "Faqat CD-ROM diskyuritgichlar" }
    ],
    correctOption: "A"
  },
  {
    id: "dma",
    acronym: "DMA",
    fullNameEn: "Direct Memory Access",
    fullNameUz: "Xotiraga To'g'ridan-To'g'ri Murojaat",
    category: "Tizim va Shina",
    definition: "Tashqi qurilmalarning protsessor ishtirokisiz, to'g'ridan-to'g'ri tizimli operativ xotira (RAM) bilan ma'lumot almashishiga imkon beruvchi arxitektura.",
    analogyOrTip: "Direktor (CPU) ruxsatisiz omborchi va yuk yetkazuvchining to'g'ridan-to'g'ri hujjat almashishi.",
    teacherNote: "Isoqov Muzaffar: 'DMA protsessorni mayda fayllarni ko'chirish yukidan ozod qiladi va unumdorlikni keskin oshiradi.'",
    question: "DMA texnologiyasining eng muhim vazifasi nima?",
    options: [
      { id: "A", text: "Protsessorni chetlab o'tib, qurilma va RAM o'rtasida to'g'ridan-to'g'ri tezkor axborot almashish" },
      { id: "B", text: "Elektr energiyasini tejash uchun monitorni o'chirish" },
      { id: "C", text: "Protsessor keshini nollashtirish" }
    ],
    correctOption: "A"
  },
  {
    id: "sata",
    acronym: "SATA",
    fullNameEn: "Serial Advanced Technology Attachment",
    fullNameUz: "Ketma-ket Ilg'or Texnologik Birikish Interfeysi",
    category: "Tizim va Shina",
    definition: "Qattiq disklar (HDD) va 2.5 dyuymli SSD drayverlarni ona plataga ulash uchun ishlatiladigan ketma-ket interfeys (SATA 3 tezligi 6 Gb/s gacha).",
    analogyOrTip: "Omborxona bilan do'kon o'rtasidagi klassik yuk tashuvchi temir yo'l.",
    teacherNote: "Isoqov Muzaffar: 'SATA SSD maksimal 550 MB/s tezlik beradi, undan tezroq ishlash uchun esa M.2 NVMe drayverlar tanlanadi.'",
    question: "SATA 3 interfeysining maksimal nazariy o'tkazuvchanligi qanchaga teng?",
    options: [
      { id: "A", text: "6 Gbit/s (~600 MB/s)" },
      { id: "B", text: "100 Terabit/s" },
      { id: "C", text: "Atigi 1 Mbit/s" }
    ],
    correctOption: "A"
  },
  {
    id: "tdp",
    acronym: "TDP",
    fullNameEn: "Thermal Design Power",
    fullNameUz: "Konstruktiv Issiqlik Ajratish Quvvati",
    category: "Quvvat",
    definition: "Protsessor yoki videokarta to'liq ishchi yuklama ostida havoga chiqaradigan issiqlik miqdori (Vattlarda ifodalanadi).",
    analogyOrTip: "Qozon ostidagi olov kuchi — olov qancha katta bo'lsa, uni sovutish uchun shuncha kuchli kuler kerak.",
    teacherNote: "Isoqov Muzaffar: 'Agar protsessoringiz TDP si 125W bo'lsa, siz kamida 180-200W issiqlikni tarqata oladigan kuler tanlashingiz shart!'",
    question: "TDP parametri qanday birlikda o'lchanadi va u nima uchun kerak?",
    options: [
      { id: "A", text: "Vatt (W) da o'lchanadi va mos sovutish tizimini tanlash uchun xizmat qiladi" },
      { id: "B", text: "Gigabaytda o'lchanadi va xotira hajmini bildiradi" },
      { id: "C", text: "Santimetrda o'lchanadi va sim uzunligini ko'rsatadi" }
    ],
    correctOption: "A"
  },
  {
    id: "vrm",
    acronym: "VRM",
    fullNameEn: "Voltage Regulator Module",
    fullNameUz: "Kuchlanishni Rostlash Moduli",
    category: "Quvvat",
    definition: "Ona platadagi mikrosxemalar zanjiri bo'lib, quvvat blokidan keluvchi 12V tokni protsessor uchun zarur bo'lgan o'ta toza ~1.1-1.3V ga pasaytirib beradi.",
    analogyOrTip: "Gidroelektrostansiyadan kelayotgan ulkan bosimli suvni ichish uchun stakanga toza tomizib beruvchi nozik filtr.",
    teacherNote: "Isoqov Muzaffar: 'Kuchli CPU o'rnatishdan oldin ona platadagi VRM fazalar soniga va radiatorlar borligiga albatta e'tibor qarating!'",
    question: "Ona platadagi VRM moduli qanday muhim elektr vazifasini bajaradi?",
    options: [
      { id: "A", text: "12V kuchlanishni protsessor talab qiladigan nozik 1.1-1.3V ga pasaytiradi va barqarorlashtiradi" },
      { id: "B", text: "Kompyuterni radio to'lqinlariga ulaydi" },
      { id: "C", text: "Monitor piksellarini yoritadi" }
    ],
    correctOption: "A"
  }
];
