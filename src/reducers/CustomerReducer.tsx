import {Customer} from "../models/customer.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const initialState : Customer [] = [];

const api = axios.create({
    baseURL : "http://localhost:3001/customer",
})

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer: Customer) => {
        try {
            const response = await api.post('/add', customer);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);
export const customerSlice = createSlice({
    name: 'customer',
    initialState ,
    reducers:{
        addCustomer(state,action:PayloadAction<Customer>){
            state.push(action.payload);
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(saveCustomer.pending,(state, action)=>{
                console.log("pending",action.payload);
            })
        .addCase(saveCustomer.rejected,(state, action)=>{
            console.log("rejected",action.payload);
        })
            .addCase(saveCustomer.fulfilled,(state, action)=>{
                console.log("fulfilled",action.payload);
                state.push(action.payload);
                alert(action.payload);
            })
    }
})

export const {addCustomer }= customerSlice.actions;
export default customerSlice.reducer;