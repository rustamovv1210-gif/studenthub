// ==================================================
// STUDENT HUB - SHAXSIY HAFTALIK DARS JADVALI
// schedule.js
// ==================================================

const SCHEDULE_API = "https://studenthub-7f7e.onrender.com/api/schedule";

const DAYS = [
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
    "Yakshanba"
];

let scheduleLessons = [];
let editingLessonId = null;


// ==================================================
// HTML ELEMENTLAR
// ==================================================

const scheduleForm =
    document.getElementById("scheduleForm");

const scheduleDay =
    document.getElementById("scheduleDay");

const scheduleStartTime =
    document.getElementById("scheduleStartTime");

const scheduleEndTime =
    document.getElementById("scheduleEndTime");

const scheduleSubject =
    document.getElementById("scheduleSubject");

const scheduleTeacher =
    document.getElementById("scheduleTeacher");

const scheduleRoom =
    document.getElementById("scheduleRoom");

const scheduleLessonType =
    document.getElementById("scheduleLessonType");

const scheduleSubmitButton =
    document.getElementById("scheduleSubmitButton");

const scheduleCancelButton =
    document.getElementById("scheduleCancelButton");

const scheduleMessage =
    document.getElementById("scheduleMessage");

const scheduleLessonsContainer =
    document.getElementById("scheduleLessons");

const scheduleFormTitle =
    document.getElementById("scheduleFormTitle");

const scheduleCount =
    document.getElementById("scheduleCount");


// ==================================================
// TOKEN
// ==================================================

function getScheduleToken() {
    return localStorage.getItem("studentHubToken");
}


// ==================================================
// LOGIN TEKSHIRISH
// ==================================================

function checkScheduleLogin() {

    const token = getScheduleToken();

    const loggedIn =
        localStorage.getItem("studentHubLoggedIn");

    if (!token || loggedIn !== "true") {

        alert(
            "Dars jadvalidan foydalanish uchun avval hisobingizga kiring."
        );

        window.location.href = "login.html";

        return false;
    }

    return true;
}


// ==================================================
// LOGINNI TOZALASH
// ==================================================

function clearScheduleLogin() {

    localStorage.removeItem("studentHubToken");

    localStorage.removeItem(
        "studentHubLoggedIn"
    );

    localStorage.removeItem("studentHubUser");
}


// ==================================================
// XABAR
// ==================================================

function showScheduleMessage(
    message,
    type = "normal"
) {

    scheduleMessage.textContent = message;

    if (type === "success") {
        scheduleMessage.style.color = "#16a34a";
    }

    else if (type === "error") {
        scheduleMessage.style.color = "#dc2626";
    }

    else {
        scheduleMessage.style.color = "";
    }
}


// ==================================================
// HTML XAVFSIZLIGI
// ==================================================

function escapeScheduleHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==================================================
// JADVALNI SERVERDAN OLISH
// ==================================================

async function loadSchedule() {

    const token = getScheduleToken();

    scheduleLessonsContainer.innerHTML = `
        <div class="schedule-empty">
            📅 Jadval yuklanmoqda...
        </div>
    `;

    try {

        const response = await fetch(
            SCHEDULE_API,
            {
                method: "GET",

                headers: {
                    Authorization:
                        "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            clearScheduleLogin();

            alert(
                "Login muddati tugagan. Qayta kiring."
            );

            window.location.href =
                "login.html";

            return;
        }

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Jadvalni yuklab bo‘lmadi."
            );
        }

        scheduleLessons =
            Array.isArray(data.schedule)
                ? data.schedule
                : [];

        renderSchedule();

    }

    catch (error) {

        console.error(
            "Schedule GET xatosi:",
            error
        );

        scheduleLessonsContainer.innerHTML = `
            <div class="schedule-empty">
                ❌ Jadvalni yuklashda xatolik yuz berdi.
                <br><br>
                Server ishlayotganini tekshiring.
            </div>
        `;
    }
}


// ==================================================
// BARCHA VAQT ORALIQLARINI OLISH
// ==================================================

function getScheduleTimeSlots() {

    const timeMap = new Map();

    scheduleLessons.forEach(
        function (lesson) {

            const key =
                lesson.start_time +
                "|" +
                lesson.end_time;

            if (!timeMap.has(key)) {

                timeMap.set(
                    key,
                    {
                        start_time:
                            lesson.start_time,

                        end_time:
                            lesson.end_time
                    }
                );
            }
        }
    );

    const timeSlots =
        Array.from(timeMap.values());

    timeSlots.sort(
        function (a, b) {

            return String(
                a.start_time
            ).localeCompare(
                String(b.start_time)
            );
        }
    );

    return timeSlots;
}


// ==================================================
// JADVALNI CHIZISH
// ==================================================

