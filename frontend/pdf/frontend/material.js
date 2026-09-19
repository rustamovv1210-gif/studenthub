const API_URL = "http://localhost:3000/api/materials";

document.addEventListener("DOMContentLoaded", function () {
    loadMaterial();
});


async function loadMaterial() {

    const statusBox =
        document.getElementById("lessonStatus");

    const lessonArea =
        document.getElementById("lessonArea");

    const lessonSubject =
        document.getElementById("lessonSubject");

    const lessonTitle =
        document.getElementById("lessonTitle");

    const lessonDescription =
        document.getElementById("lessonDescription");

    const lessonContent =
        document.getElementById("lessonContent");

    const backButton =
        document.getElementById("backToMaterials");

    const bottomButton =
        document.getElementById("bottomMaterialsButton");


    try {

        /* ============================== */
        /* URL DAN MATERIAL ID OLISH */
        /* ============================== */

        const params =
            new URLSearchParams(
                window.location.search
            );

        const materialId =
            params.get("id");


        if (!materialId) {

            showError(
                "Material ID topilmadi.",
                "Materiallar sahifasiga qaytib, darsni qaytadan oching."
            );

            return;
        }


        /* ============================== */
        /* BACKEND DAN MATERIAL OLISH */
        /* ============================== */

        const response =
            await fetch(
                `${API_URL}/${materialId}`
            );


        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "Material topilmadi."
                );

            }

            throw new Error(
                "Server materialni yuklay olmadi."
            );
        }


        const data =
            await response.json();


        /* ============================== */
        /* MUHIM TUZATISH */
        /* API: { success, material } */
        /* ============================== */

        const material =
            data.material;


        if (!material) {

            throw new Error(
                "Material ma'lumotlari topilmadi."
            );

        }


        /* ============================== */
        /* FAN */
        /* ============================== */

        const subject =
            material.subject ||
            "Boshqa";


        lessonSubject.textContent =
            "📚 " + subject;


        /* ============================== */
        /* SARLAVHA */
        /* ============================== */

        const title =
            material.title ||
            "Student Hub darsi";


        lessonTitle.textContent =
            title;


        document.title =
            `${title} | Student Hub`;


        /* ============================== */
        /* TAVSIF */
        /* ============================== */

        lessonDescription.textContent =
            material.description ||
            "Student Hub o‘quv materiali.";


        /* ============================== */
        /* DARS MATNI */
        /* ============================== */

        if (
            material.content &&
            material.content.trim() !== ""
        ) {

            lessonContent.innerHTML =
                formatLessonContent(
                    material.content
                );

        } else {

            lessonContent.innerHTML = `
                <div class="no-content-box">

                    <h2>
                        📄 Fayl materiali
                    </h2>

                    <p>
                        Bu material ichki dars
                        ko‘rinishida emas.
                    </p>

                    <p>
                        Materiallar sahifasiga qaytib,
                        faylni ochishingiz yoki
                        yuklab olishingiz mumkin.
                    </p>

                </div>
            `;

        }


        /* ============================== */
        /* ORQAGA QAYTISH */
        /* ============================== */

        const encodedSubject =
            encodeURIComponent(subject);


        if (backButton) {

            backButton.href =
                `materials.html?subject=${encodedSubject}`;

        }


        if (bottomButton) {

            bottomButton.href =
                `materials.html?subject=${encodedSubject}`;

        }


        /* ============================== */
        /* LOADINGNI YOPISH */
        /* ============================== */

        statusBox.style.display =
            "none";


        lessonArea.style.display =
            "block";


    } catch (error) {

        console.error(
            "Material yuklash xatosi:",
            error
        );


        showError(
            "Darsni yuklab bo‘lmadi.",
            error.message
        );

    }

}


/* ====================================== */
/* DARS MATNINI HTMLGA AYLANTIRISH */
/* ====================================== */

function formatLessonContent(content) {

    const lines =
        String(content)
            .replace(/\r/g, "")
            .split("\n");


    let html = "";

    let inCodeBlock = false;

    let codeLines = [];


    for (
        let i = 0;
        i < lines.length;
        i++
    ) {

        const originalLine =
            lines[i];

        const line =
            originalLine.trim();


        /* ============================== */
        /* CODE BLOCK */
        /* ============================== */

        if (line.startsWith("```")) {

            if (!inCodeBlock) {

                inCodeBlock = true;

                codeLines = [];

            } else {

                html += `
                    <pre><code>${escapeHTML(
                        codeLines.join("\n")
                    )}</code></pre>
                `;


                inCodeBlock = false;

                codeLines = [];

            }

            continue;

        }


        if (inCodeBlock) {

            codeLines.push(
                originalLine
            );

            continue;

        }


        /* ============================== */
        /* BO‘SH QATOR */
        /* ============================== */

        if (line === "") {

            continue;

        }


        /* ============================== */
        /* H3 */
        /* ============================== */

        if (line.startsWith("### ")) {

            html += `
                <h3>
                    ${formatInlineText(
                        line.substring(4)
                    )}
                </h3>
            `;

            continue;

        }


        /* ============================== */
        /* H2 */
        /* ============================== */

        if (line.startsWith("## ")) {

            html += `
                <h2>
                    ${formatInlineText(
                        line.substring(3)
                    )}
                </h2>
            `;

            continue;

        }


        /* ============================== */
        /* H1 */
        /* ============================== */

        if (line.startsWith("# ")) {

            html += `
                <h1>
                    ${formatInlineText(
                        line.substring(2)
                    )}
                </h1>
            `;

            continue;

        }


        /* ============================== */
        /* BULLET */
        /* ============================== */

        if (
            line.startsWith("- ") ||
            line.startsWith("• ")
        ) {

            html += `
                <p>
                    • ${formatInlineText(
                        line.substring(2)
                    )}
                </p>
            `;

            continue;

        }


        /* ============================== */
        /* RAQAMLI BAND */
        /* ============================== */

        if (/^\d+\.\s/.test(line)) {

            html += `
                <p>
                    <strong>
                        ${formatInlineText(line)}
                    </strong>
                </p>
            `;

            continue;

        }


        /* ============================== */
        /* ODDIY MATN */
        /* ============================== */

        html += `
            <p>
                ${formatInlineText(line)}
            </p>
        `;

    }


    /* YOPILMAGAN CODE BLOCK */

    if (
        inCodeBlock &&
        codeLines.length > 0
    ) {

        html += `
            <pre><code>${escapeHTML(
                codeLines.join("\n")
            )}</code></pre>
        `;

    }


    return html;

}


/* ====================================== */
/* INLINE FORMAT */
/* ====================================== */

function formatInlineText(text) {

    let safeText =
        escapeHTML(text);


    /* **QALIN MATN** */

    safeText =
        safeText.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    /* `CODE` */

    safeText =
        safeText.replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        );


    return safeText;

}


/* ====================================== */
/* HTML XAVFSIZLIGI */
/* ====================================== */

function escapeHTML(text) {

    return String(text)

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


/* ====================================== */
/* ERROR */
 /* ====================================== */

function showError(
    title,
    message
) {

    const statusBox =
        document.getElementById(
            "lessonStatus"
        );


    const lessonArea =
        document.getElementById(
            "lessonArea"
        );


    if (lessonArea) {

        lessonArea.style.display =
            "none";

    }


    if (!statusBox) {

        return;

    }


    statusBox.style.display =
        "block";


    statusBox.innerHTML = `
        <div class="status-icon">
            ❌
        </div>

        <h2>
            ${escapeHTML(title)}
        </h2>

        <p>
            ${escapeHTML(message)}
        </p>
    `;

}