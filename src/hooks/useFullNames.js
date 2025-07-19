import { useState, useEffect } from "react";

export function useFullNames() {
  const [fullNameUnits, setFullNameUnits] = useState({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/full-name-all-units');
        const data = await response.json();

        setFullNameUnits(prev => ({
          ...prev, 
          data: data
        }));
      } catch (error) {
        setFullNameUnits(prev => ({
          ...prev,
          error: error.message
        }));
      }
    };
    fetchData();
  }, []);

  return fullNameUnits;
};
