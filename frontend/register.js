// ==========================
// REGISTER ELEMENTLARI
// ==========================

const registerName =
    document.getElementById("registerName");

const registerEmail =
    document.getElementById("registerEmail");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const registerButton =
    document.getElementById("registerButton");

const registerMessage =
    document.getElementById("registerMessage");


// ==========================
// REGISTER
// ==========================

registerButton.addEventListener(
    "click",
    async function () {

        const name =
            registerName.value.trim();

        const email =
            registerEmail.value
                .trim()
                .toLowerCase();

        const password =
            registerPassword.value;

        const confirm =
            confirmPassword.value;


        // BO'SH MAYDONLAR

        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirm === ""
        ) {

            showMessage(
                "Barcha maydonlarni to‘ldiring.",
                "red"
            );

            return;
        }


        // EMAIL

        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            showMessage(
                "Email manzilini to‘g‘ri kiriting.",
                "red"
            );

            return;
        }


        // PAROL

        if (password.length < 6) {

            showMessage(
                "Parol kamida 6 ta belgidan iborat bo‘lishi kerak.",
                "red"
            );

            return;
        }


        // PAROLLAR MOSLIGI

        if (password !== confirm) {

            showMessage(
                "Parollar bir xil emas.",
                "red"
            );

            return;
        }


        try {

            registerButton.disabled =
                true;

            registerButton.textContent =
                "Ro‘yxatdan o‘tilmoqda...";


            // ======================
            // BACKEND REGISTER API
            // ======================

            const response =
                await fetch(
                    "http://localhost:3000/api/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    }
                );


            const data =
                await response.json();


            // ======================
            // XATO
            // ======================

            if (!response.ok) {

                showMessage(
                    data.message ||
                    "Ro‘yxatdan o‘tishda xatolik.",
                    "red"
                );

                return;
            }


            // ======================
            // MUVAFFAQIYATLI
            // ======================

            showMessage(
                "Ro‘yxatdan muvaffaqiyatli o‘tdingiz! ✅ Login sahifasiga o‘tilmoqda...",
                "green"
            );


            // INPUTLARNI TOZALASH

            registerName.value = "";
            registerEmail.value = "";
            registerPassword.value = "";
            confirmPassword.value = "";


            // ======================
            // LOGIN SAHIFASIGA O'TISH
            // ======================

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1500
            );

        }

        catch (error) {

            console.error(
                "Register xatosi:",
                error
            );


            showMessage(
                "Server bilan bog‘lanib bo‘lmadi.",
                "red"
            );

        }

        finally {

            registerButton.disabled =
                false;

            registerButton.textContent =
                "Ro‘yxatdan o‘tish";

        }

    }
);


// ==========================
// XABAR
// ==========================

function showMessage(
    message,
    color
) {

    registerMessage.textContent =
        message;

    registerMessage.style.color =
        color;
}