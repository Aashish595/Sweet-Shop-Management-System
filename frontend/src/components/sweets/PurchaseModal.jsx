const PurchaseModal = ({ isOpen, onClose, sweet, quantity, setQuantity }) => {
  if (!isOpen) return null;

  const increment = () => {
    if (quantity < sweet.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">

        <h2 className="text-lg font-bold">{sweet.name}</h2>

        {/* Quantity Control */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={decrement}
            className="border px-3 py-1 rounded"
            disabled={quantity <= 1}
          >
            −
          </button>

          <span className="font-semibold text-lg">{quantity}</span>

          <button
            onClick={increment}
            className="border px-3 py-1 rounded"
            disabled={quantity >= sweet.quantity}
          >
            +
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Available stock: {sweet.quantity}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
