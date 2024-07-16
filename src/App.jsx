// AppContent.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import UserList from './pages/UserList';

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {isAuthRoute ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <DashboardLayout>
          <Routes>
            <Route path="/home" element={<Home />}  />
            <Route path="/books" element={<BookList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </DashboardLayout>
      )}
    </>
  );
};

export default AppContent;
