import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
type PrivateRouteProps ={
    children :  JSX.Element
}
export { PrivateRoute };

function PrivateRoute({ children }: PrivateRouteProps) {
    const auth = localStorage.getItem('user_id')
    
    if (!auth) {
        return <Navigate to="/login" />
    }
    return children;
}