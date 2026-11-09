export interface DetectiveCase {
  id: string;
  caseNumber: number;
  title: string;
  difficulty: "Oson" | "O'rta" | "Qiyin";
  systemSpecs: string;
  symptoms: string;
  beepPattern: '3-short' | '1-long-2-short' | '1-short' | 'continuous' | '5-short';
  beepDescription: string;
  postCode: string;
  visualClue: string;
  question: string;
  hint: string;
  options: {
    id: "A" | "B" | "C";
    text: string;
  }[];
  correctOption: "A" | "B" | "C";
  detailedExplanation: string;
  practicalFix: string;
  teacherAdvice: string;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: "case-1",
    caseNumber: 1,
    title: "Misteriyali Qora Ekran va 3 ta Qisqa Signal",
    difficulty: "Oson",
    systemSpecs: "Ona plata: ASUS H510M, CPU: Core i3-10100F, RAM: 1x 8GB DDR4 2666MHz, GPU: GTX 1650",
    symptoms: "Foydalanuvchi kompyuterni yoqqanda kulerlar aylanadi, korpus indikatori yonadi, biroq ekranga umuman tasvir chiqmaydi. Tizimli dinamik (speaker) 3 marta qisqa tovush signali (beep) chiqaradi va jim bo'ladi.",
    beepPattern: "3-short",
    beepDescription: "3 marta qisqa ketma-ket 'bip-bip-bip' signali",
    postCode: "C1 / 55 (Memory Detection Error)",
    visualClue: "Ona platadagi DRAM LED indikatori qizil/sariq rangda yonib turibdi, ekran qop-qora.",
    question: "Kompyuter Detektivi, speaker signali va POST ko'rsatkichiga qarab muammo qaysi komponentda ekanini aniqlang:",
    hint: "AMI BIOS standartida 3 ta qisqa signal asosiy xotiraning dastlabki 64KB qismidagi xatolikni bildiradi.",
    options: [
      {
        id: "A",
        text: "Operativ xotira (RAM) moduli nosoz, kontaktlari ifloslangan yoki slotga to'liq tushmagan"
      },
      {
        id: "B",
        text: "Klaviatura kabeli uzilgan yoki USB port kuygan"
      },
      {
        id: "C",
        text: "Monitorning 220V elektr shnuri kuyib ketgan"
      }
    ],
    correctOption: "A",
    detailedExplanation: "AMI BIOS'da 3 ta qisqa signal (va ASUS platasidagi DRAM LED yonishi) to'g'ridan-to'g'ri operativ xotiradagi nosozlikni bildiradi. Odatda bu xotira kontaktlariga chang tushishi, oksidlanishi yoki modul slot qisqichiga to'liq o'tirmaganidan kelib chiqadi.",
    practicalFix: "1) Kompyuterni tokdan uzing. 2) RAM modulini slotdan ehtiyotkorlik bilan yechib oling. 3) Kontakt oyoqlarini oddiy yumshoq o'chirg'ich (lastik) bilan ehtiyotkorlik bilan tozalang va spirtli salfetkada arting. 4) Boshqa slotga qisqichlar chertib yopilgunicha to'g'ri joylashtiring.",
    teacherAdvice: "Ustozingiz Isoqov Muzaffar: 'Barakalla! RAM kontaktlarini tozalash va to'g'ri o'rnatish har bir kompyuter ustasining kundalik birinchi amaliyotidir.'"
  },
  {
    id: "case-2",
    caseNumber: 2,
    title: "10 Daqiqa Ishlab To'satdan O'chib Qoluvchi Kompyuter",
    difficulty: "O'rta",
    systemSpecs: "Ona plata: Gigabyte B450, CPU: AMD Ryzen 5 3600, Cooler: Zavodiy Box Kuler, PSU: 600W",
    symptoms: "Kompyuter oddiy yoqiladi, Windows yuklanadi. O'quvchi biror dastur yoki video ochganidan 8-10 daqiqa o'tgach, hech qanday ko'k ekran (BSOD) bermasdan birdan 'taq' etib butunlay o'chib qoladi. Darhol yoqilsa 10 soniyada o'chadi, biroz kutib yoqilsa yana 10 daqiqa ishlaydi.",
    beepPattern: "1-short",
    beepDescription: "Yoqilganda 1 ta qisqa signal (POST OK), lekin keyin to'satdan o'chadi",
    postCode: "AA (Normal boot), biroq o'chish oldidan harorat 98°C ga yetadi",
    visualClue: "Kuler radiatori qisqichining bitta tomoni bo'shab qolgan, radiator protsessor qopqog'iga jips tegmayapti, termopasta toshdek qotib qurigan.",
    question: "Kompyuterning yuklama vaqtida to'satdan o'chib, sovgach yana ishlab ketishining asl sababi nima?",
    hint: "Vaqtga bog'liqlik va harorat: zamonaviy protsessorlar xavfli harorat chegarasiga yetganda apparat darajasida o'zini o'chiradi.",
    options: [
      {
        id: "A",
        text: "Kompyuterga virus tushgan va Windows o'z-o'zidan o'chyapti"
      },
      {
        id: "B",
        text: "Protsessorning haddan tashqari qizib ketishi (Thermal Shutdown) — kuler fiksatsiyasi bo'shagan va termopasta qurigan"
      },
      {
        id: "C",
        text: "Monitor matritsasi qizib o'chib qolyapti"
      }
    ],
    correctOption: "B",
    detailedExplanation: "Ryzen 5 protsessorining Tjunction maksimal harorati 95°C. Radiator jips tegmaganida va termopasta toshdek quriganida, issiqlik radiatordan havoga ketmaydi. CPU harorati bir necha daqiqada 100°C ga yetib, ona plata protsessorni kuyib ketishdan saqlash uchun favqulodda himoya (PROCHOT) rejimida tokni kesadi.",
    practicalFix: "1) Kuler radiatorini yechib oling. 2) Eski qotgan termopastani izopropil spirti bilan tozalang. 3) Yangi sifatli termopastani (masalan Arctic MX-4) no'xatdek o'rtaga surting. 4) Kuler fiksatorlarini bir tekis va mustahkam qotiring.",
    teacherAdvice: "Ustozingiz Isoqov Muzaffar: 'Termik himoyani to'g'ri baholadingiz! Kompyuter tizimlarida issiqlik nazorati barqarorlikning asosiy kafolatidir.'"
  },
  {
    id: "case-3",
    caseNumber: 3,
    title: "1 Uzun va 2 Qisqa Signal — Tasvir Qani?",
    difficulty: "O'rta",
    systemSpecs: "Ona plata: MSI B560 Torpedo, CPU: Core i5-11400F (Grafik yadrosiz), GPU: RTX 3060",
    symptoms: "Yangi yig'ilgan kompyuter yoqilganda 1 ta uzun va ketidan 2 ta qisqa signal beradi. Monitor ekrani 'No Signal' deb yozib kutish rejimiga o'tadi. O'quvchi monitor kabelini ona plataning HDMI portiga ulagan.",
    beepPattern: "1-long-2-short",
    beepDescription: "1 ta uzun va ketma-ket 2 ta qisqa signal",
    postCode: "D6 (No Console Output Devices are found)",
    visualClue: "Monitor kabeli ona plataning orqa panelidagi HDMI portiga tiqilgan. Ammo 'F' indeksli protsessorda o'rnatilgan grafika mavjud emas!",
    question: "Tizim nega videoni chiqara olmayapti va POST 1 uzun 2 qisqa signal bermoqda?",
    hint: "Intel 'F' seriyali (masalan i5-11400F) protsessorlarida ichki video yadro (iGPU) bo'lmaydi. Monitor qayerga ulanishi kerak?",
    options: [
      {
        id: "A",
        text: "Monitor kabeli ona plataga emas, diskret videokarta (RTX 3060) portiga ulanishi kerak, shuningdek videokarta PCIe slotida yoki quvvat kabelida tekshiriladi"
      },
      {
        id: "B",
        text: "Ona plataga yangi qattiq disk ulanmagani sababli tasvir chiqmayapti"
      },
      {
        id: "C",
        text: "Klaviaturadagi CapsLock tugmasi bosilib qolgan"
      }
    ],
    correctOption: "A",
    detailedExplanation: "Ko'p uchraydigan klassik xato! 'F' indeksli CPU larda ichki grafik yadro yo'q, ona plata orqasidagi video chiqishlar ishlamaydi. Monitor simi albatta diskret videokarta portiga ulanishi shart. Shuningdek 1 uzun 2 qisqa signal videokarta aniqlanmaganini yoki uning 8-pin qo'shimcha quvvat kabeli ulanmaganini ham bildiradi.",
    practicalFix: "HDMI/DisplayPort kabelini pastki qismdagi alohida videokarta portiga o'tkazing. Videokartaga quvvat blokidan kelgan 8-pin PCI-e quvvat simi to'liq kirganini tekshiring.",
    teacherAdvice: "Ustozingiz Isoqov Muzaffar: 'Ajoyib natija! Texnikum ustaxonasida o'quvchilar eng ko'p yo'l qo'yadigan xatolardan birini bir zumda fosh qildingiz!'"
  },
  {
    id: "case-4",
    caseNumber: 4,
    title: "Sana 2000-yilga Qaytishi va Har Yoqilganda F1 So'rashi",
    difficulty: "Oson",
    systemSpecs: "Ofis kompyuteri: Core i3 4-avlod, ASUS H81M, 500GB HDD",
    symptoms: "Kompyuter elektr rozetkasidan uzilib qayta yoqilganda 'CMOS Checksum Error - Defaults Loaded. Press F1 to Run SETUP' yozuvi chiqadi. Windows yuklangach esa soat va sana har doim 00:00, 2000-yil 1-yanvarga qaytib qolyapti, brauzerlar esa sertifikat xatosini beradi.",
    beepPattern: "1-short",
    beepDescription: "Yoqilganda 1 ta standart qisqa signal, so'ngra ekranda CMOS xatosi to'xtab turadi",
    postCode: "CMOS Error / F1 Prompt",
    visualClue: "Ona platada CR2032 tangasimon batareyka turibdi. Multimetr bilan o'lchanganda kuchlanish 1.1V ni ko'rsatmoqda (norma: 3.0V).",
    question: "Ushbu nosozlikning sababchisi nima va uni qanday tuzatish kerak?",
    hint: "Kompyuter o'chirilganda BIOS sozlamalari va soat hisobini qaysi kichik element quvvatlab turadi?",
    options: [
      {
        id: "A",
        text: "Windows operatsion tizimini qayta o'rnatish kerak"
      },
      {
        id: "B",
        text: "Ona platadagi 3 Voltli CR2032 CMOS litiy batareyasi zaryadsizlangan, uni yangisiga almashtirish lozim"
      },
      {
        id: "C",
        text: "Qattiq disk boshchalari ishdan chiqqan"
      }
    ],
    correctOption: "B",
    detailedExplanation: "CMOS xotirasi (NVRAM) va Real-Time Clock (RTC) chipi kompyuter tokdan uzilganda CR2032 batareykasidan oziqlanadi. Agar uning quvvati 2.6V dan pastga tushsa, sozlamalar saqlanmaydi va har safar zavod parametrlariga qaytadi.",
    practicalFix: "Eski CR2032 batareykasini maxsus qisqichni bosib chiqaring. Yangi 3.0V CR2032 batareykasini 'plyus' (+) belgisi yuqoriga qaragan holda joylashtiring, BIOS ga kirib to'g'ri sana va vaqtni o'rnating va F10 (Save & Exit) bosing.",
    teacherAdvice: "Ustozingiz Isoqov Muzaffar: 'To'g'ri! Multimetr bilan element kuchlanishini o'lchash — laboratoriya mashg'ulotlarimizdagi eng muhim mahoratdir!'"
  },
  {
    id: "case-5",
    caseNumber: 5,
    title: "O'yin Boshlanishi Bilanoq Qayta Yuklanish (Reboot)",
    difficulty: "Qiyin",
    systemSpecs: "Ona plata: B550, CPU: Ryzen 7 5700X, GPU: RX 6800 XT (TDP ~300W), PSU: 450W nomsiz (NoName)",
    symptoms: "Kompyuter Windows ish stolida, videoroliklar ko'rganda juda tinch va muammosiz ishlaydi. Biroq 3D o'yin yoki og'ir render dasturi ishga tushirilib, videokartaga to'liq yuklama tushishi bilanoq kompyuter birdan o'chib qayta yonadi (reboot).",
    beepPattern: "1-short",
    beepDescription: "Oddiy holatda 1 beep, yuklamada esa to'satdan qayta yoqiladi",
    postCode: "Normal holatda 00/AA, yuklamada quvvat kesiladi",
    visualClue: "Tizimga 300W istemol qiluvchi kuchli GPU o'rnatilgan, quvvat bloki esa arzon 450W bo'lib, uning +12V liniyasi atigi 280W quvvat bera oladi.",
    question: "O'yinda kompyuterning to'satdan 'reboot' bo'lishiga nima sabab bo'lmoqda?",
    hint: "Komponentlarning energiya sarfi (TDP) va quvvat blokining +12V liniyasidagi maksimal oqim kuchi (Amper).",
    options: [
      {
        id: "A",
        text: "Klaviatura drayverlari eskirgan"
      },
      {
        id: "B",
        text: "Quvvat bloki (PSU) quvvati yetarli emas — videokarta pik yuklamaga chiqqanda blokning 12V himoyasi (OCP/OPP) ishlab tokni o'chirmoqda"
      },
      {
        id: "C",
        text: "Monitor yangilanish chastotasi (Hz) haddan tashqari yuqori"
      }
    ],
    correctOption: "B",
    detailedExplanation: "RX 6800 XT kabi kuchli grafik kartalar pik paytlarda 350-400W gacha quvvat so'rashi mumkin (transient spikes). 450W nomsiz quvvat bloki bunday yuklamani ko'tara olmay, kuchlanish tushib ketadi (drop) yoki ichki himoya (Over Current Protection) tizimni o'chiradi.",
    practicalFix: "Tizimga kamida 750W quvvatga ega, 80 PLUS Gold sertifikatli, ishonchli ishlab chiqaruvchining quvvat blokini o'rnatish kerak.",
    teacherAdvice: "Ustozingiz Isoqov Muzaffar: 'Ofarin! Quvvat blokini to'g'ri hisoblash — kompyuter tizimlari muhandisining eng mas'uliyatli vazifasidir!'"
  },
  {
    id: "case-6",
    caseNumber: 6,
    title: "Doimiy Uzluksiz Signal va Hech Qanday Reaksiya",
    difficulty: "Qiyin",
    systemSpecs: "Ona plata: Intel Z690, CPU: Core i7-12700K, PSU: 750W Gold",
    symptoms: "Quvvat tugmasi bosilganda kompyuter dinamigi to'xtovsiz, uzluksiz 'biiiiiiiiiiip...' deb chiyillab turadi. Monitor qora, kulerlar maksimal tezlikda aylanadi.",
    beepPattern: "continuous",
    beepDescription: "To'xtovsiz, uzluksiz chiyillash tovushi",
    postCode: "00 / FF (CPU not detected / Power error)",
    visualClue: "Ona platadagi protsessor quvvat kabeli (8-pin EPS 12V) ulanmagan yoki quvvat blokining 24-pin ulagichi oxirigacha kirmagan.",
    question: "Uzluksiz doimiy beep signali nimani ko'rsatadi?",
    hint: "Award/AMI BIOS arxitekturasida uzluksiz to'xtovsiz signal quvvat manbai yoki elektr oziqlantirishdagi jiddiy muammodir.",
    options: [
      {
        id: "A",
        text: "Sichqoncha batareyasi tugagan"
      },
      {
        id: "B",
        text: "Quvvat ta'minoti nosozligi yoki ona plataga protsessorning 8-pin CPU 12V quvvat kabeli ulanmagan"
      },
      {
        id: "C",
        text: "Brauzer keshi to'lib ketgan"
      }
    ],
    correctOption: "B",
    detailedExplanation: "Doimiy uzluksiz signal odatda quvvat blokidan asosiy shinalarga kerakli kuchlanish (ayniqsa CPU 12V liniyasi) kelmayotganini bildiradi. Agar 8-pin CPU kabeli ulanmasa, protsessor ishga tusha olmaydi va POST xatolik haqida to'xtovsiz bong uradi.",
    practicalFix: "1) Quvvat manbaining ona plataga boruvchi 24-pin asosiy kabeli va CPU ustidagi 8-pin qo'shimcha quvvat kabeli mahkam qotirilganini tekshiring. 2) Multimetr yoki PSU tester orqali barcha liniyalarni tekshiring.",
    teacherAdvice: "Ustozingiz Isoqov Muzaffar: 'Juda chuqur bilim! Elektr zanjiridagi har bir ulagichni tekshirish — xavfsiz ishning garovidir!'"
  }
];
