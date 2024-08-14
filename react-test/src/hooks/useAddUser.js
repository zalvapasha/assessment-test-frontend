import { useState } from "react";
import axios from "axios";
import { generateId } from "../utils/generateId";
import { getCurrentDate } from "../utils/getCurrentDate";

const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (userData) => {
    setLoading(true);
    try {
      const newUser = {
        ...userData,
        id: generateId(),
        tanggal_input: getCurrentDate(),
      };
      await axios.post("http://localhost:3030/data", newUser);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addUser, loading, error };
};

export default useAddUser;
