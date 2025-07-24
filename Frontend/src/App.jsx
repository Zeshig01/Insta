import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Auth from './components/Auth';
import Home from './components/Home';
import NotFound from './components/NotFound';
import UsersList from './components/UsersList';

// ProtectedRoute component to check authentication
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/'); 
    }
  }, [token, navigate]);

  return token ? children : null; 
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;