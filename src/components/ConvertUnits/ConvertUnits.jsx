import { useState, useEffect } from "react";
import Select from "react-select";
import { useAllData, useUnitsType, useFullNames, useBidirectionalConvert1, useBidirectionalConvert2 } from "../../hooks";
import { searchKeyUnit } from "../../utils";
import UnitSelector from "../UnitSelector";

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

  const magnitudesOptions = Object.keys(fullNameUnits.data).map(magnitude => ({
    value: magnitude,
    label: magnitude.toUpperCase()
  }));

  return (
    <div>
      <h1>Units Forge</h1>

      <h2>Select a magnitude:</h2>

      <Select
        options={magnitudesOptions}
        value={magnitudesOptions.find(option => option.value === selectMagnitude)}
        onChange={(selectedOption) => setSelectMagnitude(selectedOption?.value)} 
        placeholder="Select a magnitude"
      />

      <UnitSelector 
        value={selectUnit}
        onChange={setSelectUnit}
        unitsData={unitsForMagn.data}
        selectMagnitude={selectMagnitude}
      />
      <UnitSelector 
        value={selectUnit2}
        onChange={setSelectUnit2}
        unitsData={unitsForMagn.data}
        selectMagnitude={selectMagnitude}
      />

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
