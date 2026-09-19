// ==================================================
// STUDENT HUB - DASHBOARD
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

    loadDashboard();

});


// ==================================================
// DASHBOARDNI YUKLASH
// ==================================================

async function loadDashboard() {

    const token =
        localStorage.getItem("studentHubToken");

    const savedUser =
        localStorage.getItem("studentHubUser");


    if (!token || !savedUser) {

        window.location.href =
            "login.html";

        return;
    }


    try {

        const user =
            JSON.parse(savedUser);


        // Foydalanuvchi ismi
        const dashboardUserName =
            document.getElementById(
                "dashboardUserName"
            );


        if (dashboardUserName) {

            dashboardUserName.textContent =
                user.name;
        }


        // Natijalarni backenddan olamiz
        const response =
            await fetch(
                "http://localhost:3000/api/results",
                {
                    method: "GET",

                    headers: {

                        Authorization:
                            "Bearer " + token
                    }
                }
            );


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem(
                "studentHubToken"
            );

            localStorage.removeItem(
                "studentHubUser"
            );

            localStorage.removeItem(
                "studentHubLoggedIn"
            );


            window.location.href =
                "login.html";

            return;
        }


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Natijalarni yuklab bo‘lmadi."
            );
        }


        const results =
            Array.isArray(data)
                ? data
                : data.results || [];


        showStatistics(results);

        showNormalTests(results);

        showSelfStudyTests(results);

    }

    catch (error) {

        console.error(
            "Dashboard xatosi:",
            error
        );


        const message =
            document.getElementById(
                "dashboardMessage"
            );


        if (message) {

            message.textContent =
                "❌ Dashboard ma’lumotlarini yuklab bo‘lmadi.";
        }
    }
}


// ==================================================
// STATISTIKA
// ==================================================

function showStatistics(results) {

    const totalTests =
        results.length;


    let totalPercentage = 0;

    let bestPercentage = 0;


    results.forEach(
        function (result) {

            const percentage =
                calculatePercentage(
                    result.score,
                    result.total
                );


            totalPercentage +=
                percentage;


            if (
                percentage >
                bestPercentage
            ) {

                bestPercentage =
                    percentage;
            }
        }
    );


    let averagePercentage = 0;


    if (totalTests > 0) {

        averagePercentage =
            Math.round(
                totalPercentage /
                totalTests
            );
    }


    setText(
        "totalTests",
        totalTests
    );


    setText(
        "averageScore",
        averagePercentage + "%"
    );


    setText(
        "bestScore",
        bestPercentage + "%"
    );


    // Mustaqil testlar soni

    const selfStudyCount =
        results.filter(
            function (result) {

                return isSelfStudy(
                    result.subject
                );
            }
        ).length;


    setText(
        "selfStudyCount",
        selfStudyCount
    );
}


// ==================================================
// ODDIY FAN TESTLARI
// ==================================================

function showNormalTests(results) {

    const container =
        document.getElementById(
            "normalTestResults"
        );


    if (!container) {

        return;
    }


    const normalTests =
        results.filter(
            function (result) {

                return !isSelfStudy(
                    result.subject
                );
            }
        );


    if (
        normalTests.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-dashboard">

                <div class="empty-icon">
                    📝
                </div>

                <h3>
                    Hozircha fan testlari yo‘q
                </h3>

                <p>
                    Testlar bo‘limidan biror test ishlab ko‘ring.
                </p>

                <a
                    href="tests.html"
                    class="dashboard-action-button"
                >
                    Test ishlash
                </a>

            </div>

        `;

        return;
    }


    container.innerHTML =
        "";


    normalTests.forEach(
        function (result) {

            container.appendChild(
                createResultCard(
                    result,
                    false
                )
            );
        }
    );
}


// ==================================================
// MUSTAQIL TAYYORGARLIK NATIJALARI
// ==================================================

function showSelfStudyTests(results) {

    const container =
        document.getElementById(
            "selfStudyResults"
        );


    if (!container) {

        return;
    }


    const selfStudyTests =
        results.filter(
            function (result) {

                return isSelfStudy(
                    result.subject
                );
            }
        );


    if (
        selfStudyTests.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-dashboard">

                <div class="empty-icon">
                    📚
                </div>

                <h3>
                    Mustaqil testlar yo‘q
                </h3>

                <p>
                    TXT yoki DOCX test yuklab mashq qilishingiz mumkin.
                </p>

                <a
                    href="self-study.html"
                    class="dashboard-action-button"
                >
                    Mustaqil tayyorgarlik
                </a>

            </div>

        `;

        return;
    }


    container.innerHTML =
        "";


    selfStudyTests.forEach(
        function (result) {

            container.appendChild(
                createResultCard(
                    result,
                    true
                )
            );
        }
    );
}


