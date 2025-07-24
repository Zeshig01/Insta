
const Post = require('../models/post')
exports.addPost = async(req, res) => {
    try {
        const { user, caption,  } = req.body
        const postimage = req.file ? req.file.filename : null; 
        const addPost = await new Post({
            user, caption, postimage
        })
        await addPost.save().then(savedPost => {
            res.status(201).json(savedPost);
        }).catch(err => {
            res.status(500).json({ message: "Error saving post", error: err });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });

    }
}

exports.getPost=async (req,res)=>{
    try {
    const allPost = await find().populate('user')  
    res.status(200).json(allPost);
    } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
    }
}

