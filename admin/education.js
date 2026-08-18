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
        "#educationForm"
    );

const educationId =
    document.querySelector(
        "#educationId"
    );

const qualification =
    document.querySelector(
        "#qualification"
    );

const specialization =
    document.querySelector(
        "#specialization"
    );

const institution =
    document.querySelector(
        "#institution"
    );

const university =
    document.querySelector(
        "#university"
    );

const locationInput =
    document.querySelector(
        "#location"
    );

const startYear =
    document.querySelector(
        "#startYear"
    );

const endYear =
    document.querySelector(
        "#endYear"
    );

const status =
    document.querySelector(
        "#status"
    );

const description =
    document.querySelector(
        "#description"
    );

const documentUrl =
    document.querySelector(
        "#documentUrl"
    );

const order =
    document.querySelector(
        "#order"
    );

const educationList =
    document.querySelector(
        "#educationList"
    );

const message =
    document.querySelector(
        "#educationMessage"
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
   LOAD EDUCATION
===================================================== */

async function loadEducation() {

    try {

        const response =
            await fetch(
                "http://aditya-portfolio-backend-jsib.onrender.com/api/education"
            );

        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load education."
            );

        }


        if (!data.length) {

            educationList.innerHTML = `
                <div class="empty-projects">
                    No education records added yet.
                </div>
            `;

            return;

        }


        educationList.innerHTML =
            data
                .map(
                    item => `

                    <article
                        class="admin-project-card">

                        <div>

                            <span
                                class="admin-project-category">

                                ${escapeHtml(
                                    item.qualification
                                )}

                            </span>


                            <h3>

                                ${escapeHtml(
                                    item.specialization ||
                                    item.institution
                                )}

                            </h3>


                            <p>

                                ${escapeHtml(
                                    item.institution
                                )}

                                ${
                                    item.university
                                        ? " • " +
                                          escapeHtml(
                                              item.university
                                          )
                                        : ""
                                }

                            </p>


                            <p>

                                ${escapeHtml(
                                    item.startYear
                                )}

                                —

                                ${escapeHtml(
                                    item.endYear
                                )}

                                ${
                                    item.status
                                        ? " • " +
                                          escapeHtml(
                                              item.status
                                          )
                                        : ""
                                }

                            </p>


                            ${
                                item.documentUrl
                                    ? `
                                        <div
                                            class="admin-project-tech">

                                            <span>
                                                Document ✓
                                            </span>

                                        </div>
                                      `
                                    : ""
                            }

                        </div>


                        <div
                            class="admin-project-actions">

                            <button
                                type="button"
                                onclick="editEducation('${item._id}')">

                                Edit

                            </button>


                            <button
                                type="button"
                                class="delete-project"
                                onclick="deleteEducation('${item._id}')">

                                Delete

                            </button>

                        </div>

                    </article>

                `
                )
                .join("");


    } catch (error) {

        educationList.innerHTML = `
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
            educationId.value.trim();


        const editing =
            Boolean(id);


        saveButton.disabled =
            true;


        saveButton
            .querySelector("span")
            .textContent =
                editing
                    ? "Updating..."
                    : "Saving...";


        const data = {

            qualification:
                qualification.value.trim(),

            specialization:
                specialization.value.trim(),

            institution:
                institution.value.trim(),

            university:
                university.value.trim(),

            location:
                locationInput.value.trim(),

            startYear:
                startYear.value.trim(),

            endYear:
                endYear.value.trim(),

            status:
                status.value.trim(),

            description:
                description.value.trim(),

            documentUrl:
                documentUrl.value.trim(),

            order:
                Number(
                    order.value
                )

        };


        try {

            const url =
                editing

                    ? `http://aditya-portfolio-backend-jsib.onrender.com/api/education/${id}`

                    : "http://aditya-portfolio-backend-jsib.onrender.com/api/education";


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
                    ? "✓ Education updated successfully."
                    : "✓ Education added successfully.";


            message.className =
                "save-message success";


            resetForm();


            await loadEducation();


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
                    "Add Education";

        }

    }
);


/* =====================================================
   EDIT
===================================================== */

async function editEducation(id) {

    try {

        const response =
            await fetch(
                `http://aditya-portfolio-backend-jsib.onrender.com/api/education/${id}`
            );


        const item =
            await response.json();


        if (!response.ok) {

            throw new Error(
                item.message ||
                "Failed to load education."
            );

        }


        educationId.value =
            item._id;

        qualification.value =
            item.qualification || "";

        specialization.value =
            item.specialization || "";

        institution.value =
            item.institution || "";

        university.value =
            item.university || "";

        locationInput.value =
            item.location || "";

        startYear.value =
            item.startYear || "";

        endYear.value =
            item.endYear || "";

        status.value =
            item.status || "";

        description.value =
            item.description || "";

        documentUrl.value =
            item.documentUrl || "";

        order.value =
            item.order ?? 0;


        formTitle.textContent =
            "Edit Education";


        saveButton
            .querySelector("span")
            .textContent =
                "Update Education";


        saveButton
            .querySelector("b")
            .textContent =
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

async function deleteEducation(id) {

    if (
        !confirm(
            "Delete this education record?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://aditya-portfolio-backend-jsib.onrender.com/api/education/${id}`,
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
                "Failed to delete education."
            );

        }


        message.textContent =
            "✓ Education deleted.";

        message.className =
            "save-message success";


        await loadEducation();


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

    educationId.value =
        "";

    order.value =
        0;

    formTitle.textContent =
        "Add Education";

    saveButton
        .querySelector("span")
        .textContent =
            "Add Education";

    saveButton
        .querySelector("b")
        .textContent =
            "+";

    cancelEdit.style.display =
        "none";

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

loadEducation();