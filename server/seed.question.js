const db = require("./database");

const questions = [

    // ==================================================
    // DASTURLASH — 30 TA
    // ==================================================

    {
        subject: "Dasturlash",
        question: "HTML nimaning qisqartmasi?",
        a: "Hyper Text Markup Language",
        b: "High Transfer Machine Language",
        c: "Home Text Making Language",
        d: "Hyper Tool Multi Language",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "HTML asosan nima uchun ishlatiladi?",
        a: "Ma'lumotlar bazasini boshqarish uchun",
        b: "Web sahifa tuzilishini yaratish uchun",
        c: "Operatsion tizim yaratish uchun",
        d: "Internet tezligini oshirish uchun",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "CSS nimaning qisqartmasi?",
        a: "Computer Style System",
        b: "Creative Style Sheet",
        c: "Cascading Style Sheets",
        d: "Central Styling System",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "CSS nima uchun ishlatiladi?",
        a: "Web sahifa dizayni uchun",
        b: "Server yaratish uchun",
        c: "Ma'lumotlar bazasi yaratish uchun",
        d: "Kompyuterni o‘chirish uchun",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "JavaScript asosan nima uchun ishlatiladi?",
        a: "Faqat matn yozish uchun",
        b: "Web sahifaga interaktivlik qo‘shish uchun",
        c: "Monitor sozlash uchun",
        d: "Internet kabelini ulash uchun",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "HTMLda eng katta sarlavha tegi qaysi?",
        a: "<h6>",
        b: "<head>",
        c: "<h1>",
        d: "<title>",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "HTMLda paragraf yaratish uchun qaysi teg ishlatiladi?",
        a: "<p>",
        b: "<h1>",
        c: "<div>",
        d: "<img>",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "HTMLda havola yaratish uchun qaysi teg ishlatiladi?",
        a: "<link>",
        b: "<a>",
        c: "<url>",
        d: "<href>",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "HTMLda rasm joylashtirish uchun qaysi teg ishlatiladi?",
        a: "<picture>",
        b: "<image>",
        c: "<img>",
        d: "<src>",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "HTMLda tartibsiz ro‘yxat qaysi teg bilan yaratiladi?",
        a: "<ol>",
        b: "<ul>",
        c: "<li>",
        d: "<list>",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "CSSda matn rangini belgilovchi xususiyat qaysi?",
        a: "background",
        b: "font-color",
        c: "text-color",
        d: "color",
        correct: "D"
    },
    {
        subject: "Dasturlash",
        question: "CSSda fon rangini belgilash uchun nima ishlatiladi?",
        a: "background-color",
        b: "font-color",
        c: "color",
        d: "border-color",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "CSSda elementning tashqi bo‘shlig‘i nima deyiladi?",
        a: "padding",
        b: "margin",
        c: "border",
        d: "width",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "CSSda elementning ichki bo‘shlig‘i nima deyiladi?",
        a: "margin",
        b: "space",
        c: "padding",
        d: "position",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "CSS class selektori qaysi belgi bilan boshlanadi?",
        a: "#",
        b: ".",
        c: "*",
        d: "@",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "CSS ID selektori qaysi belgi bilan boshlanadi?",
        a: "#",
        b: ".",
        c: "@",
        d: "$",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda o‘zgaruvchi yaratish uchun qaysi kalit so‘z ishlatilishi mumkin?",
        a: "let",
        b: "style",
        c: "html",
        d: "print",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda konstantani e'lon qilish uchun nima ishlatiladi?",
        a: "var",
        b: "const",
        c: "static",
        d: "constant",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda konsolga ma'lumot chiqarish usuli qaysi?",
        a: "print()",
        b: "write()",
        c: "console.log()",
        d: "output()",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda qat'iy tenglik operatori qaysi?",
        a: "=",
        b: "==",
        c: "===",
        d: "!=",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda AND mantiqiy operatori qaysi?",
        a: "&&",
        b: "||",
        c: "!",
        d: "AND",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda OR mantiqiy operatori qaysi?",
        a: "&&",
        b: "||",
        c: "!=",
        d: "++",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "JavaScriptda funksiya yaratishda qaysi kalit so‘z ishlatilishi mumkin?",
        a: "method",
        b: "function",
        c: "func",
        d: "define",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "Massiv JavaScriptda nima saqlashi mumkin?",
        a: "Faqat bitta qiymat",
        b: "Bir nechta qiymat",
        c: "Faqat rasmlar",
        d: "Faqat HTML teglar",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "Array uzunligini olish uchun qaysi xususiyat ishlatiladi?",
        a: "size",
        b: "count",
        c: "length",
        d: "total",
        correct: "C"
    },
    {
        subject: "Dasturlash",
        question: "if operatorining vazifasi nima?",
        a: "Shartni tekshirish",
        b: "CSS yozish",
        c: "Rasm qo‘shish",
        d: "Serverni o‘chirish",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "for sikli nima uchun ishlatiladi?",
        a: "Kod qismini takrorlash uchun",
        b: "HTML faylni yopish uchun",
        c: "Rasm yaratish uchun",
        d: "Internetga ulanish uchun",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "DOM nimaning qisqartmasi?",
        a: "Data Object Manager",
        b: "Document Object Model",
        c: "Digital Output Method",
        d: "Document Online Mode",
        correct: "B"
    },
    {
        subject: "Dasturlash",
        question: "document.getElementById() nima qiladi?",
        a: "Elementni ID bo‘yicha topadi",
        b: "Yangi server yaratadi",
        c: "CSS faylni o‘chiradi",
        d: "Internetga ulanadi",
        correct: "A"
    },
    {
        subject: "Dasturlash",
        question: "addEventListener() nima uchun ishlatiladi?",
        a: "Ma'lumotlar bazasini yaratish uchun",
        b: "Hodisani kuzatish uchun",
        c: "CSS rangini o‘zgartirish uchun",
        d: "Faylni o‘chirish uchun",
        correct: "B"
    },


    // ==================================================
    // TELEKOMMUNIKATSIYA — 30 TA
    // ==================================================

    {
        subject: "Telekommunikatsiya",
        question: "Telekommunikatsiya nima?",
        a: "Masofadan axborot uzatish",
        b: "Faqat kompyuter ta'mirlash",
        c: "Faqat dastur yozish",
        d: "Elektr energiya ishlab chiqarish",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "LAN nimani anglatadi?",
        a: "Local Area Network",
        b: "Long Access Network",
        c: "Large Analog Network",
        d: "Local Access Node",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "WAN nimani anglatadi?",
        a: "Wireless Access Node",
        b: "Wide Area Network",
        c: "Web Area Network",
        d: "World Analog Network",
        correct: "B"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Router qurilmasining asosiy vazifasi nima?",
        a: "Turli tarmoqlar orasida paketlarni yo‘naltirish",
        b: "Faqat rasm chiqarish",
        c: "Ovoz yozish",
        d: "Elektr toki ishlab chiqarish",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Switch asosan nima uchun ishlatiladi?",
        a: "LAN ichidagi qurilmalarni bog‘lash",
        b: "Internet kabelini ishlab chiqarish",
        c: "Operatsion tizim yaratish",
        d: "Radio signalni bloklash",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "IP manzilning vazifasi nima?",
        a: "Tarmoqdagi qurilmani mantiqiy identifikatsiya qilish",
        b: "Monitor rangini belgilash",
        c: "Fayl nomini aniqlash",
        d: "Parolni shifrlash",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "IPv4 manzili necha bitdan iborat?",
        a: "16 bit",
        b: "32 bit",
        c: "64 bit",
        d: "128 bit",
        correct: "B"
    },
    {
        subject: "Telekommunikatsiya",
        question: "IPv6 manzili necha bitdan iborat?",
        a: "32 bit",
        b: "64 bit",
        c: "128 bit",
        d: "256 bit",
        correct: "C"
    },
    {
        subject: "Telekommunikatsiya",
        question: "MAC manzil nima?",
        a: "Tarmoq interfeysining apparat identifikatori",
        b: "Web sayt nomi",
        c: "Internet provayder nomi",
        d: "Foydalanuvchi paroli",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "OSI modeli nechta qatlamdan iborat?",
        a: "4",
        b: "5",
        c: "7",
        d: "8",
        correct: "C"
    },
    {
        subject: "Telekommunikatsiya",
        question: "OSI modelining eng pastki qatlami qaysi?",
        a: "Application",
        b: "Network",
        c: "Transport",
        d: "Physical",
        correct: "D"
    },
    {
        subject: "Telekommunikatsiya",
        question: "TCP protokolining muhim xususiyati nima?",
        a: "Ishonchli ma'lumot uzatish",
        b: "Faqat rasm uzatish",
        c: "IP manzil yaratish",
        d: "Wi-Fi parolini o‘zgartirish",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "UDP TCPga nisbatan qanday xususiyatga ega?",
        a: "Odatda kamroq xizmat xarajati bilan tezroq ishlaydi",
        b: "Har doim TCPdan sekin",
        c: "Faqat kabelda ishlaydi",
        d: "IP ishlatmaydi",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "DNS ning vazifasi nima?",
        a: "Domen nomlarini IP manzillarga moslashtirish",
        b: "Elektr tokini boshqarish",
        c: "Rasmni siqish",
        d: "Wi-Fi signalini kuchaytirish",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "DHCP nima qiladi?",
        a: "Qurilmalarga avtomatik tarmoq parametrlarini beradi",
        b: "Web sahifa yaratadi",
        c: "Optik signal yaratadi",
        d: "Viruslarni o‘chiradi",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "HTTP standart porti qaysi?",
        a: "21",
        b: "25",
        c: "80",
        d: "443",
        correct: "C"
    },
    {
        subject: "Telekommunikatsiya",
        question: "HTTPS odatda qaysi portdan foydalanadi?",
        a: "22",
        b: "53",
        c: "80",
        d: "443",
        correct: "D"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Ping odatda qaysi protokolga asoslanadi?",
        a: "FTP",
        b: "ICMP",
        c: "SMTP",
        d: "HTTP",
        correct: "B"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Optik tolada axborot asosan nima yordamida uzatiladi?",
        a: "Yorug‘lik",
        b: "Suv",
        c: "Mexanik harakat",
        d: "Magnit disk",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Optik tolaning muhim afzalligi qaysi?",
        a: "Yuqori uzatish sig‘imi",
        b: "Faqat 1 metr ishlaydi",
        c: "Radio to‘lqin talab qiladi",
        d: "Ma'lumot uzata olmaydi",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Wi-Fi qaysi turdagi aloqa?",
        a: "Simsiz aloqa",
        b: "Faqat optik aloqa",
        c: "Mexanik aloqa",
        d: "Faqat telefon kabeli",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Wi-Fi 4 qaysi standart nomiga mos keladi?",
        a: "802.11a",
        b: "802.11n",
        c: "802.11ac",
        d: "802.11be",
        correct: "B"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Wi-Fi 5 qaysi standartga mos keladi?",
        a: "802.11ac",
        b: "802.11n",
        c: "802.11b",
        d: "802.11be",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Wi-Fi 6 qaysi standartga mos keladi?",
        a: "802.11g",
        b: "802.11n",
        c: "802.11ax",
        d: "802.11ac",
        correct: "C"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Access Pointning vazifasi nima?",
        a: "Simsiz qurilmalarni tarmoqqa ulash",
        b: "Monitorni boshqarish",
        c: "HTML yaratish",
        d: "Protsessorni sovutish",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Bandwidth atamasi nimani bildiradi?",
        a: "Aloqa kanalining uzatish imkoniyatini",
        b: "Parol uzunligini",
        c: "Kompyuter ekranining o‘lchamini",
        d: "Fayl nomini",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Latency nima?",
        a: "Ma'lumot uzatishdagi kechikish",
        b: "Signalning rangi",
        c: "IP manzil turi",
        d: "Fayl hajmi",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Full-duplex aloqa nimani anglatadi?",
        a: "Ikki yo‘nalishda bir vaqtda uzatish",
        b: "Faqat qabul qilish",
        c: "Faqat uzatish",
        d: "Navbat bilan bir yo‘nalishda ishlash",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "VLAN nima uchun ishlatiladi?",
        a: "Tarmoqni mantiqiy segmentlarga ajratish",
        b: "Monitor yorqinligini oshirish",
        c: "HTML fayl yaratish",
        d: "Antennani almashtirish",
        correct: "A"
    },
    {
        subject: "Telekommunikatsiya",
        question: "Default gateway nima uchun kerak?",
        a: "Mahalliy tarmoqdan boshqa tarmoqlarga chiqish uchun",
        b: "Kompyuter nomini almashtirish uchun",
        c: "Fayllarni o‘chirish uchun",
        d: "Monitorni yoqish uchun",
        correct: "A"
    },


    // ==================================================
    // AXBOROT XAVFSIZLIGI — 30 TA
    // ==================================================

    {
        subject: "Axborot xavfsizligi",
        question: "Axborot xavfsizligining asosiy maqsadi nima?",
        a: "Axborotni himoya qilish",
        b: "Internetni o‘chirish",
        c: "Faqat dastur yaratish",
        d: "Kompyuter tezligini oshirish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "CIA triadasidagi C nimani anglatadi?",
        a: "Control",
        b: "Confidentiality",
        c: "Computer",
        d: "Connection",
        correct: "B"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "CIA triadasidagi I nimani anglatadi?",
        a: "Integrity",
        b: "Internet",
        c: "Identity",
        d: "Input",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "CIA triadasidagi A nimani anglatadi?",
        a: "Authentication",
        b: "Access",
        c: "Availability",
        d: "Application",
        correct: "C"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Kuchli parolning yaxshi xususiyati qaysi?",
        a: "Uzun va taxmin qilish qiyin bo‘lishi",
        b: "Faqat 123456 bo‘lishi",
        c: "Foydalanuvchi ismi bilan bir xil bo‘lishi",
        d: "Barcha saytlarda bir xil bo‘lishi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Phishing nima?",
        a: "Soxta xabar yoki sayt orqali maxfiy ma'lumotni qo‘lga kiritishga urinish",
        b: "Kompyuter tezligini oshirish",
        c: "Faylni arxivlash",
        d: "Wi-Fi signalini kuchaytirish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Malware nima?",
        a: "Zararli dasturiy ta'minot",
        b: "Web brauzer",
        c: "Operatsion tizim",
        d: "Tarmoq kabeli",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Kompyuter virusi nima?",
        a: "Zararli kod turi",
        b: "Tarmoq kabeli",
        c: "HTML tegi",
        d: "Monitor turi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Ransomware odatda nima qiladi?",
        a: "Ma'lumotlarni bloklab, to‘lov talab qiladi",
        b: "Internetni tezlashtiradi",
        c: "Monitorni tozalaydi",
        d: "Wi-Fi qamrovini oshiradi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Firewallning vazifasi nima?",
        a: "Tarmoq trafikini qoidalar asosida nazorat qilish",
        b: "HTML kod yozish",
        c: "Monitor rangini o‘zgartirish",
        d: "Protsessorni sovutish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Antivirus nima uchun ishlatiladi?",
        a: "Zararli dasturlarni aniqlash va bartaraf etishga yordam berish",
        b: "Web sayt yaratish",
        c: "Internet kabelini ulash",
        d: "IP manzil berish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Autentifikatsiya nima?",
        a: "Foydalanuvchi kimligini tekshirish",
        b: "Faylni o‘chirish",
        c: "Internet tezligini o‘lchash",
        d: "Monitorni sozlash",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Avtorizatsiya nima?",
        a: "Foydalanuvchiga qanday resurslarga ruxsat borligini aniqlash",
        b: "Parolni yaratish",
        c: "Kompyuterni yoqish",
        d: "IP manzilni o‘zgartirish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "2FA nimani anglatadi?",
        a: "Two-Factor Authentication",
        b: "Two File Access",
        c: "Transfer File Algorithm",
        d: "Total Firewall Access",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Shifrlashning asosiy vazifasi nima?",
        a: "Ma'lumotni ruxsatsiz o‘qishdan himoya qilish",
        b: "Faylni kattalashtirish",
        c: "Internetni tezlashtirish",
        d: "Monitorni o‘chirish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "HTTPS HTTPdan nimasi bilan farq qiladi?",
        a: "Aloqa TLS orqali himoyalanishi mumkin",
        b: "Internet talab qilmaydi",
        c: "Faqat rasm uzatadi",
        d: "IP manzil ishlatmaydi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "VPNning asosiy vazifalaridan biri nima?",
        a: "Tarmoq orqali himoyalangan tunnel yaratish",
        b: "Monitorni sozlash",
        c: "HTML fayl yaratish",
        d: "Kompyuterni formatlash",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Backup nima?",
        a: "Ma'lumotlarning zaxira nusxasi",
        b: "Virus turi",
        c: "Parol turi",
        d: "IP protokoli",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Nega dasturlarni yangilab turish muhim?",
        a: "Xavfsizlik zaifliklari tuzatilishi mumkin",
        b: "Har doim internetni tezlashtiradi",
        c: "Monitorni kattalashtiradi",
        d: "Parolni avtomatik o‘chiradi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Social engineering nima?",
        a: "Odamlarni manipulyatsiya qilib ma'lumot olishga urinish",
        b: "Web dizayn usuli",
        c: "Tarmoq kabeli turi",
        d: "Dasturlash tili",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Brute-force hujumi nimaga asoslanadi?",
        a: "Ko‘plab ehtimoliy parol variantlarini sinashga",
        b: "Monitorni o‘chirishga",
        c: "HTML kod yozishga",
        d: "Tarmoq kabelini uzishga",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Hash funksiyasining muhim xususiyati qaysi?",
        a: "Ma'lumotdan belgilangan usulda digest hosil qilish",
        b: "Monitor rangini o‘zgartirish",
        c: "Internet tezligini oshirish",
        d: "IP manzil yaratish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Public Wi-Fi tarmog‘ida nima qilish xavfsizroq?",
        a: "Muhim hisoblarda ehtiyotkor bo‘lish va himoyalangan ulanishlardan foydalanish",
        b: "Barcha parollarni hammaga yuborish",
        c: "2FAni o‘chirish",
        d: "Noma'lum fayllarni yuklab olish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Noma'lum emaildagi shubhali havola bilan nima qilish kerak?",
        a: "Tekshirmasdan bosish",
        b: "Bosmaslik va xabarni tekshirish",
        c: "Parolni yuborish",
        d: "Bank ma'lumotlarini kiritish",
        correct: "B"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Parolni turli xizmatlarda qayta ishlatishning xavfi nimada?",
        a: "Bitta xizmat buzilsa boshqa hisoblar ham xavf ostida qolishi mumkin",
        b: "Internet sekinlashadi",
        c: "Monitor buziladi",
        d: "IP manzil yo‘qoladi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Biometrik autentifikatsiyaga qaysi misol bo‘ladi?",
        a: "Barmoq izi",
        b: "Email manzili",
        c: "IP manzil",
        d: "Fayl nomi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Access control nima uchun ishlatiladi?",
        a: "Resurslarga kirish huquqlarini boshqarish",
        b: "Internet tezligini oshirish",
        c: "HTML yozish",
        d: "Monitorni o‘chirish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Principle of least privilege nimani anglatadi?",
        a: "Foydalanuvchiga vazifasi uchun zarur minimal huquqlarni berish",
        b: "Hamma foydalanuvchiga admin huquqi berish",
        c: "Parolsiz ishlash",
        d: "Barcha fayllarni ochiq qilish",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Security patch nima?",
        a: "Xavfsizlik muammosini tuzatishga mo‘ljallangan yangilanish",
        b: "Virus turi",
        c: "Tarmoq kabeli",
        d: "HTML elementi",
        correct: "A"
    },
    {
        subject: "Axborot xavfsizligi",
        question: "Shubhali fayl biriktirilgan email kelsa eng to‘g‘ri harakat qaysi?",
        a: "Darhol ochish",
        b: "Boshqalarga yuborish",
        c: "Manbani tekshirish va shubhali faylni ochmaslik",
        d: "Antivirusni o‘chirish",
        correct: "C"
    }
];
// ==================================================
// DATABASEGA SAVOLLARNI QO'SHISH
// PostgreSQL + SQLite
// ==================================================

