export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const APP_NAME = 'Sweet Shop';

/* Sweet Categories (Simple & Clean) */
export const SWEET_CATEGORIES = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'candy', label: 'Candy' },
  { value: 'biscuit', label: 'Biscuit' },
  { value: 'cake', label: 'Cake' },
  { value: 'pastry', label: 'Pastry' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'ice-cream', label: 'Ice Cream' },
  { value: 'other', label: 'Other' }
];

/* Category Map (Optional but Useful) */
export const SWEET_CATEGORY_MAP = {
  chocolate: 'Chocolate',
  candy: 'Candy',
  biscuit: 'Biscuit',
  cake: 'Cake',
  pastry: 'Pastry',
  traditional: 'Traditional',
  'ice-cream': 'Ice Cream',
  other: 'Other'
};

/* User Roles */
export const USER_ROLES = {
  ADMIN: 'admin'
};
