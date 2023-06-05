import { configureStore } from "./features/toolkit";
import globalReducer from "./features/global/slices";
import loginReducer from "./features/login/slices";


//config store
const store = configureStore({
    reducer:{
        global: globalReducer,
        login: loginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;