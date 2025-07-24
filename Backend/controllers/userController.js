const mongoose = require('mongoose');
const User = require('../models/auth');

exports.getAllUser = async (req, res) => {
    try {
        const currentUserId = req.user.id; // From JWT middleware
        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            return res.status(404).json({ message: 'Current user not found' });
        }
        const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');
        const usersWithFollowStatus = users.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture , // Include profile picture, default to empty string if not set
            followers: user.followers.length,
            following: user.following.length,
            isFollowedByMe: currentUser.following.includes(user._id),
        }));
        res.status(200).json(usersWithFollowStatus);
    } catch (error) {
        console.error('Error in getAllUser:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};
exports.followUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid target user ID' });
        }

        const targetUser = await User.findById(req.params.id);
        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        const currentUser = await User.findById(req.user.id); // Use req.user.id from JWT
        if (!currentUser) {
            return res.status(404).json({ message: 'Current user not found' });
        }

        // Prevent self-follow
        if (req.params.id === req.user.id) {
            return res.status(400).json({ message: 'Cannot follow yourself' });
        }

        if (!targetUser.followers.includes(req.user.id)) {
            targetUser.followers.push(req.user.id);
            currentUser.following.push(req.params.id);
            await targetUser.save();
            await currentUser.save();
            return res.status(200).json({ message: 'Followed successfully' });
        } else {
            return res.status(400).json({ message: 'Already following' });
        }
    } catch (error) {
        console.error('Error in followUser:', error);
        res.status(500).json({ message: 'Failed to follow user', error: error.message });
    }
};

exports.unFollowUser = async (req, res) => {
    try {
        // Validate target user ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid target user ID' });
        }

        const targetUser = await User.findById(req.params.id);
        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        const currentUser = await User.findById(req.user.id); // Use req.user.id
        if (!currentUser) {
            return res.status(404).json({ message: 'Current user not found' });
        }

        if (targetUser.followers.includes(req.user.id)) {
            targetUser.followers.pull(req.user.id);
            currentUser.following.pull(req.params.id);
            await targetUser.save();
            await currentUser.save();
            return res.status(200).json({ message: 'Unfollowed successfully' });
        } else {
            return res.status(400).json({ message: 'Not following this user' });
        }
    } catch (error) {
        console.error('Error in unFollowUser:', error);
        res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
    }
};

exports.currentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId }).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const userInfo = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture || '',
            followers: user.followers.length,
            following: user.following.length,
        };
        
        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// exports.editCurrentUser = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { username, email, profilePicture } = req.body;
//         console.log("Request Body:", req.body);
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 username,
//                 email,
//                 profilePicture,
//             },
//             { new: true, runValidators: true }
//         ).select('-password');

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             message: 'Profile updated successfully',
//             user: updatedUser,
//         });
//     } catch (error) {
//         console.error('Error in editCurrentUser:', error);
//         res.status(500).json({ message: 'Failed to update user', error: error.message });
//     }
// };
exports.editCurrentUser = async (req, res) => {
  try {
    console.log('req.body:', req.body); // Debug
    console.log('req.file:', req.file); // Debug

    const userId = req.user.id;
    const { username, email } = req.body;

    // Validate required fields
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    // Handle profile picture
    let profilePicture = req.body.profilePicture; // Fallback for non-file case
    if (req.file) {
      profilePicture = `/uploads/${req.file.filename}`;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        profilePicture,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error in editCurrentUser:', error);
    if (error.message.includes('Only JPEG, PNG, and GIF files are allowed')) {
      return res.status(400 ).json({ message: error.message });
    }
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds 5MB limit' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};