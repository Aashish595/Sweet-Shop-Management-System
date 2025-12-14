import React, { useState, useEffect } from 'react';
import { useSweet } from '../../context/SweetContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import { SWEET_CATEGORIES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard = () => {
  const { sweets, loading, fetchSweets } = useSweet();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalSweets: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0
  });

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  useEffect(() => {
    if (sweets.length > 0) {
      const totalValue = sweets.reduce(
        (sum, sweet) => sum + sweet.price * sweet.quantity,
        0
      );

      const lowStockCount = sweets.filter(
        sweet => sweet.quantity > 0 && sweet.quantity <= 10
      ).length;

      const outOfStockCount = sweets.filter(
        sweet => sweet.quantity === 0
      ).length;

      setStats({
        totalSweets: sweets.length,
        totalValue,
        lowStockCount,
        outOfStockCount
      });
    }
  }, [sweets]);

  const categoryDistribution = SWEET_CATEGORIES.map(category => ({
    name: category.label,
    count: sweets.filter(s => s.category === category.value).length
  }));

  const lowStockItems = sweets
    .filter(s => s.quantity > 0 && s.quantity <= 10)
    .sort((a, b) => a.quantity - b.quantity);

  const outOfStockItems = sweets.filter(s => s.quantity === 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome, {user?.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Sweets" value={stats.totalSweets} />
        <StatCard label="Inventory Value" value={formatPrice(stats.totalValue)} />
        <StatCard label="Low Stock" value={stats.lowStockCount} />
        <StatCard label="Out of Stock" value={stats.outOfStockCount} />
      </div>

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Category Distribution
        </h3>

        {categoryDistribution.map(cat => (
          <div key={cat.name} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>{cat.name}</span>
              <span>{cat.count}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{
                  width: `${(cat.count / stats.totalSweets) * 100 || 0}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Low Stock Items ({lowStockItems.length})
        </h3>

        {lowStockItems.length === 0 ? (
          <p className="text-gray-600">No low stock items</p>
        ) : (
          <ul className="space-y-2">
            {lowStockItems.slice(0, 5).map(item => (
              <li
                key={item._id}
                className="flex justify-between border p-3 rounded"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.quantity} left</p>
                  <p className="text-sm">{formatPrice(item.price)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Out of Stock */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Out of Stock Items ({outOfStockItems.length})
        </h3>

        {outOfStockItems.length === 0 ? (
          <p className="text-gray-600">All items are in stock</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Updated</th>
              </tr>
            </thead>
            <tbody>
              {outOfStockItems.map(item => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{formatPrice(item.price)}</td>
                  <td className="p-2 text-sm text-gray-600">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

export default AdminDashboard;
