// ==================================================
// STUDENT HUB
// MATERIALS 3.0
// ICHKI DARSLAR + FAYL MATERIALLARI
// ==================================================

const MATERIALS_API =
    "https://studenthub-7f7e.onrender.com/api/materials";

const MATERIALS_SERVER =
    "https://studenthub-7f7e.onrender.com";

let allMaterials = [];


// ==================================================
// HTML ELEMENTLAR
// ==================================================

const materialsList =
    document.getElementById("materialsList");

const materialSearch =
    document.getElementById("materialSearch");

const subjectFilter =
    document.getElementById("subjectFilter");

const fileTypeFilter =
    document.getElementById("fileTypeFilter");

const materialsMessage =
    document.getElementById("materialsMessage");

const materialsCount =
    document.getElementById("materialsCount");

const activeFilterInfo =
    document.getElementById("activeFilterInfo");

const activeFilterText =
    document.getElementById("activeFilterText");

const clearFilterButton =
    document.getElementById("clearFilterButton");


// ==================================================
// PAGE START
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        applySubjectFromUrl();

        await loadMaterials();

    }
);


// ==================================================
// URL DAN FAN FILTERINI OLISH
// ==================================================

function applySubjectFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const subject =
        params.get("subject");


    if (
        !subject ||
        !subjectFilter
    ) {
        return;
    }


    const optionExists =
        Array.from(
            subjectFilter.options
        ).some(
            function (option) {

                return (
                    option.value === subject
                );

            }
        );


    if (optionExists) {

        subjectFilter.value =
            subject;

        showActiveSubjectFilter(
            subject
        );

    }

}


// ==================================================
// ACTIVE FILTER
// ==================================================

function showActiveSubjectFilter(subject) {

    if (
        !activeFilterInfo ||
        !activeFilterText
    ) {
        return;
    }


    activeFilterInfo.style.display =
        "flex";


    activeFilterText.textContent =
        "📚 Tanlangan fan: " +
        subject;

}


// ==================================================
// FILTERLARNI TOZALASH
// ==================================================

if (clearFilterButton) {

    clearFilterButton.addEventListener(
        "click",
        function () {

            if (subjectFilter) {

                subjectFilter.value =
                    "all";

            }


            if (materialSearch) {

                materialSearch.value =
                    "";

            }


            if (fileTypeFilter) {

                fileTypeFilter.value =
                    "all";

            }


            if (activeFilterInfo) {

                activeFilterInfo.style.display =
                    "none";

            }


            const cleanUrl =
                window.location.pathname;


            window.history.replaceState(
                {},
                "",
                cleanUrl
            );


            filterMaterials();

        }
    );

}


// ==================================================
// SERVERDAN MATERIALLARNI OLISH
// ==================================================

async function loadMaterials() {

    try {

        showLoading();


        const response =
            await fetch(
                MATERIALS_API
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Materiallarni yuklab bo‘lmadi."
            );

        }


        allMaterials =
            Array.isArray(data.materials)
                ? data.materials
                : [];


        filterMaterials();


        if (materialsMessage) {

            materialsMessage.textContent =
                "";

        }

    }

    catch (error) {

        console.error(
            "Materiallarni yuklash xatosi:",
            error
        );


        if (materialsMessage) {

            materialsMessage.textContent =
                "❌ Server bilan bog‘lanib bo‘lmadi.";

            materialsMessage.style.color =
                "#dc2626";

        }


        if (materialsList) {

            materialsList.innerHTML = `
                <div class="materials-empty">

                    <div class="materials-empty-icon">
                        ❌
                    </div>

                    <h3>
                        Materiallarni yuklab bo‘lmadi
                    </h3>

                    <p>
                        Student Hub serveri
                        ishlayotganini tekshiring.
                    </p>

                </div>
            `;

        }

    }

}


// ==================================================
// LOADING
// ==================================================

function showLoading() {

    if (!materialsList) {
        return;
    }


    materialsList.innerHTML = `
        <div class="materials-empty">

            <div class="materials-empty-icon">
                ⏳
            </div>

            <h3>
                Materiallar yuklanmoqda...
            </h3>

        </div>
    `;

}


// ==================================================
// SEARCH
// ==================================================

