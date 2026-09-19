// ==================================================
// STUDENT HUB - DARK / LIGHT MODE
// theme.js
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

    const THEME_KEY = "studentHubTheme";


    // ==============================================
    // SAQLANGAN THEME
    // ==============================================

    const savedTheme =
        localStorage.getItem(THEME_KEY);


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }

    else {

        document.body.classList.remove(
            "dark-mode"
        );

    }


    // ==============================================
    // THEME BUTTON
    // ==============================================

    const themeButton =
        document.getElementById(
            "themeButton"
        );


    if (!themeButton) {

        console.warn(
            "Theme button topilmadi."
        );

        return;
    }


    // ==============================================
    // ICON
    // ==============================================

    updateThemeButton();


    // ==============================================
    // BUTTON CLICK
    // ==============================================

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                localStorage.setItem(
                    THEME_KEY,
                    "dark"
                );

            }

            else {

                localStorage.setItem(
                    THEME_KEY,
                    "light"
                );

            }


            updateThemeButton();

        }
    );


    // ==============================================
    // ICONNI YANGILASH
    // ==============================================

    function updateThemeButton() {

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            themeButton.textContent =
                "☀️";

            themeButton.title =
                "Light mode";

        }

        else {

            themeButton.textContent =
                "🌙";

            themeButton.title =
                "Dark mode";

        }

    }

});