import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const SweetContext = createContext();

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets(); // 
  }, []);

  return (
    <SweetContext.Provider value={{ sweets, fetchSweets, loading }}>
      {children}
    </SweetContext.Provider>
  );
};

export const useSweet = () => useContext(SweetContext);
