import { createSlice, createAsyncThunk, Draft, PayloadAction } from "../toolkit"
import { register } from "./api"

// login async function
export const registerAsync = createAsyncThunk(
    "register/register",
    async (_, thunkAPI : any) => {
        console.log('aaaa')
      const data = thunkAPI.getState().register
      console.log('data register', data)
      const response = await register(data)
      return response.data
    }
  )


// init global state
 const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    district: "",
    building:"",
    error: [],
    status: false
 }

// create global slice
 export const globalSlice = createSlice({
    name:  'register',
    initialState,
    reducers: {
        setFormValue: (state : Draft<typeof initialState>, action: PayloadAction<{ name: keyof typeof initialState; value: typeof initialState[keyof typeof initialState] }>) => {
            const { name, value } = action.payload;
            (state[name] as any) = value;
            console.log('name:', name);
            console.log('value:', value);
            state.error = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.status = true
            })
            .addCase(registerAsync.fulfilled, (state, action: any) => {
                const { error, data } = action.payload
                console.log('payload', action.payload)
                if(error) {
                    state.error = error
                } else {
                    state.error = [];
                    //reset state
                    state.firstName = "";
                    state.lastName = "";
                    state.email = "";
                    state.password = "";
                    state.phone = "";
                    state.city = "";
                    state.district = "";
                    state.building ="";
                    state.error = [];

                    //set localstorage
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('userId', data._id)
                    localStorage.setItem('accessToken', '')
                    localStorage.setItem('timestamp', new Date().getTime().toString())
                    localStorage.setItem('isAdminUser', 'false')
                }
                // set status state
                state.status = false
            })
            .addCase(registerAsync.rejected, (state) => {
                state.status = false
            })
    }

 })

 // export actions
 export const {
     setFormValue,
 } = globalSlice.actions

 export default globalSlice.reducer