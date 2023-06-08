import { getListProduct } from "../listProduct/api"
import { createSlice, createAsyncThunk, Draft, PayloadAction} from "../toolkit"

// login async function
export const getProductAsync = createAsyncThunk(
    "listProduct/listProduct",
    async (_, thunkAPI : any) => {
    const {searchQuery } = thunkAPI.getState().listProduct
      const response = await getListProduct(searchQuery)
      return response.data
    }
)

// init global state
 const initialState = {
    searchQuery: {
        name: ''
    },
    products: [],
    productListSortParams: {},
    status: false
 }

// create global slice
 export const listProductSlice = createSlice({
    name:  'login',
    initialState,
    reducers: {
        setFormValue: (state : Draft<typeof initialState>, action: PayloadAction<{ name: keyof typeof initialState.searchQuery; value: string }>) => {
            const { name, value } = action.payload;
            state.searchQuery[name] = value;
        },
        setCustomSortParam: ((state, action) => {
        })
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
    setFormValue,
    setCustomSortParam
 } = listProductSlice.actions

 export default listProductSlice.reducer