// ==========================================
// STUDENT HUB - SECURE TEST SYSTEM
// Server-side grading + Result + Review
// ==========================================

const API_URL = "https://studenthub-7f7e.onrender.com";


// ==========================================
// URL DAN FAN NOMINI OLISH
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const subject =
    params.get("subject");


// ==========================================
// FANLAR
// ==========================================

const subjectNames = {
    programming: "Dasturlash",
    telecom: "Telekommunikatsiya",
    security: "Axborot xavfsizligi"
};


// ==========================================
// HTML ELEMENTLARI
// ==========================================

const subjectSelection =
    document.getElementById(
        "subjectSelection"
    );

const quizSection =
    document.querySelector(
        ".quiz"
    );

const quizTitle =
    document.querySelector(
        ".quiz-header h2"
    );

const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const questionScore =
    document.getElementById(
        "questionScore"
    );

const progressBar =
    document.getElementById(
        "progressBar"
    );

const questionElement =
    document.getElementById(
        "question"
    );

const answersElement =
    document.getElementById(
        "answers"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );

const restartButton =
    document.getElementById(
        "restartButton"
    );

const resultElement =
    document.getElementById(
        "result"
    );

const reviewSection =
    document.getElementById(
        "reviewSection"
    );

const reviewList =
    document.getElementById(
        "reviewList"
    );


// ==========================================
// TEST HOLATI
// ==========================================

let questions = [];
let currentQuestion = 0;
let selectedAnswer = null;
let testFinished = false;
let userAnswers = [];


// ==========================================
// TOKEN
// ==========================================

function getToken() {

    return (
        localStorage.getItem("token") ||
        localStorage.getItem("studentHubToken") ||
        ""
    );
}


// ==========================================
// SAVOLLARNI SERVERDAN OLISH
// ==========================================

async function loadQuestions() {

    if (!subjectNames[subject]) {

        quizSection.style.display =
            "none";

        subjectSelection.style.display =
            "block";

        return;
    }

    subjectSelection.style.display =
        "none";

    quizSection.style.display =
        "block";

    quizTitle.textContent =
        subjectNames[subject] +
        " testi";

    questionNumber.textContent =
        "Savollar yuklanmoqda...";

    questionScore.textContent =
        "";

    questionElement.textContent =
        "Test savollari yuklanmoqda...";

    answersElement.innerHTML =
        "";

    resultElement.innerHTML =
        "";

    reviewSection.style.display =
        "none";

    nextButton.style.display =
        "none";

    restartButton.style.display =
        "none";

    try {

        const response =
            await fetch(
                API_URL +
                "/api/questions?subject=" +
                encodeURIComponent(
                    subjectNames[subject]
                )
            );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Savollarni olib bo‘lmadi."
            );
        }

        questions =
            data.questions.map(
                function (item) {

                    return {
                        id: item.id,

                        question:
                            item.question,

                        answers: [
                            item.option_a,
                            item.option_b,
                            item.option_c,
                            item.option_d
                        ]
                    };
                }
            );

        if (questions.length === 0) {

            questionNumber.textContent =
                "";

            questionScore.textContent =
                "";

            progressBar.style.width =
                "0%";

            questionElement.textContent =
                "Bu fan uchun test savollari mavjud emas.";

            resultElement.textContent =
                "Admin panel orqali ushbu fan uchun savol qo‘shing.";

            return;
        }

        startTest();

    } catch (error) {

        console.error(
            "Savollarni yuklash xatosi:",
            error
        );

        questionNumber.textContent =
            "";

        questionScore.textContent =
            "";

        progressBar.style.width =
            "0%";

        questionElement.textContent =
            "Server bilan bog‘lanib bo‘lmadi.";

        answersElement.innerHTML =
            "";

        resultElement.style.color =
            "#dc2626";

        resultElement.textContent =
            "Test savollarini yuklab bo‘lmadi.";

        nextButton.style.display =
            "none";
    }
}


// ==========================================
// TESTNI BOSHLASH
// ==========================================

function startTest() {

    if (questions.length === 0) {
        return;
    }

    currentQuestion = 0;
    selectedAnswer = null;
    testFinished = false;
    userAnswers = [];

    quizSection.style.display =
        "block";

    reviewSection.style.display =
        "none";

    reviewList.innerHTML =
        "";

    quizTitle.textContent =
        subjectNames[subject] +
        " testi";

    nextButton.style.display =
        "inline-block";

    nextButton.disabled =
        false;

    restartButton.style.display =
        "none";

    resultElement.innerHTML =
        "";

    resultElement.style.color =
        "";

    showQuestion();

    window.scrollTo({
        top:
            quizSection.offsetTop - 90,
        behavior:
            "smooth"
    });
}


