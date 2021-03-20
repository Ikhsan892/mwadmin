import React from 'react'

const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        <label htmlFor={id}>
          {label}
        </label>
      </div>
    );
  };

export default RadioButton