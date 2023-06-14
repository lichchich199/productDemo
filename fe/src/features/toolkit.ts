import {
    createSlice,
    configureStore,
    createAsyncThunk as _createAsyncThunk,
    Draft,
    PayloadAction,
    AsyncThunkPayloadCreator,
    AsyncThunk,
} from '@reduxjs/toolkit';
import { toggleLoadingStatus } from './global/slices';

type Props = {
    name: string;
    callback: (payload: void, thunkAPI: Object) => {};
    errorCallback?: (error: any, thunkAPI: Object, payload: void) => {};
};

type ThunkAPI = {
    dispatch: any;
    getState: () => any;
    extra: any;
    requestId: string;
    rejectWithValue: any;
};

type CreateAsyncThunkConfig = {
    rejectValue: any;
    serializedErrorType: any;
    typePrefix: string;
};

function createAsyncThunk<Returned, ThunkArg = void>(
    type: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkAPI>,
    options?: CreateAsyncThunkConfig
): AsyncThunk<Returned, ThunkArg, ThunkAPI> {
    const enhancedPayloadCreator: AsyncThunkPayloadCreator<
        Returned | ReturnType<typeof payloadCreator>,
        ThunkArg,
        ThunkAPI
    > = async (payload: ThunkArg, thunkAPI: ThunkAPI) => {
        try {
            thunkAPI.dispatch(toggleLoadingStatus()); // Dispatch toggleLoadingStatus(true) to indicate loading
            const result = await payloadCreator(payload, thunkAPI as any);
            thunkAPI.dispatch(toggleLoadingStatus());
            return result;
        } catch (error) {
            thunkAPI.dispatch(toggleLoadingStatus());
            return thunkAPI.rejectWithValue(error);
        }
    };

    return _createAsyncThunk<Returned, ThunkArg, ThunkAPI>(
        type,
        enhancedPayloadCreator as any,
        options as any
    );
}

export type { Draft, PayloadAction };
export { createSlice, createAsyncThunk, configureStore };
