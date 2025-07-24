// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_URLS, STATIC_BASE_URL } from '../constraints/config';
// import CurrentUserData from './CurrentUserData';

// // Dummy data for posts
// const dummyPosts = [
//   {
//     id: 1,
//     username: 'john_doe',
//     profilePic: 'https://via.placeholder.com/40',
//     image: 'https://via.placeholder.com/600x600?text=Post+1',
//     caption: 'Enjoying a sunny day! ☀️ #Nature',
//     likes: 120,
//     comments: [
//       { username: 'jane_smith', text: 'Looks amazing!' },
//       { username: 'bob_jones', text: 'Where is this?' },
//     ],
//   },
//   {
//     id: 2,
//     username: 'jane_smith',
//     profilePic: 'https://via.placeholder.com/40',
//     image: 'https://via.placeholder.com/600x600?text=Post+2',
//     caption: 'Coffee and chill ☕ #WeekendVibes',
//     likes: 85,
//     comments: [
//       { username: 'john_doe', text: 'Love that cafe!' },
//     ],
//   },
// ];

// const Home = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState(dummyPosts);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await axios.get(API_URLS.getCurrentUser, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data); 
//       console.log(res.data);
//     } catch (err) {
//       console.error('Error fetching user:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Check for token on mount
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       navigate('/'); // Redirect to login page if no token
//     }
//   }, [navigate]);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     navigate('/'); // Redirect to login page
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center sticky top-0 z-10">
//         <h1 className="text-3xl font-bold text-black" style={{ fontFamily: "'Billabong', cursive" }}>
//           Bilkie
//         </h1>
//         <div className="flex items-center space-x-4">
//           <button
//             className="text-blue-600 font-semibold hover:text-blue-800 transition"
//             onClick={() => alert('New post feature not implemented')}
//           >
//             New Post
//           </button>
//           <button
//             className="text-red-600 font-semibold hover:text-red-800 transition"
//             onClick={handleLogout}
//           >
//             Log Out
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto mt-6 px-4">
//         <div className="flex flex-col md:flex-row md:space-x-6">
//           {/* Feed Section */}
//           <div className="flex-1">
//             {posts.map((post) => (
//               <div key={post.id} className="bg-white border border-gray-200 rounded-lg mb-6 shadow-sm">
//                 {/* Post Header */}
//                 <div className="flex items-center p-3">
//                   <img
//                     src={post.profilePic}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <span className="ml-3 font-semibold text-gray-900">{post.username}</span>
//                 </div>
//                 {/* Post Image */}
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full h-auto object-cover"
//                 />
//                 {/* Post Actions */}
//                 <div className="p-3">
//                   <div className="flex items-center space-x-4">
//                     <button
//                       className="text-gray-600 hover:text-red-600 transition"
//                       onClick={() => alert('Like feature not implemented')}
//                     >
//                       ❤️ {post.likes}
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-blue-600 transition"
//                       onClick={() => alert('Comment feature not implemented')}
//                     >
//                       💬
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-blue-600 transition"
//                       onClick={() => alert('Share feature not implemented')}
//                     >
//                       📤
//                     </button>
//                   </div>
//                   {/* Caption */}
//                   <p className="mt-2 text-gray-900">
//                     <span className="font-semibold">{post.username}</span> {post.caption}
//                   </p>
//                   {/* Comments */}
//                   {post.comments.map((comment, index) => (
//                     <p key={index} className="mt-1 text-gray-600 text-sm">
//                       <span className="font-semibold">{comment.username}</span> {comment.text}
//                     </p>
//                   ))}
//                   {/* Comment Input */}
//                   <input
//                     type="text"
//                     placeholder="Add a comment..."
//                     className="w-full mt-2 p-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     onFocus={() => alert('Comment feature not implemented')}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* User Profile Section */}
//           <div className='flex-1'>
//             <CurrentUserData user={user} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS, STATIC_BASE_URL } from '../constraints/config';
import CurrentUserData from './CurrentUserData';

const Home = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  // Fetch current user
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(API_URLS.getCurrentUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      
    } catch (err) {
      console.error('Error fetching user:', err);
      navigate('/'); // Redirect to login if error
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`${API_URLS.getall}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('APIs Response:', res.data); // Log response for debugging
      // setPosts(Array.isArray(res.data) ? res.data : []); // Ensure posts is an array
      setPosts(Array.isArray(res.data.posts) ? res.data.posts : []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setPosts([]); // Set to empty array on error
      alert('Failed to load posts');
    } finally {
      setIsLoading(false); // Update loading state
    }
  };

  // Handle new post submission
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('postimage', postImage);
      formData.append('user', user._id); // Assuming user._id is available

      const res = await axios.post(`${API_URLS.postblog}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setPosts([res.data, ...posts]); // Add new post to the top
      setCaption('');
      setPostImage(null);
      setIsModalOpen(false); // Close modal
      alert('Post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post');
    }
  };

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to login page if no token
    } else {
      fetchUsers();
      fetchPosts();
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-black" style={{ fontFamily: "'Billabong', cursive" }}>
          Bilkie
        </h1>
        <div className="flex items-center space-x-4">
          <button
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
            onClick={() => setIsModalOpen(true)}
          >
            New Post
          </button>
          <button
            className="text-red-600 font-semibold hover:text-red-800 transition"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* New Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            <form onSubmit={handleAddPost}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Write a caption..."
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Feed Section */}
          <div className="flex-1">
            {isLoading ? (
              <p className="text-gray-600 text-center">Loading posts...</p>
            ) : Array.isArray(posts) && posts.length === 0 ? (
              <p className="text-gray-600 text-center">No posts available</p>
            ) : Array.isArray(posts) ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white border border-gray-200 rounded-lg mb-6 shadow-sm">
                  {/* Post Header */}
                  <div className="flex items-center p-3">
                    <img
                      src={post.user.profilePic ? `${STATIC_BASE_URL}/${post.user.profilePic}` : 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="ml-3 font-semibold text-gray-900">{post.user.username}</span>
                  </div>
                  {/* Post Image */}
                  <img
                    src={`${STATIC_BASE_URL}/${post.postimage}`}
                    alt="Post"
                    className="w-full h-auto object-cover"
                  />
                  {/* Post Actions */}
                  <div className="p-3">
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-gray-600 hover:text-red-600 transition"
                        onClick={() => alert('Like feature not implemented')}
                      >
                        ❤️ {post.likes || 0}
                      </button>
                      <button
                        className="text-gray-600 hover:text-blue-600 transition"
                        onClick={() => alert('Comment feature not implemented')}
                      >
                        💬
                      </button>
                      <button
                        className="text-gray-600 hover:text-blue-600 transition"
                        onClick={() => alert('Share feature not implemented')}
                      >
                        📤
                      </button>
                    </div>
                    {/* Caption */}
                    <p className="mt-2 text-gray-900">
                      <span className="font-semibold">{post.user.username}</span> {post.caption}
                    </p>
                    {/* Comments */}
                    {post.comments && Array.isArray(post.comments) && post.comments.length > 0 ? (
                      post.comments.map((comment, index) => (
                        <p key={index} className="mt-1 text-gray-600 text-sm">
                          <span className="font-semibold">{comment.username}</span> {comment.text}
                        </p>
                      ))
                    ) : (
                      <p className="mt-1 text-gray-600 text-sm">No comments yet</p>
                    )}
                    {/* Comment Input */}
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full mt-2 p-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onFocus={() => alert('Comment feature not implemented')}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">Error loading posts</p>
            )}
          </div>
          {/* User Profile Section */}
          <div className="flex-1">
            <CurrentUserData user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;