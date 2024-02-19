import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './pages/Admin';
import AuthLayout from './pages/Auth';
import PublicLayout from './pages/Public';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/public',
    element: <PublicLayout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
