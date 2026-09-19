// ==========================
// STUDENT HUB USER RESULTS
// BACKEND VERSION
// ==========================


// ==========================
// CURRENT USER
// ==========================

function getCurrentUser() {

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


    if (
        loggedIn !== "true" ||
        savedUser === null ||
        token === null
    ) {

        return null;

    }


    try {

        return JSON.parse(
            savedUser
        );

    }

    catch (error) {

        return null;

    }

}


// ==========================
// TOKEN
// ==========================

function getStudentHubToken() {

    return localStorage.getItem(
        "studentHubToken"
    );

}


// ==========================
// LOGINNI TOZALASH
// ==========================

function clearStudentHubLogin() {

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


// ==========================
// TEST NATIJASINI SAQLASH
// ==========================

async function saveUserTestResult(
    subjectName,
    score,
    total
) {

    const user =
        getCurrentUser();

    const token =
        getStudentHubToken();


    if (
        user === null ||
        token === null
    ) {

        return {
            success: false,
            loginRequired: true
        };

    }


    try {

        const response =
            await fetch(
                "https://studenthub-7f7e.onrender.com/api/results",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token

                    },

                    body: JSON.stringify({

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


        // TOKEN YAROQSIZ

        if (response.status === 401) {

            clearStudentHubLogin();


            return {
                success: false,
                loginRequired: true,
                message:
                    data.message
            };

        }


        if (!response.ok) {

            console.error(
                "Natijani saqlash xatosi:",
                data
            );


            return {
                success: false,
                message:
                    data.message
            };

        }


        return {
            success: true,
            result:
                data.result
        };

    }

    catch (error) {

        console.error(
            "Server bilan bog‘lanish xatosi:",
            error
        );


        return {
            success: false,
            message:
                "Server bilan bog‘lanib bo‘lmadi."
        };

    }

}


// ==========================
// TEST NATIJALARINI OLISH
// ==========================

async function getUserTestResults() {

    const user =
        getCurrentUser();

    const token =
        getStudentHubToken();


    if (
        user === null ||
        token === null
    ) {

        return [];

    }


    try {

        const response =
            await fetch(
                "https://studenthub-7f7e.onrender.com/api/results",
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

            clearStudentHubLogin();

            window.location.href =
                "login.html";


            return [];

        }


        if (!response.ok) {

            console.error(
                "Natijalarni olish xatosi:",
                data
            );

            return [];

        }


        // ESKI FRONTEND FORMATIGA
        // MOSLAB QAYTARAMIZ

        return data.results.map(
            function (result) {

                return {

                    id:
                        result.id,

                    subject:
                        result.subject,

                    score:
                        result.score,

                    total:
                        result.total,

                    date:
                        result.created_at

                };

            }
        );

    }

    catch (error) {

        console.error(
            "Natijalarni olishda server xatosi:",
            error
        );


        return [];

    }

}