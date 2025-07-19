import { useState, useEffect } from "react";
import { useAllData, useUnitsType, useFullNames, useBidirectionalConvert1, useBidirectionalConvert2 } from "../../hooks";
import { searchKeyUnit } from "../../utils";

function ConvertUnits() {
  const [selectUnit, setSelectUnit] = useState(''); // Save unit choice
  const [selectUnit2, setSelectUnit2] = useState('')  // Save the unit to convert
  const [selectMagnitude, setSelectMagnitude] = useState('')  // Save magnitude choice
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  
  const allData = useAllData();

  const fromUnit = searchKeyUnit(allData, selectMagnitude, selectUnit);
  const toUnit = searchKeyUnit(allData, selectMagnitude, selectUnit2);

  
  const fullNameUnits = useFullNames();
  const unitsForMagn = useUnitsType(selectMagnitude);
  const unitConvert = useBidirectionalConvert1(input1, selectMagnitude, fromUnit, toUnit);
  const unitConvert2 = useBidirectionalConvert2(input2, selectMagnitude, fromUnit, toUnit);

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
