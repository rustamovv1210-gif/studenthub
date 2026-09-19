// ==================================================
// STUDENT HUB - PROFESSIONAL NAVBAR
// navbar.js
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");

    if (!header) {
        return;
    }


    // ==================================================
    // LOGIN MA'LUMOTLARI
    // ==================================================

    const loggedIn =
        localStorage.getItem("studentHubLoggedIn") === "true";

    const savedUser =
        localStorage.getItem("studentHubUser");

    let user = null;

    if (savedUser) {

        try {
            user = JSON.parse(savedUser);
        }

        catch (error) {
            console.error(
                "User ma'lumotini o'qishda xato:",
                error
            );
        }
    }


    // ==================================================
    // HOZIRGI SAHIFA
    // ==================================================

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();

    if (!currentPage) {
        currentPage = "index.html";
    }


    // ==================================================
    // HEADERNI TO'LIQ YARATISH
    // ==================================================

    header.innerHTML = `

        <div class="studenthub-navbar">

            <a
                href="index.html"
                class="studenthub-logo"
            >
                <span class="studenthub-logo-icon">
                    🎓
                </span>

                <span>
                    Student Hub
                </span>
            </a>


            <button
                type="button"
                id="mobileMenuButton"
                class="mobile-menu-button"
                aria-label="Menyuni ochish"
            >
                ☰
            </button>


            <div
                id="studentHubNavMenu"
                class="studenthub-nav-menu"
            >

                <div class="studenthub-nav-links">

                    ${createNavLink(
                        "index.html",
                        "Bosh sahifa",
                        currentPage
                    )}

                    ${createNavLink(
                        "subjects.html",
                        "Fanlar",
                        currentPage
                    )}

                    ${createNavLink(
                        "tests.html",
                        "Testlar",
                        currentPage
                    )}

                    ${createNavLink(
                        "schedule.html",
                        "Dars jadvali",
                        currentPage
                    )}

                    ${createNavLink(
                        "materials.html",
                        "Materiallar",
                        currentPage
                    )}

                    ${
                        loggedIn
                            ? createNavLink(
                                "dashboard.html",
                                "Dashboard",
                                currentPage
                            )
                            : ""
                    }

                </div>


                <div class="studenthub-nav-actions">

                    <button
                        type="button"
                        id="themeButton"
                        class="studenthub-theme-button"
                        title="Dark / Light Mode"
                    >
                        🌙
                    </button>


                    ${
                        loggedIn && user

                            ? `

                                <a
                                    href="profile.html"
                                    class="
                                        studenthub-account
                                        ${
                                            currentPage ===
                                            "profile.html"
                                                ? "active"
                                                : ""
                                        }
                                    "
                                >

                                    <span class="account-avatar">
                                        ${getInitial(
                                            user.name
                                        )}
                                    </span>

                                    <span class="account-name">
                                        ${escapeNavbarHtml(
                                            user.name ||
                                            "Profil"
                                        )}
                                    </span>

                                </a>

                            `

                            : `

                                <a
                                    href="login.html"
                                    class="studenthub-login-button"
                                >
                                    Kirish
                                </a>

                            `
                    }

                </div>

            </div>

        </div>

    `;


    // ==================================================
    // NAVBAR CSS
    // ==================================================

    addNavbarStyles();


    // ==================================================
    // MOBILE MENU
    // ==================================================

    const mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const navMenu =
        document.getElementById(
            "studentHubNavMenu"
        );


    if (
        mobileMenuButton &&
        navMenu
    ) {

        mobileMenuButton.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle(
                    "mobile-open"
                );

                if (
                    navMenu.classList.contains(
                        "mobile-open"
                    )
                ) {

                    mobileMenuButton.textContent =
                        "✕";

                }

                else {

                    mobileMenuButton.textContent =
                        "☰";

                }

            }
        );
    }


    // ==================================================
    // MOBILEDA LINK BOSILGANDA MENYUNI YOPISH
    // ==================================================

    const menuLinks =
        header.querySelectorAll(
            ".studenthub-nav-menu a"
        );


    menuLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (navMenu) {

                        navMenu.classList.remove(
                            "mobile-open"
                        );

                    }

                    if (mobileMenuButton) {

                        mobileMenuButton.textContent =
                            "☰";

                    }

                }
            );

        }
    );


    // ==================================================
    // DARK MODE BUTTON
    // theme.js YUKLANISHIDAN OLDIN TAYYOR
    // ==================================================

    updateNavbarThemeIcon();

});


