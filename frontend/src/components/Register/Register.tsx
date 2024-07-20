import React, { useState } from 'react';
import axios from 'axios';
import TextInput from './TextInput';
import useForm from './useForm'; // Importamos el hook

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const Register: React.FC = () => {
    const { values, handleChange } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reiniciar errores

        try {
            const response = await axios.post('http://localhost/api/register', values);
            console.log(response.data);
            // Aquí puedes manejar un registro exitoso
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error de registro';
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            {error && <div className="error">{error}</div>}
            <TextInput
                label="Nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
            />
            <TextInput
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
            />
            <TextInput
                label="Contraseña"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
            />
            <TextInput
                label="Confirmar contraseña"
                name="password_confirmation"
                type="password"
                value={values.password_confirmation}
                onChange={handleChange}
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
