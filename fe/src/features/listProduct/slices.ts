import { getListProduct } from "../listProduct/api"
import { createSlice, createAsyncThunk} from "../toolkit"

// login async function
export const getProductAsync = createAsyncThunk(
    "login/login",
    async () => {
      const response = await getListProduct()
      return response.data
    }
)

// init global state
 const initialState = {
    products: [],
    status: false
 }

// create global slice
 export const listProductSlice = createSlice({
    name:  'login',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductAsync.pending, (state) => {
                state.status = true
            })
            .addCase(getProductAsync.fulfilled, (state, action: any) => {
                const { data } = action.payload
                state.products = data
                // set status state
                state.status = false
            })
            .addCase(getProductAsync.rejected, (state) => {
                state.status = false
            })
    }

 })

 // export actions
 export const {
 } = listProductSlice.actions

 export default listProductSlice.reducer