import  {Routes, Route } from 'react-router-dom';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { IngredientsPage } from '../../pages/ingredients-page/ingredients-page';
import {
    FORGOT_PASSWORD,
    HOME,
    LOGIN,
    PROFILE,
    REGISTER,
    RESET_PASSWORD
} from '../../constants/path';

export const  RoutesComponent = () => {
    return (
        <Routes>
            <Route path={HOME} element={<ConstructorPage />} />
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={REGISTER} element={<RegisterPage />} />
            <Route path={FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={RESET_PASSWORD} element={<ResetPasswordPage />} />
            <Route path={PROFILE} element={<ProfilePage />} />
            <Route path='/ingredients/:id' element={<IngredientsPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
