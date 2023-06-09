import { deleteProduct, getListProduct } from '../listProduct/api';
import {
    createSlice,
    createAsyncThunk,
    Draft,
    PayloadAction,
} from '../toolkit';

// get product async function
export const getProductAsync = createAsyncThunk(
    'listProduct/listProduct',
    async (_, thunkAPI: any) => {
        const { searchQuery } = thunkAPI.getState().listProduct;
        const response = await getListProduct(searchQuery);
        return response.data;
    }
);

// delete product async function
export const deleteProductAsync = createAsyncThunk(
    'listProduct/deleteProduct',
    async (id : string) => {
        const response = await deleteProduct(id);
        return response.data;
    }
);

// init global state
const initialState = {
    searchQuery: {
        name: '',
    },
    products: [],
    productListSortParams: [
        {
            field: 'price',
            orderBy: '',
            status: false,
        },
        {
            field: 'createdAt',
            orderBy: '',
            status: false,
        },
    ],
    error: '',
    selectedProduct: [] as string[],
    statusDelete: false,
    limit: 5,
    status: false,
};
export type SortParamKey = keyof typeof initialState.productListSortParams;

// create global slice
export const listProductSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setFormValue: (
            state: Draft<typeof initialState>,
            action: PayloadAction<{
                name: keyof typeof initialState.searchQuery;
                value: string;
            }>
        ) => {
            const { name, value } = action.payload;
            state.searchQuery[name] = value;
        },
        setCustomSortParam: (
            state,
            action: PayloadAction<{
                name: keyof typeof initialState.productListSortParams;
                value: string;
            }>
        ) => {
            let newSortParams: {
                field: string;
                orderBy: string;
                status: boolean;
            }[] = [...state.productListSortParams];
            const { name, value } = action.payload;
            const includedIndex = newSortParams.findIndex(
                ({ field }) => field === name
            );
            if (includedIndex >= 0) {
                if (newSortParams[includedIndex]?.orderBy !== value) {
                    newSortParams[includedIndex].orderBy = value;
                    newSortParams[includedIndex].status = true;
                } else {
                    newSortParams[includedIndex].status = false;
                }
                console.log('newSortParams', newSortParams);
            } else if (includedIndex === -1) {
                (newSortParams as any).push({
                    field: name,
                    orderBy: value,
                    status: true,
                });
            }
            state.productListSortParams = newSortParams;
        },
        setSelectedProduct: (state, action) => {
            const { id } = action.payload
            let selectedProductArr = state.selectedProduct
            let dataArr = (selectedProductArr.length > 0 && selectedProductArr[0] === id) ? [] : [id];
            state.selectedProduct = dataArr;
        },
        setError: (state, action) => {
            const { message } = action.payload
            state.error = message;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(getProductAsync.fulfilled, (state, action: any) => {
                const { data } = action.payload;
                state.products = data;
                // set status state
                state.status = false;
            })
            .addCase(getProductAsync.rejected, (state) => {
                state.status = false;
            })
            .addCase(deleteProductAsync.pending, (state) => {
            })
            .addCase(deleteProductAsync.fulfilled, (state) => {
                state.statusDelete = !state.statusDelete;
            })
            .addCase(deleteProductAsync.rejected, (state) => {
            })
            ;
    },
});

// export actions
export const { setFormValue, setCustomSortParam, setSelectedProduct, setError } = listProductSlice.actions;

export default listProductSlice.reducer;
