/* =====================================================
   ADMIN LOGIN
===================================================== */

const loginForm =
    document.querySelector("#loginForm");

const emailInput =
    document.querySelector("#email");

const passwordInput =
    document.querySelector("#password");

const togglePassword =
    document.querySelector("#togglePassword");

const loginError =
    document.querySelector("#loginError");

const loginButton =
    document.querySelector("#loginButton");


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

togglePassword.addEventListener(
    "click",
    () => {

        if (
            passwordInput.type === "password"
        ) {

            passwordInput.type = "text";

            togglePassword.textContent =
                "Hide";

        } else {

            passwordInput.type =
                "password";

            togglePassword.textContent =
                "Show";

        }

    }
);


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        loginError.textContent = "";


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email || !password) {

            loginError.textContent =
                "Please enter your email and password.";

            return;

        }


        /* LOADING */

        loginButton.disabled = true;

        loginButton.querySelector("span")
            .textContent = "Signing in...";


        try {

            const response =
                await fetch(
                    "https://aditya-portfolio-backend-jsib.onrender.com/api/auth/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            email,
                            password

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Login failed."
                );

            }


            /* SAVE JWT */

            localStorage.setItem(
                "adminToken",
                data.token
            );


            /* GO TO DASHBOARD */

            window.location.href =
                "dashboard.html";


        } catch (error) {

            loginError.textContent =
                error.message;

        } finally {

            loginButton.disabled = false;

            loginButton.querySelector("span")
                .textContent = "Sign in";

        }

    }
);