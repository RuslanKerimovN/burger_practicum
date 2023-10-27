import { AppHeader } from '../app-header/app-header';
import { RoutesComponent } from '../routes/routes-component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { findRoute, getCookie } from '../../helpers/helpers';
import { useLocation, useNavigate } from 'react-router';
import { getStateUser, getUser } from '../../services/slices/userSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

export const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isUser, setIsUser] = useState<boolean>(false);
  const user = useAppSelector(getStateUser);

  useEffect(() => {
    if (findRoute(location.pathname)) return;

    if (!isUser) {
      dispatch(getUser());
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user.success) {
      setIsUser(true);
    }
  }, [user]);

  return (
    <div>
      <AppHeader/>
      <RoutesComponent />
    </div>
  );
}
