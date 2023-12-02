import { Routes, Route, useLocation } from 'react-router-dom';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import {
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  PROFILE,
  PROFILE_ORDERS,
  FEED,
  REGISTER,
  RESET_PASSWORD
} from '../../constants/path';
import { FeedPage } from '../../pages/feed-page/feed-page.tsx';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { ProtectedUserElement } from '../protected-user-element/protected-user-element';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IngredientsPage } from '../../pages/ingredients-page/ingredients-page';
import { OrderPage } from '../../pages/order-page/order-page.tsx';
import { Order } from '../order/order.tsx';
import { ChangeProfile } from '../change-profile/change-profile.tsx';
import { HistoryOrdersPage } from '../../pages/history-orders-page/history-orders-page.tsx';

export const  RoutesComponent = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {/* static paths */}
        <Route path={HOME} element={<ConstructorPage />} />
        <Route path={LOGIN} element={<ProtectedUserElement><LoginPage /></ProtectedUserElement>} />
        <Route path={REGISTER} element={<ProtectedUserElement><RegisterPage /></ProtectedUserElement>} />
        <Route path={FORGOT_PASSWORD} element={<ProtectedUserElement><ForgotPasswordPage /></ProtectedUserElement>} />
        <Route path={RESET_PASSWORD} element={<ProtectedUserElement><ResetPasswordPage /></ProtectedUserElement>} />
        <Route path={PROFILE} element={<ProtectedRouteElement><ProfilePage/></ProtectedRouteElement>}>
          <Route path={''} element={<ChangeProfile />}/>
          <Route path={PROFILE_ORDERS} element={<HistoryOrdersPage />} />
        </Route>
        <Route path={FEED} element={<FeedPage />} />

        {/* dynamic paths */}
        <Route path="/ingredients/:id" element={<IngredientsPage />} />
        <Route path={`${FEED}/:id`} element={<OrderPage />} />
        <Route
          path={`${PROFILE}/${PROFILE_ORDERS}/:id`}
          element={<ProtectedRouteElement><OrderPage /></ProtectedRouteElement>}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal><IngredientDetails/></Modal>} />
          <Route path={`${FEED}/:id`} element={<Modal><Order /></Modal>} />
          <Route path={`${PROFILE}/${PROFILE_ORDERS}/:id`} element={<Modal><Order /></Modal>} />
        </Routes>
      )}
    </>
  );
};
