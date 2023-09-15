import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { addWord } from "./words.action";
import { useAppDispatch } from "../../hooks";

export const WordsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const { data: response } = await axios.get('/api/data/words');
        const words = response.Words;
        dispatch(addWord(words));
      } catch (error) {
        toast.error('Veri Getirilirken Hata Oluştu');
      }
    };

    fetchWords(); // Call the async fetchWords function inside useEffect
  }, [dispatch]); // Make sure to include dispatch as a dependency
};
