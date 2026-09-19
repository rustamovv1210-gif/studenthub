// ==========================================
// STUDENT HUB - ADMIN TESTS
// ==========================================

const token =
    localStorage.getItem("studentHubToken");

const savedUser =
    localStorage.getItem("studentHubUser");


// ==========================================
// LOGIN TEKSHIRISH
// ==========================================

if (!token || !savedUser) {

    window.location.href =
        "login.html";
}


// ==========================================
// HTML ELEMENTLAR
// ==========================================

const testsMessage =
    document.getElementById("testsMessage");

const testsTableBody =
    document.getElementById("testsTableBody");

const addTestButton =
    document.getElementById("addTestButton");

const testFormSection =
    document.getElementById("testFormSection");

const testForm =
    document.getElementById("testForm");

const formTitle =
    document.getElementById("formTitle");

const formMessage =
    document.getElementById("formMessage");

const cancelTestButton =
    document.getElementById("cancelTestButton");


const subjectInput =
    document.getElementById("subject");

const questionInput =
    document.getElementById("question");

const optionAInput =
    document.getElementById("optionA");

const optionBInput =
    document.getElementById("optionB");

const optionCInput =
    document.getElementById("optionC");

const optionDInput =
    document.getElementById("optionD");

const correctAnswerInput =
    document.getElementById("correctAnswer");


// ==========================================
// EDIT MODE
// ==========================================

let editingQuestionId = null;


// ==========================================
// LOGINNI TOZALASH
// ==========================================

function clearLogin() {

    localStorage.removeItem(
        "studentHubLoggedIn"
    );

    localStorage.removeItem(
        "studentHubUser"
    );

    localStorage.removeItem(
        "studentHubToken"
    );
}


// ==========================================
// ADMIN TEKSHIRISH
// ==========================================

async function checkAdminAccess() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/admin",
            {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


        const data =
            await response.json();


        if (response.status === 401) {

            clearLogin();

            window.location.href =
                "login.html";

            return false;
        }


        if (response.status === 403) {

            alert(
                "Bu sahifaga faqat administrator kira oladi."
            );

            window.location.href =
                "index.html";

            return false;
        }


        if (!response.ok) {

            alert(
                data.message ||
                "Admin huquqini tekshirib bo‘lmadi."
            );

            return false;
        }


        return true;


    } catch (error) {

        console.error(error);

        alert(
            "Server bilan bog‘lanib bo‘lmadi."
        );

        return false;
    }
}


// ==========================================
// TESTLARNI YUKLASH
// ==========================================

async function loadTests() {

    testsMessage.textContent =
        "Testlar yuklanmoqda...";

    testsTableBody.innerHTML = "";


    try {

        const response = await fetch(
            "http://localhost:3000/api/admin/questions",
            {
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            testsMessage.textContent =
                data.message ||
                "Testlarni yuklab bo‘lmadi.";

            return;
        }


        showTests(
            data.questions
        );


    } catch (error) {

        console.error(error);

        testsMessage.textContent =
            "Server bilan bog‘lanib bo‘lmadi.";
    }
}


// ==========================================
// TESTLARNI TABLEGA CHIQARISH
// ==========================================

function showTests(questions) {

    testsTableBody.innerHTML = "";


    if (
        !questions ||
        questions.length === 0
    ) {

        testsMessage.textContent =
            "Hozircha test savollari mavjud emas.";

        return;
    }


    testsMessage.textContent =
        "Jami test savollari: " +
        questions.length;


    questions.forEach(
        function (item) {

            const row =
                document.createElement("tr");


            const idCell =
                document.createElement("td");

            idCell.textContent =
                item.id;


            const subjectCell =
                document.createElement("td");

            subjectCell.textContent =
                item.subject;


            const questionCell =
                document.createElement("td");

            questionCell.textContent =
                item.question;


            const answerCell =
                document.createElement("td");


            let answerText =
                item.correct_answer;


            if (item.correct_answer === "A") {

                answerText =
                    "A — " + item.option_a;
            }

            if (item.correct_answer === "B") {

                answerText =
                    "B — " + item.option_b;
            }

            if (item.correct_answer === "C") {

                answerText =
                    "C — " + item.option_c;
            }

            if (item.correct_answer === "D") {

                answerText =
                    "D — " + item.option_d;
            }


            answerCell.textContent =
                answerText;


            const actionCell =
                document.createElement("td");


            // TAHRIRLASH
            const editButton =
                document.createElement("button");

            editButton.textContent =
                "✏️ Tahrirlash";


            editButton.addEventListener(
                "click",
                function () {

                    openEditForm(item);

                }
            );


            // O'CHIRISH
            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "🗑️ O‘chirish";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteTest(item);

                }
            );


            actionCell.appendChild(
                editButton
            );

            actionCell.appendChild(
                document.createTextNode(" ")
            );

            actionCell.appendChild(
                deleteButton
            );


            row.appendChild(idCell);
            row.appendChild(subjectCell);
            row.appendChild(questionCell);
            row.appendChild(answerCell);
            row.appendChild(actionCell);


            testsTableBody.appendChild(row);
        }
    );
}


