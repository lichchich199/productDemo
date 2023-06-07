import ErrorPage from "./components/organisms/ErrorPage";
import ListProduct from "./views/ListProduct";
import Home from "./views/Home";

const routes = [
    {
        path: '/',
        element:  <Home />,
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