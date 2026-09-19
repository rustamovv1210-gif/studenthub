// ==========================
// FOYDALANUVCHINI KUTIB OLISH
// ==========================

const welcomeTitle =
    document.getElementById("welcomeTitle");

const loggedIn =
    localStorage.getItem("studentHubLoggedIn");

const savedUser =
    localStorage.getItem("studentHubUser");


if (
    loggedIn === "true" &&
    savedUser !== null
) {

    const user =
        JSON.parse(savedUser);

    welcomeTitle.textContent =
        "Xush kelibsiz, " + user.name + "! 👋";

}


// ==========================
// QIDIRUV TIZIMI
// ==========================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const searchResults =
    document.getElementById("searchResults");


const pages = [

    {
        name: "Fanlar",
        keywords: "fan fanlar dars",
        link: "subjects.html"
    },

    {
        name: "Dasturlash",
        keywords: "dasturlash html css javascript programming",
        link: "tests.html?subject=programming"
    },

    {
        name: "Telekommunikatsiya",
        keywords: "telekommunikatsiya tarmoq telecom",
        link: "tests.html?subject=telecom"
    },

    {
        name: "Axborot xavfsizligi",
        keywords: "axborot xavfsizligi security",
        link: "tests.html?subject=security"
    },

    {
        name: "Testlar",
        keywords: "test testlar savol quiz",
        link: "tests.html"
    },

    {
        name: "Dars jadvali",
        keywords: "jadval dars jadvali vaqt",
        link: "schedule.html"
    },

    {
        name: "Materiallar",
        keywords: "material materiallar pdf kitob darslik",
        link: "materials.html"
    }

];


function searchSite() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    searchResults.innerHTML = "";


    if (searchText === "") {

        searchResults.textContent =
            "Qidirish uchun so‘z kiriting.";

        return;
    }


    const results =
        pages.filter(function (page) {

            return (
                page.name
                    .toLowerCase()
                    .includes(searchText) ||

                page.keywords
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    if (results.length === 0) {

        searchResults.textContent =
            "Hech narsa topilmadi.";

        return;
    }


    results.forEach(function (page) {

        const link =
            document.createElement("a");

        link.href =
            page.link;

        link.textContent =
            "➡ " + page.name;

        link.className =
            "search-result-link";

        searchResults.appendChild(link);

    });

}


// QIDIRISH TUGMASI

searchButton.addEventListener(
    "click",
    searchSite
);


// ENTER BILAN HAM QIDIRISH

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchSite();

        }

    }
);