// ==========================================
// SAVOLNI KO'RSATISH
// ==========================================

function showQuestion() {

    const current =
        questions[currentQuestion];

    selectedAnswer = null;

    questionNumber.textContent =
        "Savol " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    // Test tugamaguncha ballni bilmaymiz
    questionScore.textContent =
        "Javoblar: " +
        userAnswers.length +
        " / " +
        questions.length;

    const progress =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;

    progressBar.style.width =
        progress + "%";

    questionElement.textContent =
        current.question;

    answersElement.innerHTML =
        "";

    resultElement.innerHTML =
        "";

    resultElement.style.color =
        "";

    const letters =
        ["A", "B", "C", "D"];

    current.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "answer-button";

            button.textContent =
                letters[index] +
                ". " +
                answer;

            button.addEventListener(
                "click",
                function () {

                    selectAnswer(
                        index,
                        button
                    );
                }
            );

            answersElement.appendChild(
                button
            );
        }
    );

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Testni tugatish ✓";

    } else {

        nextButton.textContent =
            "Keyingi savol →";
    }
}


// ==========================================
// JAVOB TANLASH
// ==========================================

function selectAnswer(
    index,
    selectedButton
) {

    if (testFinished) {
        return;
    }

    selectedAnswer = index;

    const buttons =
        answersElement.querySelectorAll(
            ".answer-button"
        );

    buttons.forEach(
        function (button) {

            button.classList.remove(
                "selected-answer"
            );
        }
    );

    selectedButton.classList.add(
        "selected-answer"
    );

    resultElement.innerHTML =
        "";
}


// ==========================================
// KEYINGI SAVOL
// ==========================================

nextButton.addEventListener(
    "click",

    async function () {

        if (testFinished) {
            return;
        }

        if (selectedAnswer === null) {

            resultElement.style.color =
                "#dc2626";

            resultElement.textContent =
                "⚠️ Avval javobni tanlang.";

            return;
        }

        const current =
            questions[currentQuestion];

        userAnswers.push({
            questionId:
                current.id,

            selected:
                selectedAnswer
        });

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

            return;
        }

        await finishTest();
    }
);


// ==========================================
// TESTNI SERVERDA TEKSHIRISH
// ==========================================

async function submitTestToServer() {

    const response =
        await fetch(
            API_URL +
            "/api/tests/submit",
            {
                method:
                    "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({
                        subject:
                            subjectNames[subject],

                        answers:
                            userAnswers
                    })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Testni tekshirib bo‘lmadi."
        );
    }

    return data;
}


// ==========================================
// TESTNI TUGATISH
// ==========================================

async function finishTest() {

    testFinished = true;

    nextButton.disabled =
        true;

    nextButton.style.display =
        "none";

    questionNumber.textContent =
        "Test tekshirilmoqda...";

    questionScore.textContent =
        "";

    questionElement.textContent =
        "⏳ Natija serverda hisoblanmoqda...";

    answersElement.innerHTML =
        "";

    resultElement.innerHTML =
        "";

    try {

        const grading =
            await submitTestToServer();

        const score =
            Number(grading.score);

        const total =
            Number(grading.total);

        const percentage =
            total > 0
                ? Math.round(
                    (score / total) * 100
                )
                : 0;

        // To'g'ri javoblar FAQAT endi browserga keldi
        userAnswers =
            Array.isArray(grading.review)
                ? grading.review
                : [];

        let resultIcon =
            "📘";

        let resultTitle =
            "Test yakunlandi";

        if (percentage >= 90) {

            resultIcon = "🏆";
            resultTitle =
                "Ajoyib natija!";

        } else if (percentage >= 70) {

            resultIcon = "🎯";
            resultTitle =
                "Yaxshi natija!";

        } else if (percentage >= 50) {

            resultIcon = "👍";
            resultTitle =
                "Yaxshi harakat!";

        } else {

            resultIcon = "📚";
            resultTitle =
                "Yana mashq qilish kerak";
        }

        questionNumber.textContent =
            "Test tugadi";

        questionScore.textContent =
            score +
            " / " +
            total;

        progressBar.style.width =
            "100%";

        questionElement.textContent =
            "";

        resultElement.style.color =
            "";

        resultElement.innerHTML =
            `
            <div class="final-result-card">

                <div class="result-icon">
                    ${resultIcon}
                </div>

                <h2>
                    ${resultTitle}
                </h2>

                <p>
                    ${subjectNames[subject]}
                </p>

                <div class="final-percentage">
                    ${percentage}%
                </div>

                <div class="final-score">
                    ${score} / ${total}
                    ta to‘g‘ri javob
                </div>

                <p id="saveStatus">
                    ⏳ Natija saqlanmoqda...
                </p>

            </div>
            `;

        // Review faqat server tekshirganidan keyin
        showReview();

        const saveStatus =
            document.getElementById(
                "saveStatus"
            );

        const saveResult =
            await saveUserTestResult(
                subjectNames[subject],
                score,
                total
            );

        if (saveResult.loginRequired) {

            saveStatus.textContent =
                "⚠️ Natijani saqlash uchun login qiling.";

            saveStatus.style.color =
                "#dc2626";

            restartButton.style.display =
                "inline-block";

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";
                },
                2200
            );

            return;
        }

        if (!saveResult.success) {

            saveStatus.textContent =
                "❌ Natijani databasega saqlab bo‘lmadi.";

            saveStatus.style.color =
                "#dc2626";

        } else {

            saveStatus.textContent =
                "✅ Natija Dashboard'ga saqlandi.";

            saveStatus.style.color =
                "#16a34a";
        }

    } catch (error) {

        console.error(
            "Testni tugatish xatosi:",
            error
        );

        questionNumber.textContent =
            "Xatolik";

        questionElement.textContent =
            "Test natijasini tekshirib bo‘lmadi.";

        resultElement.style.color =
            "#dc2626";

        resultElement.textContent =
            error.message;

        testFinished = false;

        nextButton.disabled =
            false;

        nextButton.style.display =
            "inline-block";

        nextButton.textContent =
            "Qayta urinish";
    }

    restartButton.style.display =
        "inline-block";

    window.scrollTo({
        top:
            quizSection.offsetTop - 90,

        behavior:
            "smooth"
    });
}


