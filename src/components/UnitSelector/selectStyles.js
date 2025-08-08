/* special styles for react-select */
export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#F8F6F0',
    borderColor: state.isFocused ? '#7A9AAD' : '#A69B88',
    borderWidth: '1px',
    boxShadow: state.isFocused ? '0 0 0 1px #7A9AAD' : 'none',
    '&:hover': {
      borderColor: '#7A9AAD'
    },
    minHeight: '40px',
    fontSize: '14px'
  }),
  
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#7A9AAD' : 
                    state.isFocused ? '#E8DCC0' : '#F8F6F0',
    color: state.isSelected ? '#FFFFFF' : '#333333',
    '&:hover': {
      backgroundColor: '#E8DCC0',
      color: '#333333'
    }
  }),
  
  singleValue: (provided) => ({
    ...provided,
    color: '#333333'
  }),
  
  placeholder: (provided) => ({
    ...provided,
    color: '#666666'
  }),
  
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#F8F6F0',
    border: '1px solid #A69B88'
  })
};
