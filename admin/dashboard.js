/* =====================================================
   AUTH CHECK
===================================================== */

const token =
    localStorage.getItem(
        "adminToken"
    );


if (!token) {

    window.location.href =
        "login.html";

}


/* =====================================================
   LOGOUT
===================================================== */

const logoutButton =
    document.querySelector(
        "#logoutButton"
    );


logoutButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "adminToken"
        );

        window.location.href =
            "login.html";

    }
);