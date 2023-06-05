import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "../toolkit"
import { login } from "./api"
import { RootState } from "../../store"

export const resetLocalStorage = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('timestamp')
    localStorage.removeItem('isAdminUser')
}

interface LoginData {
    username: string;
    password: string;
  }
// login async function
export const loginAsync = createAsyncThunk(
    "login/login",
    async (_, thunkAPI) => {
      const { userName , password } = thunkAPI.getState().login
      const response = await login({ userName, password })
      return response.data
    }
  )

// init global state
 const initialState = {
    userName: "",
    password: "",
    userId: "",
    accessToken: "",
    timestamp: "",
    isAdminUser: false,
    status: false
 }

// create global slice
 export const globalSlice = createSlice({
    name:  'login',
    initialState,
    reducers: {
        setStateFromLocalStorage: (state) => {
            state.userName = localStorage.getItem('userName') || '',
            state.userId = localStorage.getItem('userId') || '',
            state.accessToken = localStorage.getItem('accessToken') || '',
            state.timestamp = localStorage.getItem('timestamp') || '',
            state.isAdminUser = !!localStorage.getItem('isAdminUser') || false
        },
        resetLoginState: (state) => {
            resetLocalStorage()
            state.userName = ''
            state.userId = ''
            state.accessToken = ''
            state.timestamp = ''
            state.isAdminUser = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = true
            })
            .addCase(loginAsync.fulfilled, (state, action: any) => {
                const { accessToken, userInfo, userConfig } = action.payload
                const { isAdminUser } = userConfig;
                const { userName, userId} = userInfo
                let timeStamp = new Date().getTime().toString()

                //set localstorage
                localStorage.setItem('userName', userName)
                localStorage.setItem('userId', userId)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('timestamp', timeStamp)
                localStorage.setItem('isAdminUser', isAdminUser || false)
                
                //set state
                state.userName = userName
                state.userId = userId
                state.accessToken = accessToken
                state.timestamp = timeStamp
                state.isAdminUser = isAdminUser || false
                // set status state
                state.status = false
            })
            .addCase(loginAsync.rejected, (state) => {
                state.status = false
            })
    }

 })

 // export actions
 export const {
    setStateFromLocalStorage,
    resetLoginState
 } = globalSlice.actions

 export default globalSlice.reducer