function renderSchedule() {

    if (scheduleCount) {

        scheduleCount.textContent =
            scheduleLessons.length +
            " ta dars";
    }


    // DARS YO'Q

    if (scheduleLessons.length === 0) {

        scheduleLessonsContainer.innerHTML = `
            <div class="schedule-empty">
                📅 Hozircha dars mavjud emas.
                <br><br>
                Chap tomondagi forma orqali
                birinchi darsingizni qo‘shing.
            </div>
        `;

        return;
    }


    const timeSlots =
        getScheduleTimeSlots();


    let html = `
        <div class="schedule-table-wrapper">

            <table class="weekly-schedule-table">

                <thead>

                    <tr>

                        <th class="schedule-time-column">
                            🕐 Vaqt
                        </th>
    `;


    // HAFTA KUNLARI

    DAYS.forEach(
        function (day) {

            html += `
                <th>
                    ${escapeScheduleHtml(day)}
                </th>
            `;
        }
    );


    html += `
                    </tr>

                </thead>

                <tbody>
    `;


    // HAR BIR VAQT QATORI

    timeSlots.forEach(
        function (timeSlot) {

            html += `
                <tr>

                    <td class="schedule-time-cell">

                        ${escapeScheduleHtml(
                            timeSlot.start_time
                        )}

                        <span>
                            ${escapeScheduleHtml(
                                timeSlot.end_time
                            )}
                        </span>

                    </td>
            `;


            // HAR BIR KUN UCHUN KATAK

            DAYS.forEach(
                function (day) {

                    const cellLessons =
                        scheduleLessons.filter(
                            function (lesson) {

                                return (
                                    lesson.day === day &&
                                    lesson.start_time ===
                                        timeSlot.start_time &&
                                    lesson.end_time ===
                                        timeSlot.end_time
                                );
                            }
                        );


                    html += `
                        <td class="schedule-lesson-cell">
                    `;


                    if (
                        cellLessons.length === 0
                    ) {

                        html += `
                            <div class="schedule-cell-empty">
                                —
                            </div>
                        `;
                    }

                    else {

                        cellLessons.forEach(
                            function (lesson) {

                                html +=
                                    createTableLessonHtml(
                                        lesson
                                    );
                            }
                        );
                    }


                    html += `
                        </td>
                    `;
                }
            );


            html += `
                </tr>
            `;
        }
    );


    html += `
                </tbody>

            </table>

        </div>
    `;


    scheduleLessonsContainer.innerHTML =
        html;
}


// ==================================================
// JADVAL ICHIDAGI DARS
// ==================================================

function createTableLessonHtml(lesson) {

    let info = "";


    if (lesson.teacher) {

        info += `
            <div>
                👨‍🏫
                ${escapeScheduleHtml(
                    lesson.teacher
                )}
            </div>
        `;
    }


    if (lesson.room) {

        info += `
            <div>
                🚪
                ${escapeScheduleHtml(
                    lesson.room
                )}
            </div>
        `;
    }


    if (lesson.lesson_type) {

        info += `
            <div>
                📖
                ${escapeScheduleHtml(
                    lesson.lesson_type
                )}
            </div>
        `;
    }


    return `
        <div class="table-lesson">

            <div class="table-lesson-subject">

                ${escapeScheduleHtml(
                    lesson.subject
                )}

            </div>


            ${
                info
                    ? `
                        <div class="table-lesson-info">
                            ${info}
                        </div>
                    `
                    : ""
            }


            <div class="table-lesson-actions">

                <button
                    type="button"
                    class="table-edit-button"
                    onclick="editScheduleLesson(${Number(
                        lesson.id
                    )})"
                    title="Darsni tahrirlash"
                >
                    ✏️
                </button>


                <button
                    type="button"
                    class="table-delete-button"
                    onclick="deleteScheduleLesson(${Number(
                        lesson.id
                    )})"
                    title="Darsni o‘chirish"
                >
                    🗑️
                </button>

            </div>

        </div>
    `;
}


// ==================================================
// DARS QO'SHISH / TAHRIRLASH
// ==================================================

