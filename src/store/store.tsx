import {configureStore} from "@reduxjs/toolkit";
import employeeReducer from "../reducers/EmployeeReducer.tsx";
import appointmentReducer from "../reducers/AppointmentReducer.tsx";
import paymentReducer from "../reducers/PaymentReducer.tsx";
import serviceReducer from "../reducers/ServiceReducer.tsx";
import userReducer from "../reducers/UserReducer.tsx";
import customerReducer from "../reducers/CustomerReducer.tsx";

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
        appointments: appointmentReducer,
        payment: paymentReducer,
        service: serviceReducer,
        user: userReducer,
        customer: customerReducer,
    }
});

export type AppDispatch = typeof store.dispatch;

