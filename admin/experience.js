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
        "#experienceForm"
    );

const experienceId =
    document.querySelector(
        "#experienceId"
    );

const type =
    document.querySelector(
        "#type"
    );

const company =
    document.querySelector(
        "#company"
    );

const role =
    document.querySelector(
        "#role"
    );

const locationInput =
    document.querySelector(
        "#location"
    );

const startDate =
    document.querySelector(
        "#startDate"
    );

const endDate =
    document.querySelector(
        "#endDate"
    );

const current =
    document.querySelector(
        "#current"
    );

const description =
    document.querySelector(
        "#description"
    );

const technologies =
    document.querySelector(
        "#technologies"
    );

const certificateUrl =
    document.querySelector(
        "#certificateUrl"
    );

const lorUrl =
    document.querySelector(
        "#lorUrl"
    );

const order =
    document.querySelector(
        "#order"
    );

const list =
    document.querySelector(
        "#experienceList"
    );

const message =
    document.querySelector(
        "#experienceMessage"
    );

const saveButton =
    document.querySelector(
        "#saveButton"
    );

const formTitle =
    document.querySelector(
        "#formTitle"
    );

const cancelEdit =
    document.querySelector(
        "#cancelEdit"
    );


/* =====================================================
   LOAD
===================================================== */

async function loadExperience() {

    try {

        const response =
            await fetch(
                "http://aditya-portfolio-backend-jsib.onrender.com/api/experience"
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load experience."
            );

        }


        if (!data.length) {

            list.innerHTML = `
                <div class="empty-projects">
                    No experience added yet.
                </div>
            `;

            return;

        }


        list.innerHTML =
            data
                .map(
                    item => `

                    <article
                        class="admin-project-card">

                        <div>

                            <span
                                class="admin-project-category">

                                ${typeName(
                                    item.type
                                )}

                            </span>


                            <h3>
                                ${escapeHtml(
                                    item.role
                                )}
                            </h3>


                            <p>
                                ${escapeHtml(
                                    item.company
                                )}
                                ${
                                    item.location
                                        ? " • " +
                                          escapeHtml(
                                              item.location
                                          )
                                        : ""
                                }
                            </p>


                            <p>

                                ${escapeHtml(
                                    item.startDate || ""
                                )}

                                —

                                ${
                                    item.current
                                        ? "Present"
                                        : escapeHtml(
                                            item.endDate || ""
                                        )
                                }

                            </p>

                        </div>


                        <div
                            class="admin-project-actions">

                            <button
                                type="button"
                                onclick="editExperience('${item._id}')">

                                Edit

                            </button>


                            <button
                                type="button"
                                class="delete-project"
                                onclick="deleteExperience('${item._id}')">

                                Delete

                            </button>

                        </div>

                    </article>

                `
                )
                .join("");


    } catch (error) {

        list.innerHTML = `
            <div class="empty-projects">
                ${escapeHtml(
                    error.message
                )}
            </div>
        `;

    }

}


/* =====================================================
   ADD / UPDATE
===================================================== */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const id =
            experienceId.value.trim();


        const editing =
            Boolean(id);


        saveButton.disabled =
            true;


        saveButton.querySelector(
            "span"
        ).textContent =
            editing
                ? "Updating..."
                : "Saving...";


        const techList =
            technologies.value
                .split(",")
                .map(
                    item =>
                        item.trim()
                )
                .filter(Boolean);


        const data = {

            type:
                type.value,

            company:
                company.value.trim(),

            role:
                role.value.trim(),

            location:
                locationInput.value.trim(),

            startDate:
                startDate.value,

            endDate:
                endDate.value,

            current:
                current.checked,

            description:
                description.value.trim(),

            technologies:
                techList,

            certificateUrl:
                certificateUrl.value.trim(),

            lorUrl:
                lorUrl.value.trim(),

            order:
                Number(
                    order.value
                )

        };


        try {

            const url =
                editing

                    ? `http://aditya-portfolio-backend-jsib.onrender.com/api/experience/${id}`

                    : "http://aditya-portfolio-backend-jsib.onrender.com/api/experience";


            const response =
                await fetch(
                    url,
                    {

                        method:
                            editing
                                ? "PUT"
                                : "POST",

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
                    "Something went wrong."
                );

            }


            message.textContent =
                editing
                    ? "✓ Experience updated successfully."
                    : "✓ Experience added successfully.";


            message.className =
                "save-message success";


            resetForm();


            await loadExperience();


        } catch (error) {

            message.textContent =
                error.message;

            message.className =
                "save-message error";

        } finally {

            saveButton.disabled =
                false;

            saveButton.querySelector(
                "span"
            ).textContent =
                "Add Experience";

        }

    }
);


/* =====================================================
   EDIT
===================================================== */

async function editExperience(id) {

    try {

        const response =
            await fetch(
                `http://aditya-portfolio-backend-jsib.onrender.com/api/experience/${id}`
            );


        const item =
            await response.json();


        if (!response.ok) {

            throw new Error(
                item.message ||
                "Failed to load experience."
            );

        }


        experienceId.value =
            item._id;

        type.value =
            item.type || "internship";

        company.value =
            item.company || "";

        role.value =
            item.role || "";

        locationInput.value =
            item.location || "";

        startDate.value =
            item.startDate || "";

        endDate.value =
            item.endDate || "";

        current.checked =
            Boolean(
                item.current
            );

        description.value =
            item.description || "";

        technologies.value =
            (
                item.technologies || []
            ).join(", ");

        certificateUrl.value =
            item.certificateUrl || "";

        lorUrl.value =
            item.lorUrl || "";

        order.value =
            item.order ?? 0;


        formTitle.textContent =
            "Edit Experience";


        saveButton.querySelector(
            "span"
        ).textContent =
            "Update Experience";


        saveButton.querySelector(
            "b"
        ).textContent =
            "✓";


        cancelEdit.style.display =
            "inline-flex";


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    } catch (error) {

        message.textContent =
            error.message;

        message.className =
            "save-message error";

    }

}


/* =====================================================
   DELETE
===================================================== */

async function deleteExperience(id) {

    if (
        !confirm(
            "Delete this experience?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://aditya-portfolio-backend-jsib.onrender.com/api/experience/${id}`,
                {

                    method:
                        "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to delete experience."
            );

        }


        message.textContent =
            "✓ Experience deleted.";

        message.className =
            "save-message success";


        await loadExperience();


    } catch (error) {

        message.textContent =
            error.message;

        message.className =
            "save-message error";

    }

}


/* =====================================================
   CANCEL
===================================================== */

cancelEdit.addEventListener(
    "click",
    resetForm
);


/* =====================================================
   RESET
===================================================== */

function resetForm() {

    form.reset();

    experienceId.value =
        "";

    order.value =
        0;

    type.value =
        "internship";

    formTitle.textContent =
        "Add Experience";

    saveButton.querySelector(
        "span"
    ).textContent =
        "Add Experience";

    saveButton.querySelector(
        "b"
    ).textContent =
        "+";

    cancelEdit.style.display =
        "none";

}


/* =====================================================
   TYPE NAME
===================================================== */

function typeName(type) {

    if (
        type === "internship"
    ) {

        return "INTERNSHIP";

    }

    if (
        type === "experience"
    ) {

        return "WORK EXPERIENCE";

    }

    if (
        type === "training"
    ) {

        return "TRAINING";

    }

    return "FREELANCE";

}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHtml(value) {

    return String(
        value || ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIAL LOAD
===================================================== */

loadExperience();