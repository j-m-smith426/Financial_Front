import { configureStore } from "@reduxjs/toolkit"
import { billApi } from "./billApi"

const reducer = {
    [billApi.reducerPath]: billApi.reducer
}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(billApi.middleware),
})

