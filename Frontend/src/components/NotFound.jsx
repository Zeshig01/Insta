const NotFound = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="py-2.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    );
  };
  
  export default NotFound;