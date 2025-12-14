import React, { useEffect } from 'react';
import { useSweet } from '../../context/SweetContext';
import { useAuth } from '../../context/AuthContext';
import SweetCard from './SweetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import SweetSearch from './SweetSearch';
import { FaPlus } from 'react-icons/fa';
import SweetForm from './SweetForm';

const SweetList = () => {
  const { sweets, loading, fetchSweets } = useSweet();
  const { isAdmin } = useAuth();
  const [showAddForm, setShowAddForm] = React.useState(false);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const handleRefresh = () => {
    fetchSweets();
  };

  if (loading && sweets.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Sweet Collection 🍭</h2>
          <p className="text-gray-600 mt-2">
            {sweets.length} {sweets.length === 1 ? 'sweet' : 'sweets'} available
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRefresh}
            className="btn-secondary"
          >
            Refresh
          </button>
          
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add New Sweet</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Component */}
      <SweetSearch />

      {/* Sweets Grid */}
      {sweets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">🍬</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Sweets Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <SweetCard key={sweet._id} sweet={sweet} />
          ))}
        </div>
      )}

      {/* Add Sweet Form Modal */}
      <SweetForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        isEditing={false}
      />
    </div>
  );
};

export default SweetList;