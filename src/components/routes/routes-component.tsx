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
    PROFILE_TAPE,
    REGISTER,
    RESET_PASSWORD
} from '../../constants/path';
import { HistoryOrdersPage } from '../../pages/history-orders-page/history-orders-page';
import { TapeOrdersPage } from '../../pages/tape-orders-page/tape-orders-page';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { ProtectedUserElement } from '../protected-user-element/protected-user-element';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IngredientsPage } from '../../pages/ingredients-page/ingredients-page';

export const  RoutesComponent = () => {
    const location = useLocation();
    let state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                {/* static paths */}
                <Route path={HOME} element={<ConstructorPage />} />
                <Route path={LOGIN} element={<ProtectedUserElement><LoginPage /></ProtectedUserElement>} />
                <Route path={REGISTER} element={<ProtectedUserElement><RegisterPage /></ProtectedUserElement>} />
                <Route path={FORGOT_PASSWORD} element={<ProtectedUserElement><ForgotPasswordPage /></ProtectedUserElement>} />
                <Route path={RESET_PASSWORD} element={<ProtectedUserElement><ResetPasswordPage /></ProtectedUserElement>} />
                <Route path={PROFILE} element={<ProtectedRouteElement><ProfilePage/></ProtectedRouteElement>}/>
                <Route path={PROFILE_ORDERS} element={<ProtectedRouteElement><HistoryOrdersPage /></ProtectedRouteElement>} />
                <Route path={PROFILE_TAPE} element={<TapeOrdersPage />} />
                <Route path="/ingredients/:id" element={<IngredientsPage />} />
                <Route path='*' element={<NotFoundPage />} />

                {/* dynamic paths */}
                {/* <Route path={'/profile/orders/:id'} element={<TapeOrdersPage />} /> */}
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/ingredients/:id" element={<Modal><IngredientDetails/></Modal>} />
                </Routes>
            )}
        </>
    );
}
