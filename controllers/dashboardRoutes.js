
// router.get and router.post for dashboard

// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post, User  } = require("../models/");
const { restore } = require("../models/user");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user


// TODO - retrieve all posts from the database for the logged in user
// render the dashboard template with the posts retrieved from the database
//default layout is set to main.handlebars, layout need to be changed to dashboard to use dashboard.handlebar

// get all the posts made from all users 
router.get("/", withAuth, async (req, res) => {
  const postsData = await Post.findAll ({
    // order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"]
      }
    ],
  });
  const posts = postsData.map((post) => post.get ({ plain: true}));
  console.log(posts);
  res.render("admin-all-posts", {layout: "dashboard", posts});
});


// for user posts only 
router.get("/profile", withAuth, async (req, res) => {
  const postsData = await Post.findAll ({
    where: { userId: req.session.userId },
    // order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"]
      }
    ],
  });
  const  posts = postsData.map((post) => post.get ({ plain: true}));
  console.log(posts);
  res.render("users-post", {layout: "dashboard", posts});
});

// It should display a form for creating a new post
router.get("/create", withAuth, async (req, res) => {
  res.render('create-post', {layout: "dashboard",});
});

// TODO - create logic for the GET route for /new that renders the new post page
router.post("/create", withAuth, async (req,res)=> {
  try {
    await Post.create ({
      title: req.body.title,
      body: req.body.body,
      userId:req.session.userId,
    });
    res.status(200).json({message: "You post has been created"});
  } catch (err) {
    res.status(500).json(err);
  }
});











// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post

module.exports = router;

