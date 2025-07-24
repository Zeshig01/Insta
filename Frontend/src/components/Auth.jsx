import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  
  const navigate = useNavigate();
  const tokena = localStorage.getItem('authToken'); 
  useEffect(() => {
    if (tokena) {
      navigate('/home');
    }
  }, [tokena, navigate]);
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // Step 1: Signup form, Step 2: Profile picture
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [profilePicture, setProfilePicture] = useState(null); // Store selected image file
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState(''); // Store token after signup
  const [userId, setUserId] = useState(''); // Store user ID after signup

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = 'http://localhost:8000/api/auth/signup';
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(url, payload);
      const { token, user } = response.data;

      // Store token and user ID for the next step
      setToken(token);
      setUserId(user.id);
      localStorage.setItem('authToken', token);

      setSuccess('Signup successful! Please upload a profile picture or skip.');
      setFormData({ username: '', email: '', password: '' });
      setStep(2); // Move to profile picture step
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = 'http://localhost:8000/api/auth/login';
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(url, payload);
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      setSuccess(response.data.message);
      setFormData({ username: '', email: '', password: '' });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!profilePicture) {
      setError('Please select an image or skip.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      const response = await axios.post(
        'http://localhost:8000/api/auth/update-profile-picture',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess(response.data.message);
      setProfilePicture(null);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleSkip = () => {
    setProfilePicture(null);
    navigate('/home');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setStep(1); // Reset to step 1
    setFormData({ username: '', email: '', password: '' });
    setProfilePicture(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Instagram Logo */}
      <div className="mb-6">
        <h1
          className="text-4xl font-bold text-center text-black"
          style={{ fontFamily: "'Billabong', cursive" }}
        >
          Bilkie
        </h1>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {/* Stepper Indicator */}
        {!isLogin && (
          <div className="mb-4 flex justify-between items-center">
            <div className={`flex-1 text-center ${step === 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              Step 1: Details
            </div>
            <div className={`flex-1 text-center ${step === 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              Step 2: Profile Picture
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-600 text-sm rounded text-center">
            {success}
          </div>
        )}

        {/* Signup or Login Form */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 Warnings: focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Phone number, username, or email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#F77737] text-white text-sm font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Log In
            </button>
          </form>
        ) : step === 1 ? (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Phone number, username, or email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#F77737] text-white text-sm font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleProfilePictureSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Upload Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#F77737] text-white text-sm font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 py-2.5 bg-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              >
                Skip
              </button>
            </div>
          </form>
        )}

        {/* Separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm font-semibold">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Alternative Login (Mock) */}
        <button
          className="w-full py-2.5 text-blue-600 text-sm font-semibold hover:text-blue-800 transition"
          onClick={() => alert('Facebook login not implemented')}
        >
          Log in with Facebook
        </button>
      </div>

      {/* Toggle Form */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Have an account?'}{' '}
          <button
            onClick={toggleForm}
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;