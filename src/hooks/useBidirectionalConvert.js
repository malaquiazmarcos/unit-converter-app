import { useState, useEffect } from "react";

/* fetch data in the API data for convert unit - input 1 */
export function useBidirectionalConvert1(input1, selectMagnitude, fromUnit, toUnit) {
  const [unitConvert, setUnitConvert] = useState({
    data: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    if (!input1 || !selectMagnitude || !fromUnit || !toUnit) {
      return;
    }

    setUnitConvert(prev => ({
      ...prev,
      loading: true, 
      error: null
    }));

    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams({
            value: input1,
            unit_type: selectMagnitude,
            unit_from: fromUnit,
            unit_to: toUnit
          });

          /* const response = await fetch(`/api/v1/unit-convert?${params.toString()}`); */
          const response = await fetch(`https://unitbridgeapi.pythonanywhere.com/v1/unit-convert?${params.toString()}`);
          const data = await response.json()
          setUnitConvert(prev => ({
            ...prev,
            data: data, 
            loading: false,
            error: null
          }))
        } catch (error) {
          setUnitConvert(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }))
        }
      };
      fetchData();
  }, 500); // time to fetch the API

  return () => clearTimeout(timeoutId);
  }, [input1, selectMagnitude, fromUnit, toUnit]);

  return unitConvert;
};

/* fetch data in the API data for convert unit - input 2 */
export function useBidirectionalConvert2(input2, selectMagnitude, fromUnit, toUnit) {
  const [unitConvert2, setUnitConvert2] = useState({
    data: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    if (!input2 || !selectMagnitude || !fromUnit || !toUnit) {
      return; 
    }

    setUnitConvert2(prev => ({
      ...prev,
      loading: true, 
      error: null
    }));

    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams({
            value: input2,
            unit_type: selectMagnitude,
            unit_from: toUnit,
            unit_to: fromUnit
          });

          /* const response = await fetch(`/api/v1/unit-convert?${params.toString()}`); */
          const response = await fetch(`https://unitbridgeapi.pythonanywhere.com/v1/unit-convert?${params.toString()}`);
          const data = await response.json()
          setUnitConvert2(prev => ({
            ...prev,
            data: data,
            loading: false, 
            error: null
          }))
        } catch (error) {
          setUnitConvert2(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }))
        }
      };
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input2, selectMagnitude, toUnit, fromUnit]);

  return unitConvert2;
};
