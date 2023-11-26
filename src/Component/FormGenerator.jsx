

import React, { useState } from 'react';
import FormField from './FormField';

const FormGenerator = () => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const addFormField = (type, label, options = []) => {
        const id = Date.now().toString();
        setFormFields([...formFields, { id, type, label, options }]);
    };

    const removeFormField = (id) => {
        const updatedFields = formFields.filter((field) => field.id !== id);
        setFormFields(updatedFields);
        setFormData({ ...formData, [id]: undefined });
    };

    const handleFieldChange = (id, value, isChecked) => {
        setFormData({ ...formData, [id]: isChecked !== undefined ? isChecked : value });

        setFormErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[id];
            return updatedErrors;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Form Data:', formData);
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = () => {
        const errors = {};
        formFields.forEach((field) => {
            const { id, label, type } = field;
            const value = formData[id];

            if (!value && type !== 'checkbox') {
                errors[id] = `${label} is required.`;
            }
        });
        return errors;
    };

    const handleSave = () => {
        if (formFields.length === 0) {
            alert('Cannot save configuration without any form fields.');
        } else {
            const formConfig = JSON.stringify(formFields);
            localStorage.setItem('formConfig', formConfig);
            alert('Form configuration saved! + data saved in console');
        }
    };

    const handleLoad = () => {
        const savedFormConfig = localStorage.getItem('formConfig');
        if (savedFormConfig) {
            const parsedFormConfig = JSON.parse(savedFormConfig);
            setFormFields(parsedFormConfig);
        }
    };

    return (
        <div>
            <h1>Form Generator</h1>
            <form onSubmit={handleSubmit}>
                {formFields.map((field) => (
                    <FormField
                        key={field.id}
                        field={field}
                        onChange={handleFieldChange}
                        onRemove={removeFormField}
                    />
                ))}
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Add Form Field</h2>
                <button onClick={() => addFormField('text', 'Text Field')}>Add Text Field</button>
                <button onClick={() => addFormField('textarea', 'Text Area')}>Add Text Area</button>
                <button onClick={() => addFormField('dropdown', 'Dropdown Field', ['Option 1', 'Option 2'])}>
                    Add Dropdown Field
                </button>
                <button onClick={() => addFormField('checkbox', 'Checkbox Field', ['Option 1', 'Option 2'])}>
                    Add Checkbox Field
                </button>
                <button onClick={() => addFormField('radio', 'Radio Field', ['Option 1', 'Option 2'])}>
                    Add Radio Field
                </button>
            </div>
            <div>
                <button onClick={handleSave}>Save Configuration</button>
                <button onClick={handleLoad}>Load Configuration</button>
            </div>
            <div>
                {Object.keys(formErrors).map((key) => (
                    <p key={key} className="error-message">{formErrors[key]}</p>
                ))}
            </div>
        </div>
    );
};

export default FormGenerator;
