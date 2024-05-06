import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const useSession = () => {
    const session = localStorage.getItem('auth');
    const decodedSession = session ? jwtDecode(session) : null;

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) {
            navigate('/login', { replace: true });
        }

        if (session && location.pathname !== '/') {
            return;
        }

        try {
            const decodedToken = jwtDecode(session);
            const role = decodedToken.role;
            if (role === 'user') {
                navigate(`/user/${decodedToken._id}`, { replace: true });
            } else if (role === 'professional') {
                navigate(`/professional/${decodedToken._id}`, { replace: true });
            } else {
                alert('Unknown role');
            }
        } catch (error) {
            alert('Failed to parse token');
        }
    }, [navigate, session]);

    return decodedSession;
};

export default useSession;
