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
        "#credentialForm"
    );

const credentialId =
    document.querySelector(
        "#credentialId"
    );

const title =
    document.querySelector(
        "#title"
    );

const type =
    document.querySelector(
        "#type"
    );

const organization =
    document.querySelector(
        "#organization"
    );

const date =
    document.querySelector(
        "#date"
    );

const description =
    document.querySelector(
        "#description"
    );

const documentUrl =
    document.querySelector(
        "#documentUrl"
    );

const lorUrl =
    document.querySelector(
        "#lorUrl"
    );

const imageUrl =
    document.querySelector(
        "#imageUrl"
    );

const order =
    document.querySelector(
        "#order"
    );

const credentialsList =
    document.querySelector(
        "#credentialsList"
    );

const message =
    document.querySelector(
        "#credentialMessage"
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
   LOAD CREDENTIALS
===================================================== */

async function loadCredentials() {

    try {

        const response =
            await fetch(
                "https://aditya-portfolio-backend-jsib.onrender.com/api/credentials"
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load credentials."
            );

        }


        if (!data.length) {

            credentialsList.innerHTML = `

                <div class="empty-projects">

                    No credentials added yet.

                </div>

            `;

            return;

        }


        credentialsList.innerHTML =
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
                                    item.title
                                )}

                            </h3>


                            <p>

                                ${escapeHtml(
                                    item.organization || ""
                                )}

                                ${
                                    item.date
                                        ? " • " +
                                          escapeHtml(
                                              item.date
                                          )
                                        : ""
                                }

                            </p>


                            <div
                                class="admin-project-tech">


                                ${
                                    item.documentUrl
                                        ? `
                                            <span>
                                                Document ✓
                                            </span>
                                          `
                                        : ""
                                }


                                ${
                                    item.lorUrl
                                        ? `
                                            <span>
                                                LOR ✓
                                            </span>
                                          `
                                        : ""
                                }


                                ${
                                    item.imageUrl
                                        ? `
                                            <span>
                                                Preview ✓
                                            </span>
                                          `
                                        : ""
                                }


                            </div>

                        </div>


                        <div
                            class="admin-project-actions">


                            <button
                                type="button"
                                onclick="editCredential('${item._id}')">

                                Edit

                            </button>


                            <button
                                type="button"
                                class="delete-project"
                                onclick="deleteCredential('${item._id}')">

                                Delete

                            </button>


                        </div>


                    </article>

                `
                )
                .join("");


    } catch (error) {

        credentialsList.innerHTML = `

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
            credentialId.value.trim();


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

            title:
                title.value.trim(),

            type:
                type.value,

            organization:
                organization.value.trim(),

            date:
                date.value,

            description:
                description.value.trim(),

            documentUrl:
                documentUrl.value.trim(),

            lorUrl:
                lorUrl.value.trim(),

            imageUrl:
                imageUrl.value.trim(),

            order:
                Number(
                    order.value
                )

        };


        try {

            const url =
                editing

                    ? `https://aditya-portfolio-backend-jsib.onrender.com/api/credentials/${id}`

                    : "https://aditya-portfolio-backend-jsib.onrender.com/api/credentials";


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
                    ? "✓ Credential updated successfully."
                    : "✓ Credential added successfully.";


            message.className =
                "save-message success";


            resetForm();


            await loadCredentials();


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
                    "Add Credential";

        }

    }
);


/* =====================================================
   EDIT
===================================================== */

async function editCredential(id) {

    try {

        const response =
            await fetch(
                `https://aditya-portfolio-backend-jsib.onrender.com/api/credentials/${id}`
            );


        const item =
            await response.json();


        if (!response.ok) {

            throw new Error(
                item.message ||
                "Failed to load credential."
            );

        }


        credentialId.value =
            item._id;

        title.value =
            item.title || "";

        type.value =
            item.type || "certificate";

        organization.value =
            item.organization || "";

        date.value =
            item.date || "";

        description.value =
            item.description || "";

        documentUrl.value =
            item.documentUrl || "";

        lorUrl.value =
            item.lorUrl || "";

        imageUrl.value =
            item.imageUrl || "";

        order.value =
            item.order ?? 0;


        formTitle.textContent =
            "Edit Credential";


        saveButton
            .querySelector("span")
            .textContent =
                "Update Credential";


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

async function deleteCredential(id) {

    const confirmed =
        confirm(
            "Delete this credential?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `https://aditya-portfolio-backend-jsib.onrender.com/api/credentials/${id}`,
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
                "Failed to delete credential."
            );

        }


        message.textContent =
            "✓ Credential deleted.";

        message.className =
            "save-message success";


        await loadCredentials();


    } catch (error) {

        message.textContent =
            error.message;

        message.className =
            "save-message error";

    }

}


/* =====================================================
   CANCEL EDIT
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

    credentialId.value =
        "";

    type.value =
        "certificate";

    order.value =
        0;

    formTitle.textContent =
        "Add Credential";


    saveButton
        .querySelector("span")
        .textContent =
            "Add Credential";


    saveButton
        .querySelector("b")
        .textContent =
            "+";


    cancelEdit.style.display =
        "none";

}


/* =====================================================
   TYPE NAME
===================================================== */

function typeName(type) {

    const names = {

        certificate:
            "CERTIFICATE",

        internship:
            "INTERNSHIP",

        lor:
            "LOR",

        degree:
            "DEGREE",

        pdc:
            "PDC",

        achievement:
            "ACHIEVEMENT",

        course:
            "COURSE",

        other:
            "OTHER"

    };


    return (
        names[type] ||
        "CREDENTIAL"
    );

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

loadCredentials();