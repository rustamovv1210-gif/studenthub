// ==================================================
// STUDENT HUB
// ADMIN MATERIALS
// ==================================================

const API_URL =
    "https://studenthub-7f7e.onrender.com/api/materials";

const SERVER_URL =
    "https://studenthub-7f7e.onrender.com";


const materialForm =
    document.getElementById("materialForm");

const materialTitle =
    document.getElementById("materialTitle");

const materialSubject =
    document.getElementById("materialSubject");

const materialDescription =
    document.getElementById("materialDescription");

const materialFile =
    document.getElementById("materialFile");

const materialSubmitButton =
    document.getElementById("materialSubmitButton");

const materialMessage =
    document.getElementById("materialMessage");

const adminMaterialsList =
    document.getElementById("adminMaterialsList");


// ==================================================
// SAHIFA OCHILGANDA
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkAdmin();

        loadMaterials();
    }
);


// ==================================================
// ADMIN TEKSHIRISH
// ==================================================

function checkAdmin() {

    const token =
        localStorage.getItem(
            "studentHubToken"
        );

    const savedUser =
        localStorage.getItem(
            "studentHubUser"
        );


    if (
        !token ||
        !savedUser
    ) {

        window.location.href =
            "login.html";

        return;
    }


    try {

        const user =
            JSON.parse(savedUser);


        if (
            user.role !== "admin"
        ) {

            alert(
                "Bu sahifa faqat admin uchun."
            );

            window.location.href =
                "index.html";
        }

    }

    catch (error) {

        window.location.href =
            "login.html";
    }
}


// ==================================================
// MATERIAL QO'SHISH
// ==================================================

if (materialForm) {

    materialForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const token =
                localStorage.getItem(
                    "studentHubToken"
                );


            const file =
                materialFile.files[0];


            if (!file) {

                showMessage(
                    "❌ Faylni tanlang.",
                    "red"
                );

                return;
            }


            const formData =
                new FormData();


            formData.append(
                "title",
                materialTitle.value.trim()
            );


            formData.append(
                "subject",
                materialSubject.value
            );


            formData.append(
                "description",
                materialDescription.value.trim()
            );


            formData.append(
                "file",
                file
            );


            try {

                materialSubmitButton.disabled =
                    true;


                materialSubmitButton.textContent =
                    "⏳ Yuklanmoqda...";


                showMessage(
                    "Material serverga yuborilmoqda...",
                    ""
                );


                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {

                                Authorization:
                                    "Bearer " +
                                    token
                            },

                            body:
                                formData
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Materialni qo‘shib bo‘lmadi."
                    );
                }


                showMessage(
                    "✅ Material muvaffaqiyatli qo‘shildi.",
                    "green"
                );


                materialForm.reset();


                await loadMaterials();

            }

            catch (error) {

                console.error(
                    "Material upload xatosi:",
                    error
                );


                showMessage(
                    "❌ " + error.message,
                    "red"
                );
            }

            finally {

                materialSubmitButton.disabled =
                    false;


                materialSubmitButton.textContent =
                    "📤 Material qo‘shish";
            }
        }
    );
}


// ==================================================
// MATERIALLARNI OLISH
// ==================================================

async function loadMaterials() {

    if (!adminMaterialsList) {

        return;
    }


    try {

        adminMaterialsList.innerHTML =
            "<p>Materiallar yuklanmoqda...</p>";


        const response =
            await fetch(API_URL);


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Materiallarni olib bo‘lmadi."
            );
        }


        const materials =
            Array.isArray(data.materials)
                ? data.materials
                : [];


        renderMaterials(
            materials
        );

    }

    catch (error) {

        console.error(
            "Materiallar xatosi:",
            error
        );


        adminMaterialsList.innerHTML = `

            <div class="empty-materials">

                <div>❌</div>

                <h3>
                    Materiallarni yuklab bo‘lmadi
                </h3>

                <p>
                    Server ishlayotganini tekshiring.
                </p>

            </div>

        `;
    }
}


// ==================================================
// MATERIALLARNI CHIQARISH
// ==================================================

function renderMaterials(materials) {

    adminMaterialsList.innerHTML =
        "";


    if (
        materials.length === 0
    ) {

        adminMaterialsList.innerHTML = `

            <div class="empty-materials">

                <div>📭</div>

                <h3>
                    Hozircha material yo‘q
                </h3>

                <p>
                    Yuqoridagi forma orqali
                    birinchi materialni yuklang.
                </p>

            </div>

        `;

        return;
    }


    materials.forEach(
        function (material) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "admin-material-card";


            const fileUrl =
                SERVER_URL +
                material.file_path;


            const icon =
                getFileIcon(
                    material.file_type
                );


            card.innerHTML = `

                <div class="admin-material-left">

                    <div class="admin-material-icon">
                        ${icon}
                    </div>


                    <div class="admin-material-info">

                        <h3>
                            ${escapeHtml(material.title)}
                        </h3>

                        <p>
                            📘 ${escapeHtml(material.subject)}
                        </p>

                        ${
                            material.description
                                ? `
                                    <p>
                                        ${escapeHtml(material.description)}
                                    </p>
                                `
                                : ""
                        }

                        <small>
                            📎 ${escapeHtml(material.file_name)}
                        </small>

                    </div>

                </div>


                <div class="material-actions">

                    <a
                        href="${escapeAttribute(fileUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="material-open-button"
                    >
                        Ochish
                    </a>


                    <button
                        type="button"
                        class="material-delete-button"
                        data-id="${material.id}"
                    >
                        O‘chirish
                    </button>

                </div>

            `;


            const deleteButton =
                card.querySelector(
                    ".material-delete-button"
                );


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteMaterial(
                        material.id,
                        material.title
                    );
                }
            );


            adminMaterialsList.appendChild(
                card
            );
        }
    );
}


// ==================================================
// MATERIALNI O'CHIRISH
// ==================================================

async function deleteMaterial(
    id,
    title
) {

    const confirmed =
        confirm(
            `"${title}" materialini o‘chirmoqchimisiz?`
        );


    if (!confirmed) {

        return;
    }


    const token =
        localStorage.getItem(
            "studentHubToken"
        );


    try {

        const response =
            await fetch(
                API_URL + "/" + id,
                {
                    method: "DELETE",

                    headers: {

                        Authorization:
                            "Bearer " +
                            token
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Materialni o‘chirib bo‘lmadi."
            );
        }


        showMessage(
            "✅ Material o‘chirildi.",
            "green"
        );


        await loadMaterials();

    }

    catch (error) {

        console.error(
            "Material delete xatosi:",
            error
        );


        showMessage(
            "❌ " + error.message,
            "red"
        );
    }
}


// ==================================================
// FILE ICON
// ==================================================

function getFileIcon(type) {

    const value =
        String(
            type || ""
        ).toLowerCase();


    if (value === ".pdf") {

        return "📕";
    }


    if (value === ".docx") {

        return "📘";
    }


    if (value === ".pptx") {

        return "📊";
    }


    if (value === ".txt") {

        return "📄";
    }


    return "📁";
}


// ==================================================
// MESSAGE
// ==================================================

function showMessage(
    message,
    color
) {

    if (!materialMessage) {

        return;
    }


    materialMessage.textContent =
        message;


    materialMessage.style.color =
        color || "";
}


// ==================================================
// HTML XAVFSIZLIGI
// ==================================================

function escapeHtml(value) {

    return String(
        value ?? ""
    )
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHtml(value);
}


// ==================================================
// READY
// ==================================================

console.log(
    "Student Hub Admin Materials tayyor ✅"
);