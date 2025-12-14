import { useState, useEffect } from 'react';
import { useSweet } from '../../context/SweetContext';
import { SWEET_CATEGORIES } from '../../utils/constants';
import { FaTimes, FaSave } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';

const SweetForm = ({ isOpen, onClose, sweet = null, isEditing = false }) => {
  const { createSweet, updateSweet } = useSweet();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'chocolate',
    price: '',
    quantity: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (sweet && isEditing) {
      setFormData({
        name: sweet.name,
        description: sweet.description,
        category: sweet.category,
        price: String(sweet.price),
        quantity: String(sweet.quantity),
        imageUrl: sweet.imageUrl || ''
      });
    }
  }, [sweet, isEditing]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Enter valid price';
    if (formData.quantity === '' || Number(formData.quantity) < 0)
      newErrors.quantity = 'Enter valid quantity';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        imageUrl: formData.imageUrl || undefined
      };

      if (isEditing && sweet) {
        await updateSweet(sweet._id, data);
      } else {
        await createSweet(data);
      }

      onClose();
    } catch (err) {
      console.error('Sweet form error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg w-full max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-lg font-bold">
            {isEditing ? 'Edit Sweet' : 'Add Sweet'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              {SWEET_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.quantity && (
                <p className="text-sm text-red-600">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium">Image URL (optional)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <FaSave />
                  {isEditing ? 'Update' : 'Save'}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SweetForm;
