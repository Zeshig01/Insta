const express =require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const verifyToken =require('../utlis/verifyToken')

router.post("/:id/follow",verifyToken , userController.followUser);
router.post("/:id/unfollow",verifyToken, userController.unFollowUser);

router.get('/Users',verifyToken, userController.getAllUser)
router.get('/currentUser', verifyToken, userController.currentUser)

router.put('/editCurrentUser', verifyToken, userController.editCurrentUser)
module.exports = router;