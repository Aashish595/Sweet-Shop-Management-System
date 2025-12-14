import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSweet } from '../context/SweetContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { sweets, loading, fetchSweets } = useSweet();

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const inStockCount = sweets.filter(s => s.quantity > 0).length;
  const avgPrice =
    sweets.length > 0
      ? formatPrice(
          sweets.reduce((sum, s) => sum + s.price, 0) / sweets.length
        )
      : formatPrice(0);

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.username}
        </h1>
        <p className="text-gray-600 mt-1">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </p>
        <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-gray-600">Total Sweets</p>
          <p className="text-2xl font-bold">{sweets.length}</p>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-gray-600">Items In Stock</p>
          <p className="text-2xl font-bold">{inStockCount}</p>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <p className="text-sm text-gray-600">Average Price</p>
          <p className="text-2xl font-bold">{avgPrice}</p>
        </div>
      </div>

      {/* Sweets List */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-bold mb-4">Available Sweets</h2>

        {sweets.length === 0 ? (
          <p className="text-gray-600">No sweets available.</p>
        ) : (
          <div className="space-y-3">
            {sweets.slice(0, 5).map((sweet) => (
              <div
                key={sweet._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{sweet.name}</p>
                  <p className="text-sm text-gray-600">
                    Stock: {sweet.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(sweet.price)}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Link
            to="/sweets"
            className="text-blue-600 hover:underline"
          >
            View All Sweets
          </Link>
        </div>
      </div>

      {/* Admin Section */}
      {user?.role === 'admin' && (
        <div className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/admin"
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Admin Panel
            </Link>
            <Link
              to="/sweets"
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Manage Sweets
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
