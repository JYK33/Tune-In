
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

// is gets all of a users post, needs to be linked to users-posts.hdb
router.get("/", withAuth, async (req, res) => {
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
  const posts = postsData.map((post) => post.get ({ plain: true}));
  res.render("admin-all-posts", {layout: "dashboard", posts});


  // refer to admin-all-posts.handlebars write the code to display the posts
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
    restore.status(500).json(err);
  }
  res.redirect ('/dashboard');
});

// console.log("redirect to dashboard?")










// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post

module.exports = router;

