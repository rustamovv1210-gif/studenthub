// ==================================================
// STUDENT HUB
// SEED MATERIALS
// 30 TA ICHKI O'QUV MATERIALI
// ==================================================

const db = require("./database");


// ==================================================
// YORDAMCHI FUNKSIYA
// ==================================================

function lesson(title, subject, description, sections) {

    let content = `# ${title}\n\n`;

    for (const section of sections) {

        content += `## ${section.title}\n\n`;

        content += `${section.text}\n\n`;
    }

    return {
        title,
        subject,
        description,
        content
    };
}


// ==================================================
// MATERIALLAR
// ==================================================

const materials = [


    // ==================================================
    // DASTURLASH
    // ==================================================

    lesson(
        "HTML asoslari",
        "Dasturlash",
        "HTML hujjat tuzilishi, teglar, elementlar va atributlar.",
        [
            {
                title: "HTML nima?",
                text:
`HTML — HyperText Markup Language.

HTML veb-sahifaning tuzilishini yaratish uchun
ishlatiladigan belgilash tilidir.

Brauzer HTML kodini o‘qib,
uni veb-sahifa sifatida foydalanuvchiga ko‘rsatadi.`
            },

            {
                title: "Asosiy HTML teglar",
                text:
`h1 — asosiy sarlavha.

p — paragraf.

a — havola.

img — rasm.

ul va ol — ro‘yxatlar.

div — blok yaratadi.

form — forma yaratish uchun ishlatiladi.`
            },

            {
                title: "Atributlar",
                text:
`Atribut elementga qo‘shimcha ma’lumot beradi.

Masalan:

<a href="https://example.com">Sayt</a>

Bu yerda href atribut hisoblanadi.`
            },

            {
                title: "Xulosa",
                text:
`HTML sahifaning strukturasini yaratadi.

CSS dizaynni boshqaradi.

JavaScript esa sahifaga interaktivlik qo‘shadi.`
            }
        ]
    ),


    lesson(
        "CSS asoslari",
        "Dasturlash",
        "CSS yordamida veb-sahifa dizaynini boshqarish.",
        [
            {
                title: "CSS nima?",
                text:
`CSS — Cascading Style Sheets.

CSS HTML elementlarining tashqi ko‘rinishini
boshqarish uchun ishlatiladi.`
            },

            {
                title: "CSS misoli",
                text:
`body {
    background: white;
    color: black;
}

h1 {
    font-size: 32px;
}`
            },

            {
                title: "Box model",
                text:
`CSS Box Model to‘rtta asosiy qismdan iborat:

Content — element ichidagi ma’lumot.

Padding — ichki bo‘shliq.

Border — chegara.

Margin — tashqi bo‘shliq.`
            },

            {
                title: "Flexbox va Grid",
                text:
`Flexbox elementlarni qator yoki ustun bo‘yicha
joylashtirishda qulay.

CSS Grid esa murakkab sahifa strukturalarini
yaratish uchun ishlatiladi.`
            }
        ]
    ),


    lesson(
        "JavaScript asoslari",
        "Dasturlash",
        "JavaScript sintaksisi va interaktiv veb-sahifalar.",
        [
            {
                title: "JavaScript nima?",
                text:
`JavaScript veb-sahifalarga interaktivlik
qo‘shish uchun ishlatiladigan dasturlash tilidir.

Masalan:

console.log("Salom Student Hub!");`
            },

            {
                title: "O‘zgaruvchi",
                text:
`let name = "Ali";

const year = 2026;

let qiymatini keyinchalik o‘zgartirish mumkin.

const esa qayta qiymat berilmaydigan
o‘zgaruvchi yaratishda ishlatiladi.`
            },

            {
                title: "JavaScript va HTML",
                text:
`JavaScript HTML elementlarini topishi
va o‘zgartirishi mumkin.

Masalan:

document.getElementById("title").textContent =
    "Student Hub";`
            },

            {
                title: "Event",
                text:
`Event foydalanuvchi harakatiga javob beradi.

Masalan tugma bosilganda:

button.addEventListener("click", function () {
    console.log("Tugma bosildi");
});`
            }
        ]
    ),


    lesson(
        "O‘zgaruvchilar va ma’lumot turlari",
        "Dasturlash",
        "let, const va JavaScript ma’lumot turlari.",
        [
            {
                title: "O‘zgaruvchilar",
                text:
`O‘zgaruvchi dastur ichida ma’lumot saqlaydi.

let score = 80;

const siteName = "Student Hub";`
            },

            {
                title: "Asosiy ma’lumot turlari",
                text:
`String — matn.

Number — son.

Boolean — true yoki false.

Array — qiymatlar ro‘yxati.

Object — bog‘langan ma’lumotlar to‘plami.`
            },

            {
                title: "Array misoli",
                text:
`const subjects = [
    "Dasturlash",
    "Telekommunikatsiya",
    "Axborot xavfsizligi"
];`
            },

            {
                title: "Object misoli",
                text:
`const student = {
    name: "Ali",
    age: 20,
    course: 3
};`
            }
        ]
    ),


    lesson(
        "Shart operatorlari",
        "Dasturlash",
        "if, else if, else va mantiqiy shartlar.",
        [
            {
                title: "if operatori",
                text:
`if shartni tekshiradi.

let score = 80;

if (score >= 60) {
    console.log("Testdan o'tdingiz");
}`
            },

            {
                title: "if va else",
                text:
`if (score >= 60) {
    console.log("O'tdi");
} else {
    console.log("O'tmadi");
}`
            },

            {
                title: "Taqqoslash",
                text:
`> — katta.

< — kichik.

>= — katta yoki teng.

<= — kichik yoki teng.

=== — teng.

!== — teng emas.`
            },

            {
                title: "Mantiqiy operatorlar",
                text:
`&& — AND.

|| — OR.

! — NOT.`
            }
        ]
    ),


    lesson(
        "Sikllar",
        "Dasturlash",
        "for va while yordamida takrorlanuvchi amallar.",
        [
            {
                title: "Sikl nima?",
                text:
`Sikl bir xil amalni bir necha marta
takrorlash uchun ishlatiladi.`
            },

            {
                title: "for",
                text:
`for (let i = 1; i <= 5; i++) {
    console.log(i);
}`
            },

            {
                title: "while",
                text:
`let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}`
            },

            {
                title: "Amaliy qo‘llanish",
                text:
`Student Hub'da sikllar:

test savollarini chiqarish,

materiallarni chiqarish,

natijalarni ko‘rsatish

kabi vazifalarda ishlatiladi.`
            }
        ]
    ),


    lesson(
        "Funksiyalar",
        "Dasturlash",
        "JavaScript funksiyalari, parametr va return.",
        [
            {
                title: "Funksiya",
                text:
`Funksiya ma’lum vazifani bajaradigan
qayta ishlatiluvchi kod blokidir.

function salom() {
    console.log("Salom");
}`
            },

            {
                title: "Parametr",
                text:
`function salom(name) {
    console.log("Salom " + name);
}

salom("Ali");`
            },

            {
                title: "return",
                text:
`function add(a, b) {
    return a + b;
}

const result = add(5, 3);`
            },

            {
                title: "Afzalligi",
                text:
`Funksiyalar kod takrorlanishini kamaytiradi,
dasturni tartibli qiladi va kodni
qayta ishlatish imkonini beradi.`
            }
        ]
    ),


    lesson(
        "Massivlar",
        "Dasturlash",
        "JavaScript Array va asosiy massiv metodlari.",
        [
            {
                title: "Array",
                text:
`Massiv bir nechta qiymatni bitta
o‘zgaruvchida saqlaydi.

const subjects = [
    "HTML",
    "CSS",
    "JavaScript"
];`
            },

            {
                title: "Indeks",
                text:
`Massiv indekslari 0 dan boshlanadi.

subjects[0]

natijasi HTML bo‘ladi.`
            },

            {
                title: "Metodlar",
                text:
`push() — oxiriga element qo‘shadi.

pop() — oxirgi elementni olib tashlaydi.

filter() — shartga mos elementlarni ajratadi.

map() — elementlardan yangi massiv yaratadi.`
            },

            {
                title: "length",
                text:
`Massivdagi elementlar sonini olish:

subjects.length`
            }
        ]
    ),


    lesson(
        "DOM bilan ishlash",
        "Dasturlash",
        "JavaScript yordamida HTML elementlarini boshqarish.",
        [
            {
                title: "DOM",
                text:
`DOM — Document Object Model.

Brauzer HTML hujjatini obyektlar
daraxti sifatida ifodalaydi.`
            },

            {
                title: "Elementni topish",
                text:
`const title =
    document.getElementById("title");`
            },

            {
                title: "Elementni o‘zgartirish",
                text:
`title.textContent = "Student Hub";

title.classList.add("active");`
            },

            {
                title: "Yangi element",
                text:
`const card =
    document.createElement("div");

card.textContent = "Yangi material";

document.body.appendChild(card);`
            }
        ]
    ),


    lesson(
        "Algoritmlar asoslari",
        "Dasturlash",
        "Algoritm va algoritmik fikrlash asoslari.",
        [
            {
                title: "Algoritm",
                text:
`Algoritm — muammoni yechish uchun
bajariladigan aniq va tartibli
amallar ketma-ketligidir.`
            },

            {
                title: "Asosiy xususiyatlar",
                text:
`Aniqlik.

Tartiblilik.

Natijaviylik.

Cheklangan qadamlar soni.`
            },

            {
                title: "Algoritm turlari",
                text:
`Ketma-ket algoritm.

Tarmoqlanuvchi algoritm.

Takrorlanuvchi algoritm.`
            },

            {
                title: "Psevdokod",
                text:
`START

INPUT a, b

sum = a + b

OUTPUT sum

END`
            }
        ]
    ),


    // ==================================================
    // TELEKOMMUNIKATSIYA
    // ==================================================

    lesson(
        "Telekommunikatsiya asoslari",
        "Telekommunikatsiya",
        "Telekommunikatsiya tizimining asosiy elementlari.",
        [
            {
                title: "Telekommunikatsiya",
                text:
`Telekommunikatsiya — axborotni masofaga
uzatish bilan bog‘liq texnologiyalar majmuasi.`
            },

            {
                title: "Aloqa tizimi",
                text:
`Asosiy qismlar:

Axborot manbai.

Uzatgich.

Aloqa kanali.

Qabul qilgich.

Axborot qabul qiluvchi.`
            },

            {
                title: "Axborot turlari",
                text:
`Ovoz.

Matn.

Rasm.

Video.

Raqamli ma’lumotlar.`
            },

            {
                title: "Aloqa muhiti",
                text:
`Mis kabel.

Optik tola.

Radio to‘lqinlar.

Sun’iy yo‘ldosh kanallari.`
            }
        ]
    ),


    lesson(
        "Signal va uning parametrlari",
        "Telekommunikatsiya",
        "Amplituda, chastota, davr va faza.",
        [
            {
                title: "Signal",
                text:
`Signal axborotni uzatishga xizmat qiluvchi
fizik kattalikning o‘zgarishidir.`
            },

            {
                title: "Amplituda",
                text:
`Amplituda signalning maksimal
qiymatini ifodalaydi.`
            },

            {
                title: "Chastota va davr",
                text:
`Chastota bir sekunddagi tebranishlar sonidir.

Birligi Hertz — Hz.

f = 1 / T

T = 1 / f`
            },

            {
                title: "Signal turlari",
                text:
`Analog signal uzluksiz o‘zgaradi.

Raqamli signal diskret qiymatlar
bilan ifodalanadi.`
            }
        ]
    ),


    lesson(
        "OSI modeli",
        "Telekommunikatsiya",
        "OSI modelining 7 ta qatlami.",
        [
            {
                title: "OSI",
                text:
`OSI — Open Systems Interconnection.

Tarmoqdagi aloqa jarayonini
7 qatlamga ajratadi.`
            },

            {
                title: "Yuqori qatlamlar",
                text:
`7. Application.

6. Presentation.

5. Session.`
            },

            {
                title: "Asosiy transport va tarmoq",
                text:
`4. Transport — TCP va UDP.

3. Network — IP va marshrutlash.`
            },

            {
                title: "Quyi qatlamlar",
                text:
`2. Data Link — MAC va freymlar.

1. Physical — kabel, signal va bitlar.`
            }
        ]
    ),


    lesson(
        "TCP/IP modeli",
        "Telekommunikatsiya",
        "Internet TCP/IP arxitekturasi va protokollari.",
        [
            {
                title: "TCP/IP",
                text:
`TCP/IP internetning asosiy
protokollar to‘plamidir.`
            },

            {
                title: "Application",
                text:
`HTTP.

HTTPS.

DNS.

SMTP.`
            },

            {
                title: "Transport",
                text:
`TCP ishonchli uzatishga yo‘naltirilgan.

UDP kamroq xizmat xarajati bilan
tezkor uzatish imkonini beradi.`
            },

            {
                title: "Internet",
                text:
`IP manzillash va paketlarni
tarmoqlar orasida yo‘naltirish
uchun ishlatiladi.`
            }
        ]
    ),


    lesson(
        "LAN, MAN va WAN tarmoqlari",
        "Telekommunikatsiya",
        "Tarmoqlarni geografik qamrov bo‘yicha tasniflash.",
        [
            {
                title: "LAN",
                text:
`Local Area Network.

Uy, ofis yoki laboratoriya kabi
kichik hududdagi lokal tarmoq.`
            },

            {
                title: "MAN",
                text:
`Metropolitan Area Network.

Shahar miqyosidagi tarmoq.`
            },

            {
                title: "WAN",
                text:
`Wide Area Network.

Katta geografik hududdagi tarmoq.

Turli shahar va davlatlardagi
tarmoqlarni bog‘lashi mumkin.`
            },

            {
                title: "Qurilmalar",
                text:
`Switch lokal tarmoq qurilmalarini bog‘laydi.

Router turli tarmoqlar orasida
paketlarni yo‘naltiradi.`
            }
        ]
    ),
        lesson(
        "Optik aloqa asoslari",
        "Telekommunikatsiya",
        "Optik tola va yorug‘lik orqali ma’lumot uzatish.",
        [
            {
                title: "Optik aloqa",
                text:
`Optik aloqa tizimida ma’lumot
yorug‘lik signallari yordamida
optik tola orqali uzatiladi.`
            },

            {
                title: "Optik tola",
                text:
`Optik tola asosan:

yadro,

qobiq,

himoya qatlamidan

tashkil topadi.`
            },

            {
                title: "Afzalliklari",
                text:
`Yuqori uzatish tezligi.

Katta o‘tkazish qobiliyati.

Uzoq masofaga uzatish.

Elektromagnit shovqinlarga chidamlilik.`
            },

            {
                title: "Single-mode va Multi-mode",
                text:
`Single-mode uzoq masofa va
yuqori tezlikdagi tizimlarda ishlatiladi.

Multi-mode esa odatda
qisqaroq masofalarda ishlatiladi.`
            }
        ]
    ),


    lesson(
        "Mobil aloqa asoslari",
        "Telekommunikatsiya",
        "Uyali aloqa va bazaviy stansiyalar.",
        [
            {
                title: "Mobil aloqa",
                text:
`Mobil aloqa foydalanuvchiga
harakatlanish vaqtida ham
tarmoq xizmatlaridan foydalanish
imkonini beradi.`
            },

            {
                title: "Uyali prinsip",
                text:
`Xizmat hududi kichik geografik
qismlarga — cell'larga ajratiladi.

Har bir hududga bazaviy
stansiya xizmat ko‘rsatadi.`
            },

            {
                title: "Handover",
                text:
`Foydalanuvchi bir cell'dan
boshqasiga o‘tganda aloqa
yangi bazaviy stansiyaga uzatilishi mumkin.

Bu jarayon handover deyiladi.`
            },

            {
                title: "Mobil avlodlar",
                text:
`2G — raqamli ovoz.

3G — mobil internet.

4G — yuqori tezlikdagi paketli aloqa.

5G — yuqori tezlik, kichik kechikish
va ko‘p qurilmalarni qo‘llab-quvvatlash.`
            }
        ]
    ),


    lesson(
        "4G LTE texnologiyasi",
        "Telekommunikatsiya",
        "LTE mobil tarmog‘ining asosiy xususiyatlari.",
        [
            {
                title: "LTE",
                text:
`LTE — Long Term Evolution.

Mobil keng polosali ma’lumot
uzatish texnologiyasidir.`
            },

            {
                title: "Arxitektura",
                text:
`LTE radio qismi E-UTRAN deb ataladi.

Bazaviy stansiya eNodeB.

Yadro tarmog‘i EPC —
Evolved Packet Core deb ataladi.`
            },

            {
                title: "OFDMA",
                text:
`LTE downlink yo‘nalishida
OFDMA texnologiyasidan foydalanadi.

Bu radioresurslarni foydalanuvchilar
orasida samarali taqsimlashga yordam beradi.`
            },

            {
                title: "MIMO",
                text:
`MIMO bir nechta antenna yordamida
uzatish va qabul qilish imkoniyatidan
foydalanadi.

Bu aloqa samaradorligini oshiradi.`
            }
        ]
    ),


    lesson(
        "5G texnologiyasi",
        "Telekommunikatsiya",
        "5G tarmog‘ining asosiy imkoniyatlari.",
        [
            {
                title: "5G",
                text:
`5G mobil aloqaning yangi
avlod texnologiyalaridan biridir.

U yuqori tezlik va turli
xizmat ssenariylarini qo‘llab-quvvatlaydi.`
            },

            {
                title: "eMBB",
                text:
`eMBB — Enhanced Mobile Broadband.

Yuqori tezlikdagi mobil
internet xizmatlariga yo‘naltirilgan.`
            },

            {
                title: "URLLC va mMTC",
                text:
`URLLC kichik kechikish va
yuqori ishonchlilik talab qiladigan
xizmatlar uchun mo‘ljallangan.

mMTC juda ko‘p IoT qurilmalarini
ulashga yo‘naltirilgan.`
            },

            {
                title: "Massive MIMO va Beamforming",
                text:
`Massive MIMO ko‘p antenna
elementlaridan foydalanadi.

Beamforming signal energiyasini
kerakli yo‘nalishga shakllantirishga
yordam beradi.`
            }
        ]
    ),


    lesson(
        "Wi-Fi texnologiyasi",
        "Telekommunikatsiya",
        "Wi-Fi, Access Point va IEEE 802.11 standartlari.",
        [
            {
                title: "Wi-Fi",
                text:
`Wi-Fi IEEE 802.11 standartlari
oilasiga asoslangan simsiz
lokal tarmoq texnologiyasidir.`
            },

            {
                title: "Access Point va SSID",
                text:
`Access Point simsiz qurilmalarni
lokal tarmoqqa ulaydi.

SSID esa Wi-Fi tarmog‘ining nomidir.`
            },

            {
                title: "Wi-Fi avlodlari",
                text:
`Wi-Fi 4 — IEEE 802.11n.

Wi-Fi 5 — IEEE 802.11ac.

Wi-Fi 6 — IEEE 802.11ax.

Wi-Fi 7 — IEEE 802.11be.`
            },

            {
                title: "Xavfsizlik",
                text:
`Wi-Fi tarmoqlarini himoyalash uchun
WPA oilasidagi xavfsizlik
mexanizmlaridan foydalaniladi.

Kuchli paroldan foydalanish muhim.`
            }
        ]
    ),


    // ==================================================
    // AXBOROT XAVFSIZLIGI
    // ==================================================

    lesson(
        "Axborot xavfsizligi asoslari",
        "Axborot xavfsizligi",
        "Axborot xavfsizligining asosiy tamoyillari.",
        [
            {
                title: "Axborot xavfsizligi",
                text:
`Axborot xavfsizligi axborot
va axborot tizimlarini turli
tahdidlardan himoya qilish bilan
bog‘liq sohadir.`
            },

            {
                title: "Confidentiality",
                text:
`Confidentiality — maxfiylik.

Ma’lumotga faqat ruxsat berilgan
shaxslar kira olishi kerak.`
            },

            {
                title: "Integrity",
                text:
`Integrity — yaxlitlik.

Ma’lumot ruxsatsiz
o‘zgartirilmasligi kerak.`
            },

            {
                title: "Availability",
                text:
`Availability — mavjudlik.

Kerakli vaqtda tizim va
ma’lumotlardan foydalanish
imkoniyati mavjud bo‘lishi kerak.`
            }
        ]
    ),


    lesson(
        "Kiber tahdidlar",
        "Axborot xavfsizligi",
        "Asosiy kiber tahdidlar va himoya tushunchalari.",
        [
            {
                title: "Kiber tahdid",
                text:
`Kiber tahdid axborot tizimi
yoki ma’lumotlarga zarar
yetkazishi mumkin bo‘lgan xavfdir.`
            },

            {
                title: "Malware",
                text:
`Malware zararli dasturlar
uchun umumiy atama.

Virus, worm, trojan va ransomware
bunga misol bo‘lishi mumkin.`
            },

            {
                title: "Phishing",
                text:
`Phishing foydalanuvchini aldab
parol yoki boshqa maxfiy
ma’lumotlarni olishga qaratilgan
hujum turidir.`
            },

            {
                title: "Himoyalanish",
                text:
`Dasturlarni yangilab turish.

Shubhali havolalarni ochmaslik.

Kuchli autentifikatsiyadan foydalanish.

Muhim ma’lumotlardan backup olish.`
            }
        ]
    ),


    lesson(
        "Kuchli parollar",
        "Axborot xavfsizligi",
        "Parol xavfsizligi va hisoblarni himoyalash.",
        [
            {
                title: "Kuchli parol",
                text:
`Yaxshi parol uzun va
taxmin qilish qiyin bo‘lishi kerak.

Har bir muhim hisob uchun
alohida paroldan foydalanish tavsiya etiladi.`
            },

            {
                title: "Zaif parollar",
                text:
`123456

password

qwerty

kabi oddiy parollar xavfsiz emas.`
            },

            {
                title: "Parol menejeri",
                text:
`Parol menejeri ko‘p va
noyob parollarni boshqarishga
yordam beradi.`
            },

            {
                title: "Ikki bosqichli autentifikatsiya",
                text:
`Paroldan tashqari qo‘shimcha
tasdiqlash omilidan foydalanish
hisob xavfsizligini kuchaytiradi.`
            }
        ]
    ),


    lesson(
        "Autentifikatsiya va avtorizatsiya",
        "Axborot xavfsizligi",
        "Authentication va authorization farqi.",
        [
            {
                title: "Authentication",
                text:
`Authentication foydalanuvchining
kimligini tekshiradi.

Masalan:

email va parol orqali login qilish.`
            },

            {
                title: "Authorization",
                text:
`Authorization foydalanuvchining
tizimda nima qilishga ruxsati
borligini belgilaydi.`
            },

            {
                title: "Faktorlar",
                text:
`Bilim faktori — parol yoki PIN.

Egalik faktori — telefon yoki token.

Biometrik faktor — barmoq izi yoki yuz.`
            },

            {
                title: "Student Hub misoli",
                text:
`Student Hub'da login —
authentication.

Student va admin huquqlarini
ajratish esa authorization.`
            }
        ]
    ),


    lesson(
        "Kriptografiya asoslari",
        "Axborot xavfsizligi",
        "Shifrlash, kalit va kriptografiya asoslari.",
        [
            {
                title: "Kriptografiya",
                text:
`Kriptografiya axborotni
matematik usullar yordamida
himoyalash bilan shug‘ullanadi.`
            },

            {
                title: "Plaintext va Ciphertext",
                text:
`Plaintext — shifrlanmagan
asl ma’lumot.

Ciphertext — shifrlangan
ma’lumot ko‘rinishi.`
            },

            {
                title: "Encryption va Decryption",
                text:
`Encryption plaintextni
ciphertextga aylantiradi.

Decryption ciphertextni
asl holatga qaytaradi.`
            },

            {
                title: "Kalit",
                text:
`Kalit kriptografik algoritm
bilan birga ishlatiladigan qiymatdir.

Kalitning xavfsiz saqlanishi
juda muhim.`
            }
        ]
    ),


    lesson(
        "Simmetrik va assimetrik shifrlash",
        "Axborot xavfsizligi",
        "Simmetrik va ochiq kalitli kriptografiya.",
        [
            {
                title: "Simmetrik shifrlash",
                text:
`Shifrlash va deshifrlashda
bir xil maxfiy kalitdan foydalaniladi.

AES bunga mashhur misoldir.`
            },

            {
                title: "Afzalligi",
                text:
`Simmetrik algoritmlar katta
hajmdagi ma’lumotlarni samarali
shifrlash uchun qulay.`
            },

            {
                title: "Assimetrik kriptografiya",
                text:
`Ikki kalit ishlatiladi:

ochiq kalit,

yopiq kalit.

RSA bunga mashhur misollardan biridir.`
            },

            {
                title: "Amaliy qo‘llanish",
                text:
`Real tizimlarda simmetrik va
assimetrik mexanizmlar ko‘pincha
birgalikda ishlatiladi.`
            }
        ]
    ),


    lesson(
        "Firewall asoslari",
        "Axborot xavfsizligi",
        "Firewall va tarmoq trafikini nazorat qilish.",
        [
            {
                title: "Firewall",
                text:
`Firewall tarmoq trafikini
xavfsizlik qoidalari asosida
nazorat qiluvchi himoya vositasidir.`
            },

            {
                title: "Vazifalari",
                text:
`Kiruvchi trafikni tekshiradi.

Chiquvchi trafikni tekshiradi.

Keraksiz ulanishlarni cheklaydi.`
            },

            {
                title: "Qoidalar",
                text:
`Firewall qoidalari:

IP manzil,

port,

protokol,

ulanish holati

kabi ma’lumotlardan foydalanishi mumkin.`
            },

            {
                title: "Firewall turlari",
                text:
`Network firewall tarmoqlar
orasida ishlashi mumkin.

Host firewall alohida
kompyuter yoki serverda ishlaydi.`
            }
        ]
    ),


    lesson(
        "Tarmoq xavfsizligi",
        "Axborot xavfsizligi",
        "Kompyuter tarmoqlarini himoyalash asoslari.",
        [
            {
                title: "Tarmoq xavfsizligi",
                text:
`Tarmoq xavfsizligi tarmoq
infratuzilmasi va uzatilayotgan
ma’lumotlarni himoyalashga qaratilgan.`
            },

            {
                title: "Segmentatsiya",
                text:
`Tarmoqni alohida mantiqiy
qismlarga ajratish xavfsizlikni
boshqarishga yordam beradi.

VLAN bunga misol bo‘lishi mumkin.`
            },

            {
                title: "Access Control",
                text:
`Access Control kim qaysi
resursdan foydalanishi mumkinligini
nazorat qiladi.`
            },

            {
                title: "Least Privilege",
                text:
`Foydalanuvchiga faqat zarur
bo‘lgan minimal ruxsatlarni
berish xavfsizlikning muhim
tamoyillaridan biridir.`
            }
        ]
    ),


    lesson(
        "Phishing va ijtimoiy muhandislik",
        "Axborot xavfsizligi",
        "Phishing hujumlarini aniqlash va himoyalanish.",
        [
            {
                title: "Ijtimoiy muhandislik",
                text:
`Ijtimoiy muhandislik insonning
ishonchi yoki xatosidan
foydalanishga qaratiladi.`
            },

            {
                title: "Phishing",
                text:
`Hujumchi ishonchli tashkilot
yoki shaxs nomidan soxta
xabar yuborishi mumkin.`
            },

            {
                title: "Shubhali belgilar",
                text:
`Shoshilinch talab.

Noma’lum jo‘natuvchi.

Shubhali domen.

Kutilmagan fayl.

Parol so‘rash.`
            },

            {
                title: "Himoya",
                text:
`Havolani bosishdan oldin tekshirish.

Rasmiy saytni mustaqil ochish.

Parolni xabar orqali yubormaslik.

Ko‘p omilli autentifikatsiyadan foydalanish.`
            }
        ]
    ),


    lesson(
        "Malware va himoyalanish",
        "Axborot xavfsizligi",
        "Zararli dasturlar va ulardan himoyalanish.",
        [
            {
                title: "Malware",
                text:
`Malware zarar yetkazish,
ma’lumot o‘g‘irlash yoki
tizim faoliyatini buzishga
mo‘ljallangan zararli dasturlar
uchun umumiy atamadir.`
            },

            {
                title: "Turlari",
                text:
`Virus.

Worm.

Trojan.

Ransomware.

Spyware.`
            },

            {
                title: "Tarqalish",
                text:
`Shubhali fayllar.

Zararli havolalar.

Soxta dasturlar.

Yangilanmagan dasturlardagi zaifliklar.`
            },

            {
                title: "Himoyalanish",
                text:
`Operatsion tizimni yangilash.

Ishonchli manbalardan dastur olish.

Himoya vositalaridan foydalanish.

Backup yaratish.

Shubhali fayllarni ochmaslik.`
            }
        ]
    )

];


