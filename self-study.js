// ==================================================
// STUDENT HUB - MUSTAQIL TAYYORGARLIK
// TXT + DOCX + SQLITE RESULT
// ==================================================


// ==================================================
// HTML ELEMENTLAR
// ==================================================

const testFile =
    document.getElementById("testFile");

const fileMessage =
    document.getElementById("fileMessage");

const startFileTestButton =
    document.getElementById("startFileTestButton");

const uploadSection =
    document.getElementById("uploadSection");

const selfStudyQuiz =
    document.getElementById("selfStudyQuiz");

const quizTitle =
    document.getElementById("quizTitle");

const questionNumber =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("selfProgressBar");

const questionElement =
    document.getElementById("selfQuestion");

const answersElement =
    document.getElementById("selfAnswers");

const resultElement =
    document.getElementById("selfResult");

const nextButton =
    document.getElementById("selfNextButton");

const restartButton =
    document.getElementById("selfRestartButton");

const fileUploadArea =
    document.querySelector(".file-upload-area");


// ==================================================
// TEST HOLATI
// ==================================================

let questions = [];

let currentQuestion = 0;

let selectedAnswer = null;

let score = 0;

let currentFileName = "";

let testFinished = false;


// Natija bir testda faqat bir marta saqlanishi uchun
let resultSaved = false;


// ==================================================
// FILE UPLOAD MAYDONINI BOSISH
// ==================================================

if (fileUploadArea && testFile) {

    fileUploadArea.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            testFile.click();
        }
    );
}


// ==================================================
// FILE TANLANGANDA
// ==================================================

if (testFile) {

    testFile.addEventListener(
        "change",
        async function () {

            const file =
                testFile.files[0];


            if (!file) {

                resetFile();

                return;
            }


            const fileName =
                file.name.toLowerCase();


            startFileTestButton.disabled =
                true;


            fileMessage.style.color =
                "";


            // ==========================================
            // TXT
            // ==========================================

            if (fileName.endsWith(".txt")) {

                await readTxtFile(file);

                return;
            }


            // ==========================================
            // DOCX
            // ==========================================

            if (fileName.endsWith(".docx")) {

                await readDocxFile(file);

                return;
            }


            questions = [];


            fileMessage.style.color =
                "red";


            fileMessage.textContent =
                "❌ Faqat TXT yoki DOCX fayl tanlang.";


            startFileTestButton.disabled =
                true;
        }
    );
}


// ==================================================
// FILE RESET
// ==================================================

function resetFile() {

    questions = [];

    currentFileName = "";

    resultSaved = false;


    fileMessage.textContent =
        "Fayl tanlanmagan.";


    fileMessage.style.color =
        "";


    startFileTestButton.disabled =
        true;
}


// ==================================================
// TXT FILE O'QISH
// ==================================================

async function readTxtFile(file) {

    try {

        fileMessage.style.color =
            "";


        fileMessage.textContent =
            "⏳ TXT fayl o‘qilmoqda...";


        const text =
            await file.text();


        processTestText(
            text,
            file.name
        );

    }

    catch (error) {

        console.error(
            "TXT xatosi:",
            error
        );


        questions = [];


        fileMessage.style.color =
            "red";


        fileMessage.textContent =
            "❌ TXT faylni o‘qib bo‘lmadi.";


        startFileTestButton.disabled =
            true;
    }
}


// ==================================================
// DOCX FILE O'QISH
// ==================================================

async function readDocxFile(file) {

    try {

        fileMessage.style.color =
            "";


        fileMessage.textContent =
            "⏳ Word fayl serverga yuborilmoqda...";


        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        const response =
            await fetch(
                "http://localhost:3000/api/self-study/docx",
                {
                    method: "POST",
                    body: formData
                }
            );


        let data;


        try {

            data =
                await response.json();

        }

        catch (error) {

            throw new Error(
                "Serverdan noto‘g‘ri javob keldi."
            );
        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "DOCX faylni yuklab bo‘lmadi."
            );
        }


        if (!data.success) {

            throw new Error(
                data.message ||
                "DOCX faylni o‘qib bo‘lmadi."
            );
        }


        if (!data.text) {

            throw new Error(
                "Word faylda matn topilmadi."
            );
        }


        fileMessage.textContent =
            "⏳ Word fayldagi testlar tekshirilmoqda...";


        processTestText(
            data.text,
            data.fileName || file.name
        );

    }

    catch (error) {

        console.error(
            "DOCX xatosi:",
            error
        );


        questions = [];


        fileMessage.style.color =
            "red";


        if (
            error instanceof TypeError &&
            error.message.includes("fetch")
        ) {

            fileMessage.textContent =
                "❌ Server bilan bog‘lanib bo‘lmadi. node server.js ishlayotganini tekshiring.";

        }

        else {

            fileMessage.textContent =
                "❌ " + error.message;
        }


        startFileTestButton.disabled =
            true;
    }
}


// ==================================================
// MATNNI TESTGA AYLANTIRISH
// ==================================================

