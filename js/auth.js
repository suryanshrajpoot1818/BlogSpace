// ======================================
// BLOGSPACE AUTHENTICATION
// ======================================


// --------------------------------------
// REGISTER
// --------------------------------------

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const message =
                document
                    .getElementById("registerMessage");


            // CLEAR OLD MESSAGE

            message.textContent = "";

            message.className =
                "form-message";


            // VALIDATION

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    message,
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    message,
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


           fetch("http://localhost:5000/api/register", {

    method: "POST",

    headers: {

        "Content-Type": "application/json"

    },

    body: JSON.stringify({

        name,
        email,
        password

    })

})

.then(response => response.json())

.then(data => {

    if (data.success) {

        showMessage(

            message,

            "Account created successfully! Redirecting to login...",

            "success"

        );

        registerForm.reset();

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1200);

    }

    else {

        showMessage(

            message,

            data.message,

            "error"

        );

    }

})

.catch(() => {

    showMessage(

        message,

        "Server error.",

        "error"

    );

});

        }
    );

}



// --------------------------------------
// LOGIN
// --------------------------------------

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const message =
                document
                    .getElementById("loginMessage");


            fetch("http://localhost:5000/api/login", {

    method: "POST",

    headers: {

        "Content-Type": "application/json"

    },

    body: JSON.stringify({

        email,
        password

    })

})

.then(response => response.json())

.then(data => {

    if (data.success) {

        localStorage.setItem(

            "blogSpaceCurrentUser",

            JSON.stringify(data.user)

        );

        showMessage(

            message,

            "Login successful! Opening dashboard...",

            "success"

        );

        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 800);

    }

    else {

        showMessage(

            message,

            data.message,

            "error"

        );

    }

})

.catch(() => {

    showMessage(

        message,

        "Server error.",

        "error"

    );

});
        }
    );

}



// --------------------------------------
// MESSAGE FUNCTION
// --------------------------------------

function showMessage(
    element,
    text,
    type
) {

    element.textContent = text;

    element.className =
        "form-message " + type;

}