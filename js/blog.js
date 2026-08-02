// ======================================
// BLOG READER
// ======================================


// ======================================
// DEFAULT BLOGS
// ======================================

const readerDefaultBlogs = [

    {
        id: 1001,

        title:
            "The Future of Artificial Intelligence",

        category:
            "Technology",

        description:
            "Discover how artificial intelligence is changing the way we learn, work and build technology.",

        content:
            `Artificial Intelligence is rapidly changing the world around us.

AI is now being used in education, healthcare, transportation, finance and software development.

Students and developers can use AI tools to learn faster, automate repetitive tasks and build powerful applications.

However, AI should be used responsibly. Human creativity, critical thinking and ethical decision making will continue to remain extremely important.

The future of AI is not simply about replacing humans. It is about helping people become more productive and solve difficult problems.`,

        author:
            "BlogSpace",

        createdAt:
            "2026-08-03T10:00:00",

        image:
            ""
    },


    {
        id: 1002,

        title:
            "Getting Started with Web Development",

        category:
            "Web Development",

        description:
            "Learn the essential HTML, CSS and JavaScript concepts every frontend developer should know.",

        content:
            `Web development is a great way to begin your programming journey.

HTML provides the structure of a website. It defines elements such as headings, paragraphs, buttons, images and forms.

CSS controls how those elements look. It allows developers to create layouts, colors, animations and responsive designs.

JavaScript adds functionality and interactivity to websites.

Once you understand HTML, CSS and JavaScript, you can move toward modern frontend technologies such as React.

The best way to learn web development is by building projects and continuously practicing.`,

        author:
            "BlogSpace",

        createdAt:
            "2026-08-01T10:00:00",

        image:
            ""
    },


    {
        id: 1003,

        title:
            "5 Habits That Make Students Productive",

        category:
            "Productivity",

        description:
            "Simple habits that can help students manage their time and stay focused on their goals.",

        content:
            `Productivity is not about studying every minute of the day.

The first useful habit is planning your important tasks before starting your day.

Second, avoid unnecessary distractions while studying.

Third, divide large goals into smaller achievable tasks.

Fourth, take proper breaks so that your mind can recover.

Finally, consistency is more important than motivation.

Small improvements performed regularly can produce excellent results over time.`,

        author:
            "BlogSpace",

        createdAt:
            "2026-07-29T10:00:00",

        image:
            ""
    }

];



// ======================================
// GET BLOG ID FROM URL
// ======================================

const parameters =
    new URLSearchParams(
        window.location.search
    );


const blogId =
    Number(
        parameters.get("id")
    );



// ======================================
// GET USER BLOGS
// ======================================

const savedBlogs =
    JSON.parse(
        localStorage.getItem(
            "blogSpaceBlogs"
        )
    ) || [];



// COMBINE BLOGS

const availableBlogs = [

    ...savedBlogs,

    ...readerDefaultBlogs

];



// ======================================
// FIND BLOG
// ======================================

const selectedBlog =
    availableBlogs.find(
        function (blog) {

            return blog.id === blogId;

        }
    );



const articleContainer =
    document.getElementById(
        "articleContainer"
    );



// ======================================
// BLOG NOT FOUND
// ======================================

if (!selectedBlog) {

    articleContainer.innerHTML = `

        <div class="article-not-found">

            <h1>
                Blog not found
            </h1>

            <p>
                The article you're looking for
                doesn't exist.
            </p>

            <a
                href="index.html"
                class="primary-btn"
            >
                Back to Home
            </a>

        </div>

    `;

}

else {

    displayArticle(selectedBlog);

}



// ======================================
// DISPLAY ARTICLE
// ======================================

function displayArticle(blog) {


    const formattedDate =
        new Date(
            blog.createdAt
        ).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",

                month: "long",

                year: "numeric"
            }
        );


    // CONVERT BLOG PARAGRAPHS

    const paragraphs =
        blog.content
            .split("\n")
            .filter(
                paragraph =>
                    paragraph.trim() !== ""
            )
            .map(
                paragraph =>
                    `<p>${escapeArticleHTML(paragraph)}</p>`
            )
            .join("");


    // COVER IMAGE

    let coverImage = "";


    if (blog.image) {

        coverImage = `

            <img
                src="${blog.image}"
                alt="${escapeArticleHTML(blog.title)}"
                class="article-cover"
            >

        `;

    }


    articleContainer.innerHTML = `


        <a
            href="index.html#blogs"
            class="article-back"
        >
            ← Back to Blogs
        </a>


        <div class="article-header">


            <span class="article-category">

                ${escapeArticleHTML(blog.category)}

            </span>


            <h1>

                ${escapeArticleHTML(blog.title)}

            </h1>


            <p class="article-description">

                ${escapeArticleHTML(blog.description)}

            </p>


            <div class="article-meta">

                By
                <strong>
                    ${escapeArticleHTML(blog.author)}
                </strong>

                <span>•</span>

                ${formattedDate}

            </div>


        </div>


        ${coverImage}


        <div class="article-content">

            ${paragraphs}

        </div>


        <div class="article-end">

            <p>
                Thanks for reading.
            </p>

            <a
                href="index.html#blogs"
                class="primary-btn"
            >
                Explore More Blogs
            </a>

        </div>

    `;

}



// ======================================
// SECURITY
// ======================================

function escapeArticleHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}