function processTestText(
    text,
    fileName
) {

    questions =
        parseTestFile(text);


    if (questions.length === 0) {

        fileMessage.style.color =
            "red";


        fileMessage.textContent =
            "❌ Fayl ochildi, lekin test savollari topilmadi.";


        startFileTestButton.disabled =
            true;


        return;
    }


    currentFileName =
        fileName;


    fileMessage.style.color =
        "green";


    fileMessage.textContent =
        "✅ " +
        currentFileName +
        " — " +
        questions.length +
        " ta savol topildi.";


    startFileTestButton.disabled =
        false;
}


// ==================================================
// TEST PARSER
// ==================================================

function parseTestFile(text) {

    const result = [];


    const normalizedText =
        String(text || "")

            .replace(/\r\n/g, "\n")

            .replace(/\r/g, "\n")

            .replace(/\u00A0/g, " ")

            .trim();


    if (!normalizedText) {

        return result;
    }


    const lines =
        normalizedText

            .split("\n")

            .map(function (line) {

                return line.trim();

            })

            .filter(function (line) {

                return line !== "";

            });


    let current = null;


    // ==================================================
    // SAVOLNI SAQLASH
    // ==================================================

    function saveCurrentQuestion() {

        if (!current) {

            return;
        }


        const completeAnswers =
            current.answers.length === 4 &&
            current.answers.every(
                function (answer) {

                    return Boolean(answer);
                }
            );


        if (
            current.question &&
            completeAnswers &&
            current.correct !== null
        ) {

            result.push({

                question:
                    current.question,

                answers:
                    current.answers,

                correct:
                    current.correct
            });
        }


        current = null;
    }


    // ==================================================
    // HAR BIR QATORNI TEKSHIRISH
    // ==================================================

    lines.forEach(
        function (line) {


            // ==========================================
            // TO'G'RI JAVOB
            // ==========================================

            const correctMatch =
                line.match(
                    /^(Javob|To['‘’]?g['‘’]?ri\s+javob|Answer)\s*[:\-]\s*([ABCD])\b/i
                );


            if (correctMatch) {

                if (current) {

                    const letter =
                        correctMatch[2]
                            .toUpperCase();


                    current.correct =
                        {
                            A: 0,
                            B: 1,
                            C: 2,
                            D: 3
                        }[letter];


                    saveCurrentQuestion();
                }


                return;
            }


            // ==========================================
            // JAVOB VARIANTI
            // ==========================================

            const optionMatch =
                line.match(
                    /^([ABCD])\s*[\)\.\-:]\s*(.+)$/i
                );


            if (optionMatch) {

                if (!current) {

                    return;
                }


                const letter =
                    optionMatch[1]
                        .toUpperCase();


                const answerText =
                    optionMatch[2]
                        .trim();


                const index =
                    {
                        A: 0,
                        B: 1,
                        C: 2,
                        D: 3
                    }[letter];


                current.answers[index] =
                    answerText;


                return;
            }


            // ==========================================
            // RAQAMLI SAVOL
            // ==========================================

            const numberedQuestion =
                line.match(
                    /^(\d+)\s*[\.\)]\s*(.+)$/
                );


            if (numberedQuestion) {

                saveCurrentQuestion();


                current = {

                    question:
                        numberedQuestion[2]
                            .trim(),

                    answers:
                        [],

                    correct:
                        null
                };


                return;
            }


            // ==========================================
            // RAQAMSIZ SAVOL
            // ==========================================

            if (!current) {

                current = {

                    question:
                        line,

                    answers:
                        [],

                    correct:
                        null
                };


                return;
            }


            // ==========================================
            // KO'P QATORLI SAVOL
            // ==========================================

            const hasAnyAnswer =
                current.answers.some(
                    function (answer) {

                        return Boolean(answer);
                    }
                );


            if (!hasAnyAnswer) {

                current.question +=
                    " " + line;
            }

        }
    );


    saveCurrentQuestion();


    return result;
}


// ==================================================
// TESTNI BOSHLASH BUTTON
// ==================================================

if (startFileTestButton) {

    startFileTestButton.addEventListener(
        "click",
        function () {

            if (questions.length === 0) {

                fileMessage.style.color =
                    "red";


                fileMessage.textContent =
                    "❌ Avval test faylini tanlang.";


                return;
            }


            startTest();
        }
    );
}


// ==================================================
// TESTNI BOSHLASH
// ==================================================

function startTest() {

    currentQuestion = 0;

    selectedAnswer = null;

    score = 0;

    testFinished = false;

    resultSaved = false;


    uploadSection.style.display =
        "none";


    selfStudyQuiz.style.display =
        "block";


    quizTitle.textContent =
        "📚 " + currentFileName;


    nextButton.style.display =
        "inline-block";


    nextButton.disabled =
        false;


    restartButton.style.display =
        "none";


    resultElement.textContent =
        "";


    showQuestion();
}


// ==================================================
// SAVOLNI KO'RSATISH
// ==================================================

