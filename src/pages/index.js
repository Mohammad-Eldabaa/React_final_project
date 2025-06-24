import { lazy } from 'react';

export const Home = lazy(() => import('./homePage/HomePage'));
export const Login = lazy(() => import('./login/LoginPage'));
export const SignUp = lazy(() => import('./signup/singUp'));

// export const PagesArray = [HomePage, LoginPage];
