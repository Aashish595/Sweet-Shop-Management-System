import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api';

const SweetContext = createContext();

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);

  const fetchSweets = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get('/sweets');

      // ✅ Normalize response safely
      const data =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data.sweets)
          ? res.data.sweets
          : [];

      setSweets(data);
    } catch (error) {
      console.error('Fetch sweets failed:', error);
      setSweets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSweet = async (payload) => {
    const res = await api.post('/sweets', payload);
    await fetchSweets();
    return res.data;
  };

  const updateSweet = async (id, payload) => {
    const res = await api.put(`/sweets/${id}`, payload);
    await fetchSweets();
    return res.data;
  };

  const deleteSweet = async (id) => {
    await api.delete(`/sweets/${id}`);
    setSweets(prev => prev.filter(s => s._id !== id));
  };

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  return (
    <SweetContext.Provider
      value={{
        sweets,
        loading,
        fetchSweets,
        createSweet,
        updateSweet,
        deleteSweet,
        selectedSweet,
        setSelectedSweet
      }}
    >
      {children}
    </SweetContext.Provider>
  );
};

export const useSweet = () => useContext(SweetContext);
