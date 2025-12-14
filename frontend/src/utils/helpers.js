export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const getQuantityStatus = (quantity) => {
  if (quantity === 0) return { text: 'Out of Stock', color: 'bg-red-500 text-white' };
  if (quantity <= 10) return { text: 'Low Stock', color: 'bg-yellow-500 text-white' };
  return { text: 'In Stock', color: 'bg-green-500 text-white' };
};

export const getSweetImage = (imageUrl, category) => {
  if (imageUrl) return imageUrl;
  
  const categoryImages = {
    chocolate: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=400&h=300&fit=crop',
    candy: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop',
    biscuit: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    cake: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
    pastry: 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?w=400&h=300&fit=crop',
    traditional: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    'ice-cream': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    other: 'https://images.unsplash.com/photo-1514517260014-9f5c4f5c04e5?w=400&h=300&fit=crop'
  };
  
  return categoryImages[category] || categoryImages.other;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};