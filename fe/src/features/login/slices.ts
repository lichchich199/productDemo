import { createSlice, createAsyncThunk, Draft, PayloadAction } from "../toolkit"
import { login } from "./api"

export const resetLocalStorage = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('timestamp')
    localStorage.removeItem('isAdminUser')
}

// login async function
export const loginAsync = createAsyncThunk(
    "login/login",
    async (_, thunkAPI : any) => {
      const { email , password } = thunkAPI.getState().login
      console.log('email', email)
      console.log('password', password)
      const response = await login({ email, password })
      return response.data
    }
)


// init global state
 const initialState = {
    email: "",
    password: "",
    userId: "",
    accessToken: "",
    timestamp: "",
    error:"",
    isAdminUser: false,
    status: false
 }

// create global slice
 export const loginSlice = createSlice({
    name:  'login',
    initialState,
    reducers: {
        setFormValue: (state : Draft<typeof initialState>, action: PayloadAction<{ name: keyof typeof initialState; value: typeof initialState[keyof typeof initialState] }>) => {
            const { name, value } = action.payload;
            (state[name] as any) = value;
            state.error = '';
        },
        setStateFromLocalStorage: (state) => {
            state.email = localStorage.getItem('email') || '';
            state.userId = localStorage.getItem('userId') || '';
            state.accessToken = localStorage.getItem('accessToken') || '';
            state.timestamp = localStorage.getItem('timestamp') || '';
            state.isAdminUser = !!localStorage.getItem('isAdminUser') || false
        },
        logout: (state) => {
            resetLocalStorage()
            state.email = ''
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
                const { error, data, message } = action.payload
                console.log('payload', action.payload)
                if(error) {
                    state.error = message
                } else {
                    state.error = '';
                    let timeStamp = new Date().getTime().toString()
                    //set state
                    state.email = data.email
                    state.userId = data._id
                    state.accessToken = ''
                    state.timestamp = timeStamp
                    state.isAdminUser =  false

                    //set localstorage
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('userId', data._id)
                    localStorage.setItem('accessToken', '')
                    localStorage.setItem('timestamp', timeStamp)
                    localStorage.setItem('isAdminUser', 'false')
                }
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
     setFormValue,
    setStateFromLocalStorage,
    logout,
 } = loginSlice.actions

 export default loginSlice.reducer