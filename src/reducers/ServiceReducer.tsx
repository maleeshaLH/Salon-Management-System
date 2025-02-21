import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Service} from "../models/service.ts";

const initialState :Service[]=[];

const api = axios.create({
    baseURL : "http://localhost:3001/service",
})

export const saveService = createAsyncThunk(
    'service/saveService',
    async (service: Service) => {
        try {
            const response = await api.post('/add', service);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const getAllService = createAsyncThunk(
    'service/getAllService',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const  deleteService = createAsyncThunk(
    'service/deleteService',
    async (id:string)=> {
        try {
            const  response = await api.delete(`/delete/${id}`)
            return response.data;
        }catch (error){
            console.log(error)
        }
    }
)
export const updateService  = createAsyncThunk(
    'service/updateService',
    async (service :Service) => {
        try {
            const response = await api.put(`/update/${service.serviceId}`,service)
            return response.data;
        }catch (err) {
            console.log(err)
        }
    }
)
export  const serviceSlice = createSlice({
    name :'service',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(saveService.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(saveService.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(saveService.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                state.push(action.payload)
                alert(action.payload)
            })

        builder
            .addCase(getAllService.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllService.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllService.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })
        builder
            .addCase(deleteService.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(deleteService.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(deleteService.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return state.filter((service : Service)=>service.serviceId !== action.payload.serviceId)
                alert(action.payload)
            })
        builder
            .addCase(updateService.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(updateService.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(updateService.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                const service = state.find((service : Service)=> service.serviceId === action.payload.serviceId)
                if(service){
                    service.serviceId = action.payload.serviceId;
                    service.name = action.payload.name;
                    service.duration = action.payload.duration;
                    service.price = action.payload.price;
                }
                alert(action.payload)
            })


    }
})

export default serviceSlice.reducer;