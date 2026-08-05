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
async function displayBlogs() {

    const response = await fetch(
        "http://localhost:5000/api/blogs"
    );

    const allBlogs = await response.json();

    const userBlogs = allBlogs.filter(

        blog => blog.author === currentUser.name

    );

    const container =
        document.getElementById("dashboardBlogs");

    const emptyState =
        document.getElementById("emptyState");

    const totalBlogs =
        document.getElementById("totalBlogs");

    totalBlogs.textContent = userBlogs.length;

    container.innerHTML = "";

    if (userBlogs.length === 0) {

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";

    userBlogs.forEach(blog => {

        const article =
            document.createElement("article");

        article.className =
            "dashboard-blog";

        article.innerHTML = `

            <img
                src="${blog.image || ''}"
                class="dashboard-blog-image"
            >

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

            </div>

            <button
                class="delete-btn"
                onclick="deleteBlog(${blog.id})">

                Delete

            </button>

        `;

        container.appendChild(article);

    });

}



// --------------------------------------
async function deleteBlog(blogId) {

    if (
        !confirm(
            "Delete this blog?"
        )
    ) return;

    await fetch(

        `http://localhost:5000/api/blogs/${blogId}`,

        {

            method: "DELETE"

        }

    );

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