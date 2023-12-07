import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait for AuthContext to load user data from localStorage.
    if (loading) return;
    // Check if the user is logged in
    if (!user) {
      // If not logged in, redirect to the login page
      navigate('/login');
    } else {
      // If logged in, check user role and redirect accordingly
      const { role } = user;
      if (role === 'Doctor') {
        navigate('/doctor');
      } else if (role === 'Patient') {
        navigate('/patient');
      } else {
        // TODO: should not happen, can snackbar error + logout.
      }
    }
  }, [loading]);

  return (
    <div>
      <p>Redirecting you...</p>
    </div>
  );
};

export default LandingPage;