function showQuestion() {

    const current =
        questions[currentQuestion];


    selectedAnswer =
        null;


    resultElement.textContent =
        "";


    resultElement.style.color =
        "";


    questionNumber.textContent =
        "Savol " +
        (currentQuestion + 1) +
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


    const letters =
        [
            "A",
            "B",
            "C",
            "D"
        ];


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
            "Testni tugatish";

    }

    else {

        nextButton.textContent =
            "Keyingi savol →";
    }
}


// ==================================================
// JAVOB TANLASH
// ==================================================

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


    resultElement.textContent =
        "";
}


// ==================================================
// KEYINGI SAVOL
// ==================================================

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            if (testFinished) {

                return;
            }


            if (selectedAnswer === null) {

                resultElement.style.color =
                    "red";


                resultElement.textContent =
                    "⚠️ Avval javobni tanlang.";


                return;
            }


            const current =
                questions[currentQuestion];


            if (
                selectedAnswer ===
                current.correct
            ) {

                score++;
            }


            if (
                currentQuestion <
                questions.length - 1
            ) {

                currentQuestion++;

                showQuestion();

                return;
            }


            finishTest();
        }
    );
}


// ==================================================
// TESTNI TUGATISH
// ==================================================

function finishTest() {

    testFinished =
        true;


    const total =
        questions.length;


    const wrong =
        total - score;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    // ==================================================
    // SQLITE DATABASEGA NATIJANI SAQLASH
    // ==================================================

    saveSelfStudyResult(
        score,
        total
    );


    // ==================================================
    // NATIJA DIZAYNI
    // ==================================================

    let resultIcon =
        "📚";


    let resultTitle =
        "Test yakunlandi";


    if (percentage >= 90) {

        resultIcon =
            "🏆";

        resultTitle =
            "Ajoyib natija!";

    }

    else if (percentage >= 70) {

        resultIcon =
            "🎉";

        resultTitle =
            "Yaxshi natija!";

    }

    else if (percentage >= 50) {

        resultIcon =
            "👍";

        resultTitle =
            "Yaxshi harakat!";

    }

    else {

        resultIcon =
            "📖";

        resultTitle =
            "Yana mashq qiling!";
    }


    questionNumber.textContent =
        "Test tugadi";


    progressBar.style.width =
        "100%";


    questionElement.innerHTML = `

        <div class="final-result-card">

            <div class="final-result-icon">
                ${resultIcon}
            </div>

            <h2>
                ${resultTitle}
            </h2>

            <div class="final-percentage">
                ${percentage}%
            </div>

            <p class="final-result-description">
                ${escapeHtml(currentFileName)}
            </p>


            <div class="final-result-stats">

                <div class="final-stat">

                    <span class="final-stat-icon">
                        ✅
                    </span>

                    <strong>
                        ${score}
                    </strong>

                    <small>
                        To‘g‘ri
                    </small>

                </div>


                <div class="final-stat">

                    <span class="final-stat-icon">
                        ❌
                    </span>

                    <strong>
                        ${wrong}
                    </strong>

                    <small>
                        Noto‘g‘ri
                    </small>

                </div>


                <div class="final-stat">

                    <span class="final-stat-icon">
                        📝
                    </span>

                    <strong>
                        ${total}
                    </strong>

                    <small>
                        Jami
                    </small>

                </div>

            </div>

        </div>

    `;


    answersElement.innerHTML =
        "";


    resultElement.textContent =
        "";


    nextButton.style.display =
        "none";


    restartButton.style.display =
        "inline-block";
}


// ==================================================
// MUSTAQIL TEST NATIJASINI SQLITEGA SAQLASH
// ==================================================

async function saveSelfStudyResult(
    testScore,
    testTotal
) {

    // Bir xil test natijasi ikki marta
    // saqlanib ketmasligi uchun
    if (resultSaved) {

        return;
    }


    resultSaved = true;


    // user-results.js yuklanganini tekshiramiz
    if (
        typeof saveUserTestResult !==
        "function"
    ) {

        console.warn(
            "user-results.js ulanmagan. Natija bazaga saqlanmadi."
        );


        resultSaved = false;

        return;
    }


    try {

        const subjectName =
            "Mustaqil tayyorgarlik - " +
            currentFileName;


        await saveUserTestResult(
            subjectName,
            testScore,
            testTotal
        );


        console.log(
            "Mustaqil test natijasi SQLite bazaga saqlandi ✅"
        );

    }

    catch (error) {

        console.error(
            "Mustaqil test natijasini saqlashda xatolik:",
            error
        );


        resultSaved = false;
    }
}


// ==================================================
// QAYTA ISHLASH
// ==================================================

if (restartButton) {

    restartButton.addEventListener(
        "click",
        function () {

            startTest();
        }
    );
}


// ==================================================
// HTML XAVFSIZLIGI
// ==================================================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


// ==================================================
// TAYYOR
// ==================================================

console.log(
    "Student Hub Self Study TXT + DOCX + SQLite tayyor ✅"
);