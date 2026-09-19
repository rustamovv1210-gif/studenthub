// ==========================
// STUDENT HUB LOGIN
// ==========================

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginButton =
    document.getElementById("loginButton");

const loginMessage =
    document.getElementById("loginMessage");


// ==========================
// LOGIN
// ==========================

loginButton.addEventListener(
    "click",
    async function () {

        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;


        if (
            email === "" ||
            password === ""
        ) {

            showMessage(
                "Email va parolni kiriting.",
                "red"
            );

            return;
        }


        try {

            loginButton.disabled = true;

            loginButton.textContent =
                "Kirilmoqda...";


            const response =
                await fetch(
                    "https://studenthub-7f7e.onrender.com/api/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                showMessage(
                    data.message ||
                    "Login amalga oshmadi.",
                    "red"
                );

                return;
            }


            // ==========================
            // TOKENNI SAQLASH
            // ==========================

            localStorage.setItem(
                "studentHubToken",
                data.token
            );


            // ==========================
            // USERNI SAQLASH
            // ==========================

            localStorage.setItem(
                "studentHubUser",
                JSON.stringify(
                    data.user
                )
            );


            localStorage.setItem(
                "studentHubLoggedIn",
                "true"
            );


            showMessage(
                "Xush kelibsiz, " +
                data.user.name +
                "! ✅",
                "green"
            );


            // ==========================
            // YO'NALTIRISH
            // ==========================

            setTimeout(
                function () {

                    if (
                        data.user.role ===
                        "admin"
                    ) {

                        window.location.href =
                            "admin.html";

                    } else {

                        window.location.href =
                            "index.html";

                    }

                },
                1000
            );

        }

        catch (error) {

            console.error(
                "Login xatosi:",
                error
            );


            showMessage(
                "Server bilan bog‘lanib bo‘lmadi.",
                "red"
            );

        }

        finally {

            loginButton.disabled = false;

            loginButton.textContent =
                "Kirish";

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

    loginMessage.textContent =
        message;

    loginMessage.style.color =
        color;

}