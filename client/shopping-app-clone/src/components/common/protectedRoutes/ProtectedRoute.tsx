import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ userIsLoggedIn, children }: any) => {
  if (!userIsLoggedIn) {
    return (
      <>
        <Navigate to='/login' replace />
      </>
    );
  } else return children;
};

export default ProtectedRoute;
