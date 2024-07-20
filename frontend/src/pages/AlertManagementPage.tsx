import React from 'react';
import AlertConfiguration from '../components/AlertManagement/AlertConfiguration';
import AlertHistory from '../components/AlertManagement/AlertHistory';
import NotificationSettings from '../components/AlertManagement/NotificationSettings';

const AlertManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Alertas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertConfiguration />
        <NotificationSettings />
      </div>
      <div className="mt-8">
        <AlertHistory />
      </div>
    </div>
  );
};

export default AlertManagementPage;