// ==========================================
// NATIJANI DASHBOARDGA SAQLASH
// ==========================================

async function saveUserTestResult(
    subjectName,
    score,
    total
) {

    const token =
        getToken();

    if (!token) {

        return {
            success: false,
            loginRequired: true
        };
    }

    try {

        const response =
            await fetch(
                API_URL +
                "/api/results",
                {
                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token
                    },

                    body:
                        JSON.stringify({
                            subject:
                                subjectName,
                            score:
                                score,
                            total:
                                total
                        })
                }
            );

        const data =
            await response.json();

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            return {
                success: false,
                loginRequired: true
            };
        }

        return {
            success:
                response.ok &&
                data.success === true,

            loginRequired:
                false,

            data:
                data
        };

    } catch (error) {

        console.error(
            "Result save error:",
            error
        );

        return {
            success: false,
            loginRequired: false
        };
    }
}


// ==========================================
// JAVOBLAR TAHLILI
// ==========================================

function showReview() {

    reviewList.innerHTML =
        "";

    const letters =
        ["A", "B", "C", "D"];

    userAnswers.forEach(
        function (item, index) {

            const reviewItem =
                document.createElement(
                    "article"
                );

            reviewItem.className =
                "review-item " +
                (
                    item.isCorrect
                        ? "correct"
                        : "wrong"
                );

            const selectedLetter =
                letters[item.selected];

            const correctLetter =
                letters[item.correct];

            const selectedText =
                item.answers[item.selected];

            const correctText =
                item.answers[item.correct];

            reviewItem.innerHTML =
                `
                <h4>
                    ${
                        item.isCorrect
                            ? "✅"
                            : "❌"
                    }

                    ${index + 1}.
                    ${escapeHtml(
                        item.question
                    )}
                </h4>

                <p>
                    <strong>
                        Sizning javobingiz:
                    </strong>

                    ${selectedLetter}.
                    ${escapeHtml(
                        selectedText
                    )}
                </p>

                ${
                    !item.isCorrect
                        ?
                        `
                        <p>
                            <strong>
                                To‘g‘ri javob:
                            </strong>

                            ${correctLetter}.
                            ${escapeHtml(
                                correctText
                            )}
                        </p>
                        `
                        :
                        `
                        <p>
                            <strong>
                                To‘g‘ri javob ✓
                            </strong>
                        </p>
                        `
                }
                `;

            reviewList.appendChild(
                reviewItem
            );
        }
    );

    reviewSection.style.display =
        "block";
}


// ==========================================
// HTML XAVFSIZLIGI
// ==========================================

function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value ?? "");

    return div.innerHTML;
}


// ==========================================
// QAYTA BOSHLASH
// ==========================================

restartButton.addEventListener(
    "click",
    function () {

        startTest();
    }
);


// ==========================================
// SAHIFANI ISHGA TUSHIRISH
// ==========================================

loadQuestions();