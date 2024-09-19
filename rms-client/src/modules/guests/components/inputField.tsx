// components/inputField.tsx
import './guestForm.css'
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, name, value, onChange }) => (
  <div className="input-field">
    <label className="input-label" htmlFor={id}>
      {label}
    </label>
    <input
      className="input-element"
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
