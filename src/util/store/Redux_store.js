import { configureStore } from "@reduxjs/toolkit"
import { billApi } from "./billApi"

const initialState = {
    selectedDay: new Date().toISOString(),
    page: "Week"
}
const pageReducer = (initial = initialState, action) => {
    const newState = { ...initial };
    switch (action.type) {
        case "SelectedDay": {
            newState.selectedDay = action.payload;
            return newState
        }
        case "Page": {
            newState.page = action.payload;
            return newState;
        }
        default:
            return newState;
            
    }
}

const reducer = {
    [billApi.reducerPath]: billApi.reducer,
    pageReducer: pageReducer
}


export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(billApi.middleware),
})


