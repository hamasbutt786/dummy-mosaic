import { combineReducers, configureStore, middleware } from "@reduxjs/toolkit"
import dataSlice from "../redux-setup/DataSlice"
import { projectData } from "../redux-setup/api/data"
import AuthSlice from "../redux-setup/AuthSlice"
import { authProfile } from "../redux-setup/api/auth"
import { tokenValidation } from "@/redux-setup/api/token-validation"
const reducers = combineReducers({
    dataSlice,
    AuthSlice,
    [projectData.reducerPath]: projectData.reducer,
    [authProfile.reducerPath]: authProfile.reducer,
    [tokenValidation.reducerPath]: tokenValidation.reducer
})
export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({})
            .concat(projectData.middleware)
            .concat(authProfile.middleware)
            .concat(tokenValidation.middleware)
})
