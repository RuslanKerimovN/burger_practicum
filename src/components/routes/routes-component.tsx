import  {Routes, Route } from 'react-router-dom';
import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { IngredientsPage } from '../../pages/ingredients-page/ingredients-page';

export const  RoutesComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/ingredients/:id' element={<IngredientsPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
