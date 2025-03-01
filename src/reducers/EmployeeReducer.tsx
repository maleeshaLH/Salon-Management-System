import {Employee} from "../models/employee.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState :Employee[]=[];

const api = axios.create({
    baseURL : "http://localhost:3001/employee",
})

export const saveEmployee = createAsyncThunk(
    'employee/saveEmployee',
    async (employee: Employee) => {
        try {
            const response = await api.post('/add', employee);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const getAllEmployee = createAsyncThunk(
    'employee/getAllEmployee',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const getAllEmployeeCount = createAsyncThunk(
    'employee/getAllEmployeeCount',
    async () => {
        try {
            const response = await api.get('/getAllCount');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
);

export const  deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id:string)=> {
        try {
            const  response = await api.delete(`/delete/${id}`)
            return response.data;
        }catch (error){
            console.log(error)
        }
    }
)

export const updateEmployee  = createAsyncThunk(
    'employee/updateEmployee',
    async (employee :Employee) => {
        try {
            const response = await api.put(`/update/${employee.employeeId}`,employee)
            return response.data;
        }catch (err) {
            console.log(err)
        }
    }
)

export  const customerSlice = createSlice({
    name :'employee',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(saveEmployee.pending,(state,action) =>{
            console.log("pending",action.payload)
            })
            .addCase(saveEmployee.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(saveEmployee.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                state.push(action.payload)
                alert(action.payload)
            })

        builder
            .addCase(getAllEmployee.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllEmployee.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllEmployee.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })
        builder
            .addCase(deleteEmployee.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(deleteEmployee.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(deleteEmployee.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return state.filter((employee : Employee)=>employee.employeeId !== action.payload.employeeId)
            })
        builder
            .addCase(updateEmployee.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(updateEmployee.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(updateEmployee.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                const employee = state.find((employee : Employee)=> employee.employeeId === action.payload.employeeId)
                if(employee){
                    employee.employeeName = action.payload.employeeName;
                    employee.email = action.payload.email;
                    employee.phone = action.payload.phone;
                    employee.designation = action.payload.designation;
                    employee.salary = action.payload.salary;

                }
            })
        builder
            .addCase(getAllEmployeeCount.pending,(state,action) =>{
                console.log("pending",action.payload)
            })
            .addCase(getAllEmployeeCount.rejected,(state,action) =>{
                console.log("rejected",action.payload)
            })
            .addCase(getAllEmployeeCount.fulfilled,(state,action) =>{
                console.log("fulfilled",action.payload)
                return action.payload
            })

    }
})

export default customerSlice.reducer;