import { useState } from 'react';

// Definimos el tipo generico para el hook
const useForm = <T>(initialValues: T) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange };
};

export default useForm;
