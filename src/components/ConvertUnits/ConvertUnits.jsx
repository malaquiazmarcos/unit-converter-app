import { useState, useEffect } from "react";

function ConvertUnits() {
  const [selectUnit, setSelectUnit] = useState(''); // Save unit choice
  const [selectUnit2, setSelectUnit2] = useState('')  // Save the unit to convert
  const [selectMagnitude, setSelectMagnitude] = useState('')  // Save magnitude choice
  const [fullNameUnits, setFullNameUnits] = useState({
    data: [],
    loading: true,
    error: null
  });
  const [allData, setAllData] = useState({
    data: [],
    loading: true,
    error: null
  });
  const [unitsForMagn, setUnitsForMagn] = useState({
    data: [],
    loading: true,
    error: null
  });
  const [unitConvert, setUnitConvert] = useState({
    data: [],
    loading: true,
    error: null
  });
  const [unitConvert2, setUnitConvert2] = useState({
    data: [],
    loading: true,
    error: null
  });
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');


  const searchKeyUnit = (allData, magnitude, fullNameUnit) => {    
    const unitMagnitude = allData.data[magnitude];

    if (!unitMagnitude) return null; 

    for (const key in unitMagnitude) {
      if (unitMagnitude[key].name === fullNameUnit) {
        return key;
      }
    };
    return null; 
  };
  const fromUnit = searchKeyUnit(allData, selectMagnitude, selectUnit);
  const toUnit = searchKeyUnit(allData, selectMagnitude, selectUnit2);


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
  }, [])

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

  useEffect(() => {
    if (!input1 || !selectMagnitude || !selectUnit || !selectUnit2) {
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
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input1, selectMagnitude, fromUnit, toUnit]);



  useEffect(() => {
    if (!input2 || !selectMagnitude || !selectUnit2 || !selectUnit) {
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
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input2, selectMagnitude, toUnit, fromUnit]);



  const handleInput1 = (e) => {
    if (input2 && !input1) {
      setInput2('');
    }
    setInput1(e.target.value)
  };

  const handleInput2 = (e) => {
    if (input1 && !input2) {
      setInput1('')
    }
    setInput2(e.target.value)
  };



  

  console.log(`Units 1: ${unitConvert}`)
  console.log(`Units 2: ${unitConvert2}`)

  return (
    <div>
      <h1>Units Forge</h1>

      <h2>Select a magnitude:</h2>

      <select
        value={selectMagnitude}
        onChange={(e) => setSelectMagnitude(e.target.value)} 
      >
        <option>---Select a magnitude---</option>
        {Object.keys(fullNameUnits.data).map(magnitude => (
          <option 
            key={magnitude}
            value={magnitude} 
          >
            {magnitude.toUpperCase()}
          </option>
        ))}
      </select>

      <select
        value={selectUnit}
        onChange={(e) => setSelectUnit(e.target.value)}
      >
        <option>---Select a unit---</option>
        {unitsForMagn.data 
          && unitsForMagn.data[selectMagnitude] 
          && unitsForMagn.data[selectMagnitude].map(unit =>
          <option
            key={unit} 
            value={unit}
          >
            {unit}
          </option>
        )}
      </select>
      <select
        value={selectUnit2}
        onChange={(e) => setSelectUnit2(e.target.value)}
      >
        <option>---Select a unit---</option>
        {unitsForMagn.data 
          && unitsForMagn.data[selectMagnitude] 
          && unitsForMagn.data[selectMagnitude].map(unit =>
          <option
            key={unit} 
            value={unit}
          >
            {unit}
          </option>
        )}
      </select>

      <p>hola {fromUnit}</p>
      <p>hola {toUnit}</p>


      <label>
        Input your value:
        <input 
          type="number"
          value={input1}
          placeholder={unitConvert2.data.result}
          onChange={handleInput1}
        />
        <input 
          type="number" 
          value={input2}
          placeholder={unitConvert.data.result}
          onChange={handleInput2}
        />
      </label>


      <p>{unitConvert.data.result}</p>
      <p>{unitConvert2.data.result}</p>
      

    </div>
  )
}

export default ConvertUnits;
