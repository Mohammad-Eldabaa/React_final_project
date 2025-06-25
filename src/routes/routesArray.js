import { v4 } from 'uuid';
import { Home, Login, SignUp, ProfilePage, UsersPage, MyPosts, ShowPost } from '../pages';

const RoutesArray = [
  {
    id: v4(),
    element: <Home />,
    path: '/home',
  },
  {
    id: v4(),
    element: <Login />,
    path: '/',
  },
  {
    id: v4(),
    element: <SignUp />,
    path: '/signUp',
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
