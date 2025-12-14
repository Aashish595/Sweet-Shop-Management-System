import React from 'react';
import { useSweet } from '../../context/SweetContext';
import { FaTimes, FaBox, FaPlus, FaMinus } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';

const RestockModal = ({ isOpen, onClose, sweet, quantity, setQuantity }) => {
  const { restockSweet } = useSweet();
  const [loading, setLoading] = React.useState(false);

  const handleRestock = async () => {
    if (quantity <= 0) return;
    
    setLoading(true);
    try {
      await restockSweet(sweet._id, quantity);
      onClose();
    } catch (error) {
      console.error('Restock failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 10);
  };

  const decrementQuantity = () => {
    if (quantity > 10) {
      setQuantity(prev => prev - 10);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaBox className="text-2xl text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Restock Sweet</h2>
              <p className="text-sm text-gray-600">Add more inventory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        {/* Sweet Details */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={sweet.imageUrl || `https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=200&h=200&fit=crop`}
              alt={sweet.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{sweet.name}</h3>
              <p className="text-gray-600">Current Stock: {sweet.quantity} units</p>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quantity to Add
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 10 || loading}
                className="p-2 rounded-lg border-2 border-gray-300 hover:border-green-500 disabled:opacity-50"
              >
                <FaMinus />
              </button>
              
              <div className="flex-1">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="input-field text-center text-2xl font-bold"
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={incrementQuantity}
                disabled={loading}
                className="p-2 rounded-lg border-2 border-gray-300 hover:border-green-500"
              >
                <FaPlus />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Quick add: Click ±10 buttons or enter custom amount
            </p>
          </div>

          {/* New Stock Preview */}
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Total Stock:</span>
              <span className="text-2xl font-bold text-green-600">
                {sweet.quantity + quantity} units
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              (Current: {sweet.quantity} + Added: {quantity})
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleRestock}
              disabled={loading || quantity <= 0}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <FaBox />
                  <span>Restock</span>
                </>
              )}
            </button>
          </div>

          {/* Validation Message */}
          {quantity <= 0 && (
            <p className="text-red-600 text-sm mt-3 text-center">
              Please enter a valid quantity
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestockModal;