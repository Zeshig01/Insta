// import { useState } from "react"

// const CurrentUserData = ({ user }) => {
//   const [isOpen, setIsOpen] =useState(false)
//   const openModal=()=> setIsOpen(true)
//   const closeModal=()=> setIsOpen(false)
//   console.log('my users', user)
 
//   return (
//     <div > {user && (
//       <div className="w-full md:w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-sm sticky top-20">
//         <div className="flex items-center">
//           <img
//             src={user.profilePicture ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}` : 'https://via.placeholder.com/50'}
//             alt="Profile"
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div className="ml-3">
//             <p className="font-semibold text-gray-900">{user.username}</p>
//             <p className="text-gray-600 text-sm">@{user.username}</p>
//           </div>
//         </div>
//         <div className="flex justify-between mt-4 text-gray-600 text-sm">
//           <div>
//             <p className="font-semibold">{user.posts || 0}</p>
//             <p>Posts</p>
//           </div>
//           <div>
//             <p className="font-semibold">{user.followers}</p>
//             <p>Followers</p>
//           </div>
//           <div>
//             <p className="font-semibold">{user.following}</p>
//             <p>Following</p>
//           </div>
//         </div>
//         <button className="w-full mt-4 py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-200 transition" onClick={openModal}  >
//           Edit Profile
//         </button> 
//       </div>
//     )}
//     </div>
//   )
// }
// export default CurrentUserData


// import { useState } from "react";
// import axios from "axios";
// import { API_URLS } from "../constraints/config";

// const CurrentUserData = ({ user }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     email: user?.email || "",
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(
//     user?.profilePicture
//       ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
//       : "https://via.placeholder.com/50"
//   );
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => {
//     setIsOpen(false);
//     setError(null);
//     setSuccess(null);
//     setSelectedImage(null);
//     setImagePreview(
//       user?.profilePicture
//         ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
//         : "https://via.placeholder.com/50"
//     );
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("username", formData.username);
//     data.append("email", formData.email);
//     if (selectedImage) {
//       data.append("profilePicture", selectedImage);
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.put(API_URLS.editCurrentUser, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setSuccess("Profile updated successfully!");
//       setError(null);
//       // Optionally, refresh user data via a prop callback or refetch
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update profile.");
//       setSuccess(null);
//     }
//   };

//   return (
//     <div>
//       {user && (
//         <div className="w-full md:w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-sm sticky top-20">
//           <div className="flex items-center">
//             <img
//               src={
//                 user.profilePicture
//                   ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
//                   : "https://via.placeholder.com/50"
//               }
//               alt="Profile"
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div className="ml-3">
//               <p className="font-semibold text-gray-900">{user.username}</p>
//               <p className="text-gray-600 text-sm">@{user.username}</p>
//             </div>
//           </div>
//           <div className="flex justify-between mt-4 text-gray-600 text-sm">
//             <div>
//               <p className="font-semibold">{user.posts || 0}</p>
//               <p>Posts</p>
//             </div>
//             <div>
//               <p className="font-semibold">{user.followers}</p>
//               <p>Followers</p>
//             </div>
//             <div>
//               <p className="font-semibold">{user.following}</p>
//               <p>Following</p>
//             </div>
//           </div>
//           <button
//             className="w-full mt-4 py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
//             onClick={openModal}
//           >
//             Edit Profile
//           </button>
//         </div>
//       )}

//       {/* Modal */}
     

//       {isOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
//     <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             required
//             autoFocus
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
//             Profile Picture
//           </label>
//           <input
//             type="file"
//             id="profilePicture"
//             name="profilePicture"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
//           />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="mt-3 w-24 h-24 rounded-full object-cover border border-gray-300"
//             />
//           )}
//         </div>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         {success && <p className="text-green-500 text-sm">{success}</p>}
//         <div className="flex justify-end space-x-3 pt-4">
//           <button
//             type="button"
//             onClick={closeModal}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default CurrentUserData;


import { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS, STATIC_BASE_URL } from "../constraints/config";

const CurrentUserData = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    user?.profilePicture
      ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
      : "https://via.placeholder.com/50"
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update formData when user prop changes
  useEffect(() => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
    });
    setImagePreview(
      user?.profilePicture
        ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
        : "https://via.placeholder.com/50"
    );
  }, [user]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
    setSuccess(null);
    setSelectedImage(null);
    // Reset formData to current user data
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
    });
    setImagePreview(
      user?.profilePicture
        ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
        : "https://via.placeholder.com/50"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    if (selectedImage) {
      data.append("profilePicture", selectedImage);
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(API_URLS.editCurrentUser, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Profile updated successfully!");
      setError(null);
      // Optionally, refresh user data via a prop callback or refetch
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
      setSuccess(null);
    }
  };

  return (
    <div>
      {user && (
        <div className="w-full md:w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-sm sticky top-20">
          <div className="flex items-center">
            <img
              src={
                user.profilePicture
                  ? `${STATIC_BASE_URL}${user.profilePicture.toLowerCase()}`
                  : "https://via.placeholder.com/50"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-900">{user.username}</p>
              <p className="text-gray-600 text-sm">@{user.username}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-gray-600 text-sm">
            <div>
              <p className="font-semibold">{user.posts || 0}</p>
              <p>Posts</p>
            </div>
            <div>
              <p className="font-semibold">{user.followers}</p>
              <p>Followers</p>
            </div>
            <div>
              <p className="font-semibold">{user.following}</p>
              <p>Following</p>
            </div>
          </div>
          <button
            className="w-full mt-4 py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
            onClick={openModal}
          >
            Edit Profile
          </button>
        </div>
      )}

      {isOpen && (
<div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-24 h-24 rounded-full object-cover border border-gray-300"
                  />
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentUserData;