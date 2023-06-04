import { createSlice } from "@reduxjs/toolkit"

// init global state
 const initialState = {
    loadingStatus: false
 }

// create global slice
 export const globalSlice = createSlice({
    name:  'global',
    initialState,
    reducers: {
        toggleLoadingStatus: (state) => {
            state.loadingStatus = !state.loadingStatus
        }
    }

 })

 // export actions
 export const {
    toggleLoadingStatus
 } = globalSlice.actions

 export default globalSlice.reducer