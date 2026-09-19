const db = require("./database");

console.log("");
console.log("==========================================");
console.log("🔐 AXBOROT XAVFSIZLIGI DARSLARINI YANGILASH");
console.log("==========================================");


function lesson(title, description, sections) {

    let content = `# ${title}\n\n`;

    for (const section of sections) {

        content += `## ${section.title}\n\n`;
        content += `${section.text}\n\n`;

    }

    return {
        title,
        subject: "Axborot xavfsizligi",
        description,
        content
    };
}


const lessons = [

    // ==================================================
    // 1. AXBOROT XAVFSIZLIGI ASOSLARI
    // ==================================================

    lesson(
        "Axborot xavfsizligi asoslari",

        "Axborot xavfsizligi tushunchasi, CIA modeli, aktivlar, tahdidlar, zaifliklar va xavflarni boshqarish asoslari.",

        [
            {
                title: "Axborot xavfsizligi nima?",

                text:
`Axborot xavfsizligi — axborot va axborot tizimlarini ruxsatsiz kirish, o‘zgartirish, yo‘q qilish, oshkor qilish yoki xizmatning buzilishidan himoya qilish bilan bog‘liq sohadir.

Himoya qilinadigan obyektlarga:

- foydalanuvchi ma'lumotlari;
- parollar;
- hujjatlar;
- serverlar;
- kompyuterlar;
- mobil qurilmalar;
- tarmoqlar;
- ma'lumotlar bazalari

kirishi mumkin.`
            },

            {
                title: "CIA modeli",

                text:
`Axborot xavfsizligining klassik modeli uchta asosiy tamoyildan iborat:

\`\`\`
Confidentiality
Integrity
Availability
\`\`\`

Ularning bosh harflaridan CIA nomi hosil bo‘ladi.`
            },

            {
                title: "Confidentiality",

                text:
`Confidentiality — maxfiylik.

Axborot faqat unga ruxsati mavjud shaxslar tomonidan ko‘rilishi kerak.

Masalan, Student Hub foydalanuvchisining paroli boshqa foydalanuvchilarga ko‘rsatilmasligi kerak.

Maxfiylikni ta'minlashda autentifikatsiya, ruxsat nazorati va shifrlash kabi mexanizmlar qo‘llaniladi.`
            },

            {
                title: "Integrity",

                text:
`Integrity — yaxlitlik.

Ma'lumot ruxsatsiz yoki noto‘g‘ri o‘zgartirilmasligi kerak.

Masalan, foydalanuvchining test natijasi boshqa foydalanuvchi tomonidan o‘zgartirilmasligi kerak.

Yaxlitlikni himoya qilish uchun ruxsat nazorati, hash va boshqa tekshiruv mexanizmlari ishlatilishi mumkin.`
            },

            {
                title: "Availability",

                text:
`Availability — mavjudlik.

Tizim va ma'lumotlar kerak bo‘lgan paytda vakolatli foydalanuvchilar uchun mavjud bo‘lishi kerak.

Masalan, server ishlamay qolsa Student Hub API xizmatlaridan foydalanib bo‘lmaydi.

Zaxiralash, monitoring va ishonchli infratuzilma mavjudlikni yaxshilashga yordam beradi.`
            },

            {
                title: "Aktiv",

                text:
`Aktiv — tashkilot yoki foydalanuvchi uchun qiymatga ega bo‘lgan resurs.

Masalan:

- ma'lumotlar bazasi;
- server;
- foydalanuvchi akkaunti;
- dasturiy ta'minot;
- tarmoq qurilmasi;
- maxfiy hujjat.`
            },

            {
                title: "Tahdid",

                text:
`Tahdid — aktivga zarar yetkazishi mumkin bo‘lgan hodisa yoki manba.

Masalan:

- zararli dastur;
- hisob ma'lumotlarining o‘g‘irlanishi;
- apparat nosozligi;
- noto‘g‘ri konfiguratsiya;
- ijtimoiy muhandislik.`
            },

            {
                title: "Zaiflik",

                text:
`Zaiflik — tizim, jarayon yoki konfiguratsiyadagi xavfsizlik kamchiligi.

Masalan:

- juda oddiy parol;
- yangilanmagan dastur;
- ortiqcha ruxsatlar;
- noto‘g‘ri server sozlamasi.

Tahdid mavjud zaiflikdan foydalanishi mumkin.`
            },

            {
                title: "Risk",

                text:
`Risk — tahdidning zaiflikdan foydalanib aktivga zarar yetkazish ehtimoli va uning oqibatlari bilan bog‘liq tushuncha.

Risklarni boshqarishda odatda:

1. Aktivlar aniqlanadi.

2. Tahdidlar aniqlanadi.

3. Zaifliklar baholanadi.

4. Risklar tahlil qilinadi.

5. Himoya chorasi tanlanadi.`
            },

            {
                title: "Defense in Depth",

                text:
`Defense in Depth — himoyani faqat bitta vositaga bog‘lab qo‘ymaslik tamoyili.

Masalan:

\`\`\`
Kuchli parol
     ↓
MFA
     ↓
Ruxsat nazorati
     ↓
Firewall
     ↓
Monitoring
     ↓
Backup
\`\`\`

Bir qatlam ishlamay qolsa, boshqa qatlamlar xavfni kamaytirishga yordam beradi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Student Hub loyihasidan beshta aktivni aniqlang.

Har bir aktiv uchun:

- bitta tahdid;
- bitta zaiflik;
- bitta himoya chorasi

yozing.

Masalan:

Aktiv: foydalanuvchi akkaunti.

Tahdid: hisobning egallab olinishi.

Zaiflik: oddiy parol.

Himoya: kuchli parol va qo‘shimcha autentifikatsiya.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Axborot xavfsizligi nima?

2. CIA modeli nima?

3. Confidentiality nimani anglatadi?

4. Integrity nima?

5. Availability nima?

6. Aktiv nima?

7. Tahdid va zaiflik o‘rtasidagi farq nima?

8. Risk nima?

9. Defense in Depth nima?`
            },

            {
                title: "Xulosa",

                text:
`Axborot xavfsizligining asosiy maqsadi axborotning maxfiyligi, yaxlitligi va mavjudligini himoya qilishdir.

Aktiv, tahdid, zaiflik va risk tushunchalari xavfsizlikni tizimli ravishda tashkil qilish uchun asos yaratadi.`
            }
        ]
    ),


    // ==================================================
    // 2. KIBER TAHDIDLAR
    // ==================================================

    lesson(
        "Kiber tahdidlar",

        "Kiber tahdidlarning asosiy turlari, hujum yuzasi, hisoblarni himoyalash va xavfsizlik choralarini tushunish.",

        [
            {
                title: "Kiber tahdid nima?",

                text:
`Kiber tahdid — kompyuter, tarmoq, akkaunt yoki ma'lumotlarga zarar yetkazishi mumkin bo‘lgan raqamli xavfdir.

Tahdidlar turli manbalardan kelishi mumkin va ularning maqsadi ham har xil bo‘ladi.`
            },

            {
                title: "Keng tarqalgan tahdidlar",

                text:
`Kiberxavfsizlikda uchraydigan tahdidlarga:

- phishing;
- malware;
- hisob ma'lumotlarining o‘g‘irlanishi;
- zararli havolalar;
- ijtimoiy muhandislik;
- xizmatni izdan chiqarishga qaratilgan hujumlar;
- ma'lumotlarning sizib chiqishi

kabi holatlar kiradi.`
            },

            {
                title: "Attack Surface",

                text:
`Attack Surface — tizimga ta'sir ko‘rsatish mumkin bo‘lgan kirish nuqtalari va komponentlar majmuasidir.

Masalan, veb-ilovada:

- login sahifasi;
- API;
- server;
- ma'lumotlar bazasi;
- fayl yuklash;
- foydalanuvchi qurilmasi

hujum yuzasining qismlari bo‘lishi mumkin.`
            },

            {
                title: "Hisob xavfsizligi",

                text:
`Akkauntlar ko‘pincha muhim nishon hisoblanadi.

Himoyani yaxshilash uchun:

- noyob parol ishlatish;
- kuchli parol tanlash;
- MFA yoqish;
- shubhali loginlarni kuzatish;
- parolni boshqa odamga bermaslik

muhim.`
            },

            {
                title: "Yangilanishlar",

                text:
`Dasturiy ta'minotdagi aniqlangan xavfsizlik muammolari yangilanishlar orqali tuzatilishi mumkin.

Shuning uchun:

- operatsion tizim;
- brauzer;
- server dasturlari;
- router firmware;
- mobil ilovalarni

yangilab turish muhim xavfsizlik amaliyotidir.`
            },

            {
                title: "Eng kam ruxsat tamoyili",

                text:
`Principle of Least Privilege — foydalanuvchi yoki dasturga faqat vazifasini bajarish uchun zarur bo‘lgan ruxsatlarni berish tamoyilidir.

Masalan, oddiy Student Hub foydalanuvchisiga admin funksiyalarini boshqarish huquqi berilmasligi kerak.`
            },

            {
                title: "Backup",

                text:
`Backup — muhim ma'lumotlarning zaxira nusxasini saqlash.

Backup:

- tasodifiy o‘chirish;
- qurilma buzilishi;
- ayrim zararli dasturlar;
- boshqa ma'lumot yo‘qotish holatlarida

tiklash imkoniyatini yaxshilaydi.`
            },

            {
                title: "Monitoring",

                text:
`Monitoring tizimdagi noodatiy yoki xavfli hodisalarni aniqlashga yordam beradi.

Masalan:

- takroriy muvaffaqiyatsiz loginlar;
- noma'lum qurilmadan kirish;
- server xatolari;
- noodatiy trafik.

Monitoring xavfsizlik hodisalariga tezroq javob berishga yordam beradi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Student Hub uchun beshta ehtimoliy kiber tahdid yozing.

Har biri uchun bitta himoya chorasi taklif qiling.

Masalan:

Tahdid: foydalanuvchi parolining o‘g‘irlanishi.

Himoya: kuchli parol va MFA.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Kiber tahdid nima?

2. Attack Surface nima?

3. Nima uchun dasturlarni yangilash kerak?

4. Least Privilege nima?

5. Backup nima uchun kerak?

6. Monitoring nima beradi?

7. Akkauntni qanday himoya qilish mumkin?`
            },

            {
                title: "Xulosa",

                text:
`Kiber tahdidlarni butunlay yo‘q qilish har doim ham mumkin emas.

Asosiy vazifa — xavflarni aniqlash, himoya choralarini qo‘llash va hodisalarga tayyor turish orqali riskni kamaytirishdir.`
            }
        ]
    ),


    // ==================================================
    // 3. KUCHLI PAROLLAR
    // ==================================================

    lesson(
        "Kuchli parollar",

        "Parol xavfsizligi, uzun va noyob parollar, password manager, MFA va parollarni xavfsiz saqlash.",

        [
            {
                title: "Parol nima uchun muhim?",

                text:
`Parol foydalanuvchi akkauntini himoya qiluvchi autentifikatsiya omillaridan biridir.

Zaif yoki qayta ishlatilgan parol akkaunt xavfsizligini jiddiy kamaytirishi mumkin.`
            },

            {
                title: "Kuchli parol",

                text:
`Yaxshi parol uchun uzunlik va noyoblik juda muhim.

Parol:

- yetarlicha uzun;
- taxmin qilish qiyin;
- boshqa akkauntlarda ishlatilmagan

bo‘lishi kerak.

Shaxsiy ma'lumotlarga asoslangan juda oddiy parollardan qochish kerak.`
            },

            {
                title: "Bir parolni qayta ishlatmaslik",

                text:
`Bir xil parolni bir nechta saytda ishlatish xavfli.

Agar xizmatlardan biridagi login ma'lumotlari oshkor bo‘lsa, shu parol boshqa akkauntlarda ham sinab ko‘rilishi mumkin.

Shuning uchun har bir muhim akkaunt uchun noyob parol ishlatish maqsadga muvofiq.`
            },

            {
                title: "Password Manager",

                text:
`Password manager ko‘plab noyob parollarni boshqarishga yordam beradigan dasturdir.

U foydalanuvchiga har bir sayt uchun alohida va murakkab parol ishlatishni osonlashtiradi.

Password managerning o‘zi ham kuchli asosiy himoyaga ega bo‘lishi kerak.`
            },

            {
                title: "MFA",

                text:
`MFA — Multi-Factor Authentication.

MFA foydalanuvchini tekshirishda bir nechta turdagi omildan foydalanadi.

Masalan:

\`\`\`
Parol
   +
Authenticator tasdig‘i
\`\`\`

Parol oshkor bo‘lib qolgan taqdirda ham qo‘shimcha omil himoyani kuchaytirishi mumkin.`
            },

            {
                title: "Parolni serverda saqlash",

                text:
`Veb-ilova foydalanuvchi parolini oddiy ochiq matn shaklida saqlamasligi kerak.

Odatda parol maxsus password hashing algoritmi orqali qayta ishlanadi va serverda hash saqlanadi.

Student Hub backendida ham foydalanuvchi parollarini himoyalash uchun hashing yondashuvi ishlatiladi.`
            },

            {
                title: "Hash va encryption farqi",

                text:
`Hashing va encryption bir xil narsa emas.

Encryption ma'lumotni kalit yordamida shifrlash va kerak bo‘lganda qayta ochishga mo‘ljallangan.

Hashing esa ma'lumotdan belgilangan algoritm orqali hash qiymat hosil qiladi va parollarni tekshirish kabi vazifalarda qo‘llaniladi.`
            },

            {
                title: "Parolni hech kimga bermaslik",

                text:
`Parol:

- do‘stga;
- tanishga;
- telefon orqali so‘ragan shaxsga;
- shubhali saytga

berilmasligi kerak.

Haqiqiy xizmat nomidan kelgandek ko‘ringan xabar ham phishing bo‘lishi mumkin.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi holatlarni xavfsiz yoki xavfli deb baholang:

1. Bitta parolni barcha saytlarda ishlatish.

2. Har bir akkaunt uchun noyob parol.

3. MFA yoqish.

4. Parolni messenjer orqali yuborish.

5. Password manager ishlatish.

Har bir javob sababini yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Nima uchun parol muhim?

2. Kuchli parol qanday bo‘lishi kerak?

3. Nima uchun bitta parolni qayta ishlatmaslik kerak?

4. Password manager nima?

5. MFA nima?

6. Hashing nima uchun ishlatiladi?

7. Hashing va encryption bir xilmi?`
            },

            {
                title: "Xulosa",

                text:
`Parol xavfsizligida uzunlik, noyoblik va xavfsiz saqlash muhim.

Noyob parollar, password manager va MFA birgalikda akkaunt himoyasini sezilarli darajada yaxshilaydi.`
            }
        ]
    ),


    // ==================================================
    // 4. AUTENTIFIKATSIYA VA AVTORIZATSIYA
    // ==================================================

    lesson(
        "Autentifikatsiya va avtorizatsiya",

        "Authentication, authorization, foydalanuvchi rollari, tokenlar va ruxsat nazorati.",

        [
            {
                title: "Authentication nima?",

                text:
`Authentication — foydalanuvchining kimligini tekshirish jarayoni.

Oddiy login tizimida:

\`\`\`
Email
  +
Parol
  ↓
Authentication
\`\`\`

Server foydalanuvchi taqdim etgan ma'lumotlarni tekshiradi.`
            },

            {
                title: "Authorization nima?",

                text:
`Authorization — autentifikatsiyadan o‘tgan foydalanuvchi qaysi resurs va amallarga ruxsatga ega ekanini aniqlash jarayoni.

Masalan:

Student — test ishlashi mumkin.

Admin — foydalanuvchilarni boshqarishi mumkin.`
            },

            {
                title: "Farqi",

                text:
`Qisqacha:

\`\`\`
Authentication
= Siz kimsiz?

Authorization
= Sizga nima qilish mumkin?
\`\`\`

Bu ikki tushunchani bir-biridan ajratish juda muhim.`
            },

            {
                title: "Role-Based Access Control",

                text:
`RBAC — Role-Based Access Control.

Ruxsatlar foydalanuvchining roliga qarab beriladi.

Masalan:

\`\`\`
student
   ↓
Oddiy imkoniyatlar

admin
   ↓
Boshqaruv imkoniyatlari
\`\`\`

Student Hubda student va admin rollarini ajratish bunga sodda misoldir.`
            },

            {
                title: "Token",

                text:
`Foydalanuvchi login qilgandan so‘ng server sessiyani boshqarish uchun token mexanizmidan foydalanishi mumkin.

Frontend keyingi himoyalangan so‘rovlarda tokenni serverga yuboradi.

Server tokenni tekshirib, foydalanuvchini aniqlaydi.`
            },

            {
                title: "JWT",

                text:
`JWT — JSON Web Token.

JWT token asosidagi autentifikatsiya tizimlarida keng qo‘llaniladigan formatlardan biridir.

Student Hub loyihasida backend foydalanuvchi login qilgandan keyin JWT bilan ishlaydi.`
            },

            {
                title: "Bearer Token",

                text:
`API so‘rovida token Authorization header orqali yuborilishi mumkin.

Umumiy ko‘rinish:

\`\`\`
Authorization:
Bearer TOKEN
\`\`\`

Server himoyalangan endpointlarda ushbu tokenni tekshiradi.`
            },

            {
                title: "Ruxsatni serverda tekshirish",

                text:
`Faqat frontenddagi tugmani yashirish xavfsizlik uchun yetarli emas.

Masalan, admin tugmasi ko‘rinmasa ham foydalanuvchi API manziliga to‘g‘ridan-to‘g‘ri murojaat qilishga urinishi mumkin.

Shuning uchun muhim authorization tekshiruvlari backendda bajarilishi kerak.`
            },

            {
                title: "Student Hub misoli",

                text:
`Oddiy oqim:

\`\`\`
Register
   ↓
Login
   ↓
Server tekshiradi
   ↓
JWT
   ↓
Frontend tokenni yuboradi
   ↓
Server tokenni tekshiradi
   ↓
Himoyalangan ma'lumot
\`\`\`

Admin endpointlarida bundan tashqari foydalanuvchining roli ham tekshiriladi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi vazifalarni Authentication yoki Authorization deb ajrating:

1. Email va parolni tekshirish.

2. Foydalanuvchining admin ekanini tekshirish.

3. Tokenni tekshirish.

4. Oddiy foydalanuvchiga admin funksiyasini taqiqlash.

Keyin Student Hub login jarayonining sxemasini chizing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Authentication nima?

2. Authorization nima?

3. Ularning farqi nima?

4. RBAC nima?

5. Token nima?

6. JWT nima?

7. Bearer Token nima?

8. Nima uchun authorization backendda ham tekshirilishi kerak?`
            },

            {
                title: "Xulosa",

                text:
`Authentication foydalanuvchi kimligini tekshiradi, authorization esa uning ruxsatlarini belgilaydi.

Login, token va rollarni to‘g‘ri boshqarish zamonaviy veb-ilova xavfsizligining muhim qismidir.`
            }
        ]
    ),


    // ==================================================
    // 5. KRIPTOGRAFIYA ASOSLARI
    // ==================================================

    lesson(
        "Kriptografiya asoslari",

        "Kriptografiya, plaintext, ciphertext, kalit, encryption, hashing va raqamli imzo haqida asosiy tushunchalar.",

        [
            {
                title: "Kriptografiya nima?",

                text:
`Kriptografiya — axborotni himoyalash uchun matematik usullardan foydalanadigan soha.

U ma'lumotlarning:

- maxfiyligi;
- yaxlitligi;
- haqiqiyligini tekshirish

kabi vazifalarda muhim rol o‘ynaydi.`
            },

            {
                title: "Plaintext va Ciphertext",

                text:
`Plaintext — shifrlashdan oldingi o‘qiladigan ma'lumot.

Ciphertext — shifrlash natijasidagi ko‘rinish.

Umumiy jarayon:

\`\`\`
Plaintext
   ↓
Encryption
   ↓
Ciphertext
\`\`\`

Kerakli kalit va algoritm yordamida vakolatli tomon ma'lumotni qayta ochishi mumkin.`
            },

            {
                title: "Kalit",

                text:
`Kriptografik kalit algoritmning ishlashida foydalaniladigan muhim qiymatdir.

Xavfsiz tizimlarda kalitlarni:

- yaratish;
- saqlash;
- uzatish;
- almashtirish;
- bekor qilish

jarayonlari ham himoyalangan bo‘lishi kerak.`
            },

            {
                title: "Encryption",

                text:
`Encryption ma'lumotni ruxsatsiz tomon uchun o‘qish qiyin bo‘lgan ko‘rinishga aylantirish jarayonidir.

Masalan, tarmoq orqali maxfiy ma'lumot uzatilganda shifrlash maxfiylikni himoya qilishga yordam beradi.`
            },

            {
                title: "Hashing",

                text:
`Hash funksiyasi kiruvchi ma'lumotdan hash qiymat hosil qiladi.

Umumiy ko‘rinish:

\`\`\`
Data
 ↓
Hash Function
 ↓
Hash Value
\`\`\`

Hashing parollarni saqlash, ma'lumot yaxlitligini tekshirish va boshqa vazifalarda ishlatilishi mumkin.`
            },

            {
                title: "Hash va shifrlash farqi",

                text:
`Encryption odatda tegishli kalit yordamida qayta ochiladigan jarayondir.

Hashing esa odatda ma'lumotni asl ko‘rinishiga qaytarish uchun mo‘ljallanmagan bir tomonlama o‘zgartirish sifatida ishlatiladi.

Shuning uchun ularning vazifalari turlicha.`
            },

            {
                title: "Raqamli imzo",

                text:
`Raqamli imzo ma'lumotning kelib chiqishi va yaxlitligini tekshirishga yordam beruvchi kriptografik mexanizmdir.

U elektron hujjatlar va xavfsiz kommunikatsiya tizimlarida muhim rol o‘ynaydi.`
            },

            {
                title: "HTTPS",

                text:
`HTTPS veb-brauzer va server o‘rtasidagi aloqani himoyalashda TLSdan foydalanadi.

Bu tarmoq orqali uzatilayotgan ma'lumotlarning maxfiyligi va yaxlitligini himoyalashga yordam beradi.

Saytning HTTPS ishlatishi foydalanuvchini barcha xavflardan avtomatik himoya qilmaydi, ammo transport himoyasi uchun muhim.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi tushunchalarni izohlang:

1. Plaintext.

2. Ciphertext.

3. Encryption.

4. Hash.

5. Kalit.

6. Raqamli imzo.

Keyin hashing va encryption o‘rtasidagi kamida uchta farqni yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Kriptografiya nima?

2. Plaintext nima?

3. Ciphertext nima?

4. Encryption nima?

5. Kriptografik kalit nima?

6. Hashing nima?

7. Hashing va encryption farqi nima?

8. Raqamli imzo nima?

9. HTTPS nimani himoyalashga yordam beradi?`
            },

            {
                title: "Xulosa",

                text:
`Kriptografiya raqamli axborotni himoyalashning asosiy vositalaridan biridir.

Shifrlash, hashing, kalitlar va raqamli imzo kabi tushunchalar zamonaviy axborot xavfsizligining muhim poydevorini tashkil qiladi.`
            }
        ]
    ),
        // ==================================================
    // 6. SIMMETRIK VA ASSIMETRIK SHIFRLASH
    // ==================================================

    lesson(
        "Simmetrik va assimetrik shifrlash",

        "Simmetrik va assimetrik kriptografiya, kalitlar, AES, RSA va gibrid shifrlash tushunchalari.",

        [
            {
                title: "Shifrlash nima?",

                text:
`Shifrlash ma'lumotni ruxsatsiz tomon o‘qiy olmaydigan ko‘rinishga o‘zgartirish jarayonidir.

Umumiy ko‘rinish:

\`\`\`
Plaintext
   ↓
Encryption
   ↓
Ciphertext
\`\`\`

Vakolatli tomon kerakli kalit yordamida ma'lumotni qayta ochishi mumkin.`
            },

            {
                title: "Simmetrik shifrlash",

                text:
`Simmetrik shifrlashda ma'lumotni shifrlash va qayta ochishda bir xil maxfiy kalitdan foydalaniladi.

\`\`\`
Plaintext
   ↓
Secret Key
   ↓
Encryption
   ↓
Ciphertext
   ↓
Secret Key
   ↓
Decryption
   ↓
Plaintext
\`\`\`

Kalit maxfiy saqlanishi kerak.`
            },

            {
                title: "AES",

                text:
`AES — Advanced Encryption Standard.

AES keng qo‘llaniladigan simmetrik shifrlash algoritmlaridan biridir.

Simmetrik algoritmlar katta hajmdagi ma'lumotlarni samarali shifrlash uchun qulay.`
            },

            {
                title: "Simmetrik usulning afzalligi",

                text:
`Simmetrik shifrlashning muhim afzalligi — tezligi va samaradorligi.

Ammo asosiy muammolardan biri maxfiy kalitni tomonlar o‘rtasida xavfsiz tarzda taqsimlashdir.`
            },

            {
                title: "Assimetrik shifrlash",

                text:
`Assimetrik kriptografiyada ikkita o‘zaro bog‘liq kalit ishlatiladi:

- public key;
- private key.

Public key ochiq bo‘lishi mumkin.

Private key esa egasi tomonidan maxfiy saqlanishi kerak.`
            },

            {
                title: "Public va Private Key",

                text:
`Soddalashtirilgan tushuncha:

\`\`\`
Public Key
    ↓
Ma'lumotni himoyalash

Private Key
    ↓
Tegishli maxfiy amal
\`\`\`

Amaldagi aniq jarayon foydalanilayotgan kriptografik protokol va algoritmga bog‘liq.`
            },

            {
                title: "RSA",

                text:
`RSA mashhur assimetrik kriptografik algoritmlardan biridir.

U tarixan kalit almashish, ma'lumotni himoyalash va raqamli imzo bilan bog‘liq tizimlarda qo‘llanilgan.

Zamonaviy tizimlarda algoritm tanlashda amaldagi xavfsizlik standartlariga rioya qilish muhim.`
            },

            {
                title: "Gibrid yondashuv",

                text:
`Amaliy xavfsiz aloqa tizimlarida simmetrik va assimetrik kriptografiya birgalikda ishlatilishi mumkin.

Umumiy g‘oya:

\`\`\`
Assimetrik mexanizm
       ↓
Kalit bilan bog‘liq xavfsiz jarayon
       ↓
Simmetrik kalit
       ↓
Tez ma'lumot shifrlash
\`\`\`

Bu ikki yondashuvning foydali xususiyatlarini birlashtirish imkonini beradi.`
            },

            {
                title: "Simmetrik va assimetrik farqi",

                text:
`Simmetrik:

- bitta maxfiy kalit;
- odatda tezroq;
- katta hajmdagi ma'lumot uchun samarali.

Assimetrik:

- public va private key;
- kalit boshqaruvi boshqacha;
- odatda hisoblash jihatdan og‘irroq;
- kalit almashish va raqamli imzo kabi vazifalarda muhim.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Jadval tuzing va quyidagilarni taqqoslang:

1. Kalitlar soni.

2. Tezlik.

3. Kalitni boshqarish.

4. Asosiy qo‘llanish.

5. Misol algoritmlar.

AES va RSA qaysi guruhga kirishini aniqlang.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Simmetrik shifrlash nima?

2. Assimetrik kriptografiya nima?

3. Public key nima?

4. Private key nima?

5. AES qaysi turga kiradi?

6. RSA qaysi turga kiradi?

7. Simmetrik usulning afzalligi nima?

8. Gibrid yondashuv nima?`
            },

            {
                title: "Xulosa",

                text:
`Simmetrik va assimetrik kriptografiya turli vazifalarni bajaradi.

Zamonaviy xavfsiz aloqa tizimlari ko‘pincha ularning imkoniyatlarini birgalikda qo‘llaydi.`
            }
        ]
    ),


    // ==================================================
    // 7. FIREWALL ASOSLARI
    // ==================================================

    lesson(
        "Firewall asoslari",

        "Firewall vazifasi, trafikni nazorat qilish, qoidalar, portlar va tarmoq segmentatsiyasi.",

        [
            {
                title: "Firewall nima?",

                text:
`Firewall — tarmoq trafikini belgilangan xavfsizlik qoidalari asosida nazorat qiluvchi himoya vositasidir.

U tarmoqlar yoki qurilmalar orasidagi kiruvchi va chiquvchi trafikni tekshirishga yordam beradi.`
            },

            {
                title: "Firewall vazifasi",

                text:
`Firewallning asosiy vazifalaridan biri ruxsat etilgan va taqiqlangan trafikni ajratishdir.

Masalan:

\`\`\`
Internet
   ↓
Firewall
   ↓
Ichki tarmoq
\`\`\`

Firewall siyosat asosida trafikni ruxsat berishi yoki bloklashi mumkin.`
            },

            {
                title: "Firewall qoidasi",

                text:
`Firewall qoidalari turli parametrlar asosida yaratilishi mumkin.

Masalan:

- manba IP;
- destination IP;
- protokol;
- port;
- trafik yo‘nalishi;
- connection holati.

Aniq imkoniyat firewall turiga bog‘liq.`
            },

            {
                title: "Port",

                text:
`TCP va UDP protokollarida portlar dasturiy xizmatlarni aniqlashga yordam beradi.

Masalan, veb-xizmatlar ma'lum portlardan foydalanishi mumkin.

Firewall port va protokol ma'lumotlari asosida trafikni boshqarishi mumkin.`
            },

            {
                title: "Allow va Deny",

                text:
`Oddiy firewall siyosatida:

ALLOW — trafikga ruxsat berish.

DENY yoki DROP — trafikni bloklash.

Qoidalar imkon qadar tashkilotning haqiqiy ehtiyojlariga mos va minimal ruxsat tamoyiliga asoslangan bo‘lishi kerak.`
            },

            {
                title: "Default Deny",

                text:
`Default Deny yondashuvida avval kerak bo‘lmagan trafik bloklanadi, keyin zarur xizmatlarga aniq ruxsat beriladi.

Bu ortiqcha ochiq xizmatlar sonini kamaytirishga yordam beradi.`
            },

            {
                title: "Host va Network Firewall",

                text:
`Host-based firewall alohida kompyuter yoki serverda ishlaydi.

Network firewall esa tarmoq segmentlari orasidagi trafikni nazorat qilishi mumkin.

Amaliy tizimlarda bir nechta himoya qatlami birgalikda ishlatilishi mumkin.`
            },

            {
                title: "Firewall va segmentatsiya",

                text:
`Tarmoqni segmentlarga ajratish xavfsizlikni yaxshilashi mumkin.

Masalan:

\`\`\`
Internet
   ↓
Firewall
   ↓
Server tarmog‘i
   ↓
Ichki tarmoq
\`\`\`

Turli segmentlar orasidagi trafik alohida siyosat bilan nazorat qilinadi.`
            },

            {
                title: "Firewall barcha muammoni hal qiladimi?",

                text:
`Yo‘q.

Firewall muhim himoya vositasi, ammo u yagona xavfsizlik chorasi bo‘la olmaydi.

Bundan tashqari:

- autentifikatsiya;
- yangilanish;
- endpoint himoyasi;
- monitoring;
- backup;
- foydalanuvchi xavfsizlik savodxonligi

ham kerak.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Universitet tarmog‘i uchun quyidagi sxemani chizing:

\`\`\`
Internet
   ↓
Firewall
   ↓
Router
   ↓
Switch
 ↙     ↘
PC     Server
\`\`\`

Firewall qayerda joylashganini va uning vazifasini tushuntiring.

Keyin "faqat zarur trafikga ruxsat berish" tamoyilini izohlang.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Firewall nima?

2. Firewall qanday vazifa bajaradi?

3. Firewall qoidasi nima?

4. Port nima?

5. Allow nima?

6. Deny nima?

7. Default Deny nima?

8. Firewall nima uchun yagona himoya vositasi bo‘la olmaydi?`
            },

            {
                title: "Xulosa",

                text:
`Firewall tarmoq trafikini nazorat qilishning muhim vositasidir.

To‘g‘ri firewall siyosati va tarmoq segmentatsiyasi boshqa xavfsizlik mexanizmlari bilan birga ishlatilganda himoyani yaxshilaydi.`
            }
        ]
    ),


    // ==================================================
    // 8. TARMOQ XAVFSIZLIGI
    // ==================================================

    lesson(
        "Tarmoq xavfsizligi",

        "Tarmoqni himoyalash, segmentatsiya, xavfsiz protokollar, VPN, monitoring va Wi-Fi xavfsizligi.",

        [
            {
                title: "Tarmoq xavfsizligi nima?",

                text:
`Tarmoq xavfsizligi — tarmoq qurilmalari, aloqa kanallari, xizmatlar va ma'lumotlarni turli xavflardan himoya qilish bilan bog‘liq choralar majmuasidir.

Maqsad tarmoqning maxfiyligi, yaxlitligi va mavjudligini himoya qilishdir.`
            },

            {
                title: "Tarmoq aktivlari",

                text:
`Tarmoqdagi muhim aktivlarga:

- router;
- switch;
- access point;
- firewall;
- server;
- foydalanuvchi qurilmalari;
- konfiguratsiyalar;
- tarmoq orqali uzatilayotgan ma'lumotlar

kiradi.`
            },

            {
                title: "Segmentatsiya",

                text:
`Segmentatsiya tarmoqni kichikroq mantiqiy qismlarga ajratadi.

Masalan:

\`\`\`
Student VLAN

Teacher VLAN

Server VLAN

Admin VLAN
\`\`\`

Segmentlar orasidagi trafikni nazorat qilish xavfsizlikni yaxshilashi mumkin.`
            },

            {
                title: "VLAN",

                text:
`VLAN — Virtual Local Area Network.

VLAN bitta fizik switch infratuzilmasida qurilmalarni turli mantiqiy lokal tarmoqlarga ajratishga yordam beradi.

Masalan, student va administrator qurilmalarini alohida VLANlarda saqlash mumkin.`
            },

            {
                title: "Xavfsiz boshqaruv",

                text:
`Tarmoq qurilmalarini boshqarishda himoyalangan protokollardan foydalanish muhim.

Masalan, masofadan buyruq satri orqali boshqarishda SSH xavfsiz kanal yaratishga yordam beradi.

Eski va himoyasiz boshqaruv protokollaridan imkon qadar qochish kerak.`
            },

            {
                title: "VPN",

                text:
`VPN — Virtual Private Network.

VPN ishonchsiz tarmoq orqali himoyalangan mantiqiy aloqa kanalini tashkil qilishga yordam beradi.

Masofadan korporativ tarmoqqa ulanish VPNning keng tarqalgan qo‘llanishlaridan biridir.`
            },

            {
                title: "Wi-Fi xavfsizligi",

                text:
`Simsiz tarmoqni himoyalash uchun:

- kuchli Wi-Fi paroli;
- zamonaviy WPA himoyasi;
- router yangilanishlari;
- xavfsiz administrator paroli;
- noma'lum qurilmalarni nazorat qilish

muhim.

Ochiq va ishonchsiz Wi-Fi tarmoqlarida maxfiy ma'lumot bilan ishlashda ehtiyotkorlik zarur.`
            },

            {
                title: "Monitoring va loglar",

                text:
`Tarmoq qurilmalari va serverlar loglari muhim hodisalarni qayd etishi mumkin.

Monitoring yordamida:

- noodatiy trafik;
- takroriy login xatolari;
- xizmatdagi uzilishlar;
- konfiguratsiya muammolari

kabi hodisalarni aniqlash osonlashadi.`
            },

            {
                title: "Yangilanish va konfiguratsiya",

                text:
`Router, switch, access point va serverlarning dasturiy ta'minotini yangilab turish muhim.

Shuningdek:

- keraksiz xizmatlarni o‘chirish;
- standart parollarni almashtirish;
- ruxsatlarni cheklash;
- konfiguratsiya nusxalarini saqlash

xavfsizlikni yaxshilaydi.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi tarmoqni loyihalang:

\`\`\`
Internet
   ↓
Firewall
   ↓
Router
   ↓
Switch
 ↙  ↓  ↘
VLAN10
VLAN20
VLAN30
\`\`\`

VLAN10 — Student.

VLAN20 — Teacher.

VLAN30 — Server.

Qaysi segmentlar o‘rtasida trafikni cheklash kerakligini tushuntiring.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Tarmoq xavfsizligi nima?

2. Segmentatsiya nima?

3. VLAN nima?

4. SSH nima uchun ishlatiladi?

5. VPN nima?

6. Wi-Fi qanday himoyalanadi?

7. Monitoring nima uchun kerak?

8. Nima uchun standart parollarni almashtirish kerak?`
            },

            {
                title: "Xulosa",

                text:
`Tarmoq xavfsizligi faqat bitta qurilma yoki dasturga bog‘liq emas.

Segmentatsiya, firewall, xavfsiz boshqaruv, monitoring, yangilanish va to‘g‘ri ruxsat siyosati birgalikda ishlashi kerak.`
            }
        ]
    ),


    // ==================================================
    // 9. PHISHING VA IJTIMOIY MUHANDISLIK
    // ==================================================

    lesson(
        "Phishing va ijtimoiy muhandislik",

        "Phishing, ijtimoiy muhandislik, shubhali xabarlarni aniqlash va foydalanuvchini himoyalash.",

        [
            {
                title: "Ijtimoiy muhandislik nima?",

                text:
`Ijtimoiy muhandislik texnik zaiflikdan ko‘ra insonning ishonchi, shoshilishi yoki e'tiborsizligidan foydalanishga qaratilgan manipulyatsiya usullarini anglatadi.

Maqsad foydalanuvchini maxfiy ma'lumot berishga yoki xavfli harakat qilishga undash bo‘lishi mumkin.`
            },

            {
                title: "Phishing nima?",

                text:
`Phishing — foydalanuvchini aldab:

- login;
- parol;
- karta ma'lumoti;
- tasdiqlash kodi;
- boshqa maxfiy ma'lumotlarni

olishga qaratilgan firibgarlik usullaridan biridir.

Xabar haqiqiy tashkilotdan kelgandek ko‘rinishi mumkin.`
            },

            {
                title: "Phishing belgilarini aniqlash",

                text:
`Shubhali xabarda quyidagi belgilar bo‘lishi mumkin:

- shoshilinch harakat talab qilish;
- noma'lum yoki o‘xshatib yozilgan manzil;
- kutilmagan fayl;
- shubhali havola;
- parol yoki tasdiqlash kodini so‘rash;
- haddan tashqari yaxshi taklif.

Bitta belgi mavjudligi xabar albatta phishing ekanini isbotlamaydi, lekin tekshirish uchun sabab beradi.`
            },

            {
                title: "Havolani tekshirish",

                text:
`Havolani ochishdan oldin uning haqiqiy manziliga e'tibor berish kerak.

Sayt nomiga o‘xshash, lekin boshqa domen ishlatilishi mumkin.

Muhim xizmatlarga shubhali xabardagi havola orqali emas, balki rasmiy ilova yoki oldindan ma'lum rasmiy manzil orqali kirish xavfsizroq.`
            },

            {
                title: "Tasdiqlash kodlari",

                text:
`Bir martalik tasdiqlash kodlari maxfiy hisoblanadi.

Ularni boshqa odamga yubormaslik kerak.

Firibgar o‘zini bank, texnik yordam yoki boshqa xizmat vakili sifatida tanishtirishi mumkin.`
            },

            {
                title: "Telefon orqali aldash",

                text:
`Ijtimoiy muhandislik faqat email orqali bo‘lmaydi.

Telefon qo‘ng‘iroqlari va messenjer xabarlari orqali ham foydalanuvchidan maxfiy ma'lumot olishga urinish mumkin.

Shaxsning kimligini mustaqil tekshirish muhim.`
            },

            {
                title: "Shubhali fayllar",

                text:
`Kutilmagan fayl yoki attachment xavf tug‘dirishi mumkin.

Ayniqsa jo‘natuvchi noma'lum bo‘lsa yoki xabar kutilmagan bo‘lsa, faylni ochishdan oldin uning manbasini tekshirish kerak.`
            },

            {
                title: "Phishingdan himoyalanish",

                text:
`Himoya choralariga:

- kuchli va noyob parollar;
- MFA;
- shubhali havolalarni tekshirish;
- maxfiy kodlarni bermaslik;
- dasturlarni yangilash;
- foydalanuvchi savodxonligi

kiradi.`
            },

            {
                title: "Shubhali xabar kelganda",

                text:
`Shubhali xabar kelganda:

1. Shoshilmaslik.

2. Havolani darhol bosmaslik.

3. Jo‘natuvchini tekshirish.

4. Maxfiy ma'lumot bermaslik.

5. Rasmiy kanal orqali tashkilot bilan bog‘lanish.

6. Zarur bo‘lsa xabarni xavfsizlik mas'uliga bildirish

maqsadga muvofiq.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Tasavvur qiling, sizga:

"Akkauntingiz 10 daqiqada bloklanadi. Hozir havolani ochib parolingizni tasdiqlang."

degan xabar keldi.

Quyidagilarni yozing:

1. Qaysi belgilar shubhali?

2. Nima qilmaslik kerak?

3. Akkaunt holatini qanday xavfsiz tekshirish mumkin?

4. MFA qanday yordam beradi?`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Ijtimoiy muhandislik nima?

2. Phishing nima?

3. Phishingning qanday belgilarini bilasiz?

4. Nima uchun shubhali havolani tekshirish kerak?

5. Tasdiqlash kodini boshqalarga berish mumkinmi?

6. Phishing faqat email orqali bo‘ladimi?

7. MFA qanday yordam beradi?`
            },

            {
                title: "Xulosa",

                text:
`Phishing va ijtimoiy muhandislik inson omilidan foydalanadi.

Shoshilmaslik, manbani tekshirish, maxfiy ma'lumotlarni bermaslik va MFA kabi himoya choralaridan foydalanish riskni kamaytiradi.`
            }
        ]
    ),


    // ==================================================
    // 10. MALWARE VA HIMOYALANISH
    // ==================================================

    lesson(
        "Malware va himoyalanish",

        "Zararli dasturlar turlari, virus, worm, trojan, ransomware va ulardan himoyalanish asoslari.",

        [
            {
                title: "Malware nima?",

                text:
`Malware — zararli maqsadda yaratilgan dasturiy ta'minot uchun umumiy atama.

U qurilma, ma'lumot yoki foydalanuvchiga zarar yetkazishi mumkin.

Malware turli ko‘rinishlarda uchraydi.`
            },

            {
                title: "Virus",

                text:
`Virus boshqa fayl yoki dasturga bog‘lanib tarqalishi mumkin bo‘lgan zararli dastur turidir.

U ishga tushirilganda boshqa fayllarga ta'sir qilishi yoki tizimga zarar yetkazishi mumkin.`
            },

            {
                title: "Worm",

                text:
`Worm — tarmoq orqali o‘zini tarqatish xususiyatiga ega bo‘lishi mumkin bo‘lgan zararli dastur turi.

Uning tarqalishi tarmoqdagi zaif qurilmalar soniga qarab tezlashishi mumkin.`
            },

            {
                title: "Trojan",

                text:
`Trojan foydali yoki oddiy dastur sifatida ko‘rinib, aslida zararli funksiyani bajarishi mumkin.

Shuning uchun dasturlarni ishonchli va rasmiy manbalardan olish muhim.`
            },

            {
                title: "Ransomware",

                text:
`Ransomware foydalanuvchi ma'lumotlarini shifrlash yoki ulardan foydalanishni cheklash orqali pul talab qilishga qaratilgan zararli dastur turidir.

Muhim ma'lumotlarning alohida va tekshirilgan backup nusxalariga ega bo‘lish zarar oqibatlarini kamaytirishga yordam beradi.`
            },

            {
                title: "Spyware",

                text:
`Spyware foydalanuvchi faoliyati yoki ma'lumotlarini yashirin ravishda kuzatish va yig‘ishga qaratilgan zararli dastur turidir.

Shubhali dasturlarni o‘rnatmaslik va tizimni yangilab turish muhim.`
            },

            {
                title: "Malware qanday kirishi mumkin?",

                text:
`Zararli dastur turli yo‘llar orqali kelishi mumkin:

- shubhali attachment;
- noma'lum dastur;
- zararli havola;
- soxta dastur yangilanishi;
- zaif yoki yangilanmagan tizim;
- ishonchsiz tashqi qurilma.

Shuning uchun faqat antivirusga tayanish yetarli emas.`
            },

            {
                title: "Himoyalanish",

                text:
`Asosiy himoya choralari:

- operatsion tizimni yangilash;
- dasturlarni yangilash;
- ishonchli manbalardan dastur o‘rnatish;
- endpoint himoyasidan foydalanish;
- shubhali fayllarni ochmaslik;
- minimal ruxsatlar;
- backup;
- foydalanuvchi savodxonligi.`
            },

            {
                title: "Backup strategiyasi",

                text:
`Muhim fayllarning zaxira nusxalari asosiy tizimdan mustaqil saqlanishi maqsadga muvofiq.

Backup mavjudligi yetarli emas — uni tiklash imkoniyati ham vaqti-vaqti bilan tekshirilishi kerak.

Bu ransomware va apparat nosozligi kabi holatlarda muhim.`
            },

            {
                title: "Shubhali holatda nima qilish kerak?",

                text:
`Qurilmada zararli dastur gumoni paydo bo‘lsa, tashkilotning xavfsizlik tartibiga amal qilish kerak.

Korporativ yoki universitet qurilmasida o‘zboshimchalik bilan tajriba qilish o‘rniga mas'ul IT yoki xavfsizlik xodimiga xabar berish maqsadga muvofiq.`
            },

            {
                title: "Amaliy topshiriq",

                text:
`Quyidagi zararli dasturlarni qisqacha taqqoslang:

1. Virus.

2. Worm.

3. Trojan.

4. Ransomware.

5. Spyware.

Keyin har biri uchun kamida bitta himoya chorasi yozing.`
            },

            {
                title: "Nazorat savollari",

                text:
`1. Malware nima?

2. Virus nima?

3. Worm nima?

4. Trojan nima?

5. Ransomware nima?

6. Spyware nima?

7. Malware qanday tarqalishi mumkin?

8. Backup nima uchun muhim?

9. Malwaredan himoyalanish uchun qanday choralar kerak?`
            },

            {
                title: "Xulosa",

                text:
`Malware turli shakllarda uchraydi va bitta himoya vositasi barcha xavflarni to‘liq bartaraf eta olmaydi.

Yangilanish, ehtiyotkor foydalanuvchi xatti-harakati, endpoint himoyasi, minimal ruxsat va backup birgalikda xavfni kamaytiradi.`
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
        "🎉 AXBOROT XAVFSIZLIGI DARSLARI TAYYOR"
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
        "❌ Security materiallarini yangilash xatosi:",
        error
    );

    process.exitCode = 1;

}