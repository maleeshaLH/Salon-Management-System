import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer.tsx";

export const store = configureStore({
    reducer: {
        customer: customerReducer,
    }
});

export type AppDispatch = typeof store.dispatch;