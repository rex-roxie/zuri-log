import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';

const ProtectedRoute = ({children}) => {
    const user = auth.currentUser;
    if (!user) {
        console.log("User is not signed in");
        return <Navigate to="/" />
    }

  return children
}

export default ProtectedRoute;