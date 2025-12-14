import React from 'react';
import { useSweet } from '../../context/SweetContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import { FaTimes, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';

const PurchaseModal = ({
  isOpen,
  onClose,
  sweet,
  quantity,
  incrementQuantity,
  decrementQuantity
}) => {
  const { purchaseSweet } = useSweet();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handlePurchase = async () => {
    if (isAdmin) return;
    if (quantity <= 0 || quantity > sweet.quantity) return;

    setLoading(true);
    try {
      await purchaseSweet(sweet._id, quantity);
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const totalPrice = sweet.price * quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Purchase Sweet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Sweet Info */}
          <div className="flex gap-4">
            <img
              src={sweet.imageUrl || 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=200&h=200&fit=crop'}
              alt={sweet.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{sweet.name}</h3>
              <p className="text-primary-600 font-bold text-xl">
                {formatPrice(sweet.price)}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {sweet.quantity}
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1 || loading}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <FaMinus />
              </button>

              <span className="text-2xl font-bold">{quantity}</span>

              <button
                onClick={incrementQuantity}
                disabled={quantity >= sweet.quantity || loading}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* Admin Warning */}
          {isAdmin && (
            <p className="text-red-600 text-sm text-center">
              Admins are not allowed to purchase items.
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={handlePurchase}
              disabled={
                loading ||
                isAdmin ||
                quantity === 0 ||
                quantity > sweet.quantity
              }
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <FaShoppingCart />
                  Purchase
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
