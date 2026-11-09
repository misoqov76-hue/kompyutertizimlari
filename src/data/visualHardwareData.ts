export interface VisualTask {
  id: string;
  taskNumber: number;
  title: string;
  category: string;
  svgType: "cpu-socket" | "ram-slot" | "m2-slot" | "cmos-battery" | "pcie-slot" | "vrm-phases" | "io-ports" | "atx-power";
  description: string;
  visualClues: string[];
  question: string;
  options: {
    id: "A" | "B" | "C";
    text: string;
  }[];
  correctOption: "A" | "B" | "C";
  detailedAnswer: string;
  teacherTip: string;
}

export const VISUAL_TASKS: VisualTask[] = [
  {
    id: "task-cpu-socket",
    taskNumber: 1,
    title: "Platadagi Markaziy Kvadrat Uya va Oltin Uchburchak",
    category: "Protsessor Ulagichlari",
    svgType: "cpu-socket",
    description: "Tasavvur qiling: Ona plataning yuqori-markaziy qismida joylashgan yirik to'rtburchak metall mexanizm. Uning metall qisqich dastasi (lever) va yuzlab mitti tillarang egiluvchan kontakt oyoqchalari (pinlari) bor. Burchaklaridan birida kichik oltin uchburchak belgi va ikki chetida joylashtirish tirqishlari (notches) ko'rinib turibdi.",
    visualClues: [
      "Metall bosim qopqog'i va yopuvchi richag dastasi mavjud",
      "Ichida yuzlab (1200-1700 ta) mikroskopik kontakt ignalari bor",
      "Bir burchagida yo'nalishni ko'rsatuvchi uchburchak belgi bor"
    ],
    question: "Ushbu tavsiflangan va sxematik ko'rsatilgan apparat elementi nima va uning asosiy vazifasi qaysi javobda to'g'ri berilgan?",
    options: [
      { id: "A", text: "LGA tipidagi protsessor (CPU) soketi — protsessorni xavfsiz o'rnatish va signallarni shinalarga uzatish uyasi" },
      { id: "B", text: "Kompyuter dinamigi — audio signallarni jaranglatish uchun mo'ljallangan" },
      { id: "C", text: "Qattiq disk diskyurituvchi dvigateli" }
    ],
    correctOption: "A",
    detailedAnswer: "Bu LGA (Land Grid Array) protsessor soketi hisoblanadi. Oltin uchburchak protsessorni 90 yoki 180 gradus noto'g'ri qo'yib, nozik pinlarni sindirib qo'ymaslik uchun yo'naltiruvchi kalit vazifasini bajaradi.",
    teacherTip: "Ustozingiz Isoqov Muzaffar: 'Soket richagini yopayotganda ortiqcha kuch ishlatmang. Agar protsessor to'g'ri o'tirgan bo'lsa, qopqoq silliq yopiladi!'"
  },
  {
    id: "task-ram-slot",
    taskNumber: 2,
    title: "Ikki Cheti Qisqichli Uzun Tirqishli Slot",
    category: "Xotira Interfeyslari",
    svgType: "ram-slot",
    description: "Tasavvur qiling: Protsessor soketining o'ng tomonida parallel joylashgan 2 yoki 4 ta uzun ingichka tirqishli plastmassa slotlar. Har ikki chetida (yoki bir chetida) bosiluvchi qulf-qisqichlar (latches) bor. Tirqishning o'rtasidan biroz chetroqda metall kontaktlarni ikkiga ajratuvchi plastik to'siq-kalit (notch) ko'rinadi.",
    visualClues: [
      "Uzun ingichka yo'lakcha va ikki chetida bosiladigan plastik qisqichlar",
      "Tirqish o'rtasida nosimmetrik bo'lingan kalit (notch) o'rni",
      "Odatda turli ranglar bilan (masalan qora va kulrang) juftlangan bo'ladi"
    ],
    question: "Ushbu apparat vositasi nima va uning o'rtasidagi plastik to'siq (kalit) nima maqsadda qilingan?",
    options: [
      { id: "A", text: "Videokartani sovutuvchi sim yo'lagi" },
      { id: "B", text: "DIMM xotira (RAM) sloti — kalit esa boshqa avloddagi (DDR3/DDR4/DDR5) yoki teskari o'rnatishdan himoyalovchi fizik to'siqdir" },
      { id: "C", text: "Internet kabelini ulash uchun port" }
    ],
    correctOption: "B",
    detailedAnswer: "Bu operativ xotira (RAM) uchun DIMM slotidir. Kalit (notch) joylashuvi DDR avlodlari bo'yicha har xil bo'ladi. Masalan, DDR4 moduli hech qachon DDR5 slotiga jismonan sig'maydi.",
    teacherTip: "Ustozingiz Isoqov Muzaffar: 'Modulni o'rnatayotganda ikki tomondan barobar bosing, qisqichlar o'z-o'zidan 'chert' etib yopilishi kerak!'"
  },
  {
    id: "task-m2-slot",
    taskNumber: 3,
    title: "Kichik Gorizontal Slot va Vintli Tirgak",
    category: "Tezkor Drayverlar",
    svgType: "m2-slot",
    description: "Tasavvur qiling: Ona plata yuzasida bevosita yotqizib o'rnatiladigan ixcham slot. Slotning bir tomonida nozik tishli kiritish uyasi, 80 mm (yoki 60/42 mm) masofada esa plataga qotirilgan bitta mitti metall tirgak va mahkamlovchi vint o'rni mavjud.",
    visualClues: [
      "To'g'ridan-to'g'ri plata yuzasiga parallel yotqizib o'rnatiladi",
      "M-Key yoki B-Key tirqishli nozik kontakt uyasi",
      "Oxirida kichik mahkamlovchi vint o'rni (standart 2280 o'lcham)"
    ],
    question: "Ushbu tasvirlangan zamonaviy yuqori tezlikdagi ulanish nuqtasi nima?",
    options: [
      { id: "A", text: "M.2 NVMe SSD sloti — zamonaviy o'ta tezkor qattiq jismoniy disklarni ulash uchun" },
      { id: "B", text: "Klaviatura uchun PS/2 ulagichi" },
      { id: "C", text: "Floppy 1.44MB disketa sloti" }
    ],
    correctOption: "A",
    detailedAnswer: "Bu zamonaviy M.2 sloti bo'lib, unga NVMe SSD modullari o'rnatiladi. Ular PCIe liniyalariga bevosita ulanib, sekundiga 3000-7000+ MB ma'lumot o'tkaza oladi.",
    teacherTip: "Ustozingiz Isoqov Muzaffar: 'M.2 disk ustiga albatta termoplyonka va metall radiator o'rnating, aks holda yuklama ostida u qizib, tezligini tushirib yuboradi!'"
  },
  {
    id: "task-cmos-battery",
    taskNumber: 4,
    title: "Kumush Rangli Tangasimon Metall Element",
    category: "Avtonom Quvvat",
    svgType: "cmos-battery",
    description: "Tasavvur qiling: Ona platada dumaloq plastik uyacha ichiga qistirilgan, diametri 20 mm, qalinligi 3.2 mm bo'lgan yassi tangasimon kumush rangli metall element. Uning ustida '+ CR2032 3V' degan yozuv bor va yonida kichik metall qisqich prujina ko'rinadi.",
    visualClues: [
      "Dumaloq tangasimon shakl, metall qobiq",
      "Ustida 'CR2032 3V' markirovkasi bor",
      "O'ng tomonida ochish uchun prujinali qisqich mavjud"
    ],
    question: "Ushbu elementning kompyuter tizimidagi aniq roli nima?",
    options: [
      { id: "A", text: "Protsessorga elektr toki yetishmaganda qo'shimcha generator bo'lib xizmat qiladi" },
      { id: "B", text: "CMOS batareyasi — kompyuter tokdan uzilganda BIOS sozlamalari va soat mikrosxemasini oziqlantirib turadi" },
      { id: "C", text: "Videokartaning chastotasini oshirish uchun magnit maydoni yaratadi" }
    ],
    correctOption: "B",
    detailedAnswer: "Bu CR2032 litiy batareyasi. U Real-Time Clock (RTC) chipi va CMOS xotirasining uzluksiz ishlashini ta'minlaydi. U o'tirib qolsa, kompyuter har safar soatni 00:00 ga qaytaradi.",
    teacherTip: "Ustozingiz Isoqov Muzaffar: 'Batareyani yechganda uning uyasidagi nozik kontakt prujinasini sindirib qo'ymang, kichik plastmassa richagdan foydalaning!'"
  },
  {
    id: "task-pcie-slot",
    taskNumber: 5,
    title: "Oxirida Plastik Qulfi Bor Eng Uzun Gorizontal Slot",
    category: "Kengaytma Magistrallari",
    svgType: "pcie-slot",
    description: "Tasavvur qiling: Ona plataning pastki qismida joylashgan, uzunligi taxminan 9 sm bo'lgan to'liq o'lchamli tirqish. Ichida 164 ta oltin kontakt mavjud. Uning o'ng uchki qismida og'ir kengaytma kartalarini siljib ketishdan saqlab turuvchi maxsus plastik qulf-fiksator bor.",
    visualClues: [
      "Ona platadagi eng uzun gorizontal kengaytma sloti",
      "Oxirida ochiluvchi/yopiluvchi fiksator 'qulfchasi' bor",
      "Odatda metall himoya sovuti (Armor Shielding) bilan mustahkamlangan"
    ],
    question: "Ushbu slot qanday nomlanadi va unga odatda qaysi qurilma o'rnatiladi?",
    options: [
      { id: "A", text: "PCIe x16 sloti — og'ir diskret videokartalarni (GPU) ulash uchun xizmat qiladi" },
      { id: "B", text: "SATA porti — optik disklarni ulash uchun" },
      { id: "C", text: "Kuler quvvat ulagichi" }
    ],
    correctOption: "A",
    detailedAnswer: "Bu PCIe x16 (PCI Express 16 liniyali) slotidir. Videokartani yechishdan oldin uning oxiridagi plastik qulfni barmog'ingiz bilan ochish kerak, aks holda slot sinishi mumkin.",
    teacherTip: "Ustozingiz Isoqov Muzaffar: 'Videokartani yechayotganda qulfni bosishni aslo unutmang! Aks holda qimmatbaho ona plataning sloti yorilib ketadi!'"
  },
  {
    id: "task-vrm-phases",
    taskNumber: 6,
    title: "Protsessor Atrofidagi Kubsimon Drossellar va Radiatorlar",
    category: "Elektr Ta'minoti",
    svgType: "vrm-phases",
    description: "Tasavvur qiling: Protsessor soketining chap va yuqori tomonini o'rab turgan qora yoki kulrang kubik shaklidagi metall drossellar (chokes), qator silindrik kondensatorlar va ularning ustiga o'rnatilgan qirrali qalin alyuminiy radiatorlar.",
    visualClues: [
      "Protsessor atrofida L-harfi shaklida tizilgan kubsimon drossellar",
      "Ostida yuqori quvvatli Mosfet tranzistorlari yashiringan",
      "Ustida qovurg'ali massiv alyuminiy issiqlik tarqatuvchi radiatorlar bor"
    ],
    question: "Ushbu zanjir kompyuter tizimida qanday hal qiluvchi vazifani bajaradi?",
    options: [
      { id: "A", text: "Faqat kompyuterga chiroyli RGB rang berish uchun bezak" },
      { id: "B", text: "VRM (Voltage Regulator Module) quvvat fazalari — 12V tokni protsessor uchun barqaror 1.2V ga pasaytirib, tozalab beradi" },
      { id: "C", text: "Tovush kartasining karnayi" }
    ],
    correctOption: "B",
    detailedAnswer: "Bu ona plataning VRM tizimidir. U qanchalik ko'p fazali va sifatli bo'lsa, protsessor og'ir yuklamalarda shunchalik barqaror ishlaydi va qizib ketmaydi.",
    teacherTip: "Ustozingiz Isoqov Muzaffar: 'Radiatorsiz arzon VRM li platalarga kuchli protsessor qo'ysangiz, tizim qizib quvvatni keskin tushirib yuboradi (trottling)!' "
  }
];
