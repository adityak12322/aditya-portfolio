const token =
    localStorage.getItem("adminToken");


if (!token) {

    window.location.href =
        "login.html";

}


const form =
    document.querySelector("#profileForm");

const saveButton =
    document.querySelector("#saveButton");

const saveMessage =
    document.querySelector("#saveMessage");


const fields = {

    name:
        document.querySelector("#name"),

    headline:
        document.querySelector("#headline"),

    summary:
        document.querySelector("#summary"),

    location:
        document.querySelector("#location"),

    email:
        document.querySelector("#email"),

    phone:
        document.querySelector("#phone"),

    profileImage:
        document.querySelector("#profileImage"),

    resumeUrl:
        document.querySelector("#resumeUrl"),

    availableForWork:
        document.querySelector(
            "#availableForWork"
        )

};


/* =====================================================
   LOAD PROFILE
===================================================== */

async function loadProfile() {

    try {

        const response =
            await fetch(
                "http://aditya-portfolio-backend-jsib.onrender.com/api/profile"
            );


        if (!response.ok) {

            throw new Error(
                "Could not load profile."
            );

        }


        const profile =
            await response.json();


        fields.name.value =
            profile.name || "";

        fields.headline.value =
            profile.headline || "";

        fields.summary.value =
            profile.summary || "";

        fields.location.value =
            profile.location || "";

        fields.email.value =
            profile.email || "";

        fields.phone.value =
            profile.phone || "";

        fields.profileImage.value =
            profile.profileImage || "";

        fields.resumeUrl.value =
            profile.resumeUrl || "";

        fields.availableForWork.checked =
            profile.availableForWork ?? true;


    } catch (error) {

        saveMessage.textContent =
            error.message;

        saveMessage.className =
            "save-message error";

    }

}


loadProfile();


/* =====================================================
   SAVE PROFILE
===================================================== */

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        saveButton.disabled = true;

        saveButton.textContent =
            "Saving...";

        saveMessage.textContent = "";


        const profileData = {

            name:
                fields.name.value.trim(),

            headline:
                fields.headline.value.trim(),

            summary:
                fields.summary.value.trim(),

            location:
                fields.location.value.trim(),

            email:
                fields.email.value.trim(),

            phone:
                fields.phone.value.trim(),

            profileImage:
                fields.profileImage.value.trim(),

            resumeUrl:
                fields.resumeUrl.value.trim(),

            availableForWork:
                fields.availableForWork.checked

        };


        try {

            const response =
                await fetch(
                    "http://aditya-portfolio-backend-jsib.onrender.com/api/profile",
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                profileData
                            )

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to save."
                );

            }


            saveMessage.textContent =
                "✓ Changes saved successfully.";

            saveMessage.className =
                "save-message success";


        } catch (error) {

            saveMessage.textContent =
                error.message;

            saveMessage.className =
                "save-message error";

        } finally {

            saveButton.disabled = false;

            saveButton.textContent =
                "Save Changes";

        }

    }
);