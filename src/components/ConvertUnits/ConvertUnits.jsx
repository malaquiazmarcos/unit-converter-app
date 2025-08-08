import { useState } from "react";
import Select from "react-select";
import { useAllData, useUnitsType, useFullNames, useBidirectionalConvert1, useBidirectionalConvert2 } from "../../hooks";
import { searchKeyUnit } from "../../utils";
import UnitSelector from "../UnitSelector/UnitSelector";
import styles from "./ConvertUnits.module.css"
import { selectStyles } from "./selectStyles";

function ConvertUnits() {
  const [selectUnit, setSelectUnit] = useState(''); // Save unit choice
  const [selectUnit2, setSelectUnit2] = useState('')  // Save the unit to convert
  const [selectMagnitude, setSelectMagnitude] = useState('')  // Save magnitude choice
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [decimal, setDecimal] = useState(true); // for button decimal
  
  const allData = useAllData();

  const fromUnit = searchKeyUnit(allData, selectMagnitude, selectUnit);
  const toUnit = searchKeyUnit(allData, selectMagnitude, selectUnit2);
  
  const fullNameUnits = useFullNames();
  const unitsForMagn = useUnitsType(selectMagnitude);

  /* handle if user choose comma or point */
  let unitConvert;
  let unitConvert2;
  if (decimal) {
    const normalizedInput1 = input1.replace(',', '.');
    const normalizedInput2 = input2.replace(',', '.');

    unitConvert = useBidirectionalConvert1(normalizedInput1, selectMagnitude, fromUnit, toUnit);
    unitConvert2 = useBidirectionalConvert2(normalizedInput2, selectMagnitude, fromUnit, toUnit);
  } else {
    unitConvert = useBidirectionalConvert1(input1, selectMagnitude, fromUnit, toUnit);
    unitConvert2 = useBidirectionalConvert2(input2, selectMagnitude, fromUnit, toUnit); 
  }

  /* set the state of decimal button */
  function handleDecimalChange(value) {
    if (value === 'comma') {
      setDecimal(true); 
    } else {
      setDecimal(false);
    }
  };

  /* if input1 is selected, clear input2, and vice versa */
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

  /* generate options for the magnitude selector */
  const magnitudesOptions = Object.keys(fullNameUnits.data).map(magnitude => ({
    value: magnitude,
    label: magnitude.toUpperCase()
  }));

  /* for message if error emerge */
  const hasError =
    selectMagnitude.error ||
    fullNameUnits.error ||
    unitsForMagn.error ||
    unitConvert.error ||
    unitConvert2.error;

  return (
    <div className="container py-4">
      
      {/* Decimal Separator */}
      <div className="mb-4 text-center">
        <h3 className="mb-3">Choose the decimal separator</h3>
        <div className="btn-group" role="group" aria-label="Decimal separator toggle">
          <button
            type="button"
            className={`me-1 ${styles.btnCustom} ${decimal ? styles.active : styles.inactive}`}
            onClick={() => handleDecimalChange('comma')}
          >
            Comma
          </button>
          <button
            type="button"
            className={`ms-1 ${styles.btnCustom} ${!decimal ? styles.active : styles.inactive}`}
            onClick={() => handleDecimalChange('point')}
          >
            Point
          </button>
        </div>
      </div>

      {/* Magnitude Selector */}
      <div className="mb-4">
        <Select
          styles={selectStyles}
          options={magnitudesOptions}
          value={magnitudesOptions.find(option => option.value === selectMagnitude)}
          onChange={(selectedOption) => {
            setSelectMagnitude(selectedOption?.value);
            setInput1('');
            setInput2('');
            setSelectUnit('');
            setSelectUnit2('');
          }}
          placeholder="Select a Magnitude"
        />
      </div>

      {/* Unit Converter */}
      <div className="row g-4">
        {/* Left Side */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <UnitSelector 
                styles={selectStyles}
                key={`unit1-${selectMagnitude}`}
                value={selectUnit}
                onChange={setSelectUnit}
                unitsData={unitsForMagn.data}
                selectMagnitude={selectMagnitude}
              />

              <input 
                type="text"
                className={`mt-3 ${styles.inputStyles}`}
                value={input1}
                placeholder={
                  !selectUnit || !selectUnit2
                    ? ''
                    : unitConvert2.loading 
                      ? 'Loading...' 
                      : `Enter ${selectUnit}`
                }
                onChange={handleInput1}
                disabled={!selectUnit || !selectUnit2}
              />
              {input2 && (
                <p className={`mt-3 fs-4 fw-semibold text-center ${styles.result}`}>
                  { 
                    !input2
                      ? ''
                      : decimal 
                        ? unitConvert2.data?.result?.toLocaleString('es-AR')
                        : unitConvert2.data?.result?.toLocaleString('en-US')
                  }
                </p>
              )} 
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <UnitSelector 
                styles={selectStyles}
                key={`unit2-${selectMagnitude}`}
                value={selectUnit2}
                onChange={setSelectUnit2}
                unitsData={unitsForMagn.data}
                selectMagnitude={selectMagnitude}
              />

              <input 
                type="text"
                className={`mt-3 ${styles.inputStyles}`}
                value={input2}
                placeholder={
                  !selectUnit || !selectUnit2
                    ? ''
                    : unitConvert.loading 
                      ? 'Loading...' 
                      : `Enter ${selectUnit2}`
                }
                onChange={handleInput2}
                disabled={!selectUnit || !selectUnit2}
              />

              {input1 && (
                <p className={`mt-3 fs-4 fw-semibold text-center ${styles.result}`}>
                  { 
                    !input1 
                      ? ''
                      : decimal 
                        ? unitConvert.data?.result?.toLocaleString('es-AR')
                        : unitConvert.data?.result?.toLocaleString('en-US')
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center mt-4">
          <span>If you experience an error loading the page, please refresh it here.</span>
          <button className="btn btn-outline-danger btn-sm" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      )}

    </div>
  );

}

export default ConvertUnits;
