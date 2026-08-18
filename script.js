document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. ANIMATED ROLE TEXT
    ========================================= */

    const roles = [
        "Full Stack Developer",
        "Data Analyst",
        "QA / Testing Enthusiast"
    ];

    const roleElement = document.querySelector(".hero h2");

    let roleIndex = 0;

    setInterval(() => {

        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        roleElement.style.opacity = "0";

        setTimeout(() => {

            roleElement.textContent = roles[roleIndex];

            roleElement.style.opacity = "1";

        }, 300);

    }, 2500);


    /* =========================================
       2. NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =========================================
       3. MOUSE MOVE EFFECT
    ========================================= */

    const hero = document.querySelector(".hero");
    const codeCard = document.querySelector(".code-card");

   if (hero && codeCard) {
    hero.addEventListener("mousemove", (event) => {
        const x = event.clientX;
        const y = event.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (x - centerX) / 50;
        const moveY = (y - centerY) / 50;

        codeCard.style.transform = `
            rotateY(${-8 + moveX}deg)
            rotateX(${3 - moveY}deg)
            translateY(-5px)
        `;
    });

    hero.addEventListener("mouseleave", () => {
        codeCard.style.transform =
            "rotateY(-8deg) rotateX(3deg)";
    });
}
});
/* =========================================
   4. CUSTOM CURSOR
========================================= */

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");

const cursorOutline = document.createElement("div");
cursorOutline.classList.add("cursor-outline");

document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);


document.addEventListener("mousemove", (event) => {

    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;

    cursorOutline.style.left = `${event.clientX}px`;
    cursorOutline.style.top = `${event.clientY}px`;

});


/* CURSOR HOVER */

const interactiveElements = document.querySelectorAll(
    "a, button"
);

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        document.body.classList.add("cursor-hover");

    });

    element.addEventListener("mouseleave", () => {

        document.body.classList.remove("cursor-hover");

    });

});
/* =========================================
   5. SKILLS TABS
========================================= */

const skillTabs =
    document.querySelectorAll(".skill-tab");

const skillPanels =
    document.querySelectorAll(".skill-panel");


skillTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const category =
            tab.dataset.category;


        /* REMOVE ACTIVE FROM TABS */

        skillTabs.forEach((item) => {
            item.classList.remove("active");
        });


        /* ACTIVATE CLICKED TAB */

        tab.classList.add("active");


        /* HIDE ALL PANELS */

        skillPanels.forEach((panel) => {
            panel.classList.remove("active");
        });


        /* SHOW SELECTED PANEL */

        const selectedPanel =
            document.querySelector(
                `[data-panel="${category}"]`
            );


        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

    });

});
/* =========================================
   6. PROJECT FILTERS
========================================= */

const projectFilters =
    document.querySelectorAll(".project-filter");

const projectCards =
    document.querySelectorAll(".project-card");


projectFilters.forEach((filterButton) => {

    filterButton.addEventListener("click", () => {

        const selectedFilter =
            filterButton.dataset.filter;


        /* REMOVE ACTIVE */

        projectFilters.forEach((button) => {

            button.classList.remove("active");

        });


        /* ADD ACTIVE */

        filterButton.classList.add("active");


        /* FILTER PROJECTS */

        projectCards.forEach((card) => {

            const projectCategory =
                card.dataset.category;


            if (
                selectedFilter === "all" ||
                projectCategory === selectedFilter
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});
/* =========================================
   8. CERTIFICATE FILTERS
========================================= */

const certificateFilters =
    document.querySelectorAll(
        ".certificate-filter"
    );

const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );


certificateFilters.forEach((filterButton) => {

    filterButton.addEventListener(
        "click",
        () => {

            const selectedFilter =
                filterButton.dataset.filter;


            certificateFilters.forEach(
                (button) => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            filterButton.classList.add(
                "active"
            );


            certificateCards.forEach(
                (card) => {

                    const category =
                        card.dataset.category;


                    if (
                        selectedFilter === "all" ||
                        category === selectedFilter
                    ) {

                        card.style.display =
                            "block";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

});
/* =====================================================
   DYNAMIC PROFILE / ABOUT
===================================================== */

async function loadProfileData() {

    try {

        const response =
            await fetch(
                "https://aditya-portfolio-backend-jsib.onrender.com/api/profile"
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load profile."
            );
        }


        const profile =
            await response.json();


        /*
         * IMPORTANT:
         * Neeche wale IDs ko apne existing
         * About section ke HTML IDs se match
         * karna hai.
         */


        const nameElement =
            document.querySelector("#profileName");

        const headlineElement =
            document.querySelector("#profileHeadline");

        const summaryElement =
            document.querySelector("#profileSummary");

        const locationElement =
            document.querySelector("#profileLocation");

        const emailElements =
            document.querySelectorAll(
                ".profileEmail"
            );

        const profileImage =
            document.querySelector(
                "#profileImage"
            );


        if (nameElement) {

            nameElement.textContent =
                profile.name || "";

        }


        if (headlineElement) {

            headlineElement.textContent =
                profile.headline || "";

        }


        if (summaryElement) {

            summaryElement.textContent =
                profile.summary || "";

        }


        if (locationElement) {

            locationElement.textContent =
                profile.location || "";

        }


        emailElements.forEach(
            (element) => {

                element.textContent =
                    profile.email || "";

                element.href =
                    `mailto:${profile.email}`;

            }
        );


        if (
            profileImage &&
            profile.profileImage
        ) {

            profileImage.src =
                profile.profileImage;

        }


        /*
         * Resume
         */

        const resumeLinks =
            document.querySelectorAll(
                ".resumeLink"
            );


        resumeLinks.forEach(
            (link) => {

                if (profile.resumeUrl) {

                    link.href =
                        profile.resumeUrl;

                    link.target =
                        "_blank";

                }

            }
        );


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


loadProfileData();