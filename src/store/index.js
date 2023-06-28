import {configureStore} from "@reduxjs/toolkit";
import {softFormsApi} from "./softforms/softforms.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "./auth/auth.api";

export const store = configureStore({
    reducer: {
        [softFormsApi.reducerPath]: softFormsApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(softFormsApi.middleware).concat(authApi.middleware)

})

setupListeners(store.dispatch)
