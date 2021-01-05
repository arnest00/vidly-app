import React from 'react';

const Select = ({name, label, options, error, ...rest}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        id={name}
        className='custom-select'
      >
        <option value=''></option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
 
export default Select;