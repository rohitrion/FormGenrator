

import React from 'react';

const FormField = ({ field, onChange, onRemove }) => {
  const { id, type, label, options } = field;

  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <div>
            <label>{label}</label>
            <input type="text" onChange={(e) => onChange(id, e.target.value)} />
          </div>
        );

      case 'textarea':
        return (
          <div>
            <label>{label}</label>
            <textarea onChange={(e) => onChange(id, e.target.value)} />
          </div>
        );

      case 'dropdown':
        return (
          <div>
            <label>{label}</label>
            <select onChange={(e) => onChange(id, e.target.value)}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div>
            <label>{label}</label>
            {options.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => onChange(id, option, e.target.checked)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div>
            <label>{label}</label>
            {options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  value={option}
                  name={`radio-${id}`}
                  onChange={() => onChange(id, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderField()}
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
};

export default FormField;
