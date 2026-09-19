// ==========================================
// STUDENT HUB - ADMIN USERS
// ==========================================


// TOKEN VA USER
const token = localStorage.getItem("studentHubToken");
const savedUser = localStorage.getItem("studentHubUser");


// Login qilinmagan bo'lsa
if (!token || !savedUser) {

    window.location.href = "login.html";

}


// Hozirgi user
let currentUser = null;

try {

    currentUser = JSON.parse(savedUser);

} catch (error) {

    console.error("User ma'lumotini o'qishda xato:", error);

}


// HTML ELEMENTLAR
const usersMessage =
    document.getElementById("usersMessage");

const usersTableBody =
    document.getElementById("usersTableBody");


// ==========================================
// LOGINNI TOZALASH
// ==========================================

function clearLogin() {

    localStorage.removeItem("studentHubLoggedIn");
    localStorage.removeItem("studentHubUser");
    localStorage.removeItem("studentHubToken");

}


// ==========================================
// ADMIN EKANINI TEKSHIRISH
// ==========================================

async function checkAdminAccess() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/admin",
            {
                method: "GET",

                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );


        const data = await response.json();


        if (response.status === 401) {

            clearLogin();

            alert("Login muddati tugagan. Qayta login qiling.");

            window.location.href = "login.html";

            return false;
        }


        if (response.status === 403) {

            alert("Bu sahifaga faqat administrator kira oladi.");

            window.location.href = "index.html";

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

        console.error(
            "Admin tekshirish xatosi:",
            error
        );

        alert(
            "Server bilan bog‘lanib bo‘lmadi."
        );

        return false;
    }
}


// ==========================================
// FOYDALANUVCHILARNI SERVERDAN OLISH
// ==========================================

async function loadUsers() {

    usersMessage.textContent =
        "Foydalanuvchilar yuklanmoqda...";

    usersTableBody.innerHTML = "";


    try {

        const response = await fetch(
            "http://localhost:3000/api/admin/users",
            {
                method: "GET",

                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );


        const data = await response.json();


        if (response.status === 401) {

            clearLogin();

            alert("Qayta login qiling.");

            window.location.href = "login.html";

            return;
        }


        if (response.status === 403) {

            alert(
                "Foydalanuvchilarni faqat admin ko‘ra oladi."
            );

            window.location.href = "index.html";

            return;
        }


        if (!response.ok) {

            usersMessage.textContent =
                data.message ||
                "Foydalanuvchilarni yuklab bo‘lmadi.";

            return;
        }


        showUsers(data.users);


    } catch (error) {

        console.error(
            "Users yuklash xatosi:",
            error
        );

        usersMessage.textContent =
            "Server bilan bog‘lanib bo‘lmadi.";
    }
}


// ==========================================
// TABLEGA CHIQARISH
// ==========================================

function showUsers(users) {

    usersTableBody.innerHTML = "";


    if (!users || users.length === 0) {

        usersMessage.textContent =
            "Foydalanuvchilar mavjud emas.";

        return;
    }


    usersMessage.textContent =
        "Jami foydalanuvchilar: " +
        users.length;


    users.forEach(function (user) {

        const row =
            document.createElement("tr");


        // ID
        const idCell =
            document.createElement("td");

        idCell.textContent = user.id;


        // ISM
        const nameCell =
            document.createElement("td");

        nameCell.textContent = user.name;


        // EMAIL
        const emailCell =
            document.createElement("td");

        emailCell.textContent = user.email;


        // ROLE
        const roleCell =
            document.createElement("td");

        roleCell.textContent = user.role;


        // DATE
        const dateCell =
            document.createElement("td");

        dateCell.textContent =
            user.created_at || "—";


        // ACTION
        const actionCell =
            document.createElement("td");


        // O'z accountimiz bo'lsa
        if (
            currentUser &&
            Number(user.id) === Number(currentUser.id)
        ) {

            actionCell.textContent =
                "Sizning accountingiz";

        } else {

            // ==============================
            // ROLE BUTTON
            // ==============================

            const roleButton =
                document.createElement("button");


            if (user.role === "admin") {

                roleButton.textContent =
                    "Student qilish";

            } else {

                roleButton.textContent =
                    "Admin qilish";
            }


            roleButton.addEventListener(
                "click",
                function () {

                    changeUserRole(user);

                }
            );


            actionCell.appendChild(roleButton);


            // Bo'sh joy
            actionCell.appendChild(
                document.createTextNode(" ")
            );


            // ==============================
            // DELETE BUTTON
            // ==============================

            const deleteButton =
                document.createElement("button");


            deleteButton.textContent =
                "🗑️ O‘chirish";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteUser(user);

                }
            );


            actionCell.appendChild(deleteButton);
        }


        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(roleCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);


        usersTableBody.appendChild(row);
    });
}


// ==========================================
// ROLE O'ZGARTIRISH
// ==========================================

async function changeUserRole(user) {

    let newRole;


    if (user.role === "admin") {

        newRole = "student";

    } else {

        newRole = "admin";
    }


    const confirmed = confirm(
        user.name +
        " foydalanuvchisini " +
        newRole +
        " qilmoqchimisiz?"
    );


    if (!confirmed) {

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:3000/api/admin/users/" +
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

                body: JSON.stringify({
                    role: newRole
                })
            }
        );


        const data = await response.json();


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
            user.name +
            " roli muvaffaqiyatli o‘zgartirildi!"
        );


        await loadUsers();


    } catch (error) {

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
// FOYDALANUVCHINI O'CHIRISH
// ==========================================

async function deleteUser(user) {

    const confirmed = confirm(
        user.name +
        " foydalanuvchisini o‘chirmoqchimisiz?\n\n" +
        "Uning test natijalari ham o‘chiriladi."
    );


    if (!confirmed) {

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:3000/api/admin/users/" +
            user.id,
            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );


        const data = await response.json();


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
            user.name +
            " muvaffaqiyatli o‘chirildi!"
        );


        await loadUsers();


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
// SAHIFANI ISHGA TUSHIRISH
// ==========================================

async function startAdminUsersPage() {

    const allowed =
        await checkAdminAccess();


    if (!allowed) {

        return;
    }


    await loadUsers();
}


startAdminUsersPage();