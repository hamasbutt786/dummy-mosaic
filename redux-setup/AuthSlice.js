import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: null,
    status: null,
    user: null,
    password: null,
    isLoggedIn: false,
    loginData:null
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.status = action.payload.status
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.username = null
            state.status = null
            localStorage.clear()
        },
        setIsLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload
        },
        setLoginData: (state,action) => {
            state.loginData = action.payload;
          },
    }
})

export const { logout, login, setUser,setIsLoggedIn ,setLoginData} = AuthSlice.actions
export default AuthSlice.reducer
