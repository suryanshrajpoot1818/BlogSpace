// ======================================
// BLOGSPACE MAIN JAVASCRIPT
// ======================================


// ======================================
// MOBILE NAVBAR
// ======================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("show");

    });

}


// ======================================
// DEFAULT BLOGS
// ======================================

const defaultBlogs = [

    {
        id: 1001,

        title: "The Future of Artificial Intelligence",

        category: "Technology",

        description:
            "Discover how artificial intelligence is changing the way we learn, work and build technology.",

        content:
            `Artificial Intelligence is rapidly changing the world around us.

AI is now being used in education, healthcare, transportation, finance and software development.

Students and developers can use AI tools to learn faster, automate repetitive tasks and build powerful applications.

However, AI should be used responsibly. Human creativity, critical thinking and ethical decision making will continue to remain extremely important.

The future of AI is not simply about replacing humans. It is about helping people become more productive and solve difficult problems.`,

        author: "BlogSpace",

        createdAt: "2026-08-03T10:00:00",

        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 1002,

        title: "Getting Started with Web Development",

        category: "Web Development",

        description:
            "Learn the essential HTML, CSS and JavaScript concepts every frontend developer should know.",

        content:
            `Web development is a great way to begin your programming journey.

HTML provides the structure of a website.

CSS controls the design and JavaScript adds interactivity.

Practice projects are the fastest way to become a frontend developer.`,

        author: "BlogSpace",

        createdAt: "2026-08-01T10:00:00",

        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    },

    {
        id: 1003,

        title: "5 Habits That Make Students Productive",

        category: "Productivity",

        description:
            "Simple habits that help students stay focused and achieve more.",

        content:
            `Productivity is not about working harder.

Planning, consistency and avoiding distractions help students become successful.`,

        author: "BlogSpace",

        createdAt: "2026-07-29T10:00:00",

        image:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
    }

];

// ======================================
// DISPLAY BLOGS
// ======================================

async function displayHomeBlogs() {

    const blogContainer =
        document.getElementById("blogContainer");

    if (!blogContainer) return;

    let backendBlogs = [];

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/blogs"
            );

        if (response.ok) {

            backendBlogs =
                await response.json();

        }

    }

    catch (error) {

        console.log(
            "Backend not available"
        );

    }

    // Backend blogs first
    const allBlogs = [

        ...backendBlogs,

        ...defaultBlogs

    ];

    blogContainer.innerHTML = "";

    allBlogs.forEach(function (blog, index) {

        const article =
            document.createElement("article");

        article.className =
            "blog-card";


        // IMAGE

        let imageHTML = "";

        if (blog.image) {

            imageHTML = `

                <div
                    class="blog-image"
                    style="
                        background-image:
                        linear-gradient(
                            rgba(0,0,0,0.10),
                            rgba(0,0,0,0.25)
                        ),
                        url('${blog.image}');
                    "
                >

                    <span class="category">

                        ${escapeHTML(blog.category)}

                    </span>

                </div>

            `;

        }

        else {

            const gradientClass =
                "dynamic-gradient-" +
                ((index % 3) + 1);

            imageHTML = `

                <div
                    class="
                        blog-image
                        ${gradientClass}
                    "

                >

                    <span class="category">

                        ${escapeHTML(blog.category)}

                    </span>

                </div>

            `;

        }


        // DATE

        const formattedDate =
            new Date(blog.createdAt)
            .toLocaleDateString(
                "en-IN",
                {

                    day: "2-digit",

                    month: "long",

                    year: "numeric"

                }
            );


        article.innerHTML = `

            ${imageHTML}

            <div class="blog-content">

                <p class="blog-date">

                    ${formattedDate}

                    •

                    ${escapeHTML(blog.author)}

                </p>


                <h3>

                    ${escapeHTML(blog.title)}

                </h3>


                <p>

                    ${escapeHTML(blog.description)}

                </p>


                <a

                    href="blog.html?id=${blog.id}"

                    class="read-more"

                >

                    Read Article →

                </a>

            </div>

        `;

        blogContainer.appendChild(
            article
        );

    });

}


// ======================================
// ESCAPE HTML
// ======================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}


// ======================================
// RUN
// ======================================

displayHomeBlogs();