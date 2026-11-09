export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: "A" | "B" | "C";
    text: string;
  }[];
  correctKey: "A" | "B" | "C";
  explanation: string;
}

export interface QuizPackage {
  id: string;
  title: string;
  category: string;
  description: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export const QUIZ_PACKAGES: QuizPackage[] = [
  {
    id: "quiz-arch-cpu",
    title: "1-Paket: Kompyuter Arxitekturasi va Mikroprotsessorlar",
    category: "Arxitektura va CPU",
    description: "Fon Neyman tamoyillari, CPU tuzilishi, ALU, registrlar va kesh xotiralar bo'yicha 5 ta 3-variantli test.",
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        question: "Fon Neyman arxitekturasida ma'lumotlar va buyruqlar qanday saqlanadi?",
        options: [
          { key: "A", text: "Yagona umumiy xotirada ketma-ket joylashadi" },
          { key: "B", text: "Faqat tashqi optik diskda saqlanadi" },
          { key: "C", text: "Klaviatura ichidagi mikrosxemada saqlanadi" }
        ],
        correctKey: "A",
        explanation: "Fon Neyman tamoyilining tub mohiyati — dastur kodlari va ular ustida bajariluvchi ma'lumotlar yagona umumiy xotirada bir xil usulda saqlanishidir."
      },
      {
        id: 2,
        question: "Protsessorning qaysi bo'limi arifmetik amallar va mantiqiy solishtirishlarni bevosita bajaradi?",
        options: [
          { key: "A", text: "Boshqaruv qurilmasi (Control Unit)" },
          { key: "B", text: "Arifmetik-mantiqiy qurilma (ALU)" },
          { key: "C", text: "Quvvat fazalari drosseli" }
        ],
        correctKey: "B",
        explanation: "ALU (Arithmetic Logic Unit) qo'shish, ayirish, mantiqiy AND/OR/NOT amallarini hisoblaydi."
      },
      {
        id: 3,
        question: "Protsessor tarkibidagi eng tezkor va eng kam kechikishga ega xotira qaysi?",
        options: [
          { key: "A", text: "Ichki apparat registrlari (Registers)" },
          { key: "B", text: "Qattiq disk (HDD)" },
          { key: "C", text: "Optik DVD disk" }
        ],
        correctKey: "A",
        explanation: "Registrlar bevosita CPU yadrosi sxemasining o'zida joylashgan bo'lib, unga murojaat qilish atigi 1 takt davom etadi."
      },
      {
        id: 4,
        question: "Kesh xotiraning qaysi pog'onasi odatda barcha yadrolar uchun umumiy bo'lib, eng katta hajmga ega?",
        options: [
          { key: "A", text: "L1 kesh" },
          { key: "B", text: "L2 kesh" },
          { key: "C", text: "L3 kesh" }
        ],
        correctKey: "C",
        explanation: "L3 kesh ko'p yadroli zamonaviy protsessorlarda barcha yadrolar o'rtasida taqsimlangan umumiy kesh hisoblanadi."
      },
      {
        id: 5,
        question: "Protsessorning bir takt davomida o'rtacha bajargan buyruqlari soni qaysi atama bilan ifodalanadi?",
        options: [
          { key: "A", text: "IPC (Instructions Per Cycle)" },
          { key: "B", text: "FPS (Frames Per Second)" },
          { key: "C", text: "RPM (Rotations Per Minute)" }
        ],
        correctKey: "A",
        explanation: "IPC (Instructions Per Cycle) — protsessor mikromem'morchiligining haqiqiy hisoblash samaradorligini ko'rsatuvchi muhim ko'rsatkichdir."
      }
    ]
  },
  {
    id: "quiz-memory-io",
    title: "2-Paket: Xotira Tizimlari va Kiritish-Chiqarish (I/O)",
    category: "Xotira va I/O",
    description: "RAM, ROM, SSD, DMA texnologiyasi va apparat uzilishlari (IRQ) bo'yicha 5 ta test.",
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        question: "Operativ xotira (RAM) moduliga elektr toki uzilsa, undagi ma'lumotlar nima bo'ladi?",
        options: [
          { key: "A", text: "To'liq va qaytarib bo'lmas darajada o'chib ketadi" },
          { key: "B", text: "O'z-o'zidan fleshkaga nusxalanadi" },
          { key: "C", text: "Monitor ekranida matn bo'lib muzlab qoladi" }
        ],
        correctKey: "A",
        explanation: "RAM dinamik kondensatorlar asosida qurilgan bo'lib, zaryad berilmasa axborot darhol yo'qoladi (uchuvchan xotira)."
      },
      {
        id: 2,
        question: "Tashqi qurilmaning protsessorni chalg'itmasdan to'g'ridan-to'g'ri RAM bilan axborot almashish mexanizmi nima?",
        options: [
          { key: "A", text: "DMA (Direct Memory Access)" },
          { key: "B", text: "Bluetooth" },
          { key: "C", text: "BIOS Setup" }
        ],
        correctKey: "A",
        explanation: "DMA (Direct Memory Access) kontrolleri orqali katta oqimli ma'lumotlar to'g'ridan-to'g'ri xotiraga uzatiladi va CPU bo'sh qoladi."
      },
      {
        id: 3,
        question: "Klaviaturada biron-bir tugma bosilganda protsessorga nima jo'natiladi?",
        options: [
          { key: "A", text: "Uskunaviy uzilish so'rovi (Hardware IRQ)" },
          { key: "B", text: "Yuqori kuchlanishli elektr zaryadi" },
          { key: "C", text: "Faqat audio tovush" }
        ],
        correctKey: "A",
        explanation: "Qurilmalar protsessor e'tiborini jalb qilish uchun uzilish signali (Interrupt Request - IRQ) yuboradi."
      },
      {
        id: 4,
        question: "M.2 NVMe SSD qattiq disklar va oddiy SATA SSD lardan nimasi bilan tubdan ustun turadi?",
        options: [
          { key: "A", text: "PCIe magistrali orqali bir necha ming MB/s tezlikda ishlaydi" },
          { key: "B", text: "Unda magnit disklari tez aylanadi" },
          { key: "C", text: "U faqat telefon zaryadnikidan quvvat oladi" }
        ],
        correctKey: "A",
        explanation: "NVMe drayverlari PCIe x4 liniyalariga ulanadi va SATA ning 550 MB/s to'sig'ini buzib o'tib, 3500-7000+ MB/s tezlik beradi."
      },
      {
        id: 5,
        question: "Dual-Channel (ikki kanalli) xotira rejimi ona platada nima uchun yoqiladi?",
        options: [
          { key: "A", text: "Xotira shinasining o'tkazuvchanlik qobiliyatini 2 barobarga oshirish uchun" },
          { key: "B", text: "Kompyuterni internetga ulash uchun" },
          { key: "C", text: "Windows litsenziyasini yangilash uchun" }
        ],
        correctKey: "A",
        explanation: "Ikkita kanal parallel ishlaganda ma'lumotlar shinasi kengligi 64-bitdan 128-bitga yetadi va o'tkazish tezligi keskin oshadi."
      }
    ]
  },
  {
    id: "quiz-bios-motherboard",
    title: "3-Paket: BIOS, Tizimli Shinalar va Ona Plata",
    category: "Plata va Mikrodastur",
    description: "POST jarayoni, CMOS batareyasi, PCIe slotlari, chipset va VRM quvvat bloki bo'yicha 5 ta test.",
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        question: "Kompyuter yoqilganda uning barcha qismlarini birlamchi avtomatik tekshiruvchi jarayon nima?",
        options: [
          { key: "A", text: "POST (Power-On Self-Test)" },
          { key: "B", text: "Disk defragmentatsiyasi" },
          { key: "C", text: "Wi-Fi parolini qidirish" }
        ],
        correctKey: "A",
        explanation: "POST BIOS mikrodasturining birinchi va eng muhim diagnostik fazasi hisoblanadi."
      },
      {
        id: 2,
        question: "Kompyuter o'chirilganda BIOS sozlamalari va soat hisobini ushlab turuvchi element qaysi?",
        options: [
          { key: "A", text: "3 Voltli litiy CR2032 batareyasi" },
          { key: "B", text: "Protsessor sovutgichi qanotlari" },
          { key: "C", text: "Klaviatura simi" }
        ],
        correctKey: "A",
        explanation: "Ona platadagi CR2032 batareyasi kompyuter elektr rozetkadan uzilganda ham CMOS xotirasini va soatini quvvatlaydi."
      },
      {
        id: 3,
        question: "Zamonaviy diskret videokartalar ona platadagi qaysi slotga o'rnatiladi?",
        options: [
          { key: "A", text: "PCIe x16 slotiga" },
          { key: "B", text: "SATA portiga" },
          { key: "C", text: "Floppy disk kabeliga" }
        ],
        correctKey: "A",
        explanation: "PCI Express x16 sloti eng yuqori o'tkazuvchanlikka ega bo'lib, grafik hisob-kitoblar uchun zarur bo'lgan barcha liniyalarni beradi."
      },
      {
        id: 4,
        question: "Ona platadagi VRM (Voltage Regulator Module) qismining asosiy xizmati nima?",
        options: [
          { key: "A", text: "12V kuchlanishni protsessor talab qiluvchi barqaror ~1.2V ga pasaytirib berish" },
          { key: "B", text: "Kompyuter korpusining changini puflash" },
          { key: "C", text: "Tovush signallarini dinamikka chiqarish" }
        ],
        correctKey: "A",
        explanation: "VRM drossellari va mosfetlari protsessorga keluvchi kuchlanishni mikroskopik darajada toza va barqaror qilib beradi."
      },
      {
        id: 5,
        question: "Manzillar shinasi (Address Bus) kengligi 32 bit bo'lgan protsessor necha GB xotirani ko'ra oladi?",
        options: [
          { key: "A", text: "Maksimal 4 Gigabayt (GB)" },
          { key: "B", text: "128 Gigabayt (GB)" },
          { key: "C", text: "1000 Terabayt (TB)" }
        ],
        correctKey: "A",
        explanation: "2^32 = 4,294,967,296 manzil, bu roppa-rosa 4 GB ga to'g'ri keladi. 4 GB dan ortiq RAM ishlatish uchun 64-bit shina kerak."
      }
    ]
  },
  {
    id: "quiz-final-exam",
    title: "4-Paket: Texnikum 'Kompyuter Tizimlari' Yakuniy Nazorati",
    category: "Umumiy Nazorat",
    description: "Isoqov Muzaffar talablariga mos, fanning barcha asosiy mavzularini qamrab oluvchi 10 ta kompleks 3-variantli test.",
    durationMinutes: 15,
    questions: [
      {
        id: 1,
        question: "Kompyuterning mantiqiy tuzilishi va ishlash tamoyillarini o'rganuvchi asosiy tushuncha nima?",
        options: [
          { key: "A", text: "Kompyuter arxitekturasi" },
          { key: "B", text: "Veb-dizayn" },
          { key: "C", text: "Ofis dasturlari paketi" }
        ],
        correctKey: "A",
        explanation: "Kompyuter arxitekturasi — apparat va dasturiy vositalarning o'zaro ishlash tamoyillari va mantiqiy tuzilishidir."
      },
      {
        id: 2,
        question: "LGA (Land Grid Array) protsessor soketlarida kontakt oyoqlari qayerda joylashgan bo'ladi?",
        options: [
          { key: "A", text: "Ona platadagi soket uyasida" },
          { key: "B", text: "Protsessor korpusining orqa tomonida" },
          { key: "C", text: "Quvvat blokining simida" }
        ],
        correctKey: "A",
        explanation: "LGA soketlarida pinlar platada bo'ladi, protsessor ostida esa silliq kontakt nuqtalari joylashadi."
      },
      {
        id: 3,
        question: "Termopastaning birlamchi texnik vazifasi nima?",
        options: [
          { key: "A", text: "Metall yuzalar orasidagi mikroskopik havo bo'shliqlarini to'ldirib, issiqlik o'tkazishni oshirish" },
          { key: "B", text: "Protsessorni kulerga butunlay yopishtirish" },
          { key: "C", text: "Elektr tokini protsessor qopqog'iga o'tkazish" }
        ],
        correctKey: "A",
        explanation: "Havo issiqlikni o'ta yomon o'tkazadi. Termopasta bu tirqishlarni to'ldirib issiqlikni radiatorga tez yetkazadi."
      },
      {
        id: 4,
        question: "AMI BIOS'da kompyuter yoqilganda 3 ta qisqa audio signal eshitilsa, qaysi qismda xatolik bor?",
        options: [
          { key: "A", text: "Operativ xotira (RAM)" },
          { key: "B", text: "Sichqoncha simi" },
          { key: "C", text: "Monitor shnuri" }
        ],
        correctKey: "A",
        explanation: "AMI standartida 3 ta qisqa beep dastlabki 64KB operativ xotiraning testdan o'tmaganini bildiradi."
      },
      {
        id: 5,
        question: "UEFI tizimi eski klassik BIOS'dan nimasi bilan ustunlik qiladi?",
        options: [
          { key: "A", text: "2.2 TB dan katta GPT disklarni qo'llaydi, grafik interfeys va Secure Boot imkoniyatiga ega" },
          { key: "B", text: "U kompyuterni elektrsiz ishlatadi" },
          { key: "C", text: "Faqat DOS muhitida ishlaydi" }
        ],
        correctKey: "A",
        explanation: "UEFI zamonaviy apparat talablariga mos kelib, tez yuklanish, katta disklar va xavfsizlikni kafolatlaydi."
      },
      {
        id: 6,
        question: "DDR4 va DDR5 xotiralarining platadagi slotiga tushadigan pastki qismidagi tirqish (notch/kalit) nima uchun xizmat qiladi?",
        options: [
          { key: "A", text: "Mos kelmaydigan modulni yoki uni teskari o'rnatishdan mexanik himoyalash uchun" },
          { key: "B", text: "Kabelni o'tkazish uchun" },
          { key: "C", text: "Xotira narxini arzonlashtirish uchun" }
        ],
        correctKey: "A",
        explanation: "Kalit (notch) o'rni har bir DDR avlodida har xil bo'lib, boshqa avlod RAM ni noto'g'ri tiqib kuydirishning oldini oladi."
      },
      {
        id: 7,
        question: "Protsessorning TDP (Thermal Design Power) parametri nimani ifodalaydi?",
        options: [
          { key: "A", text: "Maksimal yuklamada ajralib chiqadigan issiqlik miqdorini (Vattlarda)" },
          { key: "B", text: "Klaviatura tugmalari bosilish sonini" },
          { key: "C", text: "Internet tezligini" }
        ],
        correctKey: "A",
        explanation: "TDP mos sovutish kulerini to'g'ri tanlash uchun eng asosiy hisobiy ko'rsatkichdir."
      },
      {
        id: 8,
        question: "Kompyuterning 'qora qutisi' hisoblangan va barcha xato kodlarini ikki xonali o'n oltilik sonda ko'rsatuvchi qurilma nima?",
        options: [
          { key: "A", text: "POST diagnostika kartasi (POST card)" },
          { key: "B", text: "Flash drayver" },
          { key: "C", text: "Veb-kamera" }
        ],
        correctKey: "A",
        explanation: "POST kartalari ona plataning LPC/PCIe shinasi orqali apparat tekshiruv kodlarini (masalan, 55, D6, AA) ko'rsatib beradi."
      },
      {
        id: 9,
        question: "80 PLUS Gold sertifikatiga ega bo'lgan quvvat bloki taxminan qanday foydali ish koeffitsientiga (FIK) ega bo'ladi?",
        options: [
          { key: "A", text: "~88% - 92% atrofida" },
          { key: "B", text: "Atigi 20%" },
          { key: "C", text: "150% ga teng" }
        ],
        correctKey: "A",
        explanation: "80 PLUS Gold quvvat bloklari elektr energiyasining 90% ga yaqinini foydali quvvatga aylantirib beradi."
      },
      {
        id: 10,
        question: "Kengaytirilgan xotira shinasida ma'lumotlar necha bitlik kenglikda parallel uzatiladi (Dual-Channel da)?",
        options: [
          { key: "A", text: "128 bit" },
          { key: "B", text: "8 bit" },
          { key: "C", text: "1024 bit" }
        ],
        correctKey: "A",
        explanation: "Bitta kanal 64-bit bo'lsa, ikkita kanal birgalikda 128-bit kenglikdagi ma'lumotlar oqimini uzatadi."
      }
    ]
  }
];