// ==================================================
// NAV LINK YARATISH
// ==================================================

function createNavLink(
    href,
    text,
    currentPage
) {

    const active =
        currentPage === href
            ? "active"
            : "";

    return `

        <a
            href="${href}"
            class="studenthub-nav-link ${active}"
        >
            ${text}
        </a>

    `;
}


// ==================================================
// USER ISMINING BIRINCHI HARFI
// ==================================================

function getInitial(name) {

    if (!name) {
        return "U";
    }

    return String(name)
        .trim()
        .charAt(0)
        .toUpperCase();
}


// ==================================================
// HTML XAVFSIZLIGI
// ==================================================

function escapeNavbarHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}


// ==================================================
// THEME ICON
// ==================================================

function updateNavbarThemeIcon() {

    const themeButton =
        document.getElementById(
            "themeButton"
        );

    if (!themeButton) {
        return;
    }

    const savedTheme =
        localStorage.getItem(
            "studentHubTheme"
        );

    if (
        savedTheme === "dark" ||
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        themeButton.textContent =
            "☀️";

    }

    else {

        themeButton.textContent =
            "🌙";

    }
}


// ==================================================
// NAVBAR CSS
// ==================================================

function addNavbarStyles() {

    if (
        document.getElementById(
            "studentHubNavbarStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "studentHubNavbarStyles";


    style.textContent = `

        /* =====================================
           HEADER
        ===================================== */

        header {
            position: sticky;
            top: 0;
            z-index: 1000;

            width: 100%;

            box-sizing: border-box;

            background:
                rgba(255, 255, 255, 0.92);

            border-bottom:
                1px solid
                rgba(120, 120, 120, 0.15);

            backdrop-filter:
                blur(16px);

            -webkit-backdrop-filter:
                blur(16px);
        }


        /* =====================================
           NAVBAR
        ===================================== */

        .studenthub-navbar {
            width: min(1300px, 94%);

            min-height: 72px;

            margin: 0 auto;

            display: flex;

            align-items: center;

            gap: 25px;
        }


        /* =====================================
           LOGO
        ===================================== */

        .studenthub-logo {
            flex-shrink: 0;

            display: flex;

            align-items: center;

            gap: 9px;

            color: #111827;

            text-decoration: none;

            font-size: 20px;

            font-weight: 800;
        }

        .studenthub-logo-icon {
            width: 38px;
            height: 38px;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 11px;

            background:
                rgba(37, 99, 235, 0.10);

            font-size: 21px;
        }


        /* =====================================
           MENU
        ===================================== */

        .studenthub-nav-menu {
            flex: 1;

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;
        }

        .studenthub-nav-links {
            display: flex;

            align-items: center;

            gap: 5px;
        }

        .studenthub-nav-link {
            position: relative;

            padding: 9px 11px;

            border-radius: 9px;

            color: #4b5563;

            text-decoration: none;

            font-size: 14px;

            font-weight: 600;

            transition:
                background 0.2s ease,
                color 0.2s ease;
        }

        .studenthub-nav-link:hover {
            background:
                rgba(37, 99, 235, 0.08);

            color: #2563eb;
        }

        .studenthub-nav-link.active {
            background:
                rgba(37, 99, 235, 0.10);

            color: #2563eb;
        }


        /* =====================================
           RIGHT ACTIONS
        ===================================== */

        .studenthub-nav-actions {
            display: flex;

            align-items: center;

            gap: 9px;
        }


        /* =====================================
           THEME BUTTON
        ===================================== */

        .studenthub-theme-button {
            width: 40px;
            height: 40px;

            flex-shrink: 0;

            display: flex;

            align-items: center;

            justify-content: center;

            border:
                1px solid
                rgba(120, 120, 120, 0.18);

            border-radius: 10px;

            background: transparent;

            cursor: pointer;

            font-size: 17px;
        }


        /* =====================================
           ACCOUNT
        ===================================== */

        .studenthub-account {
            max-width: 190px;

            display: flex;

            align-items: center;

            gap: 8px;

            padding: 5px 10px 5px 5px;

            border:
                1px solid
                rgba(120, 120, 120, 0.18);

            border-radius: 12px;

            color: #111827;

            text-decoration: none;

            font-size: 13px;

            font-weight: 700;
        }

        .studenthub-account:hover,
        .studenthub-account.active {
            border-color:
                rgba(37, 99, 235, 0.45);

            background:
                rgba(37, 99, 235, 0.06);
        }

        .account-avatar {
            width: 31px;
            height: 31px;

            flex-shrink: 0;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 9px;

            background: #2563eb;

            color: white;

            font-size: 13px;

            font-weight: 800;
        }

        .account-name {
            overflow: hidden;

            text-overflow: ellipsis;

            white-space: nowrap;
        }


        /* =====================================
           LOGIN BUTTON
        ===================================== */

        .studenthub-login-button {
            display: inline-flex;

            align-items: center;

            justify-content: center;

            padding: 10px 17px;

            border-radius: 9px;

            background: #2563eb;

            color: white;

            text-decoration: none;

            font-size: 13px;

            font-weight: 700;
        }


        /* =====================================
           MOBILE BUTTON
        ===================================== */

        .mobile-menu-button {
            display: none;

            width: 42px;
            height: 42px;

            margin-left: auto;

            border:
                1px solid
                rgba(120, 120, 120, 0.18);

            border-radius: 10px;

            background: transparent;

            color: inherit;

            cursor: pointer;

            font-size: 20px;
        }


        /* =====================================
           DARK MODE
        ===================================== */

        body.dark-mode header {
            background:
                rgba(15, 23, 42, 0.92);

            border-bottom-color:
                #263449;
        }

        body.dark-mode
        .studenthub-logo {
            color: #f8fafc;
        }

        body.dark-mode
        .studenthub-nav-link {
            color: #cbd5e1;
        }

        body.dark-mode
        .studenthub-nav-link:hover,

        body.dark-mode
        .studenthub-nav-link.active {
            color: #60a5fa;

            background:
                rgba(59, 130, 246, 0.12);
        }

        body.dark-mode
        .studenthub-account {
            color: #f8fafc;

            border-color: #334155;
        }

        body.dark-mode
        .studenthub-theme-button,

        body.dark-mode
        .mobile-menu-button {
            border-color: #334155;

            color: #f8fafc;
        }


        /* =====================================
           TABLET / MOBILE
        ===================================== */

        @media (max-width: 1050px) {

            .mobile-menu-button {
                display: flex;

                align-items: center;

                justify-content: center;
            }

            .studenthub-navbar {
                position: relative;

                min-height: 68px;
            }

            .studenthub-nav-menu {
                display: none;

                position: absolute;

                top: calc(100% + 1px);

                left: 0;

                right: 0;

                padding: 16px;

                border:
                    1px solid
                    rgba(120, 120, 120, 0.18);

                border-radius:
                    0 0 16px 16px;

                background: #ffffff;

                box-shadow:
                    0 15px 30px
                    rgba(0, 0, 0, 0.10);
            }

            .studenthub-nav-menu.mobile-open {
                display: block;
            }

            .studenthub-nav-links {
                display: flex;

                flex-direction: column;

                align-items: stretch;

                gap: 4px;
            }

            .studenthub-nav-link {
                padding: 11px 12px;
            }

            .studenthub-nav-actions {
                margin-top: 12px;

                padding-top: 12px;

                border-top:
                    1px solid
                    rgba(120, 120, 120, 0.15);

                justify-content:
                    space-between;
            }

            .studenthub-account {
                max-width: 230px;
            }

            body.dark-mode
            .studenthub-nav-menu {
                background: #172033;

                border-color: #334155;
            }

            body.dark-mode
            .studenthub-nav-actions {
                border-top-color: #334155;
            }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 480px) {

            .studenthub-navbar {
                width: 92%;
            }

            .studenthub-logo {
                font-size: 18px;
            }

            .studenthub-logo-icon {
                width: 35px;
                height: 35px;
            }

            .studenthub-nav-actions {
                align-items: stretch;
            }

            .studenthub-account {
                flex: 1;
            }

        }

    `;


    document.head.appendChild(style);
}