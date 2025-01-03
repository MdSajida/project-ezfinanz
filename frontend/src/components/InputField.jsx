// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, type, name, value, onChange, error, togglePassword, showPassword }) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700">{label}</label>
      <input
        type={name === 'password' && showPassword ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        className={
          `w-full p-2 border
           ${error ? 'border-red-500' : 'border-gray-300'} 
           rounded mt-2 focus:outline-none focus:border-blue-400`}
      />
      {name === 'password' && (
        <span
          onClick={togglePassword}
          className="absolute top-9 right-3 cursor-pointer text-gray-500"
         // title={showPassword ? 'Hide' : 'Show'}
        >
          {showPassword ? 'hide' : 'show'}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
