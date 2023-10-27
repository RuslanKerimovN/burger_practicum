import { useLocation } from "react-router";

export const TapeOrdersPage = () => {
    const location = useLocation();
    localStorage.setItem('noLogin', `${location.pathname}`);


    return (
        <div>
        </div>
    );
}
