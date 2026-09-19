const db = require("./database");

console.log("");
console.log("==========================================");
console.log("📡 TELEKOMMUNIKATSIYA DARSLARINI YANGILASH");
console.log("==========================================");


function lesson(title, description, sections) {

    let content = `# ${title}\n\n`;

    for (const section of sections) {

        content += `## ${section.title}\n\n`;
        content += `${section.text}\n\n`;

    }

    return {
        title,
        subject: "Telekommunikatsiya",
        description,
        content
    };
}


const lessons = [

    // ==================================================
    // 1. TELEKOMMUNIKATSIYA ASOSLARI
    // ==================================================

    lesson(
        "Telekommunikatsiya asoslari",

        "Telekommunikatsiya tizimlari, axborot uzatish jarayoni, aloqa kanallari va tarmoq elementlari.",

        [
            {
                title: "Telekommunikatsiya nima?",

                text:
`Telekommunikatsiya — axborotni masofaga uzatish va qabul qilish jarayonidir.

Axborot turli ko‘rinishda bo‘lishi mumkin:

- ovoz;
- matn;
- rasm;
- video;
- ma'lumotlar.

Telefon aloqasi, mobil tarmoq, internet, radio va televizion uzatish telekommunikatsiyaga misol bo‘ladi.`
            },

            {
                title: "Telekommunikatsiya tizimining asosiy qismlari",

                text:
`Oddiy aloqa tizimini quyidagicha tasavvur qilish mumkin:

\`\`\`
Axborot manbai
      ↓
   Uzatgich
      ↓
Aloqa kanali
      ↓
 Qabul qilgich
      ↓
Axborot oluvchi
\`\`\`

Uzatgich axborotni uzatishga tayyorlaydi.

Aloqa kanali signalni masofaga olib boradi.

Qabul qilgich kelgan signalni qayta ishlaydi.`
            },

            {
                title: "Axborot va signal",

                text:
`Axborot — foydalanuvchi uchun mazmunga ega bo‘lgan ma'lumot.

Signal esa axborotni fizik muhit orqali tashuvchi kattalikdir.

Masalan, inson ovozi mikrofonga kirganda elektr signaliga aylantirilishi mumkin.

Keyin bu signal aloqa tizimi orqali boshqa joyga uzatiladi.`
            },

            {
                title: "Analog va raqamli aloqa",

                text:
`Analog signal vaqt davomida uzluksiz o‘zgaradi.

Raqamli signal esa diskret qiymatlar bilan ifodalanadi.

Raqamli tizimlarda axborot odatda bitlar orqali uzatiladi:

\`\`\`
0 1 1 0 1 0 0 1
\`\`\`

Zamonaviy telekommunikatsiya tizimlarining katta qismi raqamli texnologiyalarga asoslangan.`
            },

            {
                title: "Aloqa kanallari",

                text:
`Signal turli uzatish muhitlaridan foydalanishi mumkin.

Simli muhit:

- mis kabel;
- koaksial kabel;
- optik tola.

Simsiz muhit:

- radioaloqa;
- Wi-Fi;
- mobil aloqa;
- sun'iy yo‘ldosh aloqasi.

Muhit tanlovi masofa, tezlik, narx va shovqinga bog‘liq.`
            },

            {
                title: "Simplex, Half-Duplex va Full-Duplex",

                text:
`Simplex — axborot faqat bir yo‘nalishda uzatiladi.

Misol: oddiy televizion eshittirish.

Half-Duplex — ikkala yo‘nalishda aloqa mavjud, ammo bir vaqtda emas.

Misol: ayrim radioaloqa tizimlari.

Full-Duplex — ikki tomon bir vaqtda axborot uzatishi mumkin.

Misol: telefon suhbati.`
            },

            {
                title: "Telekommunikatsiya tarmog‘i",

                text:
`Telekommunikatsiya tarmog‘i ko‘plab qurilmalar va aloqa kanallarining o‘zaro bog‘langan tizimidir.

Tarmoqda quyidagi qurilmalar uchrashi mumkin:

- router;
- switch;
- modem;
- access point;
- baza stansiya;
- server;
- abonent qurilmasi.`
            },

            {
                title: "Amaliy misol",

                text:
`Smartfon orqali internetdan video ko‘rilganda:

1. Telefon tarmoqqa ulanadi.

2. So‘rov tarmoq orqali uzatiladi.

3. Server so‘rovni qabul qiladi.

4. Video ma'lumotlari paketlarga ajratiladi.

5. Paketlar tarmoq orqali telefonga keladi.

6. Telefon ularni qayta ishlaydi.

7. Video ekranda ko‘rsatiladi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi aloqa tizimining sxemasini chizing:

\`\`\`
Smartfon
   ↓
Baza stansiya
   ↓
Operator tarmog‘i
   ↓
Internet
   ↓
Server
\`\`\`

Har bir qismning vazifasini qisqacha yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Telekommunikatsiya nima?

2. Signal nima?

3. Analog va raqamli signal farqi nimada?

4. Aloqa kanali nima?

5. Simplex nima?

6. Half-Duplex nima?

7. Full-Duplex nima?

8. Telekommunikatsiya tarmog‘iga qanday qurilmalar kiradi?`
            },

            {
                title: "Xulosa",

                text:
`Telekommunikatsiya zamonaviy axborot jamiyatining asosiy infratuzilmalaridan biridir.

Mobil aloqa, internet, Wi-Fi va optik tarmoqlarning barchasi axborotni manbadan qabul qiluvchiga ishonchli uzatish tamoyiliga asoslanadi.`
            }
        ]
    ),


    // ==================================================
    // 2. SIGNAL VA UNING PARAMETRLARI
    // ==================================================

    lesson(
        "Signal va uning parametrlari",

        "Signal tushunchasi, amplituda, chastota, davr, faza, to‘lqin uzunligi va signal quvvati.",

        [
            {
                title: "Signal nima?",

                text:
`Signal axborotni bir nuqtadan boshqa nuqtaga yetkazish uchun ishlatiladigan fizik kattalikdir.

Telekommunikatsiyada elektr, elektromagnit va optik signallar keng qo‘llaniladi.`
            },

            {
                title: "Signal amplitudasi",

                text:
`Amplituda signalning maksimal qiymatini ifodalaydi.

Sinusoidal signal uchun umumiy ko‘rinish:

\`\`\`
s(t) = A sin(2πft + φ)
\`\`\`

Bu yerda:

A — amplituda;

f — chastota;

t — vaqt;

φ — boshlang‘ich faza.`
            },

            {
                title: "Chastota",

                text:
`Chastota signalning bir sekundda necha marta takrorlanishini bildiradi.

Chastota birligi — Hertz (Hz).

Masalan:

\`\`\`
1 kHz = 1000 Hz
1 MHz = 1 000 000 Hz
1 GHz = 1 000 000 000 Hz
\`\`\`

Radio va mobil aloqa tizimlarida MHz va GHz birliklari ko‘p ishlatiladi.`
            },

            {
                title: "Davr",

                text:
`Davr — signalning bitta to‘liq siklini bajarish uchun ketadigan vaqt.

Davr T harfi bilan belgilanadi.

Chastota va davr orasidagi bog‘lanish:

\`\`\`
T = 1 / f
\`\`\`

Masalan, chastota 1000 Hz bo‘lsa:

\`\`\`
T = 1 / 1000
T = 0.001 s
\`\`\`

ya'ni 1 millisekund.`
            },

            {
                title: "Faza",

                text:
`Faza signalning ma'lum vaqt momentidagi holatini ifodalaydi.

Bir xil chastotali ikkita signal bir-biriga nisbatan faza bo‘yicha siljigan bo‘lishi mumkin.

Faza odatda gradus yoki radianlarda ifodalanadi.`
            },

            {
                title: "To‘lqin uzunligi",

                text:
`To‘lqin uzunligi λ bilan belgilanadi.

Elektromagnit to‘lqin uchun:

\`\`\`
λ = c / f
\`\`\`

Bu yerda:

λ — to‘lqin uzunligi;

c — yorug‘lik tezligi;

f — chastota.

Chastota oshgan sari to‘lqin uzunligi kamayadi.`
            },

            {
                title: "Signal quvvati",

                text:
`Signal quvvati aloqa tizimining muhim parametridir.

Quvvat Watt birliklarida ifodalanishi mumkin.

Telekommunikatsiyada logarifmik birliklar ham ko‘p ishlatiladi:

- dB;
- dBm.

dBm quvvatni 1 milliwattga nisbatan ifodalaydi.`
            },

            {
                title: "Shovqin",

                text:
`Shovqin foydali signalga xalaqit beruvchi tasodifiy yoki keraksiz signaldir.

Shovqin kuchaysa, qabul qilingan ma'lumot sifati pasayishi mumkin.

Aloqa tizimlarida signal va shovqin nisbatini baholash muhim.`
            },

            {
                title: "SNR",

                text:
`SNR — Signal-to-Noise Ratio.

U foydali signal quvvatining shovqin quvvatiga nisbatini ifodalaydi.

SNR yuqori bo‘lsa, odatda signal sifati yaxshiroq bo‘ladi.

SNR ko‘pincha dB bilan ifodalanadi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`1. 2 MHz ni Hz ga aylantiring.

2. Chastotasi 100 Hz bo‘lgan signalning davrini toping.

3. Chastota oshganda to‘lqin uzunligi qanday o‘zgarishini tushuntiring.

4. SNR nima uchun muhimligini yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Signal nima?

2. Amplituda nima?

3. Chastota nima?

4. Hertz nimani bildiradi?

5. Davr formulasi qanday?

6. Faza nima?

7. To‘lqin uzunligi nima?

8. SNR nima?`
            },

            {
                title: "Xulosa",

                text:
`Amplituda, chastota, davr, faza va quvvat signalning asosiy parametrlaridir.

Ularni tushunish radioaloqa, mobil aloqa, optik aloqa va boshqa telekommunikatsiya tizimlarini o‘rganish uchun zarur.`
            }
        ]
    ),


    // ==================================================
    // 3. OSI MODELI
    // ==================================================

    lesson(
        "OSI modeli",

        "OSI modelining 7 ta qatlami va tarmoq orqali ma’lumot uzatish jarayonidagi vazifalari.",

        [
            {
                title: "OSI modeli nima?",

                text:
`OSI — Open Systems Interconnection.

OSI modeli kompyuter tarmoqlaridagi aloqa jarayonini yettita mantiqiy qatlamga ajratib tushuntiradi.

Model tarmoq protokollari va qurilmalarining vazifalarini tushunishni osonlashtiradi.`
            },

            {
                title: "OSI modelining 7 qatlami",

                text:
`OSI modeli:

\`\`\`
7. Application
6. Presentation
5. Session
4. Transport
3. Network
2. Data Link
1. Physical
\`\`\`

Ma'lumot jo‘natuvchi tomonda yuqoridan pastga, qabul qiluvchi tomonda esa pastdan yuqoriga qayta ishlanadi.`
            },

            {
                title: "1. Physical Layer",

                text:
`Physical — fizik qatlam.

U bitlarni fizik uzatish muhiti orqali uzatishga javob beradi.

Bu qatlamda:

- kabel;
- radio signal;
- optik signal;
- ulagichlar;
- elektr parametrlar

kabi tushunchalar muhim.`
            },

            {
                title: "2. Data Link Layer",

                text:
`Data Link qatlamida lokal tarmoq ichidagi uzatish bilan bog‘liq vazifalar bajariladi.

MAC address shu qatlam bilan bog‘liq muhim tushunchadir.

Ethernet texnologiyasi ham Data Link qatlami bilan chambarchas bog‘langan.`
            },

            {
                title: "3. Network Layer",

                text:
`Network qatlamining muhim vazifalaridan biri paketlarni turli tarmoqlar orasida yo‘naltirishdir.

IP address shu qatlam bilan bog‘liq.

Router asosan Network Layer bilan bog‘liq qurilma sifatida qaraladi.`
            },

            {
                title: "4. Transport Layer",

                text:
`Transport qatlami qurilmalar orasidagi ma'lumot uzatishni boshqaradi.

TCP va UDP transport protokollarining mashhur misollaridir.

Port raqamlari ham transport qatlamida muhim ahamiyatga ega.`
            },

            {
                title: "5. Session Layer",

                text:
`Session qatlami qurilmalar yoki dasturlar o‘rtasidagi aloqa sessiyasini boshqarish tushunchasini ifodalaydi.

U sessiyani yaratish, davom ettirish va yakunlash bilan bog‘liq vazifalarni tavsiflaydi.`
            },

            {
                title: "6. Presentation Layer",

                text:
`Presentation qatlami ma'lumotni dasturlar uchun mos ko‘rinishga keltirish bilan bog‘liq.

Bu qatlam konseptual jihatdan:

- formatlash;
- kodlash;
- shifrlash;
- siqish

kabi vazifalar bilan bog‘lanadi.`
            },

            {
                title: "7. Application Layer",

                text:
`Application qatlam foydalanuvchi dasturlariga tarmoq xizmatlaridan foydalanish imkonini beradigan yuqori qatlamdir.

HTTP, DNS va boshqa yuqori darajadagi protokollarni o‘rganishda bu qatlam muhim.`
            },

            {
                title: "Encapsulation",

                text:
`Jo‘natuvchi qurilmada ma'lumot qatlamlardan pastga tushar ekan, har bir qatlam o‘ziga kerakli boshqaruv ma'lumotlarini qo‘shishi mumkin.

Bu jarayon encapsulation deb ataladi.

Qabul qiluvchi tomonda esa ma'lumotlar teskari tartibda qayta ishlanadi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi tushunchalarni mos OSI qatlamiga joylashtiring:

- IP;
- MAC address;
- TCP;
- kabel;
- HTTP.

Keyin OSI modelining barcha 7 qatlamini pastdan yuqoriga yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. OSI nimani anglatadi?

2. OSI modelida nechta qatlam mavjud?

3. Physical Layer nima qiladi?

4. MAC address qaysi qatlam bilan bog‘liq?

5. IP qaysi qatlam bilan bog‘liq?

6. TCP qaysi qatlamda ishlaydi?

7. Application Layer vazifasi nima?

8. Encapsulation nima?`
            },

            {
                title: "Xulosa",

                text:
`OSI modeli tarmoq aloqasini qatlamlarga ajratib o‘rganish imkonini beradi.

Bu model tarmoq muammolarini aniqlash va TCP/IP, Ethernet, routing kabi mavzularni tushunishda muhim nazariy asosdir.`
            }
        ]
    ),


    // ==================================================
    // 4. TCP/IP MODELI
    // ==================================================

    lesson(
        "TCP/IP modeli",

        "TCP/IP arxitekturasi, uning qatlamlari, IP, TCP, UDP, HTTP va DNS protokollari.",

        [
            {
                title: "TCP/IP nima?",

                text:
`TCP/IP — zamonaviy Internet va ko‘plab kompyuter tarmoqlarining asosiy protokollar to‘plamidir.

TCP/IP modeli amaliy tarmoqlarda keng qo‘llaniladi.`
            },

            {
                title: "TCP/IP qatlamlari",

                text:
`Ko‘p manbalarda TCP/IP modeli to‘rtta asosiy qatlam bilan tushuntiriladi:

\`\`\`
4. Application
3. Transport
2. Internet
1. Network Access
\`\`\`

Har bir qatlam ma'lum vazifani bajaradi.`
            },

            {
                title: "Network Access",

                text:
`Network Access qatlami qurilmaning fizik yoki lokal tarmoq orqali ma'lumot uzatishi bilan bog‘liq.

Ethernet va Wi-Fi kabi texnologiyalar ushbu daraja bilan bog‘liq holda o‘rganiladi.`
            },

            {
                title: "Internet Layer",

                text:
`Internet qatlamida IP protokoli muhim rol o‘ynaydi.

U paketlarni manba qurilmadan kerakli tarmoqqa yetkazish uchun manzillash va marshrutlash jarayonlarida qatnashadi.

IPv4 manzil misoli:

\`\`\`
192.168.1.10
\`\`\``
            },

            {
                title: "Transport Layer",

                text:
`Transport qatlamining mashhur protokollari:

- TCP;
- UDP.

TCP ishonchli va tartibli uzatishni ta'minlashga yo‘naltirilgan.

UDP esa kamroq boshqaruv mexanizmlari bilan tezkor uzatish uchun ishlatilishi mumkin.`
            },

            {
                title: "Application Layer",

                text:
`Application qatlamida foydalanuvchi dasturlari foydalanadigan tarmoq protokollari ishlaydi.

Masalan:

- HTTP;
- HTTPS;
- DNS;
- SMTP;
- FTP kabi protokollar.`
            },

            {
                title: "TCP",

                text:
`TCP — Transmission Control Protocol.

TCP ulanishga yo‘naltirilgan transport protokolidir.

U ma'lumotlarning yetkazilishi va tartibini nazorat qilish mexanizmlariga ega.

Veb va boshqa ko‘plab xizmatlarda TCP muhim rol o‘ynaydi.`
            },

            {
                title: "UDP",

                text:
`UDP — User Datagram Protocol.

UDP ulanish o‘rnatish va yetkazib berishni tasdiqlash bo‘yicha TCPga qaraganda soddaroq.

Real vaqtga yaqin xizmatlarda tezlik va kechikish muhim bo‘lganda UDP ishlatilishi mumkin.`
            },

            {
                title: "DNS",

                text:
`DNS — Domain Name System.

DNS domen nomlarini IP manzillar bilan bog‘lash imkonini beradi.

Masalan, foydalanuvchi domen nomini yozadi, DNS esa unga tegishli tarmoq manzilini aniqlash jarayonida qatnashadi.`
            },

            {
                title: "OSI va TCP/IP",

                text:
`OSI modeli 7 qatlamli konseptual modeldir.

TCP/IP esa Internetning amaliy protokollar arxitekturasini tushuntirishda ishlatiladi.

Ikkala model ham tarmoq aloqasini qatlamlarga ajratib tushunishga yordam beradi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi protokollarni TCP/IP qatlamlariga ajrating:

- HTTP;
- TCP;
- UDP;
- IP;
- DNS;
- Ethernet.

Keyin TCP va UDP o‘rtasidagi kamida uchta farqni yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. TCP/IP nima?

2. TCP/IP modelida qanday qatlamlar mavjud?

3. IP vazifasi nima?

4. TCP nima?

5. UDP nima?

6. TCP va UDP farqi nimada?

7. DNS nima qiladi?

8. HTTP qaysi qatlam bilan bog‘liq?`
            },

            {
                title: "Xulosa",

                text:
`TCP/IP Internetning asosiy protokollar arxitekturasidir.

IP, TCP, UDP, DNS va HTTP kabi protokollarni tushunish tarmoq va telekommunikatsiya sohasida muhim hisoblanadi.`
            }
        ]
    ),


    // ==================================================
    // 5. LAN, MAN VA WAN
    // ==================================================

    lesson(
        "LAN, MAN va WAN tarmoqlari",

        "LAN, MAN va WAN tarmoqlarining vazifalari, farqlari va amaliy qo‘llanilishi.",

        [
            {
                title: "Tarmoq nima?",

                text:
`Kompyuter tarmog‘i — ma'lumot almashish va resurslardan birgalikda foydalanish uchun o‘zaro bog‘langan qurilmalar majmuasidir.

Tarmoqlar qamrov hududiga qarab turli turlarga ajratilishi mumkin.`
            },

            {
                title: "LAN",

                text:
`LAN — Local Area Network.

LAN odatda kichik geografik hududni qamrab oladi.

Masalan:

- uy;
- auditoriya;
- ofis;
- bitta bino.

Ethernet va Wi-Fi lokal tarmoqlarda keng qo‘llaniladi.`
            },

            {
                title: "LAN misoli",

                text:
`Universitet laboratoriyasida:

\`\`\`
PC ─┐
PC ─┼── Switch ── Router
PC ─┘
\`\`\`

kompyuterlar bitta lokal tarmoqda ishlashi mumkin.`
            },

            {
                title: "MAN",

                text:
`MAN — Metropolitan Area Network.

MAN LANga qaraganda kattaroq hududni, odatda shahar miqyosidagi tarmoqni ifodalaydi.

Bir nechta lokal tarmoqlar yuqori tezlikdagi aloqa kanallari orqali o‘zaro bog‘lanishi mumkin.`
            },

            {
                title: "WAN",

                text:
`WAN — Wide Area Network.

WAN katta geografik hududlarni qamrab oladi.

U shaharlar, viloyatlar yoki davlatlar orasidagi tarmoqlarni bog‘lashi mumkin.

Internet WAN tushunchasini tushuntirishdagi eng mashhur misollardan biridir.`
            },

            {
                title: "LAN, MAN va WAN taqqoslash",

                text:
`Umumiy ko‘rinish:

\`\`\`
LAN
↓
kichik hudud

MAN
↓
shahar miqyosi

WAN
↓
katta geografik hudud
\`\`\`

Tarmoq kattalashgani sari aloqa infratuzilmasi va boshqaruv ham murakkablashishi mumkin.`
            },

            {
                title: "Switch",

                text:
`Switch lokal tarmoqdagi qurilmalarni bir-biriga ulash uchun ishlatiladi.

Ethernet tarmoqlarida switch juda muhim qurilmalardan biridir.

U lokal tarmoqdagi kadrlarni kerakli port tomon uzatishda qatnashadi.`
            },

            {
                title: "Router",

                text:
`Router turli IP tarmoqlar orasida paketlarni yo‘naltiradi.

Masalan, uy yoki universitet lokal tarmog‘ini boshqa tarmoq yoki Internet bilan bog‘lashda router ishlatilishi mumkin.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagilarni LAN, MAN yoki WAN turiga ajrating:

1. Uy Wi-Fi tarmog‘i.

2. Universitet kompyuter laboratoriyasi.

3. Shahar bo‘ylab bir nechta filialni bog‘lovchi tarmoq.

4. Turli davlatlardagi ofislarni bog‘lovchi tarmoq.

Har bir javobingiz sababini yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. LAN nima?

2. MAN nima?

3. WAN nima?

4. LAN qaysi hududda ishlatiladi?

5. Switch vazifasi nima?

6. Router vazifasi nima?

7. Internet qaysi turdagi tarmoqqa misol bo‘la oladi?

8. LAN va WANning asosiy farqi nimada?`
            },

            {
                title: "Xulosa",

                text:
`LAN, MAN va WAN tarmoqlari asosan geografik qamrov va infratuzilma miqyosi bilan farqlanadi.

Bu tushunchalar keyingi routing, mobil tarmoqlar va global telekommunikatsiya infratuzilmasini tushunish uchun asos bo‘ladi.`
            }
        ]
    ),
        // ==================================================
    // 6. OPTIK ALOQA ASOSLARI
    // ==================================================

    lesson(
        "Optik aloqa asoslari",

        "Optik tola, yorug‘lik orqali axborot uzatish, single-mode va multi-mode tolalar hamda optik tarmoq asoslari.",

        [
            {
                title: "Optik aloqa nima?",

                text:
`Optik aloqa — axborotni yorug‘lik signallari yordamida uzatish texnologiyasidir.

Axborot optik tola orqali juda katta tezlikda va uzoq masofalarga uzatilishi mumkin.

Optik aloqa zamonaviy:

- Internet magistral tarmoqlari;
- operator tarmoqlari;
- FTTH;
- ma'lumotlar markazlari;
- korporativ tarmoqlarda

keng qo‘llaniladi.`
            },

            {
                title: "Optik tolaning tuzilishi",

                text:
`Optik tola asosan quyidagi qismlardan tashkil topadi:

- core;
- cladding;
- himoya qatlami.

Core — yorug‘lik tarqaladigan markaziy qism.

Cladding — yorug‘likning core ichida saqlanishiga yordam beruvchi qatlam.

Tashqi himoya qatlamlari esa tolani mexanik ta'sirlardan himoya qiladi.`
            },

            {
                title: "To‘liq ichki qaytish",

                text:
`Optik tolada yorug‘likning tarqalishi to‘liq ichki qaytish hodisasi bilan bog‘liq.

Core va cladding sindirish ko‘rsatkichlari turlicha bo‘ladi.

Ma'lum sharoitlarda yorug‘lik core chegarasidan tashqariga chiqmay, tola bo‘ylab tarqaladi.`
            },

            {
                title: "Single-mode tola",

                text:
`Single-mode fiber odatda kichik diametrli corega ega bo‘ladi va yorug‘likning asosan bitta modada tarqalishiga mo‘ljallangan.

U uzoq masofali va yuqori tezlikdagi aloqa tizimlarida keng ishlatiladi.

Magistral va operator tarmoqlarida single-mode optik tola juda muhim.`
            },

            {
                title: "Multi-mode tola",

                text:
`Multi-mode fiber core diametri kattaroq bo‘lib, yorug‘lik bir nechta modada tarqalishi mumkin.

U ko‘pincha nisbatan qisqa masofali ulanishlarda ishlatiladi.

Masalan, ayrim lokal tarmoqlar va ma'lumotlar markazlaridagi ulanishlar.`
            },

            {
                title: "Single-mode va Multi-mode farqi",

                text:
`Umumiy taqqoslash:

\`\`\`
Single-mode
- kichik core
- uzoq masofa
- yuqori uzatish imkoniyati

Multi-mode
- kattaroq core
- qisqaroq masofa
- bir nechta yorug‘lik modasi
\`\`\`

Aniq masofa va tezlik ishlatiladigan optik standart va uskunalarga bog‘liq.`
            },

            {
                title: "Optik uzatgich va qabul qilgich",

                text:
`Optik tizimda uzatgich elektr signalini optik signalga aylantiradi.

Yorug‘lik manbai sifatida LED yoki lazer ishlatilishi mumkin.

Qabul qiluvchi tomonda fotodetektor optik signalni elektr signaliga aylantiradi.`
            },

            {
                title: "Optik yo‘qotish",

                text:
`Signal optik tola bo‘ylab tarqalganda uning quvvati kamayadi.

Bu hodisa attenuation — so‘nish deb ataladi.

Optik yo‘qotish odatda dB birliklarida baholanadi.

Unga:

- tolaning uzunligi;
- ulagichlar;
- payvandlash nuqtalari;
- bukilishlar

ta'sir qilishi mumkin.`
            },

            {
                title: "FTTH",

                text:
`FTTH — Fiber To The Home.

Bu texnologiyada optik tola abonent uyigacha olib boriladi.

Oddiy ko‘rinish:

\`\`\`
Operator
   ↓
OLT
   ↓
Optik tarmoq
   ↓
Splitter
   ↓
ONT / ONU
   ↓
Abonent
\`\`\`

FTTH yuqori tezlikdagi keng polosali xizmatlarni taqdim etishda keng qo‘llaniladi.`
            },

            {
                title: "Optik aloqaning afzalliklari",

                text:
`Optik tolaning asosiy afzalliklari:

- katta uzatish sig‘imi;
- uzoq masofaga uzatish;
- elektromagnit xalaqitlarga yuqori chidamlilik;
- kichik o‘lcham va massa;
- zamonaviy yuqori tezlikdagi tarmoqlarga mosligi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi FTTH sxemasini chizing:

\`\`\`
Internet
   ↓
Operator
   ↓
OLT
   ↓
Optik kabel
   ↓
Splitter
   ↓
ONT
   ↓
Wi-Fi Router
   ↓
Foydalanuvchi
\`\`\`

Har bir qurilmaning vazifasini qisqacha tushuntiring.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Optik aloqa nima?

2. Core nima?

3. Cladding nima?

4. Single-mode nima?

5. Multi-mode nima?

6. Attenuation nima?

7. FTTH nimani anglatadi?

8. OLT va ONT qanday vazifalarni bajaradi?`
            },

            {
                title: "Xulosa",

                text:
`Optik aloqa yuqori tezlik va katta uzatish sig‘imini talab qiladigan zamonaviy telekommunikatsiya tarmoqlarining muhim texnologiyasidir.

FTTH va magistral optik tarmoqlar Internet infratuzilmasida keng qo‘llaniladi.`
            }
        ]
    ),


    // ==================================================
    // 7. MOBIL ALOQA ASOSLARI
    // ==================================================

    lesson(
        "Mobil aloqa asoslari",

        "Mobil tarmoq, baza stansiya, hujayra, abonent qurilmasi, handover va mobil tarmoq arxitekturasi.",

        [
            {
                title: "Mobil aloqa nima?",

                text:
`Mobil aloqa foydalanuvchiga harakatlanayotgan holatda ham aloqa xizmatlaridan foydalanish imkonini beradi.

Mobil tarmoq orqali:

- ovozli qo‘ng‘iroq;
- SMS;
- mobil Internet;
- video;
- boshqa raqamli xizmatlardan

foydalanish mumkin.`
            },

            {
                title: "Hujayraviy aloqa",

                text:
`Mobil tarmoq hududi hujayralarga — celllarga bo‘linadi.

Har bir hududga baza stansiya xizmat ko‘rsatishi mumkin.

Soddalashtirilgan ko‘rinish:

\`\`\`
Cell A      Cell B

   BTS/BS ---- BTS/BS
      \\        /
       \\      /
      Operator
       tarmog‘i
\`\`\`

Hujayraviy tuzilma radioresurslardan samarali foydalanishga yordam beradi.`
            },

            {
                title: "Baza stansiya",

                text:
`Baza stansiya mobil qurilmalar bilan radioaloqa o‘rnatadigan tarmoq elementidir.

U smartfon va operatorning qolgan tarmog‘i o‘rtasidagi radio ulanishni ta'minlashda qatnashadi.

Avlodga qarab baza stansiya nomlari va arxitekturasi farq qilishi mumkin.`
            },

            {
                title: "Abonent qurilmasi",

                text:
`Mobil tarmoqdan foydalanuvchi qurilma UE — User Equipment deb atalishi mumkin.

Masalan:

- smartfon;
- modem;
- planshet;
- IoT qurilma.

UE radio tarmoq orqali operator infratuzilmasiga ulanadi.`
            },

            {
                title: "SIM karta",

                text:
`SIM abonentni mobil tarmoqda identifikatsiya va autentifikatsiya qilish jarayonlarida muhim rol o‘ynaydi.

Unda abonent bilan bog‘liq identifikatsiya va xavfsizlik ma'lumotlari mavjud bo‘lishi mumkin.

Zamonaviy qurilmalarda eSIM texnologiyasi ham qo‘llaniladi.`
            },

            {
                title: "Handover",

                text:
`Foydalanuvchi harakatlanganda u bir baza stansiya xizmat hududidan boshqasiga o‘tishi mumkin.

Aloqa sessiyasini imkon qadar uzmasdan yangi radio resursga o‘tkazish jarayoni handover deb ataladi.

Bu mobil aloqaning muhim xususiyatidir.`
            },

            {
                title: "Radio qamrov",

                text:
`Mobil signal qamroviga ko‘plab omillar ta'sir qiladi:

- baza stansiya quvvati;
- antenna balandligi;
- chastota;
- relyef;
- binolar;
- masofa;
- radio xalaqitlar.

Shuning uchun real qamrov hududi ideal aylana shaklida bo‘lmasligi mumkin.`
            },

            {
                title: "Mobil aloqa avlodlari",

                text:
`Mobil tarmoqlar tarixan avlodlarga bo‘linadi.

Umumiy ko‘rinish:

\`\`\`
1G → analog mobil aloqa

2G → raqamli ovoz va SMS

3G → mobil ma'lumot xizmatlarining rivojlanishi

4G → yuqori tezlikdagi paketli mobil tarmoq

5G → yuqori imkoniyatli yangi avlod mobil tarmoq
\`\`\`

Har bir avlod ichida turli standart va texnologiyalar mavjud.`
            },

            {
                title: "Mobil Internet qanday ishlaydi?",

                text:
`Soddalashtirilgan jarayon:

\`\`\`
Smartfon
   ↓
Radio aloqa
   ↓
Baza stansiya
   ↓
Operator tarmog‘i
   ↓
Internet
   ↓
Server
\`\`\`

Serverdan qaytgan ma'lumot teskari yo‘nalishda foydalanuvchiga yetkaziladi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Smartfonning Internetga ulanish sxemasini chizing.

Quyidagi elementlardan foydalaning:

- UE;
- baza stansiya;
- operator tarmog‘i;
- Internet;
- server.

Keyin foydalanuvchi harakatlanganda handover nima uchun kerakligini tushuntiring.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Mobil aloqa nima?

2. Cell nima?

3. Baza stansiya nima qiladi?

4. UE nima?

5. SIM nima uchun kerak?

6. Handover nima?

7. Radio qamrovga nimalar ta'sir qiladi?

8. 2G, 3G, 4G va 5G nimani bildiradi?`
            },

            {
                title: "Xulosa",

                text:
`Mobil aloqa radio tarmoq va operator infratuzilmasining birgalikdagi ishlashiga asoslanadi.

Hujayralar, baza stansiyalar, abonent qurilmalari va handover mexanizmlari mobil foydalanuvchiga harakat davomida aloqa xizmatlarini taqdim etishga yordam beradi.`
            }
        ]
    ),


    // ==================================================
    // 8. 4G LTE
    // ==================================================

    lesson(
        "4G LTE texnologiyasi",

        "LTE tarmog‘ining asosiy tushunchalari, UE, eNodeB, EPC, OFDMA va paketli mobil aloqa.",

        [
            {
                title: "LTE nima?",

                text:
`LTE — Long Term Evolution.

LTE mobil keng polosali aloqa uchun ishlab chiqilgan texnologiyadir va 4G ekotizimining muhim qismidir.

LTE yuqori tezlikdagi paketli ma'lumot uzatishga yo‘naltirilgan.`
            },

            {
                title: "LTE arxitekturasi",

                text:
`Soddalashtirilgan LTE tarmog‘i:

\`\`\`
UE
 ↓
eNodeB
 ↓
EPC
 ↓
Internet
\`\`\`

UE — abonent qurilmasi.

eNodeB — LTE radio kirish tarmog‘ining baza stansiyasi.

EPC — Evolved Packet Core.`
            },

            {
                title: "UE",

                text:
`UE — User Equipment.

Masalan:

- smartfon;
- LTE modem;
- router;
- boshqa mobil qurilma.

UE eNodeB bilan radio interfeys orqali aloqa qiladi.`
            },

            {
                title: "eNodeB",

                text:
`eNodeB LTE radio kirish tarmog‘ining asosiy elementidir.

U abonent qurilmalari bilan radioaloqani tashkil qiladi va ularni paketli yadro tarmog‘iga bog‘lashda qatnashadi.`
            },

            {
                title: "EPC",

                text:
`EPC — Evolved Packet Core.

Bu LTEning paketli yadro tarmog‘idir.

EPC mobil foydalanuvchining ulanishi, mobilligi va tashqi paketli tarmoqlar bilan aloqasi bilan bog‘liq bir qator vazifalarni bajaradi.`
            },

            {
                title: "OFDMA",

                text:
`LTE downlink radio interfeysida OFDMA muhim texnologiyalardan biridir.

OFDMA kanal resurslarini ko‘plab kichik ortogonal tashuvchilarga ajratish prinsipidan foydalanadi.

Bu radioresurslardan samarali foydalanishga yordam beradi.`
            },

            {
                title: "MIMO",

                text:
`MIMO — Multiple Input Multiple Output.

MIMO bir nechta uzatuvchi va qabul qiluvchi antenna yo‘llaridan foydalanish imkonini beradi.

Mos radio sharoitlarida bu usul uzatish imkoniyatlarini yaxshilashga yordam beradi.`
            },

            {
                title: "LTE va paketli tarmoq",

                text:
`LTE arxitekturasi paketli ma'lumot uzatishga asoslangan.

Internet xizmatlari IP tarmoq orqali ishlaydi.

Ovoz xizmatlari ham LTE ekotizimida IP asosidagi mexanizmlar orqali taqdim etilishi mumkin.`
            },

            {
                title: "VoLTE",

                text:
`VoLTE — Voice over LTE.

VoLTE LTE tarmog‘i orqali IP asosidagi ovoz xizmatini taqdim etish texnologiyasidir.

Uning ishlashi operator infratuzilmasi va IMS kabi qo‘shimcha tizimlar bilan bog‘liq.`
            },

            {
                title: "LTE tezligiga ta'sir qiluvchi omillar",

                text:
`Real foydalanuvchi tezligi doim bir xil bo‘lmaydi.

Unga:

- kanal kengligi;
- signal sifati;
- radio xalaqit;
- foydalanuvchilar soni;
- MIMO konfiguratsiyasi;
- tarmoq yuklanishi;
- qurilma imkoniyatlari

ta'sir qiladi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi LTE sxemasini chizing:

\`\`\`
Smartfon
   ↓
eNodeB
   ↓
EPC
   ↓
Internet
   ↓
Server
\`\`\`

UE, eNodeB va EPC vazifalarini alohida tushuntiring.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. LTE nimani anglatadi?

2. UE nima?

3. eNodeB nima?

4. EPC nima?

5. OFDMA nima uchun ishlatiladi?

6. MIMO nima?

7. VoLTE nima?

8. LTE tezligiga qanday omillar ta'sir qiladi?`
            },

            {
                title: "Xulosa",

                text:
`LTE yuqori tezlikdagi paketli mobil aloqa uchun muhim texnologiyadir.

UE, eNodeB va EPC uning soddalashtirilgan arxitekturasidagi asosiy tushunchalardir.

LTE keyingi avlod mobil tarmoqlarini tushunish uchun ham muhim asos yaratadi.`
            }
        ]
    ),


    // ==================================================
    // 9. 5G
    // ==================================================

    lesson(
        "5G texnologiyasi",

        "5G mobil tarmog‘i, gNodeB, 5G Core, eMBB, URLLC, mMTC, beamforming va network slicing.",

        [
            {
                title: "5G nima?",

                text:
`5G — beshinchi avlod mobil aloqa texnologiyalar oilasidir.

5G faqat yuqori tezlikni emas, balki turli xizmat talablarini qo‘llab-quvvatlashga mo‘ljallangan.

U smartfonlar bilan birga IoT, sanoat va boshqa yangi xizmatlarda ham qo‘llanilishi mumkin.`
            },

            {
                title: "5G arxitekturasi",

                text:
`Soddalashtirilgan ko‘rinish:

\`\`\`
UE
 ↓
gNodeB
 ↓
5G Core
 ↓
Data Network
\`\`\`

UE — foydalanuvchi qurilmasi.

gNodeB — 5G radio kirish tarmog‘i elementi.

5G Core — yadro tarmog‘i.`
            },

            {
                title: "5G NR",

                text:
`NR — New Radio.

5G NR 5Gning radio kirish texnologiyasidir.

U turli chastota diapazonlari va turli xizmat talablariga mos ishlash uchun ishlab chiqilgan.`
            },

            {
                title: "eMBB",

                text:
`eMBB — enhanced Mobile Broadband.

Bu yo‘nalish yuqori hajmdagi mobil ma'lumot xizmatlariga qaratilgan.

Masalan:

- yuqori sifatli video;
- katta fayllar;
- yuqori tezlik talab qiluvchi mobil ilovalar.`
            },

            {
                title: "URLLC",

                text:
`URLLC — Ultra-Reliable and Low-Latency Communications.

Bu tushuncha yuqori ishonchlilik va past kechikish talab qilinadigan xizmatlar bilan bog‘liq.

Aniq imkoniyatlar real tarmoq konfiguratsiyasi va xizmat talablariga bog‘liq.`
            },

            {
                title: "mMTC",

                text:
`mMTC — massive Machine Type Communications.

Bu juda ko‘p sonli mashina va IoT turidagi qurilmalarni ulash bilan bog‘liq xizmat kategoriyasidir.

Sensorlar va turli IoT tizimlari bunga misol bo‘lishi mumkin.`
            },

            {
                title: "Beamforming",

                text:
`Beamforming radio energiyani kerakli yo‘nalishga samaraliroq yo‘naltirishga yordam beradigan antenna signalini qayta ishlash usullaridan biridir.

5G radio tizimlarida antenna massivlari va beamforming muhim rol o‘ynashi mumkin.`
            },

            {
                title: "Network Slicing",

                text:
`Network slicing umumiy tarmoq infratuzilmasi ustida turli xizmat talablariga mos mantiqiy tarmoq imkoniyatlarini tashkil etish konsepsiyasidir.

Masalan, turli xizmatlar tezlik, kechikish yoki ishonchlilik bo‘yicha turli talabga ega bo‘lishi mumkin.`
            },

            {
                title: "5G chastotalari",

                text:
`5G turli chastota diapazonlarida ishlashi mumkin.

Pastroq chastotalar odatda kengroq qamrov xususiyatiga ega bo‘lishi mumkin.

Yuqoriroq chastotalarda katta kanal kengligi imkoniyatlari mavjud bo‘lishi mumkin, ammo radio tarqalish sharoitlari boshqacha bo‘ladi.

Real natija tarmoq va muhitga bog‘liq.`
            },

            {
                title: "4G va 5G",

                text:
`5G yangi radio va yadro tarmoq imkoniyatlarini taqdim etadi.

4G va 5G o‘rtasidagi farq faqat maksimal tezlik bilan cheklanmaydi.

Arxitektura, radio interfeys, xizmat turlari, kechikish talablari va qurilmalar soni kabi jihatlar ham muhim.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi sxemani chizing:

\`\`\`
5G telefon
    ↓
  gNodeB
    ↓
 5G Core
    ↓
 Internet
    ↓
  Server
\`\`\`

Keyin quyidagi uch tushunchaga bittadan amaliy misol yozing:

- eMBB;
- URLLC;
- mMTC.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. 5G nima?

2. 5G NR nima?

3. gNodeB nima?

4. 5G Core nima?

5. eMBB nima?

6. URLLC nima?

7. mMTC nima?

8. Beamforming nima?

9. Network slicing nima?`
            },

            {
                title: "Xulosa",

                text:
`5G turli xizmatlar va qurilmalar uchun moslashuvchan mobil aloqa imkoniyatlarini rivojlantiradi.

eMBB, URLLC, mMTC, beamforming va network slicing 5Gni o‘rganishda muhim tushunchalardir.`
            }
        ]
    ),


    // ==================================================
    // 10. WI-FI
    // ==================================================

    lesson(
        "Wi-Fi texnologiyasi",

        "Wi-Fi, IEEE 802.11 standartlari, access point, SSID, 2.4/5/6 GHz diapazonlari va Wi-Fi xavfsizligi.",

        [
            {
                title: "Wi-Fi nima?",

                text:
`Wi-Fi qurilmalarni simsiz lokal tarmoqqa ulash uchun keng qo‘llaniladigan texnologiyadir.

Wi-Fi orqali:

- smartfon;
- noutbuk;
- planshet;
- televizor;
- IoT qurilmalar

lokal tarmoq va Internetga ulanishi mumkin.`
            },

            {
                title: "IEEE 802.11",

                text:
`Wi-Fi texnologiyalari IEEE 802.11 standartlari oilasi bilan bog‘liq.

Vaqt davomida turli avlodlar ishlab chiqilgan.

Masalan:

- 802.11n;
- 802.11ac;
- 802.11ax;
- 802.11be.

Marketing nomlarida ular Wi-Fi 4, Wi-Fi 5, Wi-Fi 6 va Wi-Fi 7 kabi nomlar bilan ham uchraydi.`
            },

            {
                title: "Access Point",

                text:
`Access Point — AP simsiz qurilmalarni tarmoqqa ulaydigan qurilma yoki tarmoq funksiyasidir.

Uy routerlarida Wi-Fi access point funksiyasi ko‘pincha router bilan bitta qurilmada birlashtirilgan bo‘ladi.`
            },

            {
                title: "SSID",

                text:
`SSID — Wi-Fi tarmog‘ining nomi.

Masalan:

\`\`\`
StudentHub_WiFi
\`\`\`

Foydalanuvchi qurilmasida mavjud Wi-Fi tarmoqlar ro‘yxatida SSID ko‘rinadi.`
            },

            {
                title: "2.4 GHz",

                text:
`2.4 GHz diapazoni Wi-Fi tarmoqlarida uzoq vaqtdan beri keng ishlatiladi.

Uning tarqalish xususiyatlari 5 GHzga nisbatan ayrim sharoitlarda kengroq qamrov berishi mumkin.

Biroq bu diapazonda boshqa ko‘plab qurilmalar ham ishlashi sababli xalaqit muammolari yuzaga kelishi mumkin.`
            },

            {
                title: "5 GHz",

                text:
`5 GHz diapazoni zamonaviy Wi-Fi tarmoqlarida keng ishlatiladi.

U ko‘proq kanal imkoniyatlarini taqdim etishi mumkin.

Qamrov va tezlik esa devorlar, masofa, qurilma va tarmoq konfiguratsiyasiga bog‘liq.`
            },

            {
                title: "6 GHz",

                text:
`Yangi Wi-Fi avlodlarida 6 GHz diapazonidan foydalanish imkoniyati ham mavjud.

U qo‘shimcha spektr va keng kanal imkoniyatlarini taqdim etishi mumkin.

Biroq undan foydalanish qurilma, standart va hududiy radiochastota qoidalariga bog‘liq.`
            },

            {
                title: "Kanal",

                text:
`Wi-Fi chastota diapazoni kanallarga bo‘linadi.

Bir hududdagi ko‘plab Wi-Fi tarmoqlar noto‘g‘ri rejalashtirilsa, ular bir-biriga xalaqit berishi mumkin.

Shuning uchun kanal tanlash tarmoq sifatiga ta'sir qilishi mumkin.`
            },

            {
                title: "Wi-Fi xavfsizligi",

                text:
`Simsiz tarmoqni himoyalash juda muhim.

Amaliy tavsiyalar:

- kuchli parol ishlatish;
- zamonaviy xavfsizlik rejimidan foydalanish;
- router dasturiy ta'minotini yangilab turish;
- standart administrator parolini almashtirish;
- noma'lum qurilmalarni nazorat qilish.

WPA2 va WPA3 kabi himoya mexanizmlari Wi-Fi xavfsizligida muhim.`
            },

            {
                title: "Wi-Fi tezligiga ta'sir qiluvchi omillar",

                text:
`Real Wi-Fi tezligiga:

- router imkoniyatlari;
- qurilma imkoniyatlari;
- masofa;
- devorlar;
- kanal kengligi;
- radio xalaqit;
- foydalanuvchilar soni;
- ishlatilayotgan Wi-Fi standarti

ta'sir qiladi.

Reklamada ko‘rsatilgan nazariy maksimal tezlik real foydalanuvchi tezligiga teng bo‘lishi shart emas.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Uy yoki universitet Wi-Fi tarmog‘ining oddiy sxemasini chizing:

\`\`\`
Internet
   ↓
Router / AP
   ↓
Wi-Fi
 ↙  ↓  ↘
PC Phone Laptop
\`\`\`

Keyin:

1. SSID nima ekanini yozing.

2. 2.4 GHz va 5 GHzni taqqoslang.

3. Wi-Fi xavfsizligi uchun kamida to‘rtta tavsiya yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Wi-Fi nima?

2. IEEE 802.11 nima?

3. Access Point nima?

4. SSID nima?

5. 2.4 GHz va 5 GHz o‘rtasida qanday farqlar mavjud?

6. Wi-Fi kanali nima?

7. WPA2 va WPA3 nima bilan bog‘liq?

8. Wi-Fi tezligiga qanday omillar ta'sir qiladi?`
            },

            {
                title: "Xulosa",

                text:
`Wi-Fi simsiz lokal tarmoqlarning asosiy texnologiyalaridan biridir.

IEEE 802.11 standartlari, access point, SSID, chastota diapazonlari, kanallar va xavfsizlik mexanizmlarini tushunish Wi-Fi tarmoqlarini to‘g‘ri tashkil qilish uchun muhim.`
            }
        ]
    )

];