async function seedQuestions() {

    try {

        await db.initDatabase();

        console.log("");
        console.log("Savollar tekshirilmoqda...");


        // Eski savollarni tozalaymiz
        await db.query(`
            DELETE FROM questions
        `);


        // 90 ta savolni qo'shamiz
        for (const q of questions) {

            await db.query(
                `
                INSERT INTO questions
                (
                    subject,
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_answer
                )

                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7
                )
                `,
                [
                    q.subject,
                    q.question,
                    q.a,
                    q.b,
                    q.c,
                    q.d,
                    q.correct
                ]
            );
        }


        // Natijani tekshirish
        const result =
            await db.query(`
                SELECT
                    subject,
                    COUNT(*) AS total

                FROM questions

                GROUP BY subject

                ORDER BY subject
            `);


        console.log("");
        console.log("======================================");
        console.log("✅ TEST SAVOLLARI QO‘SHILDI");
        console.log("======================================");

        for (const row of result.rows) {

            console.log(
                `${row.subject}: ${row.total} ta`
            );
        }

        console.log("--------------------------------------");
        console.log(
            "📚 Jami: " +
            questions.length +
            " ta savol"
        );
        console.log("======================================");
        console.log("");


        // PostgreSQL pool bo'lsa yopamiz
        if (db.pool) {
            await db.pool.end();
        }


        // SQLite bo'lsa yopamiz
        if (db.sqlite) {
            db.sqlite.close();
        }


        process.exit(0);

    } catch (error) {

        console.error(
            "❌ Savollarni qo‘shishda xatolik:",
            error
        );


        if (db.pool) {

            try {
                await db.pool.end();
            } catch (_) {}
        }


        if (db.sqlite) {

            try {
                db.sqlite.close();
            } catch (_) {}
        }


        process.exit(1);
    }
}


seedQuestions();