if (materialSearch) {

    materialSearch.addEventListener(
        "input",
        filterMaterials
    );

}


// ==================================================
// SUBJECT FILTER
// ==================================================

if (subjectFilter) {

    subjectFilter.addEventListener(
        "change",
        function () {

            updateUrlSubject();

            filterMaterials();

        }
    );

}


// ==================================================
// FILE TYPE FILTER
// ==================================================

if (fileTypeFilter) {

    fileTypeFilter.addEventListener(
        "change",
        filterMaterials
    );

}


// ==================================================
// URLNI YANGILASH
// ==================================================

function updateUrlSubject() {

    if (!subjectFilter) {
        return;
    }


    const selected =
        subjectFilter.value;


    const url =
        new URL(
            window.location.href
        );


    if (selected === "all") {

        url.searchParams.delete(
            "subject"
        );


        if (activeFilterInfo) {

            activeFilterInfo.style.display =
                "none";

        }

    }

    else {

        url.searchParams.set(
            "subject",
            selected
        );


        showActiveSubjectFilter(
            selected
        );

    }


    window.history.replaceState(
        {},
        "",
        url
    );

}


// ==================================================
// FILTER
// ==================================================

function filterMaterials() {

    const searchValue =
        materialSearch
            ? materialSearch.value
                .trim()
                .toLowerCase()
            : "";


    const selectedSubject =
        subjectFilter
            ? subjectFilter.value
            : "all";


    const selectedFileType =
        fileTypeFilter
            ? fileTypeFilter.value
            : "all";


    const filtered =
        allMaterials.filter(
            function (material) {

                const title =
                    String(
                        material.title || ""
                    ).toLowerCase();


                const subject =
                    String(
                        material.subject || ""
                    );


                const description =
                    String(
                        material.description || ""
                    ).toLowerCase();


                const fileName =
                    String(
                        material.file_name || ""
                    ).toLowerCase();


                const fileType =
                    String(
                        material.file_type || ""
                    ).toLowerCase();


                const content =
                    String(
                        material.content || ""
                    ).toLowerCase();


                const matchesSearch =
                    title.includes(searchValue) ||
                    description.includes(searchValue) ||
                    fileName.includes(searchValue) ||
                    subject
                        .toLowerCase()
                        .includes(searchValue) ||
                    content.includes(searchValue);


                const matchesSubject =
                    selectedSubject === "all" ||
                    subject === selectedSubject;


                let matchesFileType =
                    true;


                if (
                    selectedFileType !== "all"
                ) {

                    matchesFileType =
                        fileType ===
                        selectedFileType;

                }


                return (
                    matchesSearch &&
                    matchesSubject &&
                    matchesFileType
                );

            }
        );


    renderMaterials(
        filtered
    );

}


// ==================================================
// COUNT
// ==================================================

function updateMaterialsCount(count) {

    if (!materialsCount) {
        return;
    }


    materialsCount.textContent =
        count +
        " ta material";

}


// ==================================================
// MATERIALLARNI CHIQARISH
// ==================================================

