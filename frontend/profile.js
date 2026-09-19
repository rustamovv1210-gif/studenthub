// ==========================
// STUDENT HUB PROFILE
// ==========================


// HTML ELEMENTLARI

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const editProfileButton =
    document.getElementById("editProfileButton");

const editProfileForm =
    document.getElementById("editProfileForm");

const editName =
    document.getElementById("editName");

const editEmail =
    document.getElementById("editEmail");

const saveProfileButton =
    document.getElementById("saveProfileButton");

const cancelEditButton =
    document.getElementById("cancelEditButton");

const editProfileMessage =
    document.getElementById("editProfileMessage");

const logoutButton =
    document.getElementById("logoutButton");


// ==========================
// LOGIN MA'LUMOTLARI
// ==========================

const loggedIn =
    localStorage.getItem(
        "studentHubLoggedIn"
    );

const savedUser =
    localStorage.getItem(
        "studentHubUser"
    );

const token =
    localStorage.getItem(
        "studentHubToken"
    );


// LOGIN TEKSHIRISH

if (
    loggedIn !== "true" ||
    savedUser === null ||
    token === null
) {

    window.location.href =
        "login.html";

}


// ==========================
// USER
// ==========================

let user =
    JSON.parse(savedUser);


showProfile();


function showProfile() {

    profileName.textContent =
        user.name;

    profileEmail.textContent =
        user.email;

}


// ==========================
// TAHRIRLASH
// ==========================

editProfileButton.addEventListener(
    "click",
    function () {

        editName.value =
            user.name;

        editEmail.value =
            user.email;

        editProfileMessage.textContent =
            "";

        editProfileForm.style.display =
            "block";

        editProfileButton.style.display =
            "none";

    }
);


// ==========================
// BEKOR QILISH
// ==========================

cancelEditButton.addEventListener(
    "click",
    function () {

        editProfileForm.style.display =
            "none";

        editProfileButton.style.display =
            "inline-block";

        editProfileMessage.textContent =
            "";

    }
);


// ==========================
// PROFILNI SAQLASH
// ==========================

saveProfileButton.addEventListener(
    "click",
    async function () {

        const newName =
            editName.value.trim();

        const newEmail =
            editEmail.value
                .trim()
                .toLowerCase();


        if (
            newName === "" ||
            newEmail === ""
        ) {

            showMessage(
                "Ism va emailni kiriting.",
                "red"
            );

            return;
        }


        if (
            !newEmail.includes("@") ||
            !newEmail.includes(".")
        ) {

            showMessage(
                "Email manzilini to‘g‘ri kiriting.",
                "red"
            );

            return;
        }


        try {

            saveProfileButton.disabled =
                true;

            saveProfileButton.textContent =
                "Saqlanmoqda...";


            const oldEmail =
                user.email;


            // ==========================
            // BACKENDGA SO'ROV
            // ==========================

            const response =
                await fetch(
                    "http://localhost:3000/api/profile",
                    {
                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            name:
                                newName,

                            email:
                                newEmail

                        })
                    }
                );


            const data =
                await response.json();


            // ==========================
            // TOKEN XATO BO'LSA
            // ==========================

            if (response.status === 401) {

                localStorage.removeItem(
                    "studentHubLoggedIn"
                );

                localStorage.removeItem(
                    "studentHubUser"
                );

                localStorage.removeItem(
                    "studentHubToken"
                );


                alert(
                    "Login muddati tugagan. Qayta login qiling."
                );


                window.location.href =
                    "login.html";

                return;
            }


            // ==========================
            // BOSHQA XATO
            // ==========================

            if (!response.ok) {

                showMessage(
                    data.message ||
                    "Profilni yangilab bo‘lmadi.",
                    "red"
                );

                return;
            }


            // ==========================
            // TEST NATIJALARINI
            // YANGI EMAILGA KO'CHIRISH
            // ==========================

            if (
                oldEmail !==
                data.user.email
            ) {

                const allResults =
                    JSON.parse(
                        localStorage.getItem(
                            "studentHubUserResults"
                        )
                    ) || {};


                const oldResults =
                    allResults[oldEmail] || [];


                if (oldResults.length > 0) {

                    allResults[
                        data.user.email
                    ] = [
                        ...(
                            allResults[
                                data.user.email
                            ] || []
                        ),

                        ...oldResults
                    ];

                }


                delete allResults[
                    oldEmail
                ];


                localStorage.setItem(
                    "studentHubUserResults",
                    JSON.stringify(
                        allResults
                    )
                );

            }


            // ==========================
            // USERNI YANGILASH
            // ==========================

            user =
                data.user;


            localStorage.setItem(
                "studentHubUser",
                JSON.stringify(user)
            );


            showProfile();


            // NAVBAR

            const accountLink =
                document.querySelector(
                    ".account-link"
                );


            if (accountLink) {

                accountLink.textContent =
                    "👤 " + user.name;

            }


            showMessage(
                "Profil muvaffaqiyatli saqlandi! ✅",
                "green"
            );


            setTimeout(
                function () {

                    editProfileForm.style.display =
                        "none";

                    editProfileButton.style.display =
                        "inline-block";

                    editProfileMessage.textContent =
                        "";

                },
                1200
            );

        }

        catch (error) {

            console.error(
                "Profile xatosi:",
                error
            );


            showMessage(
                "Server bilan bog‘lanib bo‘lmadi.",
                "red"
            );

        }

        finally {

            saveProfileButton.disabled =
                false;

            saveProfileButton.textContent =
                "💾 Saqlash";

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

    editProfileMessage.textContent =
        message;

    editProfileMessage.style.color =
        color;

}


// ==========================
// LOGOUT
// ==========================

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "studentHubLoggedIn"
        );

        localStorage.removeItem(
            "studentHubUser"
        );

        localStorage.removeItem(
            "studentHubToken"
        );


        window.location.href =
            "login.html";

    }
);