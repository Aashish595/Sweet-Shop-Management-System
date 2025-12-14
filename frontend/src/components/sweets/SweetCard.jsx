import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSweet } from '../../context/SweetContext';
import { formatPrice, truncateText, getSweetImage } from '../../utils/helpers';
import PurchaseModal from './PurchaseModal';
import RestockModal from './RestockModal';
import SweetForm from './SweetForm';

const SweetCard = ({ sweet }) => {
  const { user, isAdmin } = useAuth();
  const { deleteSweet, setSelectedSweet } = useSweet();

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const imageUrl = getSweetImage(sweet.imageUrl, sweet.category);

  const handleDeleteClick = async () => {
    if (window.confirm(`Delete "${sweet.name}"?`)) {
      await deleteSweet(sweet._id);
    }
  };

  return (
    <>
      <div className="border rounded-lg p-4 bg-white space-y-3">

        {/* Image */}
        <img
          src={imageUrl}
          alt={sweet.name}
          className="w-full h-40 object-cover rounded"
        />

        {/* Info */}
        <h3 className="text-lg font-bold">{sweet.name}</h3>

        <p className="text-sm text-gray-600">
          {truncateText(sweet.description, 80)}
        </p>

        <div className="flex justify-between items-center">
          <p className="font-semibold">{formatPrice(sweet.price)}</p>
          <p className="text-sm text-gray-600">
            Stock: {sweet.quantity}
          </p>
        </div>

        {/* User Action */}
        {user && (
          <button
            onClick={() => {
              setQuantity(1);
              setShowPurchaseModal(true);
            }}
            disabled={sweet.quantity === 0}
            className={`w-full border rounded py-2 ${
              sweet.quantity === 0
                ? 'bg-gray-200 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            Buy
          </button>
        )}

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex justify-between text-sm pt-2 border-t">
            <button
              onClick={() => {
                setSelectedSweet(sweet);
                setShowEditForm(true);
              }}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => {
                setQuantity(10);
                setShowRestockModal(true);
              }}
              className="text-green-600 hover:underline"
            >
              Restock
            </button>

            <button
              onClick={handleDeleteClick}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        sweet={sweet}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <RestockModal
        isOpen={showRestockModal}
        onClose={() => setShowRestockModal(false)}
        sweet={sweet}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <SweetForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        sweet={sweet}
        isEditing
      />
    </>
  );
};

export default SweetCard;
