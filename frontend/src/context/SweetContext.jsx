import { createContext, useContext, useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const SweetContext = createContext(null);

export const SweetProvider = ({ children }) => {
  const { loading: authLoading, token } = useAuth();

  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasFetched = useRef(false); // 

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/sweets');
      setSweets(res.data.sweets);
    } catch (err) {
      console.error('Fetch sweets error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && token && !hasFetched.current) {
      hasFetched.current = true;
      fetchSweets();
    }
  }, [authLoading, token]);

  return (
    <SweetContext.Provider value={{ sweets, loading, fetchSweets }}>
      {children}
    </SweetContext.Provider>
  );
};

export const useSweet = () => {
  const context = useContext(SweetContext);
  if (!context) {
    throw new Error('useSweet must be used within a SweetProvider');
  }
  return context;
};
