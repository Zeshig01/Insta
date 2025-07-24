const UserCard = ({ user, currentUserId, handleFollow, handleUnfollow }) => {
  const BASE_URL = "http://localhost:8000";
  console.log('User Object:', user); // Log the entire user object
  console.log('Profile Picture:', user.profilePicture); // Log profilePicture specifically
  const imageUrl = user.profilePicture ? `${BASE_URL}${user.profilePicture}` : '/default-profile.png';
  console.log('Image URL:', imageUrl); // Already present

  return (
    <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <img
          src={imageUrl}
          alt={`${user.username}'s profile`}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
          onError={(e) => {
            console.log('Image failed to load:', imageUrl);
            e.target.src = '/default-profile.png'; // Fallback image
          }}
        />
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{user.username}</h2>
          <p className="text-xs text-gray-500 truncate max-w-[200px]">
            {user.email || "No email available"}
          </p>
          <div className="flex space-x-3 text-xs text-gray-500">
            <span>{user.followers} Followers</span>
            <span>{user.following} Following</span>
          </div>
        </div>
      </div>
      {user._id !== currentUserId && (
        user.isFollowedByMe ? (
          <button
            onClick={() => handleUnfollow(user._id)}
            className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-1 rounded-full hover:bg-gray-200 transition-colors duration-150"
          >
            Following
          </button>
        ) : (
          <button
            onClick={() => handleFollow(user._id)}
            className="text-sm font-semibold text-white bg-[#0095F6] px-4 py-1 rounded-full hover:bg-[#0077C9] transition-colors duration-150"
          >
            Follow
          </button>
        )
      )}
    </div>
  );
};

export default UserCard;