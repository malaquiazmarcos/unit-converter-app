
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

export { searchKeyUnit };