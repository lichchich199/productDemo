import { addProduct } from './api';

import { createSlice, createAsyncThunk } from '../toolkit';

type paramType = {
    name: string;
    price: number;
    brand: string;
    category: string;
    image: string[];
    color: string[];
    size: number[];
    quantity: number;
    description: string;
};

// login async function
export const addProductAsync = createAsyncThunk(
    'addProduct/addProduct',
    async (formData: paramType) => {
        console.log('formData slice line 26:', formData);
        const response = await addProduct(formData);
        return response.data;
    }
);

// init add product state
const initialState = {
    status: false,
};

// create global slice
export const addProductSlice = createSlice({
    name: 'addProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(addProductAsync.fulfilled, (state, action: any) => {
                state.status = false;
            })
            .addCase(addProductAsync.rejected, (state) => {
                state.status = false;
            });
    },
});

// export actions
// export const {} = addProductSlice.actions;

export default addProductSlice.reducer;
