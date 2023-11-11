import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "../../helpers/helpers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";

interface Props {
    children: ReactNode;
}

export const ProtectedRouteElement = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cookie = getCookie(ACCESS_TOKEN);
    const token = localStorage.getItem(REFRESH_TOKEN);

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
  );
};