// ==================================================
// NATIJA CARD
// ==================================================

function createResultCard(
    result,
    selfStudy
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "dashboard-result-card";


    const percentage =
        calculatePercentage(
            result.score,
            result.total
        );


    const date =
        formatDate(
            result.created_at
        );


    let subject =
        result.subject ||
        "Test";


    if (selfStudy) {

        subject =
            subject.replace(
                /^Mustaqil tayyorgarlik\s*-\s*/i,
                ""
            );
    }


    const icon =
        selfStudy
            ? "📚"
            : getSubjectIcon(
                result.subject
            );


    card.innerHTML = `

        <div class="result-card-left">

            <div class="result-card-icon">
                ${icon}
            </div>

            <div class="result-card-info">

                <h3>
                    ${escapeHtml(subject)}
                </h3>

                <p>
                    ${selfStudy
                        ? "Mustaqil tayyorgarlik"
                        : "Fan testi"}
                </p>

                <small>
                    🕒 ${escapeHtml(date)}
                </small>

            </div>

        </div>


        <div class="result-card-score">

            <strong>
                ${percentage}%
            </strong>

            <span>
                ${result.score} / ${result.total}
            </span>

        </div>

    `;


    return card;
}


// ==================================================
// MUSTAQIL TESTMI?
// ==================================================

function isSelfStudy(subject) {

    return String(
        subject || ""
    )
    .toLowerCase()
    .startsWith(
        "mustaqil tayyorgarlik"
    );
}


// ==================================================
// FAN ICON
// ==================================================

function getSubjectIcon(subject) {

    const value =
        String(
            subject || ""
        )
        .toLowerCase();


    if (
        value.includes(
            "dasturlash"
        )
    ) {

        return "💻";
    }


    if (
        value.includes(
            "telekommunikatsiya"
        )
    ) {

        return "📡";
    }


    if (
        value.includes(
            "xavfsizlik"
        )
    ) {

        return "🔐";
    }


    return "📝";
}


// ==================================================
// FOIZ HISOBLASH
// ==================================================

function calculatePercentage(
    score,
    total
) {

    const scoreNumber =
        Number(score);

    const totalNumber =
        Number(total);


    if (
        !totalNumber ||
        totalNumber <= 0
    ) {

        return 0;
    }


    return Math.round(
        (
            scoreNumber /
            totalNumber
        ) * 100
    );
}


// ==================================================
// SANA
// ==================================================

function formatDate(dateValue) {

    if (!dateValue) {

        return "Sana mavjud emas";
    }


    // SQLite:
    // 2026-09-18 12:30:00
    // formatini browser uchun moslashtiramiz

    let safeDate =
        String(dateValue);


    if (
        safeDate.includes(" ") &&
        !safeDate.includes("T")
    ) {

        safeDate =
            safeDate.replace(
                " ",
                "T"
            ) + "Z";
    }


    const date =
        new Date(safeDate);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            dateValue
        );
    }


    return date.toLocaleString(
        "uz-UZ",
        {
            year:
                "numeric",

            month:
                "2-digit",

            day:
                "2-digit",

            hour:
                "2-digit",

            minute:
                "2-digit"
        }
    );
}


// ==================================================
// TEXT QO'YISH
// ==================================================

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;
    }
}


// ==================================================
// HTML XAVFSIZLIGI
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


// ==================================================
// TAYYOR
// ==================================================

console.log(
    "Student Hub Professional Dashboard tayyor ✅"
);