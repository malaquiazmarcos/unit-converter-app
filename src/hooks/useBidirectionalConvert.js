import { useState, useEffect } from "react";

export function useBidirectionalConvert1(input1, selectMagnitude, fromUnit, toUnit) {
  const [unitConvert, setUnitConvert] = useState({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!input1 || !selectMagnitude || !fromUnit || !toUnit) {
      return; 
    }
    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams({
            value: input1,
            unit_type: selectMagnitude,
            unit_from: fromUnit,
            unit_to: toUnit
          });

          const response = await fetch(`/api/v1/unit-convert?${params.toString()}`);
          const data = await response.json()
          setUnitConvert(prev => ({
            ...prev,
            data: data
          }))
        } catch (error) {
          setUnitConvert(prev => ({
            ...prev,
            error: error.message
          }))
        }
      };
      fetchData();
  }, 2000);

  return () => clearTimeout(timeoutId);
  }, [input1, selectMagnitude, fromUnit, toUnit]);

  return unitConvert;
};

export function useBidirectionalConvert2(input2, selectMagnitude, fromUnit, toUnit) {
  const [unitConvert2, setUnitConvert2] = useState({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!input2 || !selectMagnitude || !fromUnit || !toUnit) {
      return; 
    }
    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams({
            value: input2,
            unit_type: selectMagnitude,
            unit_from: toUnit,
            unit_to: fromUnit
          });

          const response = await fetch(`/api/v1/unit-convert?${params.toString()}`);
          const data = await response.json()
          setUnitConvert2(prev => ({
            ...prev,
            data: data
          }))
        } catch (error) {
          setUnitConvert2(prev => ({
            ...prev,
            error: error.message
          }))
        }
      };
      fetchData();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [input2, selectMagnitude, toUnit, fromUnit]);

  return unitConvert2;
};