scheduleForm.addEventListener(
    "submit",

    async function (event) {

        event.preventDefault();


        const token =
            getScheduleToken();


        if (!token) {

            window.location.href =
                "login.html";

            return;
        }


        const lessonData = {

            day:
                scheduleDay.value,

            start_time:
                scheduleStartTime.value,

            end_time:
                scheduleEndTime.value,

            subject:
                scheduleSubject
                    .value
                    .trim(),

            teacher:
                scheduleTeacher
                    .value
                    .trim(),

            room:
                scheduleRoom
                    .value
                    .trim(),

            lesson_type:
                scheduleLessonType.value
        };


        // MAJBURIY MAYDONLAR

        if (
            !lessonData.day ||
            !lessonData.start_time ||
            !lessonData.end_time ||
            !lessonData.subject
        ) {

            showScheduleMessage(
                "Kun, vaqt va fan nomini kiriting.",
                "error"
            );

            return;
        }


        // VAQT

        if (
            lessonData.end_time <=
            lessonData.start_time
        ) {

            showScheduleMessage(
                "Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak.",
                "error"
            );

            return;
        }


        const isEditing =
            editingLessonId !== null;


        let url = SCHEDULE_API;

        let method = "POST";


        if (isEditing) {

            url =
                SCHEDULE_API +
                "/" +
                editingLessonId;

            method = "PUT";
        }


        scheduleSubmitButton.disabled =
            true;


        scheduleSubmitButton.textContent =
            isEditing
                ? "Saqlanmoqda..."
                : "Qo‘shilmoqda...";


        showScheduleMessage("");


        try {

            const response =
                await fetch(
                    url,
                    {
                        method: method,

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                "Bearer " +
                                token
                        },

                        body:
                            JSON.stringify(
                                lessonData
                            )
                    }
                );


            const data =
                await response.json();


            if (
                response.status === 401 ||
                response.status === 403
            ) {

                clearScheduleLogin();

                alert(
                    "Login muddati tugagan. Qayta kiring."
                );

                window.location.href =
                    "login.html";

                return;
            }


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Darsni saqlab bo‘lmadi."
                );
            }


            showScheduleMessage(
                isEditing
                    ? "Dars muvaffaqiyatli yangilandi. ✅"
                    : "Dars jadvalga qo‘shildi. ✅",

                "success"
            );


            resetScheduleForm();

            await loadSchedule();

        }

        catch (error) {

            console.error(
                "Schedule SAVE xatosi:",
                error
            );

            showScheduleMessage(
                error.message,
                "error"
            );
        }

        finally {

            scheduleSubmitButton.disabled =
                false;

            if (
                editingLessonId === null
            ) {

                scheduleSubmitButton.textContent =
                    "➕ Dars qo‘shish";
            }
        }
    }
);


// ==================================================
// TAHRIRLASH
// ==================================================

function editScheduleLesson(id) {

    const lesson =
        scheduleLessons.find(
            function (item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );
            }
        );


    if (!lesson) {

        alert("Dars topilmadi.");

        return;
    }


    editingLessonId =
        Number(id);


    scheduleDay.value =
        lesson.day;

    scheduleStartTime.value =
        lesson.start_time;

    scheduleEndTime.value =
        lesson.end_time;

    scheduleSubject.value =
        lesson.subject || "";

    scheduleTeacher.value =
        lesson.teacher || "";

    scheduleRoom.value =
        lesson.room || "";

    scheduleLessonType.value =
        lesson.lesson_type || "";


    scheduleFormTitle.textContent =
        "✏️ Darsni tahrirlash";


    scheduleSubmitButton.textContent =
        "💾 O‘zgarishlarni saqlash";


    scheduleCancelButton.style.display =
        "block";


    showScheduleMessage("");


    scheduleForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==================================================
// TAHRIRNI BEKOR QILISH
// ==================================================

scheduleCancelButton.addEventListener(
    "click",

    function () {

        resetScheduleForm();

        showScheduleMessage("");
    }
);


// ==================================================
// FORMNI TOZALASH
// ==================================================

function resetScheduleForm() {

    scheduleForm.reset();

    editingLessonId = null;

    scheduleFormTitle.textContent =
        "➕ Yangi dars";

    scheduleSubmitButton.textContent =
        "➕ Dars qo‘shish";

    scheduleCancelButton.style.display =
        "none";
}


// ==================================================
// DARSNI O'CHIRISH
// ==================================================

async function deleteScheduleLesson(id) {

    const lesson =
        scheduleLessons.find(
            function (item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );
            }
        );


    if (!lesson) {

        alert("Dars topilmadi.");

        return;
    }


    const confirmed =
        confirm(
            `"${lesson.subject}" darsini jadvaldan o‘chirmoqchimisiz?`
        );


    if (!confirmed) {
        return;
    }


    const token =
        getScheduleToken();


    try {

        const response =
            await fetch(
                SCHEDULE_API +
                "/" +
                id,

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


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            clearScheduleLogin();

            alert(
                "Login muddati tugagan. Qayta kiring."
            );

            window.location.href =
                "login.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Darsni o‘chirib bo‘lmadi."
            );
        }


        if (
            editingLessonId ===
            Number(id)
        ) {

            resetScheduleForm();
        }


        await loadSchedule();


        showScheduleMessage(
            "Dars jadvaldan o‘chirildi. ✅",
            "success"
        );

    }

    catch (error) {

        console.error(
            "Schedule DELETE xatosi:",
            error
        );


        showScheduleMessage(
            error.message,
            "error"
        );
    }
}


// ==================================================
// SAHIFA OCHILGANDA
// ==================================================

document.addEventListener(
    "DOMContentLoaded",

    function () {

        if (!checkScheduleLogin()) {
            return;
        }

        loadSchedule();
    }
);