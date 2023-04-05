import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import Front from 'views/Front';
import Login from 'views/Login';
import Signup from 'views/Signup';
import Upload from 'views/Upload';
import Editor from 'views/Editor';
import Account from 'views/Account';
import PageNotFound from 'views/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Front />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/account',
    element: <ProtectedRoute><Account /></ProtectedRoute>
  },
  {
    path: '/upload',
    element: <ProtectedRoute><Upload /></ProtectedRoute>
  },
  {
    path: '/editor',
    element: <ProtectedRoute><Editor /></ProtectedRoute>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
]);
