import ErrorPage from "./components/organisms/ErrorPage";
import Login from "./views/Login";

const routes = [
    {
        path: '/',
        element:  <Login />,
        errorElement: <ErrorPage/>
    }
]
export {
    routes
}