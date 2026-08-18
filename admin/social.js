const token =
    localStorage.getItem(
        "adminToken"
    );


if (!token) {

    window.location.href =
        "login.html";

}


const form =
    document.querySelector(
        "#socialForm"
    );

const message =
    document.querySelector(
        "#socialMessage"
    );

const saveButton =
    document.querySelector(
        "#saveSocial"
    );


const fields = [

    "instagram",
    "linkedin",
    "github",
    "whatsapp",
    "facebook",
    "x",
    "email",
    "phone"

];


async function loadSocial() {

    try {

        const response =
            await fetch(
                "https://aditya-portfolio-backend-jsib.onrender.com/api/social"
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load social links."
            );

        }


        fields.forEach(
            field => {

                const input =
                    document.querySelector(
                        `#${field}`
                    );

                if (input) {

                    input.value =
                        data[field] || "";

                }

            }
        );


    } catch (error) {

        message.textContent =
            error.message;

        message.className =
            "save-message error";

    }

}


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


        const data = {};


        fields.forEach(
            field => {

                data[field] =
                    document
                        .querySelector(
                            `#${field}`
                        )
                        .value
                        .trim();

            }
        );


        try {

            const response =
                await fetch(
                    "https://aditya-portfolio-backend-jsib.onrender.com/api/social",
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
                            JSON.stringify(data)

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to save links."
                );

            }


            message.textContent =
                "✓ Social links saved successfully.";

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
                    "Save Social Links";

        }

    }
);


loadSocial();