function renderMaterials(materials) {

    if (!materialsList) {
        return;
    }


    updateMaterialsCount(
        materials.length
    );


    materialsList.innerHTML =
        "";


    if (materials.length === 0) {

        materialsList.innerHTML = `
            <div class="materials-empty">

                <div class="materials-empty-icon">
                    📭
                </div>

                <h3>
                    Material topilmadi
                </h3>

                <p>
                    Tanlangan fan yoki
                    filter bo‘yicha hozircha
                    material mavjud emas.
                </p>

            </div>
        `;

        return;
    }


    materials.forEach(
        function (material) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "student-material-card";


            const isInternal =
                checkInternalMaterial(
                    material
                );


            const icon =
                isInternal
                    ? "📖"
                    : getFileIcon(
                        material.file_type
                    );


            const typeLabel =
                isInternal
                    ? "DARS"
                    : getFileTypeLabel(
                        material.file_type
                    );


            const description =
                material.description
                    ? material.description
                    : "Ushbu material fan bo‘yicha o‘quv resursidir.";


            // ==========================================
            // ICHKI DARS
            // ==========================================

            if (isInternal) {

                card.innerHTML = `
                    <div class="material-card-top">

                        <div class="material-icon">
                            ${icon}
                        </div>

                        <div class="material-type">
                            ${escapeHtml(typeLabel)}
                        </div>

                    </div>


                    <h3>
                        ${escapeHtml(
                            material.title
                        )}
                    </h3>


                    <div class="material-subject">
                        ${escapeHtml(
                            material.subject
                        )}
                    </div>


                    <p class="material-description">
                        ${escapeHtml(
                            description
                        )}
                    </p>


                    <div class="material-file-name">
                        📖 Student Hub ichki darsi
                    </div>


                    <div class="material-buttons">

                        <a
                            href="material.html?id=${encodeURIComponent(
                                material.id
                            )}"
                            class="material-button open-material"
                            style="width: 100%;"
                        >
                            📖 Darsni o‘qish
                        </a>

                    </div>
                `;

            }


            // ==========================================
            // FAYL MATERIALI
            // ==========================================

            else {

                const fileUrl =
                    buildFileUrl(
                        material.file_path
                    );


                card.innerHTML = `
                    <div class="material-card-top">

                        <div class="material-icon">
                            ${icon}
                        </div>

                        <div class="material-type">
                            ${escapeHtml(typeLabel)}
                        </div>

                    </div>


                    <h3>
                        ${escapeHtml(
                            material.title
                        )}
                    </h3>


                    <div class="material-subject">
                        ${escapeHtml(
                            material.subject
                        )}
                    </div>


                    <p class="material-description">
                        ${escapeHtml(
                            description
                        )}
                    </p>


                    <div class="material-file-name">
                        📎
                        ${escapeHtml(
                            material.file_name ||
                            "Material fayli"
                        )}
                    </div>


                    <div class="material-buttons">

                        <a
                            href="${escapeAttribute(
                                fileUrl
                            )}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="material-button open-material"
                        >
                            👁 Ochish
                        </a>


                        <a
                            href="${escapeAttribute(
                                fileUrl
                            )}"
                            download
                            class="material-button download-material"
                        >
                            ⬇ Yuklash
                        </a>

                    </div>
                `;

            }


            materialsList.appendChild(
                card
            );

        }
    );

}


// ==================================================
// ICHKI DARSNI ANIQLASH
// ==================================================

function checkInternalMaterial(material) {

    const fileType =
        String(
            material.file_type || ""
        ).toLowerCase();


    const filePath =
        String(
            material.file_path || ""
        ).toLowerCase();


    // content mavjud bo'lsa
    // bu Student Hub ichki darsi

    if (
        material.content &&
        String(material.content).trim() !== ""
    ) {

        return true;

    }


    // Seed'dagi texnik qiymatlar

    if (
        fileType === ".internal" ||
        filePath === "internal"
    ) {

        return true;

    }


    return false;

}


// ==================================================
// FILE URL
// ==================================================

function buildFileUrl(filePath) {

    if (!filePath) {
        return "#";
    }


    const path =
        String(filePath);


    // Agar backend allaqachon
    // to'liq URL qaytarsa

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {

        return path;

    }


    // /uploads/file.pdf

    if (path.startsWith("/")) {

        return (
            MATERIALS_SERVER +
            path
        );

    }


    // uploads/file.pdf

    return (
        MATERIALS_SERVER +
        "/" +
        path
    );

}


// ==================================================
// FILE ICON
// ==================================================

function getFileIcon(type) {

    const fileType =
        String(
            type || ""
        ).toLowerCase();


    if (fileType === ".pdf") {
        return "📕";
    }


    if (fileType === ".docx") {
        return "📘";
    }


    if (fileType === ".pptx") {
        return "📊";
    }


    if (fileType === ".txt") {
        return "📄";
    }


    return "📁";

}


// ==================================================
// FILE TYPE LABEL
// ==================================================

function getFileTypeLabel(type) {

    const fileType =
        String(
            type || ""
        )
            .replace(".", "")
            .toUpperCase();


    return (
        fileType ||
        "FILE"
    );

}


// ==================================================
// XAVFSIZ HTML
// ==================================================

function escapeHtml(value) {

    return String(
        value ?? ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHtml(
        value
    );

}


// ==================================================
// READY
// ==================================================

console.log(
    "Student Hub Materials 3.0 tayyor ✅"
);