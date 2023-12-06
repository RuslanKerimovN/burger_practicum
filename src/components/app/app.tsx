import { AppHeader } from '../app-header/app-header';
import { RoutesComponent } from '../routes/routes-component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { findRoute } from '../../helpers/helpers';
import { useLocation } from 'react-router';
import { getUser } from '../../services/slices/userSlice/userSlice.ts';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getStateUser } from '../../services/slices/userSlice/userSelector.ts';

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(getStateUser);

  useEffect(() => {
    if (findRoute(location.pathname)) return;

    if (!user.success) {
      dispatch(getUser());
    }
  }, [location.pathname]);

  return (
    <main>
      <AppHeader/>
      <RoutesComponent />
    </main>
  );
};