// ==================================================
// DATABASE SO'ROVLARI
// ==================================================

const findMaterial =
    db.prepare(`
        SELECT id
        FROM materials
        WHERE title = ?
          AND subject = ?
        LIMIT 1
    `);


const insertMaterial =
    db.prepare(`
        INSERT INTO materials (
            title,
            subject,
            description,
            file_name,
            file_path,
            file_type,
            content
        )
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `);


// ==================================================
// SEED TRANSACTION
// ==================================================

const seedMaterials =
    db.transaction(function () {

        let added = 0;
        let skipped = 0;

        for (const material of materials) {

            const exists =
                findMaterial.get(
                    material.title,
                    material.subject
                );


            if (exists) {

                skipped++;

                continue;
            }


            insertMaterial.run(
                material.title,
                material.subject,
                material.description,

                // Eski database'dagi NOT NULL
                // constraint uchun texnik qiymatlar

                "internal-material",
                "internal",
                ".internal",

                material.content
            );


            added++;
        }


        return {
            added,
            skipped
        };
    });


// ==================================================
// ISHGA TUSHIRISH
// ==================================================

try {

    const result =
        seedMaterials();


    console.log("");
    console.log(
        "======================================"
    );

    console.log(
        "📚 STUDENT HUB MATERIAL SEED"
    );

    console.log(
        "======================================"
    );

    console.log(
        "✅ Yangi qo‘shildi:",
        result.added
    );

    console.log(
        "⏭️ Oldindan mavjud:",
        result.skipped
    );

    console.log(
        "📚 Seed materiallar jami:",
        materials.length
    );

    console.log(
        "======================================"
    );

    console.log("");

}

catch (error) {

    console.error(
        "❌ Material seed xatosi:",
        error
    );

    process.exitCode = 1;
}