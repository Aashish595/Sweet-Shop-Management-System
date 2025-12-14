import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSweet } from '../context/SweetContext';
import { useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { sweets, loading, fetchSweets } = useSweet();

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const inStockCount = sweets.filter(s => s.quantity > 0).length;

  return (
    <div className="space-y-8">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.username}
        </h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Stat label="Available Items" value={inStockCount} />
        <Stat label="Total Sweets" value={sweets.length} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white border rounded-lg p-4">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
