import { configureStore } from "./features/toolkit";
import globalReducer from "./features/global/slices";
import loginReducer from "./features/login/slices";
import registerReducer from "./features/register/slices";
import listProductReducer from "./features/listProduct/slices";


//config store
const store = configureStore({
    reducer:{
        global: globalReducer,
        login: loginReducer,
        register: registerReducer,
        listProduct: listProductReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;