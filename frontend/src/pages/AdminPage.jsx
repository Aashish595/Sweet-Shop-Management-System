import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;