import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { findRoute, getCookie } from "../../helpers/helpers";

interface Props {
    children: React.ReactNode;
}

export const ProtectedUserElement = ({children}: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let cookie = getCookie('accessToken');
        const token = localStorage.getItem('refreshToken');

        if ((cookie && token) && findRoute(location.pathname)) {
            navigate(localStorage.getItem('noLogin') || '/', {replace: true});
            return;
        }
    }, []);

    return(
        <>
            {children}
        </>
    )
}