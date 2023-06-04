import { createSlice, configureStore, createAsyncThunk as _createAsyncThunk } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "./global/slices";

type Props = {
    name: string,
    callback: (payload : void, thunkAPI : Object) => {},
    errorCallback ?: (error: any, thunkAPI : Object, payload: void) => {}
}

const createAsyncThunk = (name : Props['name'], callback : Props['callback'], errorCallback ?: Props['errorCallback']) => {
    return _createAsyncThunk(name, async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(toggleLoadingStatus());
            const res = await callback(payload , thunkAPI);
            thunkAPI.dispatch(toggleLoadingStatus());
            return res
        } catch (error) {
            let errorRes = {}
            if(typeof errorCallback != 'undefined') {
                errorRes = await errorCallback(error, thunkAPI, payload)
            }
            thunkAPI.dispatch(toggleLoadingStatus());
            return thunkAPI.rejectWithValue(errorRes);
        }
    })
}

export {createSlice, createAsyncThunk, configureStore};