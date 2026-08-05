// ======================================
// CREATE BLOG
// ======================================


// GET CURRENT USER

const currentUser =
    JSON.parse(
        localStorage.getItem("blogSpaceCurrentUser")
    );


// PROTECT PAGE

if (!currentUser) {

    window.location.href =
        "login.html";

}


// --------------------------------------
// CREATE BLOG
// --------------------------------------

const createBlogForm =
    document.getElementById("createBlogForm");


if (createBlogForm) {

    createBlogForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // GET VALUES

            const title =
                document
                    .getElementById("blogTitle")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("blogCategory")
                    .value;


            const image =
                document
                    .getElementById("blogImage")
                    .value
                    .trim();


            const description =
                document
                    .getElementById("blogDescription")
                    .value
                    .trim();


            const content =
                document
                    .getElementById("blogContent")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("blogMessage");


            // VALIDATION

            if (
                !title ||
                !category ||
                !description ||
                !content
            ) {

                message.textContent =
                    "Please fill in all required fields.";

                message.className =
                    "form-message error";

                return;
            }


            // NEW BLOG OBJECT

            const newBlog = {

                id: Date.now(),

                title: title,

                category: category,

                image: image,

                description: description,

                content: content,

                authorId: currentUser.id,

                author: currentUser.name,

                createdAt:
                    new Date().toISOString()

            };


            fetch("http://localhost:5000/api/blogs", {

    method: "POST",

    headers: {

        "Content-Type": "application/json"

    },

    body: JSON.stringify({

        title: title,

        category: category,

        image: image,

        description: description,

        content: content,

        author: currentUser.name

    })

})

.then(response => response.json())

.then(data => {

    if (data.success) {

        message.textContent =
            "Blog published successfully!";

        message.className =
            "form-message success";

        createBlogForm.reset();

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 800);

    }

    else {

        message.textContent =
            data.message;

        message.className =
            "form-message error";

    }

})

.catch(() => {

    message.textContent =
        "Server Error";

    message.className =
        "form-message error";

});

        }
    );

}



// --------------------------------------
// LOGOUT
// --------------------------------------

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "blogSpaceCurrentUser"
            );

            window.location.href =
                "login.html";

        }
    );

}