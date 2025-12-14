import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api';

const SweetContext = createContext();

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSweets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/sweets');

      // ✅ ENSURE ARRAY
      setSweets(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
      setSweets([]); // safety
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  return (
    <SweetContext.Provider value={{ sweets, fetchSweets, loading }}>
      {children}
    </SweetContext.Provider>
  );
};

export const useSweet = () => useContext(SweetContext);
