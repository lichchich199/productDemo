import ErrorPage from "./components/organisms/ErrorPage";
import ListProduct from "./views/ListProduct";
import Login from "./views/Login";

const routes = [
    {
        path: '/',
        element:  <Login />,
        errorElement: <ErrorPage/>
    }, 
    {
        path: '/product/list',
        element:  <ListProduct />,
        errorElement: <ErrorPage/>
    }
]
export {
    routes
}