import { Navigate, useRoutes } from 'react-router-dom';

import PlatformLayout from './layouts/dashboard';
import Catalog from './sections/platform/Catalog/Catalog';
import Orders from './sections/platform/Orders/Orders';
import Profile from './sections/platform/Profile/Profile';

import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';

import AdminLayout from './layouts/admin/AdminLayout';
import AdminIndex from './sections/admin';
import Cart from './sections/platform/Cart/Cart';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <PlatformLayout />,
      children: [
        { element: <Navigate to="/catalog" />, index: true },
        { path: 'catalog', element: <Catalog /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'orders', element: <Orders /> },
        { path: 'profile', element: <Profile /> },
        { path: 'cart', element: <Cart /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { element: <Navigate to="/admin/index" />, index: true },
        { path: 'index', element: <AdminIndex /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/catalog" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