// ==========================================
// YANGI TEST FORMASINI OCHISH
// ==========================================

function openAddForm() {

    editingQuestionId = null;

    formTitle.textContent =
        "➕ Yangi test savoli";

    formMessage.textContent =
        "";

    testForm.reset();

    testFormSection.style.display =
        "block";

    testFormSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// TAHRIRLASH FORMASINI OCHISH
// ==========================================

function openEditForm(item) {

    editingQuestionId =
        item.id;


    formTitle.textContent =
        "✏️ Test savolini tahrirlash";


    subjectInput.value =
        item.subject;

    questionInput.value =
        item.question;

    optionAInput.value =
        item.option_a;

    optionBInput.value =
        item.option_b;

    optionCInput.value =
        item.option_c;

    optionDInput.value =
        item.option_d;

    correctAnswerInput.value =
        item.correct_answer;


    formMessage.textContent =
        "";


    testFormSection.style.display =
        "block";


    testFormSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// FORMNI YOPISH
// ==========================================

function closeForm() {

    editingQuestionId =
        null;

    testForm.reset();

    formMessage.textContent =
        "";

    testFormSection.style.display =
        "none";
}


// ==========================================
// TESTNI SAQLASH
// ==========================================

testForm.addEventListener(
    "submit",

    async function (event) {

        event.preventDefault();


        const questionData = {

            subject:
                subjectInput.value.trim(),

            question:
                questionInput.value.trim(),

            option_a:
                optionAInput.value.trim(),

            option_b:
                optionBInput.value.trim(),

            option_c:
                optionCInput.value.trim(),

            option_d:
                optionDInput.value.trim(),

            correct_answer:
                correctAnswerInput.value

        };


        if (
            !questionData.subject ||
            !questionData.question ||
            !questionData.option_a ||
            !questionData.option_b ||
            !questionData.option_c ||
            !questionData.option_d ||
            !questionData.correct_answer
        ) {

            formMessage.textContent =
                "Barcha maydonlarni to‘ldiring.";

            return;
        }


        let url =
            "http://localhost:3000/api/admin/questions";

        let method =
            "POST";


        // EDIT MODE
        if (editingQuestionId !== null) {

            url +=
                "/" + editingQuestionId;

            method =
                "PUT";
        }


        try {

            formMessage.textContent =
                "Saqlanmoqda...";


            const response =
                await fetch(
                    url,
                    {
                        method: method,

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body:
                            JSON.stringify(
                                questionData
                            )
                    }
                );


            const data =
                await response.json();


            if (response.status === 401) {

                clearLogin();

                window.location.href =
                    "login.html";

                return;
            }


            if (response.status === 403) {

                alert(
                    "Bu amal uchun admin huquqi kerak."
                );

                return;
            }


            if (!response.ok) {

                formMessage.textContent =
                    data.message ||
                    "Testni saqlab bo‘lmadi.";

                return;
            }


            if (editingQuestionId === null) {

                alert(
                    "Test savoli muvaffaqiyatli qo‘shildi!"
                );

            } else {

                alert(
                    "Test savoli muvaffaqiyatli yangilandi!"
                );
            }


            closeForm();

            await loadTests();


        } catch (error) {

            console.error(
                "Test save xatosi:",
                error
            );

            formMessage.textContent =
                "Server bilan bog‘lanib bo‘lmadi.";
        }
    }
);


// ==========================================
// TESTNI O'CHIRISH
// ==========================================

async function deleteTest(item) {

    const confirmed =
        confirm(
            "Bu savolni o‘chirmoqchimisiz?\n\n" +
            item.question
        );


    if (!confirmed) {

        return;
    }


    try {

        const response =
            await fetch(
                "http://localhost:3000/api/admin/questions/" +
                item.id,

                {
                    method: "DELETE",

                    headers: {

                        "Authorization":
                            "Bearer " + token

                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Testni o‘chirib bo‘lmadi."
            );

            return;
        }


        alert(
            "Test savoli o‘chirildi!"
        );


        await loadTests();


    } catch (error) {

        console.error(
            "Delete xatosi:",
            error
        );

        alert(
            "Server bilan bog‘lanib bo‘lmadi."
        );
    }
}


// ==========================================
// BUTTONLAR
// ==========================================

addTestButton.addEventListener(
    "click",
    openAddForm
);


cancelTestButton.addEventListener(
    "click",
    closeForm
);


// ==========================================
// START
// ==========================================

async function startAdminTestsPage() {

    const allowed =
        await checkAdminAccess();


    if (!allowed) {

        return;
    }


    await loadTests();
}


startAdminTestsPage();