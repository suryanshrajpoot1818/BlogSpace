const express = require("express");
const cors = require("cors");
console.log("SERVER VERSION 2");
const app = express();
const PORT = 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// TEMP STORAGE
// =========================

let users = [];

let blogs = [];

// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {

    res.send("🚀 BlogSpace Backend Running");

});

// =========================
// REGISTER API
// =========================

app.post("/api/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.status(400).json({

            success: false,
            message: "All fields are required."

        });

    }

    const existingUser = users.find(

        user => user.email === email

    );

    if (existingUser) {

        return res.status(400).json({

            success: false,
            message: "Email already registered."

        });

    }

    const newUser = {

        id: Date.now(),

        name,

        email,

        password

    };

    users.push(newUser);

    res.json({

        success: true,

        message: "Registration successful!"

    });

});

// =========================
// LOGIN API
// =========================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(

        u =>

            u.email === email &&

            u.password === password

    );

    if (!user) {

        return res.status(401).json({

            success: false,

            message: "Invalid credentials"

        });

    }

    res.json({

        success: true,

        message: "Login successful",

        user: {

            id: user.id,

            name: user.name,

            email: user.email

        }

    });

});

// =========================
// CREATE BLOG
// =========================

app.post("/api/blogs", (req, res) => {

    const {

    title,

    category,

    image,

    description,

    content,

    author

} = req.body;

    if (

        !title ||

        !category ||

        !description ||

        !content ||

        !author

    ) {

        return res.status(400).json({

            success: false,

            message: "Missing required fields."

        });

    }

  const blog = {

    id: Date.now(),

    title,

    category,

    image,

    description,

    content,

    author,

    createdAt: new Date()

};

    blogs.unshift(blog);

    res.json({

        success: true,

        message: "Blog created successfully",

        blog

    });

});

// =========================
// GET ALL BLOGS
// =========================

app.get("/api/blogs", (req, res) => {

    res.json(blogs);

});


app.delete("/test", (req, res) => {

    res.json({

        success: true,

        message: "Delete route works!"

    });

});
// =========================
// =========================
// DELETE BLOG
// =========================

app.delete("/api/blogs/:id", (req, res) => {

    const blogId = Number(req.params.id);

    console.log("Deleting Blog ID:", blogId);

    const index = blogs.findIndex(blog => blog.id === blogId);

    if (index === -1) {

        return res.status(404).json({

            success: false,

            message: "Blog not found"

        });

    }

    blogs.splice(index, 1);

    res.json({

        success: true,

        message: "Blog deleted successfully"

    });

});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(

        `Server running at http://localhost:${PORT}`

    );

});