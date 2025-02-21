import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token]);

    return token ? <>{children}</> : null;
};

export default ProtectedRoute;