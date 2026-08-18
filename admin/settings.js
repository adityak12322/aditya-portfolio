const token =
    localStorage.getItem(
        "adminToken"
    );


if (!token) {

    window.location.href =
        "login.html";

}


/* =====================================================
   ELEMENTS
===================================================== */

const form =
    document.querySelector(
        "#settingsForm"
    );

const portfolioTitle =
    document.querySelector(
        "#portfolioTitle"
    );

const availabilityText =
    document.querySelector(
        "#availabilityText"
    );

const availableForWork =
    document.querySelector(
        "#availableForWork"
    );

const showEmail =
    document.querySelector(
        "#showEmail"
    );

const showPhone =
    document.querySelector(
        "#showPhone"
    );

const footerYear =
    document.querySelector(
        "#footerYear"
    );

const message =
    document.querySelector(
        "#settingsMessage"
    );

const saveButton =
    document.querySelector(
        "#saveButton"
    );


/* =====================================================
   LOAD SETTINGS
===================================================== */

async function loadSettings() {

    try {

        const response =
            await fetch(
                "https://aditya-portfolio-backend-jsib.onrender.com/api/settings"
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load settings."
            );

        }


        portfolioTitle.value =
            data.portfolioTitle || "";


        availabilityText.value =
            data.availabilityText || "";


        availableForWork.checked =
            Boolean(
                data.availableForWork
            );


        showEmail.checked =
            Boolean(
                data.showEmail
            );


        showPhone.checked =
            Boolean(
                data.showPhone
            );


        footerYear.value =
            data.footerYear || "2026";


    } catch (error) {

        message.textContent =
            error.message;

        message.className =
            "save-message error";

    }

}


/* =====================================================
   SAVE SETTINGS
===================================================== */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        saveButton.disabled =
            true;


        saveButton
            .querySelector("span")
            .textContent =
                "Saving...";


        const data = {

            portfolioTitle:
                portfolioTitle.value.trim(),

            availabilityText:
                availabilityText.value.trim(),

            availableForWork:
                availableForWork.checked,

            showEmail:
                showEmail.checked,

            showPhone:
                showPhone.checked,

            footerYear:
                footerYear.value.trim() ||
                "2026"

        };


        try {

            const response =
                await fetch(
                    "https://aditya-portfolio-backend-jsib.onrender.com/api/settings",
                    {

                        method:
                            "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                data
                            )

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to save settings."
                );

            }


            message.textContent =
                "✓ Settings saved successfully.";

            message.className =
                "save-message success";


        } catch (error) {

            message.textContent =
                error.message;

            message.className =
                "save-message error";

        } finally {

            saveButton.disabled =
                false;


            saveButton
                .querySelector("span")
                .textContent =
                    "Save Settings";

        }

    }
);


/* =====================================================
   INITIAL LOAD
===================================================== */

loadSettings();