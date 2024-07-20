import React from 'react';

interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, onChange, ...inputProps }) => (
    <div>
        <label>{label}</label>
        <input {...inputProps} onChange={onChange} />
    </div>
);

export default TextInput;
