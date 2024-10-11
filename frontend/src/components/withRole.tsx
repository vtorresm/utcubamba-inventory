import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const withRole = (Component: React.ComponentType, role: string) => {
  return (props: any) => {
      const { user } = useContext(AuthContext);

      if (!user || !user.roles.includes(role)) {
          return <Navigate to="/unauthorized" />;
      }

      return <Component {...props} />;
  };
};

export default withRole;
