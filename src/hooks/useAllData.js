import { useState, useEffect } from "react";

export function useAllData() {
  const [allData, setAllData] = useState({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/all-data');
        const data = await response.json();

        setAllData(prev => ({
          ...prev,
          data : data
        }));
      } catch (error) {
          setAllData(prev ({
            ...prev,
            error: error.message
          }));
      }
    };
    fetchData();
  }, []);

  return allData;
};