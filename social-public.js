/* =====================================================
   PUBLIC SOCIAL LINKS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadPublicSocialLinks
);


async function loadPublicSocialLinks() {

    try {

        const response =
            await fetch(
                "http://aditya-portfolio-backend-jsib.onrender.com/api/social"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load social links."
            );

        }


        const social =
            await response.json();


        /* =================================================
           SOCIAL LINK MAPPING
        ================================================= */

        const links = {

            github:
                social.github,

            linkedin:
                social.linkedin,

            instagram:
                social.instagram,

            whatsapp:
                social.whatsapp,

            facebook:
                social.facebook,

            x:
                social.x

        };


        /*
         * Any social anchor can identify itself
         * using data-social="github", etc.
         */

        Object.entries(
            links
        ).forEach(
            ([platform, url]) => {

                const elements =
                    document.querySelectorAll(
                        `[data-social="${platform}"]`
                    );


                elements.forEach(
                    element => {

                        if (url) {

                            element.href =
                                url;

                            element.target =
                                "_blank";

                            element.rel =
                                "noopener noreferrer";

                            element.style.display =
                                "";

                        } else {

                            element.style.display =
                                "none";

                        }

                    }
                );

            }
        );


        /* =================================================
           EMAIL
        ================================================= */

        const emailElements =
            document.querySelectorAll(
                '[data-contact="email"]'
            );


        emailElements.forEach(
            element => {

                if (social.email) {

                    element.href =
                        `mailto:${social.email}`;

                } else {

                    element.style.display =
                        "none";

                }

            }
        );


        /* =================================================
           PHONE
        ================================================= */

        const phoneElements =
            document.querySelectorAll(
                '[data-contact="phone"]'
            );


        phoneElements.forEach(
            element => {

                if (social.phone) {

                    const cleanPhone =
                        social.phone
                            .replace(
                                /[^0-9+]/g,
                                ""
                            );


                    element.href =
                        `tel:${cleanPhone}`;

                } else {

                    element.style.display =
                        "none";

                }

            }
        );


        /* =================================================
           FOOTER CREDIT
        ================================================= */

        const footerCredit =
            document.querySelector(
                "#footerCredit"
            );


        if (footerCredit) {

            footerCredit.innerHTML = `
                © 2026 Aditya Kumar.
                All Rights Reserved.
            `;

        }


        const developerCredit =
            document.querySelector(
                "#developerCredit"
            );


        if (developerCredit) {

            developerCredit.textContent =
                "Designed & Developed by Aditya Kumar";

        }


    } catch (error) {

        console.error(
            "Social links error:",
            error
        );

    }

}