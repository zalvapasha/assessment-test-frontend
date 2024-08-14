import axios from "axios";
import { useState } from "react";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3030/data/${id}`, userData);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
