const express=require('express')
const { addPost, getPost } = require('../controllers/post.controllers'); 

const verifyToken = require('../utlis/verifyToken');
const upload = require('../utlis/upload');
const router=express.Router()

router.post('/post', verifyToken, upload.single('postimage'), addPost);
router.get('/getall', verifyToken, getPost);

module.exports = router;