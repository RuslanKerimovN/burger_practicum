import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "../../helpers/helpers";

interface Props {
    children: React.ReactNode;
}

export const ProtectedRouteElement = ({children}: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let cookie = getCookie('accessToken');
        const token = localStorage.getItem('refreshToken');

        localStorage.setItem('noLogin', `${location.pathname}`);

        if ((!cookie || !token)) {
            navigate('/login');
            return;
        }
    }, []);

    return(
        <>
            {children}
        </>
    )
}