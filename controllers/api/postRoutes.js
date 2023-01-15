
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post("/", withAuth, async (req, res) => {
    try {
        const d = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.userID
        })
        res.status(200).json({message: "Post created!"});
    } catch (error) {
        res.status(500).json(error);
    }
})
// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put("/update/:id", withAuth, async (req, res) => {
    try {
        const data = Post.update({
            title: req.body.title,
            body: req.body.body
        },  
        {
            where: {
                id: req.body.postID
            }
        })
        if (!data) {
            res.status(404).json({message: "Could not find a post with this ID!"});
        } else {
            res.status(200).json({message: "Succesfully updated post!"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware

router.delete("delete/:id", async (req, res) => {
    try {
        const d = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!d) {
            res.status(404).json({message: "Could not find post with this ID!"});
        } else {
            res.status(200).json({message: "Post deleted!"});
        }

    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;
