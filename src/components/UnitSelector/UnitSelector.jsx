import Select from "react-select";
import { selectStyles } from "./selectStyles";

const UnitSelector = ({value, onChange, unitsData, selectMagnitude}) => {
  const unitsOptions = unitsData?.[selectMagnitude]?.map(unit => ({
    value: unit,
    label: unit.toUpperCase()
  }) || []);

  return (
    <Select 
      styles={selectStyles}
      options={unitsOptions}
      value={unitsOptions?.find(option => option.value === value)}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      placeholder="Select an Unit"
    />
  )
}

export default UnitSelector;