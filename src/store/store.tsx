import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer.tsx";
import employeeReducer from "../reducers/EmployeeReducer.tsx";
import appointmentReducer from "../reducers/AppointmentReducer.tsx";
import paymentReducer from "../reducers/PaymentReducer.tsx";
import serviceReducer from "../reducers/ServiceReducer.tsx";

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        employees: employeeReducer,
        appointments: appointmentReducer,
        payment: paymentReducer,
        service: serviceReducer,
    }
});

export type AppDispatch = typeof store.dispatch;

