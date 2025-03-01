import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Customer} from "../models/customer.ts";

const initialState :Customer[]=[];

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

export const getAllCustomer = createAsyncThunk(
    'customer/getAllCustomer',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const getAllCustomerCount = createAsyncThunk(
    'customer/getAllCustomerCount',
    async () => {
        try {
            const response = await api.get('/getAllCount');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const  deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (id:string)=> {
        try {
            const  response = await api.delete(`/delete/${id}`)
            return response.data;
        }catch (error){
            console.log(error)
        }
    }
)

export const updateCustomer  = createAsyncThunk(
    'customer/updateCustomer',
    async (customer :Customer) => {
        try {
            const response = await api.put(`/update/${customer.customerId}`,customer)
            return response.data;
        }catch (err) {
            console.log(err)
        }
    }
)

export  const customerSlice = createSlice({
    name :'customer',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(saveCustomer.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(saveCustomer.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(saveCustomer.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                state.push(action.payload)
                alert(action.payload)
            })

        builder
            .addCase(getAllCustomer.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllCustomer.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllCustomer.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })
        builder
            .addCase(deleteCustomer.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(deleteCustomer.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(deleteCustomer.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return state.filter((customer : Customer)=>customer.customerId !== action.payload.customerId)
            })
        builder
            .addCase(updateCustomer.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(updateCustomer.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(updateCustomer.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                const customer = state.find((customer : Customer)=> customer.customerId === action.payload.customerId)
                if(customer){
                    customer.customerName = action.payload.customerName;
                    customer.customerEmail = action.payload.customerEmail;
                    customer.customerPhone = action.payload.customerPhone;


                }
            })
        builder
            .addCase(getAllCustomerCount.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllCustomerCount.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllCustomerCount.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })


    }
})

export default customerSlice.reducer;