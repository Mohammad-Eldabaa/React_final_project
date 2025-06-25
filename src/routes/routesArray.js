import { v4 } from 'uuid';
import { Home, Login, SignUp } from '../pages';
import ProfilePage from '../pages/users/profilePage';
import UsersPage from '../pages/users/UsersPage';
import MyPosts from '../pages/posts/myPosts';
import ShowPost from '../pages/posts/showPost';

const RoutesArray = [
  {
    id: v4(),
    element: <Home />,
    path: '/home',
  },
  {
    id: v4(),
    element: <Login />,
    path: '/Login',
  },
  {
    id: v4(),
    element: <SignUp />,
    path: '/',
  },
  {
    id: v4(),
    element: <ProfilePage />,
    path: '/profile',
  },
  {
    id: v4(),
    element: <UsersPage />,
    path: '/allUsers',
  },
  {
    id: v4(),
    element: <MyPosts />,
    path: '/myPosts',
  },
  {
    id: v4(),
    element: <ShowPost />,
    path: '/showPost',
  },
];

export default RoutesArray;
