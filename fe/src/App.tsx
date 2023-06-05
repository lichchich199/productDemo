import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {routes} from './router'
import Routing from './Routing';

function App() {
  let router = createBrowserRouter(routes)
  return (
    <>
    <Routing>
        <RouterProvider router={router}/>
    </Routing>
    </>
  );
}

export default App;
