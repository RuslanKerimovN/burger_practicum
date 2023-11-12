import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { findRoute, getCookie } from '../../helpers/helpers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants';

interface Props {
    children: ReactNode;
}

export const ProtectedUserElement = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cookie = getCookie(ACCESS_TOKEN);
    const token = localStorage.getItem(REFRESH_TOKEN);

    if ((cookie && token) && findRoute(location.pathname)) {
      navigate(localStorage.getItem('noLogin') || '/', { replace: true });
      return;
    }
  }, []);

  return(
    <>
      {children}
    </>
  );
};
