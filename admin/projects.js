const token =
    localStorage.getItem("adminToken");


/* =====================================================
   AUTH CHECK
===================================================== */

if (!token) {

    window.location.href =
        "login.html";

}


/* =====================================================
   ELEMENTS
===================================================== */

const form =
    document.querySelector("#projectForm");

const projectsList =
    document.querySelector("#projectsList");

const message =
    document.querySelector("#projectMessage");

const saveButton =
    document.querySelector(
        "#projectSaveButton"
    );

const formTitle =
    document.querySelector(
        "#formTitle"
    );

const cancelEditButton =
    document.querySelector(
        "#cancelEditButton"
    );


const projectIdInput =
    document.querySelector(
        "#projectId"
    );

const titleInput =
    document.querySelector(
        "#title"
    );

const categoryInput =
    document.querySelector(
        "#category"
    );

const descriptionInput =
    document.querySelector(
        "#description"
    );

const techStackInput =
    document.querySelector(
        "#techStack"
    );

const imageInput =
    document.querySelector(
        "#imageUrl"
    );

const liveInput =
    document.querySelector(
        "#liveUrl"
    );

const githubInput =
    document.querySelector(
        "#githubUrl"
    );

const orderInput =
    document.querySelector(
        "#order"
    );

const featuredInput =
    document.querySelector(
        "#featured"
    );


/* =====================================================
   LOAD PROJECTS
===================================================== */

async function loadProjects() {

    try {

        const response =
            await fetch(
                "http://aditya-portfolio-backend-jsib.onrender.com/api/projects"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load projects."
            );

        }


        const projects =
            await response.json();


        if (!projects.length) {

            projectsList.innerHTML = `
                <div class="empty-projects">
                    No projects added yet.
                </div>
            `;

            return;

        }


        projectsList.innerHTML =
            projects.map(
                (project) => `

                <article
                    class="admin-project-card">

                    <div>

                        <span
                            class="admin-project-category">

                            ${escapeHtml(
                                project.category
                            )}

                        </span>


                        <h3>
                            ${escapeHtml(
                                project.title
                            )}
                        </h3>


                        <p>
                            ${escapeHtml(
                                project.description
                            )}
                        </p>


                        <div
                            class="admin-project-tech">

                            ${
                                (project.techStack || [])
                                    .map(
                                        tech =>
                                            `
                                            <span>
                                                ${escapeHtml(tech)}
                                            </span>
                                            `
                                    )
                                    .join("")
                            }

                        </div>

                    </div>


                    <div
                        class="admin-project-actions">

                        <button
                            type="button"
                            onclick="editProject('${project._id}')">

                            Edit

                        </button>


                        <button
                            type="button"
                            class="delete-project"
                            onclick="deleteProject('${project._id}')">

                            Delete

                        </button>

                    </div>

                </article>

            `
            ).join("");


    } catch (error) {

        projectsList.innerHTML = `
            <div class="empty-projects">
                ${escapeHtml(
                    error.message
                )}
            </div>
        `;

    }

}


/* =====================================================
   ADD / UPDATE PROJECT
===================================================== */

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const projectId =
            projectIdInput.value.trim();


        const isEditing =
            Boolean(projectId);


        saveButton.disabled = true;


        saveButton.querySelector("span")
            .textContent =
                isEditing
                    ? "Updating..."
                    : "Saving...";


        const techStack =
            techStackInput
                .value
                .split(",")
                .map(
                    item =>
                        item.trim()
                )
                .filter(Boolean);


        const projectData = {

            title:
                titleInput
                    .value
                    .trim(),

            category:
                categoryInput.value,

            description:
                descriptionInput
                    .value
                    .trim(),

            techStack,

            imageUrl:
                imageInput
                    .value
                    .trim(),

            liveUrl:
                liveInput
                    .value
                    .trim(),

            githubUrl:
                githubInput
                    .value
                    .trim(),

            order:
                Number(
                    orderInput.value
                ),

            featured:
                featuredInput.checked

        };


        try {

            const url =
                isEditing

                    ? `http://aditya-portfolio-backend-jsib.onrender.com/api/projects/${projectId}`

                    : "http://aditya-portfolio-backend-jsib.onrender.com/api/projects";


            const method =
                isEditing
                    ? "PUT"
                    : "POST";


            const response =
                await fetch(
                    url,
                    {

                        method,

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                projectData
                            )

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Something went wrong."
                );

            }


            message.textContent =
                isEditing

                    ? "✓ Project updated successfully."

                    : "✓ Project added successfully.";


            message.className =
                "save-message success";


            resetForm();


            await loadProjects();


        } catch (error) {

            message.textContent =
                error.message;

            message.className =
                "save-message error";

        } finally {

            saveButton.disabled = false;

            saveButton.querySelector("span")
                .textContent =
                    "Add Project";

        }

    }
);


/* =====================================================
   EDIT PROJECT
===================================================== */

async function editProject(id) {

    try {

        const response =
            await fetch(
                `http://aditya-portfolio-backend-jsib.onrender.com/api/projects/${id}`
            );


        const project =
            await response.json();


        if (!response.ok) {

            throw new Error(
                project.message ||
                "Failed to load project."
            );

        }


        /* FILL FORM */

        projectIdInput.value =
            project._id;

        titleInput.value =
            project.title || "";

        categoryInput.value =
            project.category ||
            "development";

        descriptionInput.value =
            project.description || "";

        techStackInput.value =
            (
                project.techStack || []
            ).join(", ");

        imageInput.value =
            project.imageUrl || "";

        liveInput.value =
            project.liveUrl || "";

        githubInput.value =
            project.githubUrl || "";

        orderInput.value =
            project.order ?? 0;

        featuredInput.checked =
            Boolean(
                project.featured
            );


        /* CHANGE UI */

        formTitle.textContent =
            "Edit Project";


        saveButton.querySelector("span")
            .textContent =
                "Update Project";


        saveButton.querySelector("b")
            .textContent =
                "✓";


        cancelEditButton.style.display =
            "inline-flex";


        message.textContent =
            "Editing: " +
            project.title;

        message.className =
            "save-message";


        /* SCROLL TO FORM */

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
   DELETE PROJECT
===================================================== */

async function deleteProject(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this project?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://aditya-portfolio-backend-jsib.onrender.com/api/projects/${id}`,
                {

                    method: "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to delete project."
            );

        }


        message.textContent =
            "✓ Project deleted.";

        message.className =
            "save-message success";


        await loadProjects();


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

cancelEditButton.addEventListener(
    "click",
    () => {

        resetForm();

    }
);


/* =====================================================
   RESET FORM
===================================================== */

function resetForm() {

    form.reset();


    projectIdInput.value =
        "";


    formTitle.textContent =
        "Add Project";


    saveButton.querySelector("span")
        .textContent =
            "Add Project";


    saveButton.querySelector("b")
        .textContent =
            "+";


    cancelEditButton.style.display =
        "none";


    orderInput.value =
        0;


    message.textContent =
        "";

    message.className =
        "save-message";

}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHtml(value) {

    return String(value)

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

loadProjects();