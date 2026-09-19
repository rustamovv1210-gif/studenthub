// ==========================================
// STUDENT HUB - PROFESSIONAL TEST SYSTEM
// SQLite + Result + Review
// ==========================================


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

let score = 0;

let selectedAnswer = null;

let testFinished = false;

// Foydalanuvchining barcha javoblari
let userAnswers = [];


// ==========================================
// SAVOLLARNI DATABASE DAN OLISH
// ==========================================

async function loadQuestions() {

    // Fan tanlanmagan bo'lsa
    if (!subjectNames[subject]) {

        quizSection.style.display =
            "none";

        subjectSelection.style.display =
            "block";

        return;
    }


    // Fan tanlangan
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
                "http://localhost:3000/api/questions"
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Savollarni olib bo‘lmadi."
            );

        }


        // ==================================
        // FAQAT TANLANGAN FAN
        // ==================================

        const databaseQuestions =
            data.questions.filter(
                function (item) {

                    return (
                        item.subject
                            .trim()
                            .toLowerCase()
                        ===
                        subjectNames[subject]
                            .trim()
                            .toLowerCase()
                    );

                }
            );


        // ==================================
        // DATABASE FORMATINI TEST FORMATIGA
        // ==================================

        questions =
            databaseQuestions.map(
                function (item) {

                    const answerLetter =
                        String(
                            item.correct_answer
                        )
                            .trim()
                            .toUpperCase();


                    const answerIndexes = {

                        A: 0,

                        B: 1,

                        C: 2,

                        D: 3

                    };


                    return {

                        id:
                            item.id,

                        question:
                            item.question,

                        answers: [

                            item.option_a,

                            item.option_b,

                            item.option_c,

                            item.option_d

                        ],

                        correct:
                            answerIndexes[
                                answerLetter
                            ] ?? 0

                    };

                }
            );


        // ==================================
        // SAVOL TOPILMADI
        // ==================================

        if (questions.length === 0) {

            questionNumber.textContent =
                "";

            questionScore.textContent =
                "";

            progressBar.style.width =
                "0%";

            questionElement.textContent =
                "Bu fan uchun test savollari mavjud emas.";

            answersElement.innerHTML =
                "";

            resultElement.textContent =
                "Admin panel orqali ushbu fan uchun savol qo‘shing.";

            nextButton.style.display =
                "none";

            restartButton.style.display =
                "none";

            return;

        }


        // ==================================
        // TESTNI BOSHLASH
        // ==================================

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
            "Node.js server ishlayotganini tekshiring.";


        nextButton.style.display =
            "none";


        restartButton.style.display =
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

    score = 0;

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


    nextButton.textContent =
        "Keyingi savol →";


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


    selectedAnswer =
        null;


    // ======================================
    // SAVOL RAQAMI
    // ======================================

    questionNumber.textContent =
        "Savol " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    // ======================================
    // CURRENT SCORE
    // ======================================

    questionScore.textContent =
        "To‘g‘ri: " +
        score;


    // ======================================
    // PROGRESS
    // ======================================

    const progress =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;


    progressBar.style.width =
        progress + "%";


    // ======================================
    // SAVOL
    // ======================================

    questionElement.textContent =
        current.question;


    // ======================================
    // TOZALASH
    // ======================================

    answersElement.innerHTML =
        "";


    resultElement.innerHTML =
        "";


    resultElement.style.color =
        "";


    // ======================================
    // JAVOBLARNI YARATISH
    // ======================================

    const letters =
        [
            "A",
            "B",
            "C",
            "D"
        ];


    current.answers.forEach(
        function (
            answer,
            index
        ) {

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


    // ======================================
    // OXIRGI SAVOL
    // ======================================

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


    selectedAnswer =
        index;


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


        // ==================================
        // JAVOB TANLANMAGAN
        // ==================================

        if (selectedAnswer === null) {

            resultElement.style.color =
                "#dc2626";


            resultElement.textContent =
                "⚠️ Avval javobni tanlang.";


            return;

        }


        const current =
            questions[currentQuestion];


        const isCorrect =
            selectedAnswer ===
            current.correct;


        // ==================================
        // SCORE
        // ==================================

        if (isCorrect) {

            score++;

        }


        // ==================================
        // JAVOB TARIXIGA SAQLASH
        // ==================================

        userAnswers.push({

            questionId:
                current.id,

            question:
                current.question,

            answers:
                [...current.answers],

            selected:
                selectedAnswer,

            correct:
                current.correct,

            isCorrect:
                isCorrect

        });


        // ==================================
        // KEYINGI SAVOL
        // ==================================

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

            return;

        }


        // ==================================
        // TEST TUGADI
        // ==================================

        await finishTest();

    }
);


// ==========================================
// TESTNI TUGATISH
// ==========================================

async function finishTest() {

    testFinished =
        true;


    nextButton.disabled =
        true;


    nextButton.style.display =
        "none";


    const total =
        questions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    // ======================================
    // RESULT MA'LUMOTI
    // ======================================

    let resultIcon =
        "📘";

    let resultTitle =
        "Test yakunlandi";


    if (percentage >= 90) {

        resultIcon =
            "🏆";

        resultTitle =
            "Ajoyib natija!";

    } else if (percentage >= 70) {

        resultIcon =
            "🎯";

        resultTitle =
            "Yaxshi natija!";

    } else if (percentage >= 50) {

        resultIcon =
            "👍";

        resultTitle =
            "Yaxshi harakat!";

    } else {

        resultIcon =
            "📚";

        resultTitle =
            "Yana mashq qilish kerak";

    }


    // ======================================
    // QUIZ OYNASI
    // ======================================

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


    answersElement.innerHTML =
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


    // ======================================
    // REVIEWNI YARATISH
    // ======================================

    showReview();


    // ======================================
    // DATABASEGA NATIJANI SAQLASH
    // ======================================

    const saveStatus =
        document.getElementById(
            "saveStatus"
        );


    try {

        const saveResult =
            await saveUserTestResult(

                subjectNames[subject],

                score,

                total

            );


        // ==================================
        // LOGIN KERAK
        // ==================================

        if (
            saveResult.loginRequired
        ) {

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


        // ==================================
        // SAVE ERROR
        // ==================================

        if (!saveResult.success) {

            saveStatus.textContent =
                "❌ Natijani databasega saqlab bo‘lmadi.";


            saveStatus.style.color =
                "#dc2626";


            restartButton.style.display =
                "inline-block";


            return;

        }


        // ==================================
        // SUCCESS
        // ==================================

        saveStatus.textContent =
            "✅ Natija Dashboard'ga saqlandi.";


        saveStatus.style.color =
            "#16a34a";


    } catch (error) {

        console.error(
            "Natijani saqlash xatosi:",
            error
        );


        saveStatus.textContent =
            "❌ Natijani saqlashda xatolik yuz berdi.";


        saveStatus.style.color =
            "#dc2626";

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
// JAVOBLAR TAHLILI
// ==========================================

function showReview() {

    reviewList.innerHTML =
        "";


    const letters =
        [
            "A",
            "B",
            "C",
            "D"
        ];


    userAnswers.forEach(
        function (
            item,
            index
        ) {

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
                letters[
                    item.selected
                ];


            const correctLetter =
                letters[
                    item.correct
                ];


            const selectedText =
                item.answers[
                    item.selected
                ];


            const correctText =
                item.answers[
                    item.correct
                ];


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
        String(
            value ?? ""
        );


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