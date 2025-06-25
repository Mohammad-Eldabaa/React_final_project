import { lazy } from 'react';

export const Home = lazy(() => import('./homePage/HomePage'));
export const Login = lazy(() => import('./login/LoginPage'));
export const SignUp = lazy(() => import('./signup/singUp'));
export const ProfilePage = lazy(() => import('./users/profilePage'));
export const UsersPage = lazy(() => import('./users/UsersPage'));
export const MyPosts = lazy(() => import('./posts/myPosts'));
export const ShowPost = lazy(() => import('./posts/showPost'));
