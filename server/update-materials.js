const db = require("./database");

console.log("");
console.log("======================================");
console.log("📚 DASTURLASH DARSLARINI YANGILASH");
console.log("======================================");

function lesson(title, description, sections) {

    let content = `# ${title}\n\n`;

    for (const section of sections) {

        content += `## ${section.title}\n\n`;
        content += `${section.text}\n\n`;

    }

    return {
        title,
        subject: "Dasturlash",
        description,
        content
    };
}


const lessons = [

    // ==================================================
    // 1. HTML ASOSLARI
    // ==================================================

    lesson(
        "HTML asoslari",

        "HTML hujjat tuzilishi, teglar, elementlar, atributlar va veb-sahifa yaratish asoslari.",

        [
            {
                title: "HTML nima?",

                text:
`HTML — HyperText Markup Language.

HTML veb-sahifaning tuzilishini yaratish uchun ishlatiladigan belgilash tilidir.

HTML dasturlash tili emas. U brauzerga sahifadagi elementlarning qanday tuzilganini bildiradi.

HTML yordamida sarlavha, matn, rasm, havola, tugma, ro‘yxat, jadval va formalar yaratish mumkin.`
            },

            {
                title: "HTML hujjatining asosiy tuzilishi",

                text:
`\`\`\`
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Student Hub</title>
</head>

<body>

    <h1>Student Hub</h1>

    <p>
        Birinchi HTML sahifam.
    </p>

</body>

</html>
\`\`\`

DOCTYPE brauzerga HTML5 ishlatilayotganini bildiradi.

html tegi butun hujjatni o‘z ichiga oladi.

head ichida sahifa haqidagi xizmat ma'lumotlari joylashadi.

body ichida esa foydalanuvchi ko‘radigan elementlar joylashadi.`
            },

            {
                title: "Sarlavhalar",

                text:
`HTMLda h1 dan h6 gacha sarlavhalar mavjud.

\`\`\`
<h1>Asosiy sarlavha</h1>
<h2>Ikkinchi sarlavha</h2>
<h3>Uchinchi sarlavha</h3>
<h4>To‘rtinchi sarlavha</h4>
<h5>Beshinchi sarlavha</h5>
<h6>Oltinchi sarlavha</h6>
\`\`\`

h1 odatda sahifaning asosiy sarlavhasi sifatida ishlatiladi.`
            },

            {
                title: "Paragraf",

                text:
`Matn yozish uchun p tegi ishlatiladi.

\`\`\`
<p>
    Men Student Hub orqali
    dasturlashni o‘rganmoqdaman.
</p>
\`\`\``
            },

            {
                title: "Havolalar",

                text:
`Havola yaratish uchun a tegi ishlatiladi.

\`\`\`
<a href="https://example.com">
    Saytni ochish
</a>
\`\`\`

href atributi havolaning manzilini belgilaydi.`
            },

            {
                title: "Rasmlar",

                text:
`Rasm chiqarish uchun img tegi ishlatiladi.

\`\`\`
<img
    src="student.jpg"
    alt="Student rasmi"
>
\`\`\`

src — rasmning manzili.

alt — rasm ochilmasa yoki accessibility vositalari ishlatilganda uning tavsifini beradi.`
            },

            {
                title: "Ro‘yxatlar",

                text:
`Tartibsiz ro‘yxat:

\`\`\`
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
\`\`\`

Tartibli ro‘yxat:

\`\`\`
<ol>
    <li>HTML o‘rganish</li>
    <li>CSS o‘rganish</li>
    <li>JavaScript o‘rganish</li>
</ol>
\`\`\``
            },

            {
                title: "div elementi",

                text:
`div bir nechta elementni bitta blok sifatida guruhlash uchun ishlatiladi.

\`\`\`
<div class="card">

    <h2>Dasturlash</h2>

    <p>
        O‘quv materiallari
    </p>

</div>
\`\`\`

Student Hub'dagi kartalar kabi interfeys qismlarini yaratishda div ko‘p ishlatiladi.`
            },

            {
                title: "Formalar",

                text:
`Forma foydalanuvchidan ma'lumot olish uchun ishlatiladi.

\`\`\`
<form>

    <input
        type="email"
        placeholder="Email"
    >

    <input
        type="password"
        placeholder="Parol"
    >

    <button type="submit">
        Kirish
    </button>

</form>
\`\`\`

Login va ro‘yxatdan o‘tish sahifalarida formalar muhim rol o‘ynaydi.`
            },

            {
                title: "Muhim tushunchalar",

                text:
`HTML — sahifaning strukturasi.

Teg — HTML elementini belgilaydi.

Element — sahifadagi obyekt.

Atribut — elementga qo‘shimcha ma'lumot beradi.

head — xizmat ma'lumotlari.

body — foydalanuvchiga ko‘rinadigan sahifa qismi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`practice.html nomli fayl yarating.

Unda quyidagilar bo‘lsin:

1. Ismingiz uchun h1.

2. Universitet nomi uchun h2.

3. O‘zingiz haqingizda paragraf.

4. Uchta fan yozilgan ro‘yxat.

5. Bitta rasm.

6. Bitta havola.

7. Bitta tugma.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. HTML nima?

2. HTML dasturlash tilimi?

3. head va body o‘rtasidagi farq nima?

4. Havola uchun qaysi teg ishlatiladi?

5. href nima?

6. img tegi nima qiladi?

7. div nima uchun ishlatiladi?

8. Forma nima uchun kerak?`
            },

            {
                title: "Xulosa",

                text:
`HTML veb-dasturlashning asosiy texnologiyalaridan biridir.

U veb-sahifaning strukturasi va mazmunini yaratadi.

Keyingi bosqichda HTML elementlariga CSS yordamida professional dizayn berish mumkin.`
            }
        ]
    ),


    // ==================================================
    // 2. CSS ASOSLARI
    // ==================================================

    lesson(
        "CSS asoslari",

        "CSS yordamida HTML elementlariga rang, o‘lcham, joylashuv va professional dizayn berish.",

        [
            {
                title: "CSS nima?",

                text:
`CSS — Cascading Style Sheets.

CSS HTML elementlarining tashqi ko‘rinishini boshqaradi.

HTML sahifaning strukturasini yaratadi, CSS esa shu strukturaga dizayn beradi.`
            },

            {
                title: "CSS sintaksisi",

                text:
`CSS qoidasi selector, property va value qismlaridan tashkil topadi.

\`\`\`
h1 {
    color: blue;
    font-size: 32px;
}
\`\`\`

h1 — selector.

color va font-size — property.

blue va 32px — value.`
            },

            {
                title: "CSS faylini HTMLga ulash",

                text:
`Professional loyihalarda CSS odatda alohida faylda saqlanadi.

HTML:

\`\`\`
<link
    rel="stylesheet"
    href="style.css"
>
\`\`\`

style.css:

\`\`\`
body {
    background: white;
    color: black;
}
\`\`\``
            },

            {
                title: "Class va ID",

                text:
`HTML:

\`\`\`
<div class="card">
    Material
</div>

<h1 id="title">
    Student Hub
</h1>
\`\`\`

CSS:

\`\`\`
.card {
    padding: 20px;
}

#title {
    color: blue;
}
\`\`\`

Class nuqta bilan, ID esa # belgisi bilan tanlanadi.`
            },

            {
                title: "Rang va fon",

                text:
`CSSda ranglarni turli formatlarda berish mumkin.

\`\`\`
h1 {
    color: blue;
}

h2 {
    color: #2563eb;
}

p {
    color: rgb(30, 41, 59);
}

body {
    background: #f5f7fb;
}
\`\`\``
            },

            {
                title: "Box Model",

                text:
`CSS Box Model to‘rtta asosiy qismdan iborat:

Content — elementning asosiy mazmuni.

Padding — element ichidagi bo‘shliq.

Border — element chegarasi.

Margin — element tashqarisidagi bo‘shliq.

Misol:

\`\`\`
.card {
    padding: 20px;
    border: 1px solid #ddd;
    margin: 20px;
}
\`\`\``
            },

            {
                title: "Border radius va shadow",

                text:
`\`\`\`
.card {
    border-radius: 16px;

    box-shadow:
        0 10px 30px
        rgba(0, 0, 0, 0.08);
}
\`\`\`

border-radius burchaklarni yumaloqlaydi.

box-shadow elementga soya beradi.`
            },

            {
                title: "Flexbox",

                text:
`Flexbox elementlarni qator yoki ustun bo‘yicha joylashtirish uchun juda qulay.

\`\`\`
.container {
    display: flex;
    gap: 20px;
}
\`\`\`

Markazlashtirish:

\`\`\`
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
\`\`\``
            },

            {
                title: "CSS Grid",

                text:
`Grid ko‘p ustunli layoutlar yaratishda juda qulay.

\`\`\`
.grid {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 20px;
}
\`\`\`

Bu uchta teng ustun yaratadi.`
            },

            {
                title: "Hover",

                text:
`hover foydalanuvchi sichqonchani element ustiga olib kelganda style o‘zgartirish imkonini beradi.

\`\`\`
button:hover {
    background: #1d4ed8;
}
\`\`\``
            },

            {
                title: "Responsive dizayn",

                text:
`Sayt telefon, planshet va kompyuter ekranlariga moslashishi kerak.

Buning uchun media query ishlatilishi mumkin.

\`\`\`
@media (max-width: 700px) {

    .grid {
        grid-template-columns: 1fr;
    }

}
\`\`\``
            },

            {
                title: "Amaliy topshiriq",

                text:
`Uchta fan kartasi yarating:

1. Dasturlash.

2. Telekommunikatsiya.

3. Axborot xavfsizligi.

Har bir kartaga:

- padding;
- border-radius;
- box-shadow;
- tugma;
- hover

qo‘shing.

Telefon ekranida kartalar bitta ustunda chiqsin.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. CSS nima?

2. Selector nima?

3. Property va value nima?

4. Class va ID farqi nima?

5. Margin va padding farqi nima?

6. Flexbox nima uchun kerak?

7. Grid nima uchun kerak?

8. Media query nima?`
            },

            {
                title: "Xulosa",

                text:
`CSS HTML orqali yaratilgan sahifani professional interfeysga aylantiradi.

Responsive dizayn, Flexbox va Grid zamonaviy veb-saytlar yaratishda juda muhim.`
            }
        ]
    ),


    // ==================================================
    // 3. JAVASCRIPT ASOSLARI
    // ==================================================

    lesson(
        "JavaScript asoslari",

        "JavaScript sintaksisi, funksiyalar, eventlar, DOM va server API bilan ishlashga kirish.",

        [
            {
                title: "JavaScript nima?",

                text:
`JavaScript veb-sahifalarga mantiq va interaktivlik qo‘shadigan dasturlash tilidir.

HTML — struktura.

CSS — dizayn.

JavaScript — mantiq va interaktivlik.

Student Hub'dagi testlar, materiallar, dashboard va boshqa dinamik funksiyalarda JavaScript ishlatiladi.`
            },

            {
                title: "JavaScriptni HTMLga ulash",

                text:
`JavaScript faylini HTMLga quyidagicha ulash mumkin:

\`\`\`
<script src="script.js"></script>
\`\`\`

Odatda script body tegining oxirida ulanadi.`
            },

            {
                title: "Console",

                text:
`console.log dasturdagi qiymatlarni tekshirishda juda foydali.

\`\`\`
console.log(
    "Salom Student Hub!"
);
\`\`\`

Brauzerda F12 orqali Developer Tools ochib, Console bo‘limida natijani ko‘rish mumkin.`
            },

            {
                title: "O‘zgaruvchilar",

                text:
`\`\`\`
let name = "Ali";

let score = 90;

const siteName =
    "Student Hub";
\`\`\`

let qiymati keyinchalik o‘zgarishi mumkin.

const esa qayta qiymat berilmaydigan o‘zgaruvchi yaratishda ishlatiladi.`
            },

            {
                title: "Funksiya",

                text:
`\`\`\`
function welcome() {

    console.log(
        "Student Hubga xush kelibsiz"
    );

}

welcome();
\`\`\`

Funksiya qayta ishlatiladigan kod blokidir.`
            },

            {
                title: "Parametr",

                text:
`\`\`\`
function welcome(name) {

    console.log(
        "Salom " + name
    );

}

welcome("Ali");
\`\`\`

name bu yerda parametr hisoblanadi.`
            },

            {
                title: "Event",

                text:
`Foydalanuvchining tugma bosishi event hisoblanadi.

HTML:

\`\`\`
<button id="startButton">
    Boshlash
</button>
\`\`\`

JavaScript:

\`\`\`
const button =
    document.getElementById(
        "startButton"
    );

button.addEventListener(
    "click",
    function () {

        alert(
            "Dars boshlandi!"
        );

    }
);
\`\`\``
            },

            {
                title: "DOM",

                text:
`DOM — Document Object Model.

JavaScript DOM orqali HTML elementlarini topishi va o‘zgartirishi mumkin.

\`\`\`
const title =
    document.getElementById(
        "title"
    );

title.textContent =
    "Student Hub";
\`\`\``
            },

            {
                title: "API va fetch",

                text:
`JavaScript backend serverdan ma'lumot olish uchun fetch ishlatishi mumkin.

\`\`\`
async function loadMaterials() {

    const response =
        await fetch(
            "http://localhost:3000/api/materials"
        );

    const data =
        await response.json();

    console.log(data);

}
\`\`\`

Student Hub Materiallar sahifasi ham shu prinsip asosida serverdan ma'lumot oladi.`
            },

            {
                title: "JSON",

                text:
`JSON server va frontend o‘rtasida ma'lumot almashishda keng ishlatiladi.

Misol:

\`\`\`
{
    "name": "Ali",
    "score": 90,
    "role": "student"
}
\`\`\``
            },

            {
                title: "Amaliy topshiriq",

                text:
`HTMLda:

- h1;
- button

yarating.

JavaScript yordamida tugma bosilganda h1 matni:

Dars boshlandi!

ga o‘zgarsin.

Keyin Console ichiga "Button clicked" yozuvi chiqsin.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. JavaScript nima?

2. HTML, CSS va JavaScript vazifalari qanday farqlanadi?

3. console.log nima uchun kerak?

4. Funksiya nima?

5. Parametr nima?

6. Event nima?

7. DOM nima?

8. fetch nima?

9. JSON nima?`
            },

            {
                title: "Xulosa",

                text:
`JavaScript statik veb-sahifani interaktiv dasturga aylantiradi.

U frontendda foydalanuvchi harakatlarini boshqarish va backend API bilan ma'lumot almashishda asosiy texnologiyalardan biridir.`
            }
        ]
    ),
        // ==================================================
    // 4. O‘ZGARUVCHILAR VA MA’LUMOT TURLARI
    // ==================================================

    lesson(
        "O‘zgaruvchilar va ma’lumot turlari",

        "JavaScriptda let, const va asosiy ma’lumot turlari bilan ishlash.",

        [
            {
                title: "O‘zgaruvchi nima?",

                text:
`O‘zgaruvchi dastur ishlashi davomida ma’lumotni saqlash uchun ishlatiladi.

Masalan:

\`\`\`
let name = "Ali";
let score = 85;
\`\`\`

Bu yerda name va score o‘zgaruvchilardir.`
            },

            {
                title: "let",

                text:
`let yordamida qiymati keyinchalik o‘zgarishi mumkin bo‘lgan o‘zgaruvchi yaratiladi.

\`\`\`
let score = 70;

score = 90;

console.log(score);
\`\`\`

Natija:

\`\`\`
90
\`\`\``
            },

            {
                title: "const",

                text:
`const odatda qayta qiymat berilmaydigan o‘zgaruvchilar uchun ishlatiladi.

\`\`\`
const siteName =
    "Student Hub";

const API_URL =
    "http://localhost:3000";
\`\`\`

const bilan e’lon qilingan o‘zgaruvchiga keyinchalik boshqa qiymatni oddiy assignment orqali berib bo‘lmaydi.`
            },

            {
                title: "String",

                text:
`String matn ma’lumotlarini saqlaydi.

\`\`\`
let name = "Ali";

let university =
    "TATU";

let subject =
    "Dasturlash";
\`\`\``
            },

            {
                title: "Number",

                text:
`Number son qiymatlarini saqlaydi.

\`\`\`
let age = 20;

let score = 95;

let price = 12.5;
\`\`\`

JavaScriptda butun va kasr sonlar Number turi orqali ifodalanishi mumkin.`
            },

            {
                title: "Boolean",

                text:
`Boolean ikkita mantiqiy qiymatdan birini saqlaydi:

\`\`\`
true
false
\`\`\`

Misol:

\`\`\`
let loggedIn = true;

let isAdmin = false;
\`\`\`

Login tizimlarida bunday qiymatlar ko‘p ishlatiladi.`
            },

            {
                title: "Undefined va null",

                text:
`Qiymat hali berilmagan bo‘lsa undefined holati yuzaga kelishi mumkin.

\`\`\`
let teacher;

console.log(teacher);
\`\`\`

null esa qiymatning ataylab bo‘sh ekanini ifodalash uchun ishlatilishi mumkin.

\`\`\`
let selectedMaterial = null;
\`\`\``
            },

            {
                title: "Array",

                text:
`Array bir nechta qiymatni bitta o‘zgaruvchida saqlaydi.

\`\`\`
const subjects = [
    "Dasturlash",
    "Telekommunikatsiya",
    "Axborot xavfsizligi"
];
\`\`\`

Birinchi element:

\`\`\`
console.log(
    subjects[0]
);
\`\`\`

Array indekslari 0 dan boshlanadi.`
            },

            {
                title: "Object",

                text:
`Object bir obyektga tegishli ma’lumotlarni bir joyda saqlashga yordam beradi.

\`\`\`
const student = {

    name: "Ali",

    age: 20,

    course: 3,

    loggedIn: true

};
\`\`\`

Qiymat olish:

\`\`\`
console.log(
    student.name
);
\`\`\``
            },

            {
                title: "typeof",

                text:
`typeof qiymatning turini tekshirish uchun ishlatiladi.

\`\`\`
console.log(
    typeof "Student Hub"
);

console.log(
    typeof 100
);

console.log(
    typeof true
);
\`\`\`

Natijalar:

\`\`\`
string
number
boolean
\`\`\``
            },

            {
                title: "Amaliy topshiriq",

                text:
`student nomli object yarating.

Unda:

1. name

2. age

3. university

4. faculty

5. course

6. loggedIn

maydonlari bo‘lsin.

Keyin barcha qiymatlarni console.log yordamida chiqaring.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. O‘zgaruvchi nima?

2. let nima uchun ishlatiladi?

3. const nima?

4. String nima?

5. Number nima?

6. Boolean qanday qiymatlarni oladi?

7. Array nima?

8. Object nima?

9. typeof nima qiladi?`
            },

            {
                title: "Xulosa",

                text:
`O‘zgaruvchilar JavaScript dasturidagi ma’lumotlarni saqlashning asosiy vositasidir.

Ma’lumot turlarini tushunish keyingi mavzular — shartlar, sikllar, funksiyalar va API bilan ishlash uchun juda muhim.`
            }
        ]
    ),


    // ==================================================
    // 5. SHART OPERATORLARI
    // ==================================================

    lesson(
        "Shart operatorlari",

        "if, else if, else va mantiqiy operatorlar yordamida dasturda qaror qabul qilish.",

        [
            {
                title: "Shart operatori nima?",

                text:
`Dastur ayrim vaziyatlarda turli qarorlar qabul qilishi kerak.

Masalan:

foydalanuvchi tizimga kirganmi;

testdan o‘tganmi;

admin huquqiga egami.

Bunday vazifalarda shart operatorlari ishlatiladi.`
            },

            {
                title: "if operatori",

                text:
`\`\`\`
let score = 80;

if (score >= 60) {

    console.log(
        "Testdan o'tdingiz"
    );

}
\`\`\`

Shart true bo‘lsa, blok ichidagi kod bajariladi.`
            },

            {
                title: "if va else",

                text:
`\`\`\`
let score = 50;

if (score >= 60) {

    console.log(
        "Testdan o'tdingiz"
    );

} else {

    console.log(
        "Testdan o'tmadingiz"
    );

}
\`\`\`

else birinchi shart bajarilmaganda ishlaydi.`
            },

            {
                title: "else if",

                text:
`Bir nechta shartni ketma-ket tekshirish mumkin.

\`\`\`
let score = 85;

if (score >= 90) {

    console.log("A");

} else if (score >= 80) {

    console.log("B");

} else if (score >= 70) {

    console.log("C");

} else {

    console.log("F");

}
\`\`\``
            },

            {
                title: "Taqqoslash operatorlari",

                text:
`Asosiy operatorlar:

> — katta.

< — kichik.

>= — katta yoki teng.

<= — kichik yoki teng.

=== — qat’iy teng.

!== — qat’iy teng emas.

Misol:

\`\`\`
const role = "admin";

if (role === "admin") {

    console.log(
        "Admin panel"
    );

}
\`\`\``
            },

            {
                title: "AND operatori",

                text:
`&& operatorida ikkala shart ham true bo‘lishi kerak.

\`\`\`
const loggedIn = true;
const role = "admin";

if (
    loggedIn &&
    role === "admin"
) {

    console.log(
        "Ruxsat berildi"
    );

}
\`\`\``
            },

            {
                title: "OR operatori",

                text:
`|| operatorida kamida bitta shart true bo‘lsa yetarli.

\`\`\`
const role = "teacher";

if (
    role === "admin" ||
    role === "teacher"
) {

    console.log(
        "Ruxsat berildi"
    );

}
\`\`\``
            },

            {
                title: "NOT operatori",

                text:
`! mantiqiy qiymatni teskarisiga aylantiradi.

\`\`\`
const loggedIn = false;

if (!loggedIn) {

    console.log(
        "Avval tizimga kiring"
    );

}
\`\`\``
            },

            {
                title: "Student Hub test natijasi",

                text:
`\`\`\`
const score = 8;
const total = 10;

const percent =
    Math.round(
        score / total * 100
    );

if (percent >= 80) {

    console.log(
        "Ajoyib natija"
    );

} else if (percent >= 60) {

    console.log(
        "Yaxshi natija"
    );

} else {

    console.log(
        "Ko‘proq mashq qiling"
    );

}
\`\`\``
            },

            {
                title: "Amaliy topshiriq",

                text:
`score nomli o‘zgaruvchi yarating.

Quyidagi baholash tizimini tuzing:

90–100 → A

80–89 → B

70–79 → C

60–69 → D

0–59 → F`
            },

            {
                title: "Nazorat savollari",

                text:
`1. if nima qiladi?

2. else qachon ishlaydi?

3. else if nima uchun kerak?

4. === operatori nima qiladi?

5. && nima?

6. || nima?

7. ! nima?`
            },

            {
                title: "Xulosa",

                text:
`Shart operatorlari dasturga qaror qabul qilish imkonini beradi.

Login, foydalanuvchi rollari, test natijalari va boshqa ko‘plab funksiyalar shartlar asosida ishlaydi.`
            }
        ]
    ),


    // ==================================================
    // 6. SIKLLAR
    // ==================================================

    lesson(
        "Sikllar",

        "JavaScriptda for va while yordamida takrorlanuvchi amallarni bajarish.",

        [
            {
                title: "Sikl nima?",

                text:
`Sikl bir xil yoki o‘xshash amalni bir necha marta takrorlash uchun ishlatiladi.

Masalan, 30 ta materialni ekranga chiqarishda har bir material uchun alohida kod yozish o‘rniga sikldan foydalanish mumkin.`
            },

            {
                title: "for sikli",

                text:
`\`\`\`
for (
    let i = 1;
    i <= 5;
    i++
) {

    console.log(i);

}
\`\`\`

Natija:

\`\`\`
1
2
3
4
5
\`\`\``
            },

            {
                title: "for qismlari",

                text:
`for siklida odatda uchta asosiy qism mavjud.

Boshlang‘ich qiymat:

\`\`\`
let i = 1
\`\`\`

Shart:

\`\`\`
i <= 5
\`\`\`

Har aylanishdan keyingi o‘zgarish:

\`\`\`
i++
\`\`\``
            },

            {
                title: "while sikli",

                text:
`\`\`\`
let i = 1;

while (i <= 5) {

    console.log(i);

    i++;

}
\`\`\`

while berilgan shart true bo‘lib turgan vaqt davomida ishlaydi.`
            },

            {
                title: "Array bilan sikl",

                text:
`\`\`\`
const subjects = [
    "HTML",
    "CSS",
    "JavaScript"
];

for (
    let i = 0;
    i < subjects.length;
    i++
) {

    console.log(
        subjects[i]
    );

}
\`\`\``
            },

            {
                title: "for...of",

                text:
`Array elementlarini sodda usulda aylanish mumkin.

\`\`\`
const subjects = [
    "HTML",
    "CSS",
    "JavaScript"
];

for (
    const subject
    of subjects
) {

    console.log(subject);

}
\`\`\``
            },

            {
                title: "Student Hub misoli",

                text:
`Materiallarni kartalar ko‘rinishida chiqarish g‘oyasi:

\`\`\`
for (
    const material
    of materials
) {

    console.log(
        material.title
    );

}
\`\`\`

Frontendda shu prinsip orqali serverdan kelgan ko‘plab materiallarni chiqarish mumkin.`
            },

            {
                title: "break",

                text:
`break siklni to‘liq to‘xtatadi.

\`\`\`
for (
    let i = 1;
    i <= 10;
    i++
) {

    if (i === 5) {
        break;
    }

    console.log(i);

}
\`\`\``
            },

            {
                title: "continue",

                text:
`continue joriy aylanishni tashlab, keyingi aylanishga o‘tadi.

\`\`\`
for (
    let i = 1;
    i <= 5;
    i++
) {

    if (i === 3) {
        continue;
    }

    console.log(i);

}
\`\`\``
            },

            {
                title: "Amaliy topshiriq",

                text:
`1 dan 10 gacha sonlarni chiqaradigan for sikli yozing.

Keyin faqat juft sonlarni chiqarishga harakat qiling.

So‘ng uchta fan nomidan iborat array yaratib, barcha fanlarni for...of yordamida chiqaring.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Sikl nima?

2. for qanday ishlaydi?

3. while qanday ishlaydi?

4. i++ nima qiladi?

5. Array bilan sikl qanday ishlatiladi?

6. break nima qiladi?

7. continue nima qiladi?`
            },

            {
                title: "Xulosa",

                text:
`Sikllar takrorlanuvchi vazifalarni avtomatlashtiradi.

Test savollari, materiallar, foydalanuvchilar va natijalar ro‘yxatini qayta ishlashda sikllar juda ko‘p ishlatiladi.`
            }
        ]
    ),


    // ==================================================
    // 7. FUNKSIYALAR
    // ==================================================

    lesson(
        "Funksiyalar",

        "JavaScript funksiyalari, parametrlar, argumentlar va return bilan ishlash.",

        [
            {
                title: "Funksiya nima?",

                text:
`Funksiya ma’lum bir vazifani bajaradigan qayta ishlatiluvchi kod blokidir.

Funksiyalar katta dasturni kichik va tushunarli qismlarga ajratishga yordam beradi.`
            },

            {
                title: "Oddiy funksiya",

                text:
`\`\`\`
function welcome() {

    console.log(
        "Student Hubga xush kelibsiz"
    );

}

welcome();
\`\`\`

welcome() yozilganda funksiya ishga tushadi.`
            },

            {
                title: "Parametr va argument",

                text:
`\`\`\`
function welcome(name) {

    console.log(
        "Salom " + name
    );

}

welcome("Ali");
\`\`\`

name — parametr.

"Ali" — argument.`
            },

            {
                title: "Bir nechta parametr",

                text:
`\`\`\`
function add(a, b) {

    console.log(
        a + b
    );

}

add(5, 3);
\`\`\`

Natija 8 bo‘ladi.`
            },

            {
                title: "return",

                text:
`return funksiyadan natijani qaytaradi.

\`\`\`
function add(a, b) {

    return a + b;

}

const result =
    add(10, 5);

console.log(result);
\`\`\`

Natija 15.`
            },

            {
                title: "Arrow function",

                text:
`JavaScriptda arrow function sintaksisi ham mavjud.

\`\`\`
const add = (a, b) => {

    return a + b;

};
\`\`\`

Qisqa ko‘rinishi:

\`\`\`
const add =
    (a, b) => a + b;
\`\`\``
            },

            {
                title: "Student Hub misoli",

                text:
`Foiz hisoblaydigan funksiya:

\`\`\`
function calculatePercent(
    score,
    total
) {

    return Math.round(
        score / total * 100
    );

}

const percent =
    calculatePercent(
        8,
        10
    );

console.log(percent);
\`\`\`

Natija 80 bo‘ladi.`
            },

            {
                title: "Nima uchun funksiyalar kerak?",

                text:
`Funksiyalar:

kod takrorlanishini kamaytiradi;

kodni tartibli qiladi;

xatolarni topishni osonlashtiradi;

bir vazifani bir nechta joyda qayta ishlatishga imkon beradi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`calculateAverage nomli funksiya yozing.

U uchta son qabul qilsin va ularning o‘rtacha qiymatini return orqali qaytarsin.

Masalan:

\`\`\`
calculateAverage(
    80,
    90,
    100
);
\`\`\`

Natija 90 bo‘lishi kerak.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Funksiya nima?

2. Funksiya qanday chaqiriladi?

3. Parametr nima?

4. Argument nima?

5. return nima qiladi?

6. Arrow function nima?

7. Funksiyaning afzalligi nima?`
            },

            {
                title: "Xulosa",

                text:
`Funksiyalar dasturlashning eng muhim tushunchalaridan biridir.

Student Hub kabi katta loyihada har bir vazifani alohida funksiyaga ajratish kodni boshqarishni ancha osonlashtiradi.`
            }
        ]
    ),


    // ==================================================
    // 8. MASSIVLAR
    // ==================================================

    lesson(
        "Massivlar",

        "JavaScript Array, indekslar va push, pop, map, filter kabi asosiy metodlar.",

        [
            {
                title: "Massiv nima?",

                text:
`Massiv bir nechta qiymatni bitta o‘zgaruvchida saqlash imkonini beradi.

\`\`\`
const subjects = [
    "HTML",
    "CSS",
    "JavaScript"
];
\`\`\``
            },

            {
                title: "Indeks",

                text:
`Massiv indekslari 0 dan boshlanadi.

\`\`\`
console.log(
    subjects[0]
);
\`\`\`

Natija:

\`\`\`
HTML
\`\`\`

subjects[1] esa CSS qiymatini beradi.`
            },

            {
                title: "length",

                text:
`length massivdagi elementlar sonini beradi.

\`\`\`
console.log(
    subjects.length
);
\`\`\`

Agar massivda 3 ta element bo‘lsa, natija 3 bo‘ladi.`
            },

            {
                title: "push",

                text:
`push massiv oxiriga yangi element qo‘shadi.

\`\`\`
subjects.push(
    "Node.js"
);
\`\`\``
            },

            {
                title: "pop",

                text:
`pop massivning oxirgi elementini olib tashlaydi.

\`\`\`
subjects.pop();
\`\`\``
            },

            {
                title: "forEach",

                text:
`forEach har bir element uchun funksiya bajaradi.

\`\`\`
subjects.forEach(
    function (subject) {

        console.log(subject);

    }
);
\`\`\``
            },

            {
                title: "map",

                text:
`map mavjud massivdan yangi massiv yaratishda ishlatiladi.

\`\`\`
const numbers = [
    1,
    2,
    3
];

const doubled =
    numbers.map(
        function (number) {

            return number * 2;

        }
    );

console.log(doubled);
\`\`\`

Natija:

\`\`\`
[2, 4, 6]
\`\`\``
            },

            {
                title: "filter",

                text:
`filter shartga mos elementlarni ajratadi.

\`\`\`
const scores = [
    40,
    70,
    90,
    50
];

const passed =
    scores.filter(
        function (score) {

            return score >= 60;

        }
    );

console.log(passed);
\`\`\`

Natija:

\`\`\`
[70, 90]
\`\`\``
            },

            {
                title: "Objectlardan iborat massiv",

                text:
`\`\`\`
const materials = [

    {
        title: "HTML",
        subject: "Dasturlash"
    },

    {
        title: "5G",
        subject: "Telekommunikatsiya"
    }

];
\`\`\`

Student Hub API'dan keladigan ma’lumotlar ko‘pincha shunga o‘xshash strukturalarda ishlatiladi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Beshta test natijasidan iborat array yarating.

filter yordamida 60 va undan yuqori natijalarni ajrating.

map yordamida barcha natijalarga 5 ball qo‘shilgan yangi massiv yarating.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Array nima?

2. Indeks nechadan boshlanadi?

3. length nima?

4. push nima qiladi?

5. pop nima qiladi?

6. forEach nima?

7. map nima?

8. filter nima?`
            },

            {
                title: "Xulosa",

                text:
`Massivlar ko‘p sonli ma’lumotlar bilan ishlashning asosiy vositalaridan biridir.

Materiallar, test savollari va natijalar kabi ma’lumotlarni frontendda qayta ishlashda Array metodlari juda foydali.`
            }
        ]
    ),


    // ==================================================
    // 9. DOM BILAN ISHLASH
    // ==================================================

    lesson(
        "DOM bilan ishlash",

        "JavaScript yordamida HTML elementlarini topish, o‘zgartirish va yangi elementlar yaratish.",

        [
            {
                title: "DOM nima?",

                text:
`DOM — Document Object Model.

Brauzer HTML hujjatini obyektlar daraxti sifatida ifodalaydi.

JavaScript shu DOM orqali sahifadagi elementlarni boshqaradi.`
            },

            {
                title: "getElementById",

                text:
`HTML:

\`\`\`
<h1 id="title">
    Eski sarlavha
</h1>
\`\`\`

JavaScript:

\`\`\`
const title =
    document.getElementById(
        "title"
    );
\`\`\``
            },

            {
                title: "textContent",

                text:
`Element matnini o‘zgartirish:

\`\`\`
title.textContent =
    "Student Hub";
\`\`\`

Shundan keyin brauzerdagi sarlavha o‘zgaradi.`
            },

            {
                title: "querySelector",

                text:
`CSS selector orqali element topish mumkin.

\`\`\`
const card =
    document.querySelector(
        ".card"
    );
\`\`\`

Birinchi mos kelgan element qaytariladi.`
            },

            {
                title: "querySelectorAll",

                text:
`Bir nechta elementni olish:

\`\`\`
const cards =
    document.querySelectorAll(
        ".card"
    );

console.log(
    cards.length
);
\`\`\``
            },

            {
                title: "classList",

                text:
`CSS class qo‘shish:

\`\`\`
card.classList.add(
    "active"
);
\`\`\`

Class olib tashlash:

\`\`\`
card.classList.remove(
    "active"
);
\`\`\`

Classni almashtirish:

\`\`\`
card.classList.toggle(
    "active"
);
\`\`\``
            },

            {
                title: "Yangi element yaratish",

                text:
`\`\`\`
const card =
    document.createElement(
        "div"
    );

card.textContent =
    "Yangi material";

document.body.appendChild(
    card
);
\`\`\`

Bu usul dinamik interfeyslar yaratishda ishlatiladi.`
            },

            {
                title: "innerHTML",

                text:
`Element ichiga HTML joylashtirish mumkin.

\`\`\`
card.innerHTML = \`
    <h2>HTML asoslari</h2>
    <p>Dasturlash</p>
\`;
\`\`\`

Ishonchsiz foydalanuvchi ma’lumotini to‘g‘ridan-to‘g‘ri innerHTML orqali joylashtirish xavfsizlik muammolariga olib kelishi mumkin.`
            },

            {
                title: "Event bilan DOM",

                text:
`HTML:

\`\`\`
<button id="themeButton">
    🌙
</button>
\`\`\`

JavaScript:

\`\`\`
const button =
    document.getElementById(
        "themeButton"
    );

button.addEventListener(
    "click",
    function () {

        document.body
            .classList
            .toggle(
                "dark-mode"
            );

    }
);
\`\`\`

Bu Student Hub'dagi dark mode prinsipiga o‘xshaydi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`HTMLda:

- h1;
- p;
- button

yarating.

Button bosilganda:

1. h1 matni o‘zgarsin.

2. p elementiga active class qo‘shilsin.

3. Console ichida "DOM ishladi" yozuvi chiqsin.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. DOM nima?

2. getElementById nima qiladi?

3. querySelector nima?

4. textContent nima?

5. classList nima?

6. createElement nima qiladi?

7. appendChild nima uchun kerak?

8. Event va DOM qanday birga ishlaydi?`
            },

            {
                title: "Xulosa",

                text:
`DOM JavaScriptga HTML sahifasini dinamik boshqarish imkonini beradi.

Student Hub kabi frontend loyihalarda kartalar, testlar, xabarlar va foydalanuvchi interfeysining katta qismi DOM orqali boshqariladi.`
            }
        ]
    ),


    // ==================================================
    // 10. ALGORITMLAR ASOSLARI
    // ==================================================

    lesson(
        "Algoritmlar asoslari",

        "Algoritm, psevdokod va ketma-ket, tarmoqlanuvchi hamda takrorlanuvchi algoritmlar.",

        [
            {
                title: "Algoritm nima?",

                text:
`Algoritm — ma’lum bir muammoni yechish uchun bajariladigan aniq va tartibli amallar ketma-ketligidir.

Dastur yozishdan oldin masalani algoritm sifatida tushunish juda muhim.`
            },

            {
                title: "Algoritm xususiyatlari",

                text:
`Yaxshi algoritm:

aniq bo‘lishi;

qadamlar tartibiga ega bo‘lishi;

yakuniy natija berishi;

cheklangan qadamlar ichida tugashi kerak.`
            },

            {
                title: "Ketma-ket algoritm",

                text:
`Barcha amallar birin-ketin bajariladi.

Masalan:

1. Ikki sonni olish.

2. Ularni qo‘shish.

3. Natijani chiqarish.

JavaScript:

\`\`\`
const a = 10;
const b = 5;

const result =
    a + b;

console.log(result);
\`\`\``
            },

            {
                title: "Tarmoqlanuvchi algoritm",

                text:
`Shartga qarab turli yo‘nalish tanlanadi.

\`\`\`
const score = 80;

if (score >= 60) {

    console.log(
        "O'tdi"
    );

} else {

    console.log(
        "O'tmadi"
    );

}
\`\`\`

Bu tarmoqlanuvchi algoritmga misol.`
            },

            {
                title: "Takrorlanuvchi algoritm",

                text:
`Bir amal bir necha marta takrorlanadi.

\`\`\`
for (
    let i = 1;
    i <= 5;
    i++
) {

    console.log(i);

}
\`\`\`

Bu siklli algoritmga misol.`
            },

            {
                title: "Psevdokod",

                text:
`Psevdokod algoritmni dasturlash tiliga bog‘lamasdan tushunarli shaklda yozish usulidir.

Misol:

\`\`\`
START

INPUT score

IF score >= 60
    OUTPUT "O'tdi"
ELSE
    OUTPUT "O'tmadi"

END
\`\`\``
            },

            {
                title: "Test tizimi algoritmi",

                text:
`Oddiy test tizimi quyidagi algoritm asosida ishlashi mumkin:

1. Savollarni serverdan olish.

2. Birinchi savolni ko‘rsatish.

3. Foydalanuvchi javobini olish.

4. Javobni tekshirish.

5. Ballni hisoblash.

6. Keyingi savolga o‘tish.

7. Savollar tugagach natijani chiqarish.

8. Natijani serverga saqlash.`
            },

            {
                title: "Material qidirish algoritmi",

                text:
`Materiallar sahifasidagi qidiruvning oddiy algoritmi:

1. Foydalanuvchi qidiruv matnini kiritadi.

2. Matn kichik harflarga o‘tkaziladi.

3. Har bir material tekshiriladi.

4. Title, subject yoki content qidiruv bilan solishtiriladi.

5. Mos materiallar ekranga chiqariladi.`
            },

            {
                title: "Algoritmik fikrlash",

                text:
`Murakkab vazifani kichik qismlarga ajratish algoritmik fikrlashning muhim qismidir.

Masalan, "login tizimi yaratish" vazifasini:

forma yaratish;

ma’lumot olish;

serverga yuborish;

foydalanuvchini tekshirish;

token yaratish;

frontendga javob qaytarish

kabi kichik bosqichlarga ajratish mumkin.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Uchta son ichidan eng kattasini aniqlaydigan algoritm tuzing.

Avval psevdokod yozing.

Keyin JavaScriptda if operatorlari yordamida amalga oshiring.

Qo‘shimcha topshiriq:

1 dan 100 gacha bo‘lgan juft sonlarni chiqaruvchi algoritm yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Algoritm nima?

2. Algoritm qanday xususiyatlarga ega?

3. Ketma-ket algoritm nima?

4. Tarmoqlanuvchi algoritm nima?

5. Takrorlanuvchi algoritm nima?

6. Psevdokod nima?

7. Algoritmik fikrlash nima uchun muhim?`
            },

            {
                title: "Xulosa",

                text:
`Algoritm dasturlashning mantiqiy asosidir.

Kod yozishdan oldin vazifani aniq bosqichlarga ajratish dastur tuzilishini yaxshilaydi va xatolarni kamaytiradi.

HTML, CSS va JavaScriptni bilish bilan birga algoritmik fikrlashni rivojlantirish ham muhim.`
            }
        ]
    )

];


// ==================================================
// DATABASE UPDATE
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
        "======================================"
    );

    console.log(
        "🎉 DASTURLASH DARSLARI TAYYOR"
    );

    console.log(
        "======================================"
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
        "======================================"
    );

    console.log("");

}
catch (error) {

    console.error(
        "❌ Darslarni yangilash xatosi:",
        error
    );

    process.exitCode = 1;

}