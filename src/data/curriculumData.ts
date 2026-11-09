export interface Topic {
  id: string;
  number: number;
  title: string;
  category: string;
  summary: string;
  analogy: string;
  coreConcepts: {
    term: string;
    explanation: string;
  }[];
  practicalTips: string[];
  teacherQuote: string;
  selfCheckQuestions: {
    question: string;
    options: string[];
    correctIndex: number; // 0=A, 1=B, 2=C
    explanation: string;
  }[];
}

export const CURRICULUM_TOPICS: Topic[] = [
  {
    id: "architecture",
    number: 1,
    title: "Kompyuter Arxitekturasi va Fon Neyman Tamoyillari",
    category: "Nazariya va Baza",
    summary: "Kompyuter tizimlarining mantiqiy tuzilishi, funksional bloklarning o'zaro bog'liqligi va axborot oqimlarining harakat tamoyillari.",
    analogy: "Kompyuter xuddi zamonaviy oshxonaga o'xshaydi: Protsessor — bosh oshpaz, Xotira — ishchi stol, Shinalar — oshpazga mahsulot yetkazib beruvchi konveyer yo'laklaridir.",
    coreConcepts: [
      {
        term: "Fon Neyman tamoyili",
        explanation: "Dastur va ma'lumotlarning bitta umumiy xotirada saqlanishi hamda buyruqlarning ketma-ket (sekvensial) bajarilishi tamoyilidir."
      },
      {
        term: "Garvard arxitekturasi",
        explanation: "Fon Neymandan farqli ravishda, buyruqlar va ma'lumotlar uchun alohida-alohida mustaqil xotira va shinalarga ega bo'ladi (DSP va mikrokontrollerlarda keng qo'llaniladi)."
      },
      {
        term: "Buyruqlar sikli (Fetch-Decode-Execute)",
        explanation: "Protsessor xotiradan buyruqni o'qiydi (Fetch), uni deodlaydi (Decode), hisoblaydi (Execute) va natijani qayta yozadi (Writeback)."
      }
    ],
    practicalTips: [
      "Texnikum o'quvchilari uchun eng muhim ko'nikma — Fon Neyman to'sig'ini (shina orqali xotira bilan aloqadagi sekinlikni) tushunishdir.",
      "Kesh xotiralar aynan mana shu Fon Neyman to'sig'ini yumshatish uchun yaratilgan."
    ],
    teacherQuote: "Kompyuter arxitekturasini tushungan mutaxassis shunchaki foydalanuvchi emas, balki apparat ta'minotining ichki yurak urishini his qiluvchi muhandisdir!",
    selfCheckQuestions: [
      {
        question: "Fon Neyman arxitekturasining Garvard arxitekturasidan asosiy farqi nimada?",
        options: [
          "A) Buyruqlar va ma'lumotlar bir xil umumiy xotirada saqlanishi",
          "B) Protsessorning kuler bilan sovutilishi",
          "C) Faqat bitta kiritish qurilmasiga ega bo'lishi"
        ],
        correctIndex: 0,
        explanation: "Fon Neymanda ma'lumotlar va buyruqlar yagona manzil maydoniga ega bitta xotirada saqlanadi, Garvardda esa alohida shinalar va xotiralarga bo'linadi."
      },
      {
        question: "Protsessor buyruqni bajarishda birinchi bo'lib qaysi bosqichni amalga oshiradi?",
        options: [
          "A) Natijani xotiraga yozish (Writeback)",
          "B) Xotiradan buyruqni o'qib olish (Fetch)",
          "C) Buyruqni deodlash (Decode)"
        ],
        correctIndex: 1,
        explanation: "Buyruq sikli birinchi navbatda RAM yoki Keshdan buyruqni chaqirish (Fetch) bilan boshlanadi."
      },
      {
        question: "'Fon Neyman to'sig'i' (Von Neumann bottleneck) qaysi komponentlar orasidagi tezlik farqini bildiradi?",
        options: [
          "A) Monitor va klaviatura orasidagi",
          "B) Protsessor va tezkor xotira (RAM) o'rtasidagi ma'lumotlar o'tkazish tezligini",
          "C) Quvvat bloki va ventilyator o'rtasidagi"
        ],
        correctIndex: 1,
        explanation: "Protsessor soniyasiga milliardlab amal bajara oladi, biroq xotira shinasidan ma'lumot olish unga qaraganda ancha sekinroq kechadi."
      }
    ]
  },
  {
    id: "processor",
    number: 2,
    title: "Markaziy Protsessor (CPU) va Ichki Bloklar",
    category: "Apparat Ta'minoti",
    summary: "Protsessorning ichki tuzilishi: ALU, Boshqaruv qurilmasi (CU), Registrlar, Kesh pog'onalari (L1, L2, L3) va takt chastotasi.",
    analogy: "CPU — bu butun kompyuterning miyasi. ALU — uning kalkulyatori, registrlar — o'sha lahzada qo'lida ushlab turgan daftar varag'i, kesh esa ishchi ko'ylagining cho'ntagidir.",
    coreConcepts: [
      {
        term: "ALU (Arifmetik-mantiqiy qurilma)",
        explanation: "Qo'shish, ayirish, ko'paytirish hamda AND, OR, NOT, XOR kabi mantiqiy amallarni bajaruvchi mikrosxema blokidir."
      },
      {
        term: "CU (Control Unit - Boshqaruv qurilmasi)",
        explanation: "Kompyuterning barcha bloklari ishini muvofiqlashtiradi, buyruqlarni dekodlaydi va sinxronizatsiya signallarini yuboradi."
      },
      {
        term: "Kesh xotira (L1, L2, L3)",
        explanation: "Statik xotira (SRAM) asosida qurilgan o'ta yuqori tezlikdagi bufer. L1 — har bir yadro ichida eng tez, L3 — eng katta hajmga ega umumiy kesh."
      },
      {
        term: "Takt chastotasi va IPC",
        explanation: "Chastotalar gigagerslarda (GHz) o'lchanadi. Bir taktda qancha buyruq bajarilishi (IPC - Instructions Per Cycle) protsessorning haqiqiy unumdorligini belgilaydi."
      }
    ],
    practicalTips: [
      "Ustoz Isoqov Muzaffar maslahati: Protsessor unumdorligi faqat gigagerslar (GHz) soniga bog'liq emas, balki arxitekturaviy IPC va Kesh xotira hajmiga ham qattiq bog'liq!",
      "Protsessorni soketga qo'yganda oltin burchak (uchburchak belgi) soketdagi belgi bilan bir xil yo'nalishda bo'lishi shart."
    ],
    teacherQuote: "Zamonaviy protsessorda milliardlab tranzistorlar uyg'un ishlaydi. Nozik kontaktlarni egib qo'ymaslik uchun sabr va diqqat eng muhim qurolingizdir!",
    selfCheckQuestions: [
      {
        question: "Protsessorning qaysi kesh pog'onasi eng tez ishlaydi?",
        options: [
          "A) L1 kesh (Level 1)",
          "B) L2 kesh (Level 2)",
          "C) L3 kesh (Level 3)"
        ],
        correctIndex: 0,
        explanation: "L1 kesh protsessor yadrosining eng ichida joylashgan bo'lib, eng kam kechikish (latency) bilan ishlaydi."
      },
      {
        question: "Arifmetik va mantiqiy amallarni bajarishga qaysi qurilma javobgar?",
        options: [
          "A) Boshqaruv qurilmasi (CU)",
          "B) Arifmetik-mantiqiy qurilma (ALU)",
          "C) Takt generatori"
        ],
        correctIndex: 1,
        explanation: "ALU (Arithmetic Logic Unit) barcha hisoblash va taqqoslash operatsiyalarini bajaradi."
      },
      {
        question: "Protsessor soketiga noto'g'ri burchak bilan o'rnatilsa qanday xavf yuzaga keladi?",
        options: [
          "A) Kontakt oyoqlari (pinlar) egiladi yoki sinadi",
          "B) Xotira hajmi kamayib qoladi",
          "C) Monitor piksellari o'chadi"
        ],
        correctIndex: 0,
        explanation: "LGA yoki PGA soketlarida noto'g'ri o'rnatish nozik pinlarning egilishiga va tuzatib bo'lmas shikastlanishga olib keladi."
      }
    ]
  },
  {
    id: "memory",
    number: 3,
    title: "Xotira Turlari va Iyerarxiyasi (RAM, ROM, SSD, HDD)",
    category: "Xotira Tizimlari",
    summary: "Xotira iyerarxiyasining bosqichlari: Registrlar -> Kesh -> RAM -> Doimiy saqlash qurilmalari (NVMe SSD, HDD).",
    analogy: "Registrlar — ko'zdagi tasvir; Kesh — cho'ntak; RAM — ish stolidagi ochiq kitob; SSD — shkafdagi javon; HDD esa yerto'ladagi katta arxivdir.",
    coreConcepts: [
      {
        term: "RAM (Random Access Memory)",
        explanation: "Uchuvchan (energetikaga bog'liq) tezkor xotira. Tok uzilganda undagi barcha ma'lumotlar o'chib ketadi. Hozirda DDR4 va DDR5 turlari keng tarqalgan."
      },
      {
        term: "ROM (Read Only Memory)",
        explanation: "Faqat o'qish uchun mo'ljallangan, doimiy (energetikaga bog'liq bo'lmagan) xotira. Unda BIOS/UEFI mikrodasturlari saqlanadi."
      },
      {
        term: "Dual-Channel (Ikki kanalli rejim)",
        explanation: "Ikkita RAM modulini 2- va 4-slotlarga o'rnatish orqali xotira shinasi kengligi 64-bitdan 128-bitga oshadi va o'tkazuvchanlik 2 barobar tezlashadi."
      },
      {
        term: "NVMe M.2 SSD vs SATA",
        explanation: "SATA SSD tezligi maksimal ~550 MB/s bilan cheklanadi, NVMe PCIe x4 interfeysi orqali 3500-7000+ MB/s tezlikka erishadi."
      }
    ],
    practicalTips: [
      "Ustoz Isoqov Muzaffar eslatmasi: Yangi plataga 2 dona RAM qo'yganda odatda DIMM_A2 va DIMM_B2 (odatda 2- va 4-slotlar)ga qo'yilishi dual-channel rejimini kafolatlaydi.",
      "M.2 NVMe SSD qizib ketmasligi uchun albatta issiqlik radiatori (heatsink) va termoplyonka bilan o'rnatilishi lozim."
    ],
    teacherQuote: "Xotira iyerarxiyasi tezlik va narx o'rtasidagi mukammal muhandislik muvozanatidir. Har bir xotiraning o'z o'rni va vazifasi bor!",
    selfCheckQuestions: [
      {
        question: "Kompyuter elektr tarmog'idan uzilganda qaysi xotiradagi ma'lumotlar butunlay o'chib ketadi?",
        options: [
          "A) HDD qattiq diskidagi",
          "B) Operativ xotira (RAM)dagi",
          "C) BIOS saqlanadigan Flash ROM'dagi"
        ],
        correctIndex: 1,
        explanation: "RAM energetikaga bog'liq (volatile) xotiradir, quvvat yo'qolsa undagi kondensatorlar zaryadi so'nadi."
      },
      {
        question: "Ikki kanalli (Dual-Channel) rejimni faollashtirish uchun RAM modullari qanday o'rnatiladi?",
        options: [
          "A) Bitta slotga ikkita RAM qistirib qo'yiladi",
          "B) Tavsiya etilgan turli kanaldagi slotlarga (odatda 2 va 4-slot)",
          "C) Faqat videokarta yoniga sim bilan ulanadi"
        ],
        correctIndex: 1,
        explanation: "Ona plata qo'llanmasiga ko'ra A2 va B2 slotlarga o'rnatilsa, xotira kontrolleri ikki kanalni bir vaqtda ishlatadi."
      },
      {
        question: "Zamonaviy M.2 NVMe SSD qaysi shina orqali protsessor bilan to'g'ridan-to'g'ri aloqa qiladi?",
        options: [
          "A) PCI Express (PCIe) shinasi",
          "B) USB 2.0 porti",
          "C) VGA kabeli"
        ],
        correctIndex: 0,
        explanation: "NVMe drayverlari PCI Express liniyalaridan foydalangan holda o'ta tezkor o'tkazuvchanlikka ega bo'ladi."
      }
    ]
  },
  {
    id: "bus_interfaces",
    number: 4,
    title: "Tizimli Shinalar va Interfeyslar (PCIe, SATA, USB)",
    category: "Magistral Tizimlar",
    summary: "Ma'lumotlar shinasi, manzil shinasi, boshqaruv shinasi hamda tashqi yuqori tezlikdagi PCIe interfeysi tuzilishi.",
    analogy: "Shinalar — shaharning ko'p qatorli avtomagistrallaridir: Manzil shinasi marshrutni ko'rsatadi, Boshqaruv shinasi svetofor, Ma'lumotlar shinasi esa mashinalar olib ketayotgan yukdir.",
    coreConcepts: [
      {
        term: "Ma'lumotlar shinasi (Data Bus)",
        explanation: "Komponentlar orasida ma'lumot bitlarini ikki tomonlama (bidirectional) uzatishga xizmat qiladi (32-bit, 64-bit kenglikda)."
      },
      {
        term: "Manzillar shinasi (Address Bus)",
        explanation: "Protsessor xotiraning qaysi yacheykasiga murojaat qilayotganini belgilovchi bir tomonlama shina. Kengligi manzillash mumkin bo'lgan maksimal RAM hajmini aniqlaydi."
      },
      {
        term: "PCI Express (PCIe)",
        explanation: "Ketma-ket (serial) nuqtadan-nuqtaga ulanuvchi shina. x1, x4, x8, x16 liniyalari mavjud bo'lib, videokartalar va tezkor SSD drayverlar uchun qo'llaniladi."
      }
    ],
    practicalTips: [
      "Texnik eslatma: 32-bitli manzil shinasi faqat 2^32 = 4 GB xotirani manzillay oladi. Shu sababli zamonaviy tizimlar 64-bitli arxitekturaga to'liq o'tgan.",
      "Videokartani har doim ona platadagi protsessorga eng yaqin turgan yuqori PCIe x16 slotiga qo'yish kerak, chunki u to'g'ridan-to'g'ri CPU liniyalariga ulangan."
    ],
    teacherQuote: "Keng magistral yo'l bo'lmasa, eng tezkor sportkar ham tirbandlikda qoladi. Shina o'tkazuvchanligi butun tizim tezligini belgilaydi!",
    selfCheckQuestions: [
      {
        question: "Manzillar shinasi kengligi 32 bit bo'lgan tizim eng ko'pi bilan qancha operativ xotirani manzillay oladi?",
        options: [
          "A) 4 Gigabayt (GB)",
          "B) 64 Gigabayt (GB)",
          "C) 1 Terabayt (TB)"
        ],
        correctIndex: 0,
        explanation: "2^32 bayt = 4,294,967,296 bayt, ya'ni roppa-rosa 4 GB. Shu sababli 32-bit operatsion tizimlar 4 GB dan ortiq RAM ko'rmaydi."
      },
      {
        question: "Zamonaviy grafik kartalar (GPU) odatda ona platadagi qaysi slotga o'rnatiladi?",
        options: [
          "A) PCIe x16 slotiga",
          "B) SATA 3 portiga",
          "C) COM-portga"
        ],
        correctIndex: 0,
        explanation: "Grafik kartalarga maksimal o'tkazuvchanlik kerak bo'lgani sababli ular 16 ta liniyaga ega PCIe x16 slotiga ulanadi."
      },
      {
        question: "Qaysi shina orqali 'o'qish' yoki 'yozish' kabi boshqaruvchi buyruq signallari uzatiladi?",
        options: [
          "A) Boshqaruv shinasi (Control Bus)",
          "B) Ma'lumotlar shinasi (Data Bus)",
          "C) Audio jack kabeli"
        ],
        correctIndex: 0,
        explanation: "Boshqaruv shinasi (Control Bus) xotiraga o'qish/yozish, tayyorgarlik va uzilish signallarini uzatadi."
      }
    ]
  },
  {
    id: "bios_uefi",
    number: 5,
    title: "BIOS, UEFI va CMOS (Yuklash Jarayoni va POST)",
    category: "Mikrodasturlar",
    summary: "Kompyuter yoqilganda dastlabki uskunaviy diagnostika (POST), CMOS parametrlarini saqlash va operatsion tizimni yuklash mexanizmi.",
    analogy: "BIOS/UEFI — samolyot uchishidan oldingi bort kompyuteri va styuardessasi: barcha datchiklar, motor va qanotlarni birma-bir tekshirib (POST), keyin uchuvchiga (OTga) boshqaruvni topshiradi.",
    coreConcepts: [
      {
        term: "POST (Power-On Self-Test)",
        explanation: "Kompyuter quvvat tugmasi bosilganda protsessor, xotira, videokarta va boshqa apparat qismlarini birlamchi testdan o'tkazish algoritmi."
      },
      {
        term: "CMOS batareyasi (CR2032)",
        explanation: "Kompyuter tokdan uzilganda BIOS sozlamalari, real vaqt soati (RTC) xotirasini saqlab turuvchi 3 voltli litiy batareyka."
      },
      {
        term: "UEFI (Unified Extensible Firmware Interface)",
        explanation: "Eski BIOS o'rnini egallagan zamonaviy mikrodastur. Sichqoncha bilan ishlash, 2.2 TB dan katta drayverlar (GPT disk) va Secure Boot imkoniyatiga ega."
      }
    ],
    practicalTips: [
      "Ustoz Isoqov Muzaffar maslahati: Agar kompyuter har safar yoqilganda F1 so'rasa va sana 2000-yilga qaytib qolsa, muammoni CMOS CR2032 batareykasini multimetrda o'lchash (kamida 2.8V-3V bo'lishi kerak) va almashtirish bilan hal qilinadi.",
      "Clear CMOS jumperi yoki batareyani 5 daqiqaga sug'urib qo'yish BIOS paroli va noto'g'ri sozlamalarni zavod holatiga qaytaradi."
    ],
    teacherQuote: "POST tovushli signallarini (beep codes) yod olish — kompyuter ustasining eng tezkor diagnostika qurolidir!",
    selfCheckQuestions: [
      {
        question: "Kompyuter yoqilganda apparat qismlarini tekshiruvchi birlamchi dastur nima deb ataladi?",
        options: [
          "A) POST (Power-On Self-Test)",
          "B) DirectX Diagnostic",
          "C) Antivirus scan"
        ],
        correctIndex: 0,
        explanation: "POST kompyuter yoqilishi bilanoq barcha qismlarni tekshiradi va nosozlik bo'lsa audio signal yoki xato kodi beradi."
      },
      {
        question: "Kompyuter o'chirilganda BIOS sozlamalari va soat vaqtini saqlab turuvchi batareyka kodi qanday?",
        options: [
          "A) CR2032 (3 Volt)",
          "B) AA batareyka (1.5 Volt)",
          "C) 18650 akkumulyator"
        ],
        correctIndex: 0,
        explanation: "Ona platalarda deyarli barcha hollarda CR2032 tangasimon litiy batareykasi ishlatiladi."
      },
      {
        question: "UEFI tizimi eski BIOS'ga nisbatan qanday muhim afzallikka ega?",
        options: [
          "A) Faqat disketalar bilan ishlay oladi",
          "B) 2.2 TB dan katta disklarni (GPT) qo'llab-quvvatlaydi va tezroq yuklanadi",
          "C) Protsessorga kuler o'rnatishni bekor qiladi"
        ],
        correctIndex: 1,
        explanation: "UEFI GPT formatidagi ulkan disklarni, grafik interfeysni va xavfsiz yuklash (Secure Boot)ni ta'minlaydi."
      }
    ]
  },
  {
    id: "motherboard",
    number: 6,
    title: "Ona Plata (Motherboard), Chipset va VRM",
    category: "Apparat Ta'minoti",
    summary: "Barcha komponentlarni birlashtiruvchi markaziy bosma plata: Soket turlari, Chipset (Hub arxitekturasi), VRM quvvat fazalari.",
    analogy: "Ona plata — bu butun davlatning transport va elektr tarmog'i. Chipset — shahar hokimiyati, VRM fazalari esa elektr podstansiyasidir.",
    coreConcepts: [
      {
        term: "LGA vs PGA soket",
        explanation: "LGA (Land Grid Array): kontakt oyoqlari ona plata soketida bo'ladi (Intel va zamonaviy AMD AM5). PGA (Pin Grid Array): oyoqchalar protsessorning o'zida bo'ladi (eski AMD AM4)."
      },
      {
        term: "Chipset",
        explanation: "Protsessor bilan periferik qurilmalar (SATA, USB, audio, tarmoq) o'rtasidagi aloqani boshqaruvchi mikrosxemalar to'plami."
      },
      {
        term: "VRM (Voltage Regulator Module)",
        explanation: "Quvvat blokidan kelayotgan 12V kuchlanishni protsessor talab qiladigan nozik ~1.1V - 1.35V kuchlanishga tushirib, tozalab beruvchi drossel, kondensator va mosfetlar zanjiri."
      }
    ],
    practicalTips: [
      "Kuchli protsessor qo'yilganda, ona platadagi VRM qismida radiatorlar bor-yo'qligiga qarang. Agar VRM qizib ketsa, protsessor chastotasini keskin tushirib yuboradi (trottling).",
      "LGA soket qopqog'ini ochganda aslo barmoq bilan soket ichidagi kontaktlarga tegmang!"
    ],
    teacherQuote: "Ona plata — tizimning asosi. Sifatsiz ona plataga eng qimmat protsessorni qo'ysangiz ham, tizim barqaror ishlay olmaydi!",
    selfCheckQuestions: [
      {
        question: "LGA (Land Grid Array) soketining PGA soketidan asosiy farqi nimada?",
        options: [
          "A) Kontakt oyoqchalari (pinlar) ona platadagi soket ichida joylashgan",
          "B) Unda umuman elektr toki oqmaydi",
          "C) Faqat noutbuklarda ishlatiladi"
        ],
        correctIndex: 0,
        explanation: "LGA soketlarida pinlar platada bo'ladi, protsessor orqasida esa silliq kontakt maydonchalari bo'ladi."
      },
      {
        question: "VRM moduli quvvat blokidan kelgan 12 Voltni protsessor uchun taxminan necha voltga tushirib beradi?",
        options: [
          "A) ~1.1V - 1.35V atrofida",
          "B) 220V ga ko'taradi",
          "C) 50V ga tushiradi"
        ],
        correctIndex: 0,
        explanation: "Zamonaviy protsessorlar mikroskopik tranzistorlardan iborat bo'lib, ular ~1.1V - 1.35V atrofida oziqlanadi."
      },
      {
        question: "VRM drossellari va mosfetlari haddan tashqari qizib ketsa qanday hodisa ro'y beradi?",
        options: [
          "A) Protsessor qizib ketmaslik uchun chastotasini keskin tushiradi (Thermal Throttling)",
          "B) Windows tili o'z-o'zidan o'zgaradi",
          "C) Monitor ranglari qorayadi"
        ],
        correctIndex: 0,
        explanation: "VRM qizib ketganda himoya tizimi ishga tushib, CPU chastotasini pasaytiradi yoki tizimni o'chiradi."
      }
    ]
  },
  {
    id: "io_systems",
    number: 7,
    title: "Kiritish-Chiqarish (I/O) Tizimlari, Uzilishlar (IRQ) va DMA",
    category: "Qurilmalar Boshqaruvi",
    summary: "Periferiya qurilmalari bilan ma'lumot almashish usullari: Dasturiy so'rov (Polling), Uskunaviy uzilishlar (IRQ), va To'g'ridan-to'g'ri xotiraga murojaat (DMA).",
    analogy: "Polling — o'qituvchining har soniyada har bir o'quvchiga 'savoling bormi?' deb so'rashi. Uzilish (IRQ) — o'quvchining savoli bo'lganda qo'l ko'tarishi!",
    coreConcepts: [
      {
        term: "IRQ (Interrupt Request)",
        explanation: "Tashqi qurilmaning protsessorga darhol e'tibor talab qilinayotgani haqidagi apparat signali (masalan, klaviatura tugmasi bosilishi)."
      },
      {
        term: "DMA (Direct Memory Access)",
        explanation: "Tezkor tashqi qurilmalarning (tarmoq kartasi, disk kontrolleri) protsessorni bezovta qilmasdan to'g'ridan-to'g'ri RAM bilan ma'lumot almashishi."
      },
      {
        term: "Drayver",
        explanation: "Operatsion tizim yadrosiga muayyan uskunaviy apparat qurilmasi bilan qanday muloqot qilishni o'rgatuvchi maxsus dasturiy interfeys."
      }
    ],
    practicalTips: [
      "Agar DMA mexanizmi bo'lmaganida, diskdan bitta kinoni ko'chirganda protsessor 100% yuklanib, butun kompyuter qotib qolgan bo'lardi.",
      "Qurilmalar menejerida sariq undov belgisi tursa — drayver o'rnatilmagan yoki IRQ/resurs to'qnashuvi borligini bildiradi."
    ],
    teacherQuote: "IRQ va DMA arxitekturasini bilgan o'quvchi kompyuter nima sababdan to'satdan qotib qolayotganini drayver darajasida tushunadi!",
    selfCheckQuestions: [
      {
        question: "DMA (Direct Memory Access) mexanizmining eng katta foydasi nimada?",
        options: [
          "A) Ma'lumotlarni protsessorni band qilmasdan to'g'ridan-to'g'ri xotiraga yozadi/o'qiydi",
          "B) Monitorga yuqori sifatli rasm chiqaradi",
          "C) Kompyuter korpusining haroratini pasaytiradi"
        ],
        correctIndex: 0,
        explanation: "DMA tufayli katta hajmdagi fayllar RAM va drayverlar orasida protsessor resursini yemasdan o'tadi."
      },
      {
        question: "Klaviatura tugmasi bosilganda protsessorga qanday signal yuboriladi?",
        options: [
          "A) Apparat uzilishi (Hardware IRQ)",
          "B) Hech qanday signal yuborilmaydi",
          "C) O'chirish (Shutdown) buyrug'i"
        ],
        correctIndex: 0,
        explanation: "Klaviaturadagi tugma bosilishi apparat uzilish signalini yuboradi va CPU o'sha belgi kodini qabul qiladi."
      },
      {
        question: "Operatsion tizim yangi ulangan qurilmani tushunishi uchun unga nima o'rnatilishi shart?",
        options: [
          "A) Maxsus drayver dasturi",
          "B) O'yinlar to'plami",
          "C) Yangi klaviatura kabeli"
        ],
        correctIndex: 0,
        explanation: "Drayver operatsion tizim bilan fizik qurilma kontrolleri o'rtasidagi tarjimon vazifasini bajaradi."
      }
    ]
  },
  {
    id: "power_cooling",
    number: 8,
    title: "Quvvat Ta'minoti (PSU) va Sovutish Tizimlari",
    category: "Elektrotexnika va Xavfsizlik",
    summary: "220V o'zgaruvchan tokni 12V, 5V, 3.3V o'zgarmas tokka aylantirish, 80 PLUS sertifikatlari, TDP va samarali kuler tanlash.",
    analogy: "Quvvat bloki — kompyuterning yuragi bo'lsa, simlar tomirlar, kuler esa qizib ketishdan asrovchi o'pkadir.",
    coreConcepts: [
      {
        term: "Asosiy kuchlanish liniyalari",
        explanation: "+12V (CPU, Videokarta va motorlar uchun eng yuklamali liniya), +5V (mantiqiy sxemalar, USB, SSD) va +3.3V (RAM, chipset mantiqi)."
      },
      {
        term: "80 PLUS sertifikatsiyasi",
        explanation: "Quvvat blokining foydali ish koeffitsienti (FIK) kamida 80% bo'lishini kafolatlaydi (Bronze, Silver, Gold, Platinum, Titanium)."
      },
      {
        term: "TDP (Thermal Design Power)",
        explanation: "Komponent (CPU yoki GPU) maksimal yuklama ostida havoga chiqaradigan issiqlik miqdori (Vattlarda). Sovutish tizimi kuchi TDP dan yuqori bo'lishi shart!"
      },
      {
        term: "Termopasta vazifasi",
        explanation: "Protsessor qopqog'i va kuler radiatori orasidagi ko'zga ko'rinmas mikroskopik havo bo'shliqlarini to'ldirib, issiqlik o'tkazuvchanligini bir necha barobar oshiradi."
      }
    ],
    practicalTips: [
      "Ustoz Isoqov Muzaffar qat'iy qoidasi: Termopastani ortiqcha ko'p surtmang! No'xat donasidek miqdor radiator bosimi ostida yupqa tekis qatlam hosil qilishi kifoya.",
      "Arzon, nomsiz quvvat bloklarida 12V liniyasi o'zgaruvchan bo'lib, qimmat videokarta yoki qattiq disk mikrosxemasini kuydirib yuborishi mumkin."
    ],
    teacherQuote: "Elektr xavfsizligi va harorat nazorati — har bir kompyuter ustasining birinchi raqamli oltin qoidasidir!",
    selfCheckQuestions: [
      {
        question: "Protsessor va kuler radiatori o'rtasiga nega termopasta surtiladi?",
        options: [
          "A) Mikroskopik havo bo'shliqlarini to'ldirib, issiqlik uzatilishini yaxshilash uchun",
          "B) Kulerni protsessorga yopishtirib, umuman ajralmas qilish uchun",
          "C) Kompyuter shovqinini kamaytirish uchun"
        ],
        correctIndex: 0,
        explanation: "Havo issiqlikni juda yomon o'tkazadi. Termopasta metall yuzalar orasidagi mikroskopik tirqishlarni to'ldiradi."
      },
      {
        question: "Zamonaviy kompyuterda eng ko'p quvvat talab qiladigan komponentlar (CPU va GPU) qaysi kuchlanish liniyasidan oziqlanadi?",
        options: [
          "A) +12 Volt liniyasi",
          "B) +5 Volt liniyasi",
          "C) -12 Volt liniyasi"
        ],
        correctIndex: 0,
        explanation: "+12V liniyasi quvvat blokidagi eng quvvatli liniya bo'lib, CPU va grafik karta aynan undan quvvat oladi."
      },
      {
        question: "Quvvat blokidagi '80 PLUS Gold' sertifikati nimani anglatadi?",
        options: [
          "A) Quvvat blokining FIK (foydali ish koeffitsienti) kamida 87-90% atrofida ekanini",
          "B) Uning korpusi sof oltindan qilinganini",
          "C) U faqat 80 kun kafolatga egaligini"
        ],
        correctIndex: 0,
        explanation: "80 PLUS Gold sertifikati elektr energiyasini minimal isrofgarchilik bilan yuqori samaradorlikda aylantirib beradi."
      }
    ]
  }
];
