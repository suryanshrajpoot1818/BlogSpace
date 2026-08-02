// ======================================
// DASHBOARD
// ======================================


// GET CURRENT USER

const currentUser =
    JSON.parse(
        localStorage.getItem("blogSpaceCurrentUser")
    );


// PROTECT DASHBOARD

if (!currentUser) {

    window.location.href =
        "login.html";

}


// --------------------------------------
// USER NAME
// --------------------------------------

const userName =
    document.getElementById("userName");


if (userName && currentUser) {

    userName.textContent =
        currentUser.name;

}


// --------------------------------------
// DISPLAY BLOGS
// --------------------------------------

function displayBlogs() {

    const allBlogs =
        JSON.parse(
            localStorage.getItem("blogSpaceBlogs")
        ) || [];


    // ONLY CURRENT USER'S BLOGS

    const userBlogs =
        allBlogs.filter(
            blog =>
                blog.authorId === currentUser.id
        );


    const container =
        document.getElementById(
            "dashboardBlogs"
        );


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    const totalBlogs =
        document.getElementById(
            "totalBlogs"
        );


    // BLOG COUNT

    totalBlogs.textContent =
        userBlogs.length;


    // CLEAR OLD CONTENT

    container.innerHTML = "";


    // NO BLOGS

    if (userBlogs.length === 0) {

        emptyState.style.display =
            "block";

        return;
    }


    emptyState.style.display =
        "none";


    // DISPLAY EACH BLOG

    userBlogs.forEach(
        function (blog) {


            const blogElement =
                document.createElement("article");


            blogElement.className =
                "dashboard-blog";


            // IMAGE

            let imageHTML;


            if (blog.image) {

                imageHTML = `
                    <img
                        src="${blog.image}"
                        class="dashboard-blog-image"
                        alt="${blog.title}"
                    >
                `;

            } else {

                imageHTML = `
                    <div
                        class="dashboard-blog-image">
                    </div>
                `;

            }


            // DATE

            const formattedDate =
                new Date(
                    blog.createdAt
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                );


            // BLOG HTML

            blogElement.innerHTML = `

                ${imageHTML}

                <div class="dashboard-blog-info">

                    <span class="dashboard-category">

                        ${blog.category}

                    </span>

                    <h3>
                        ${blog.title}
                    </h3>

                    <p>
                        ${blog.description}
                    </p>

                    <p>
                        Published ${formattedDate}
                    </p>

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteBlog(${blog.id})">

                    Delete

                </button>

            `;


            container.appendChild(
                blogElement
            );

        }
    );

}



// --------------------------------------
// DELETE BLOG
// --------------------------------------

function deleteBlog(blogId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmDelete) {
        return;
    }


    let blogs =
        JSON.parse(
            localStorage.getItem("blogSpaceBlogs")
        ) || [];


    // REMOVE BLOG

    blogs =
        blogs.filter(
            blog =>
                blog.id !== blogId
        );


    // SAVE AGAIN

    localStorage.setItem(
        "blogSpaceBlogs",
        JSON.stringify(blogs)
    );


    // REFRESH DISPLAY

    displayBlogs();

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



// INITIAL DISPLAY

displayBlogs();