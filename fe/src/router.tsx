import ErrorPage from './components/organisms/ErrorPage';
import ListProduct from './views/ListProduct';
import Home from './views/Home';
import AddProduct from './views/AddProduct';
import EditProduct from './views/EditProduct';

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/product/list',
        element: <ListProduct />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/product/add',
        element: <AddProduct />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/product/edit/:id',
        element: <EditProduct />,
        errorElement: <ErrorPage />,
    },
];
export { routes };
