import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {routes} from './router'
import Routing from './Routing';
import store from './store';

function App() {
  let router = createBrowserRouter(routes)
  return (
    <>
    <Provider store={store}>
      <Routing>
          <RouterProvider router={router}/>
      </Routing>

    </Provider>
    </>
  );
}

export default App;
