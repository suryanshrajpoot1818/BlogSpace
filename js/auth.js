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


            // GET EXISTING USERS

            const users =
                JSON.parse(
                    localStorage.getItem("blogSpaceUsers")
                ) || [];


            // CHECK EXISTING EMAIL

            const userExists =
                users.some(
                    user =>
                        user.email === email
                );


            if (userExists) {

                showMessage(
                    message,
                    "An account with this email already exists.",
                    "error"
                );

                return;
            }


            // CREATE USER

            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };


            // ADD USER

            users.push(newUser);


            // SAVE USERS

            localStorage.setItem(
                "blogSpaceUsers",
                JSON.stringify(users)
            );


            showMessage(
                message,
                "Account created successfully! Redirecting to login...",
                "success"
            );


            // CLEAR FORM

            registerForm.reset();


            // REDIRECT

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1200
            );

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


            // GET USERS

            const users =
                JSON.parse(
                    localStorage.getItem("blogSpaceUsers")
                ) || [];


            // FIND USER

            const user =
                users.find(
                    storedUser =>

                        storedUser.email === email &&
                        storedUser.password === password
                );


            // WRONG DETAILS

            if (!user) {

                showMessage(
                    message,
                    "Invalid email or password.",
                    "error"
                );

                return;
            }


            // CURRENT LOGGED-IN USER

            const loggedInUser = {

                id: user.id,

                name: user.name,

                email: user.email

            };


            localStorage.setItem(
                "blogSpaceCurrentUser",
                JSON.stringify(loggedInUser)
            );


            showMessage(
                message,
                "Login successful! Opening dashboard...",
                "success"
            );


            // REDIRECT

            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                800
            );

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