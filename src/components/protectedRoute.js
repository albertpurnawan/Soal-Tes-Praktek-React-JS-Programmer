import React from 'react';
import { Navigate } from 'react-router';


const ProtectedRoute = (Component) => {
    const auth = window.gapi ? window.gapi.auth2.getAuthInstance().isSignedIn.get() : false;

    return auth ? <Component /> : <Navigate to="/" />
}

export default ProtectedRoute;