// ==================================================
// DATABASE
// ==================================================

const findMaterial =
    db.prepare(`
        SELECT
            id,
            title,
            subject
        FROM materials
        WHERE title = ?
          AND subject = ?
        LIMIT 1
    `);


const updateMaterial =
    db.prepare(`
        UPDATE materials

        SET
            description = ?,
            content = ?

        WHERE id = ?
    `);


// ==================================================
// UPDATE TRANSACTION
// ==================================================

const updateLessons =
    db.transaction(function () {

        let updated = 0;
        let notFound = 0;

        for (const material of lessons) {

            const existing =
                findMaterial.get(
                    material.title,
                    material.subject
                );


            if (!existing) {

                console.log(
                    "⚠️ Topilmadi:",
                    material.title
                );

                notFound++;

                continue;
            }


            const result =
                updateMaterial.run(
                    material.description,
                    material.content,
                    existing.id
                );


            if (result.changes > 0) {

                console.log(
                    "✅ Yangilandi:",
                    material.title
                );

                updated++;

            } else {

                console.log(
                    "⚠️ Yangilanmadi:",
                    material.title
                );

            }

        }


        return {
            updated,
            notFound
        };

    });


// ==================================================
// ISHGA TUSHIRISH
// ==================================================

try {

    const result =
        updateLessons();


    console.log("");
    console.log(
        "=========================================="
    );

    console.log(
        "🎉 TELEKOMMUNIKATSIYA DARSLARI TAYYOR"
    );

    console.log(
        "=========================================="
    );

    console.log(
        "✅ Yangilandi:",
        result.updated
    );

    console.log(
        "⚠️ Topilmadi:",
        result.notFound
    );

    console.log(
        "📚 Jami dars:",
        lessons.length
    );

    console.log(
        "=========================================="
    );

    console.log("");

}
catch (error) {

    console.error(
        "❌ Telekom materiallarini yangilash xatosi:",
        error
    );

    process.exitCode = 1;

}