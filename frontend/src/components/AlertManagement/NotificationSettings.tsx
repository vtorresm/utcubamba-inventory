import React, { useState } from 'react';

const NotificationSettings: React.FC = () => {
  const [email, setEmail] = useState('');
  const [smsNumber, setSmsNumber] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the notification settings to your backend API
    console.log('Notification settings updated:', { email, smsNumber, emailNotifications, smsNotifications });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configuración de Notificaciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="mr-2"
            />
            Notificaciones por Email
          </label>
          {emailNotifications && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su email"
              className="w-full p-2 border rounded"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="mr-2"
            />
            Notificaciones por SMS
          </label>
          {smsNotifications && (
            <input
              type="tel"
              value={smsNumber}
              onChange={(e) => setSmsNumber(e.target.value)}
              placeholder="Ingrese su número de teléfono"
              className="w-full p-2 border rounded"
            />
          )}
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Guardar Configuración
        </button>
      </form>
    </div>
  );
};

export default NotificationSettings;