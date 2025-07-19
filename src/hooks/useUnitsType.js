import { useState, useEffect } from "react";

export function useUnitsType(selectMagnitude) {
  const [unitsForMagn, setUnitsForMagn] = useState({
      data: [],
      loading: true,
      error: null
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/full-name-units?unit_type=${selectMagnitude}`);
        const data = await response.json();

        setUnitsForMagn(prev => ({
          ...prev, 
          data: data
        })); 
      } catch (error) {
        setUnitsForMagn(prev => ({
          ...prev, 
          error: error.message
        })); 
      }
    }
    fetchData();
  }, [selectMagnitude]);  

  return unitsForMagn;
};
