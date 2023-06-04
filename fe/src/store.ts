import { configureStore } from "./features/toolkit";
import globalReducer from "./features/global/slices";

//config store
export default configureStore({
    reducer:{
        global: globalReducer
    }
})
