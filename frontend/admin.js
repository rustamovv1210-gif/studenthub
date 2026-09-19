// ==========================================
// STUDENT HUB ADMIN PANEL
// ==========================================

const token =
    localStorage.getItem(
        "studentHubToken"
    );

const savedUser =
    localStorage.getItem(
        "studentHubUser"
    );


// ==========================================
// LOGIN TEKSHIRISH
// ==========================================

if (
    token === null ||
    savedUser === null
) {
    window.location.href =
        "login.html";
}


// ==========================================
// CURRENT USER
// ==========================================

let currentUser = null;

try {
    currentUser =
        JSON.parse(savedUser);
}
catch (error) {
    currentUser = null;
}


// ==========================================
// ELEMENTLAR
// ==========================================

const manageUsersButton =
    document.getElementById(
        "manageUsersButton"
    );

const usersSection =
    document.getElementById(
        "usersSection"
    );

const usersTableBody =
    document.getElementById(
        "usersTableBody"
    );

const usersMessage =
    document.getElementById(
        "usersMessage"
    );


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
// ADMIN HUQUQINI TEKSHIRISH
// ==========================================

async function checkAdminAccess() {

    try {

        const response =
            await fetch(
                "https://studenthub-7f7e.onrender.com/api/admin",
                {
                    method: "GET",

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

            alert(
                "Login muddati tugagan. Qayta login qiling."
            );

            window.location.href =
                "login.html";

            return;
        }


        if (response.status === 403) {

            alert(
                "Bu sahifaga faqat administrator kira oladi."
            );

            window.location.href =
                "index.html";

            return;
        }


        if (!response.ok) {

            alert(
                data.message ||
                "Admin Panelni ochib bo‘lmadi."
            );

            return;
        }

    }

    catch (error) {

        console.error(
            "Admin tekshirish xatosi:",
            error
        );

        alert(
            "Server bilan bog‘lanib bo‘lmadi."
        );

    }

}


// ==========================================
// FOYDALANUVCHILARNI OLISH
// ==========================================

async function loadUsers() {

    usersSection.style.display =
        "block";

    usersMessage.textContent =
        "Foydalanuvchilar yuklanmoqda...";

    usersTableBody.innerHTML =
        "";


    try {

        const response =
            await fetch(
                "https://studenthub-7f7e.onrender.com/api/admin/users",
                {
                    method: "GET",

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

            return;
        }


        if (response.status === 403) {

            alert(
                "Faqat administrator foydalanuvchilarni ko‘ra oladi."
            );

            return;
        }


        if (!response.ok) {

            usersMessage.textContent =
                data.message ||
                "Foydalanuvchilarni olib bo‘lmadi.";

            return;
        }


        showUsers(
            data.users
        );

    }

    catch (error) {

        console.error(
            "Users xatosi:",
            error
        );

        usersMessage.textContent =
            "Server bilan bog‘lanib bo‘lmadi.";

    }

}


// ==========================================
// USERLARNI TABLEGA CHIQARISH
// ==========================================

function showUsers(users) {

    usersTableBody.innerHTML =
        "";


    if (users.length === 0) {

        usersMessage.textContent =
            "Foydalanuvchilar mavjud emas.";

        return;
    }


    usersMessage.textContent =
        "Jami foydalanuvchilar: " +
        users.length;


    users.forEach(
        function (user) {

            const row =
                document.createElement(
                    "tr"
                );


            // ID

            const idCell =
                document.createElement(
                    "td"
                );

            idCell.textContent =
                user.id;


            // ISM

            const nameCell =
                document.createElement(
                    "td"
                );

            nameCell.textContent =
                user.name;


            // EMAIL

            const emailCell =
                document.createElement(
                    "td"
                );

            emailCell.textContent =
                user.email;


            // ROLE

            const roleCell =
                document.createElement(
                    "td"
                );

            roleCell.textContent =
                user.role;


            // DATE

            const dateCell =
                document.createElement(
                    "td"
                );

            dateCell.textContent =
                user.created_at || "—";


            // BOSHQARUV

            const actionCell =
                document.createElement(
                    "td"
                );


            // O'Z ACCOUNTIMIZ

            if (
                currentUser &&
                Number(user.id) ===
                Number(currentUser.id)
            ) {

                actionCell.textContent =
                    "Sizning accountingiz";

            }

            else {

                // ROLE BUTTON

                const roleButton =
                    document.createElement(
                        "button"
                    );


                if (user.role === "admin") {

                    roleButton.textContent =
                        "Student qilish";

                    roleButton.className =
                        "role-button student-role-button";

                }

                else {

                    roleButton.textContent =
                        "Admin qilish";

                    roleButton.className =
                        "role-button admin-role-button";

                }


                roleButton.addEventListener(
                    "click",

                    function () {

                        changeUserRole(
                            user
                        );

                    }
                );


                actionCell.appendChild(
                    roleButton
                );


                // O'CHIRISH BUTTON

                const deleteButton =
                    document.createElement(
                        "button"
                    );

                deleteButton.textContent =
                    "🗑️ O‘chirish";

                deleteButton.className =
                    "delete-user-button";


                deleteButton.addEventListener(
                    "click",

                    function () {

                        deleteUser(
                            user
                        );

                    }
                );


                actionCell.appendChild(
                    deleteButton
                );

            }


            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(roleCell);
            row.appendChild(dateCell);
            row.appendChild(actionCell);


            usersTableBody.appendChild(
                row
            );

        }
    );

}


// ==========================================
// USER ROLINI O'ZGARTIRISH
// ==========================================

async function changeUserRole(user) {

    let newRole;


    if (user.role === "admin") {

        newRole =
            "student";

    }

    else {

        newRole =
            "admin";

    }


    const roleText =
        newRole === "admin"
            ? "ADMIN"
            : "STUDENT";


    const confirmed =
        confirm(
            user.name +
            " foydalanuvchisini " +
            roleText +
            " qilmoqchimisiz?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                "https://studenthub-7f7e.onrender.com/api/admin/users/" +
                user.id +
                "/role",

                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body:
                        JSON.stringify({
                            role:
                                newRole
                        })

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

            alert(
                data.message ||
                "Rolni o‘zgartirib bo‘lmadi."
            );

            return;
        }


        alert(
            data.user.name +
            " endi " +
            data.user.role +
            "!"
        );


        await loadUsers();

    }

    catch (error) {

        console.error(
            "Role update xatosi:",
            error
        );

        alert(
            "Server bilan bog‘lanib bo‘lmadi."
        );

    }

}


// ==========================================
// USERNI O'CHIRISH
// ==========================================

async function deleteUser(user) {

    const confirmed =
        confirm(
            user.name +
            " foydalanuvchisini o‘chirmoqchimisiz?\n\n" +
            "Bu foydalanuvchining test natijalari ham o‘chadi."
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                "https://studenthub-7f7e.onrender.com/api/admin/users/" +
                user.id,

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

            alert(
                data.message ||
                "Foydalanuvchini o‘chirib bo‘lmadi."
            );

            return;
        }


        alert(
            data.user.name +
            " muvaffaqiyatli o‘chirildi!"
        );


        await loadUsers();

    }

    catch (error) {

        console.error(
            "User delete xatosi:",
            error
        );

        alert(
            "Server bilan bog‘lanib bo‘lmadi."
        );

    }

}


// ==========================================
// USERS BUTTON
// ==========================================

manageUsersButton.addEventListener(
    "click",

    function () {

        loadUsers();

        usersSection.scrollIntoView({
            behavior:
                "smooth"
        });

    }
);


// ==========================================
// START
// ==========================================

checkAdminAccess();