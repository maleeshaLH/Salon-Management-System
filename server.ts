import express from 'express'
import customerRouter from './router/customerRouter'
import employeeRouter from "./router/employeeRouter";
import appointmentRouter from "./router/appointmentRouter";
import serviceRouter from "./router/serviceRouter";
import paymentRouter from "./router/paymentRouter";
import dotenv from "dotenv";
import userRouter, {authenticateToken} from "./router/userRouter";
import cors from 'cors'

dotenv.config();

const app  = express() ;
app.use(express.json())

// app.use('/',(req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
//
//     next();
// })
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true,
}));
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);

app.listen(3001, ()=>{
    console.log("Server running on port 3001");
});

app.use('/customer', customerRouter)
app.use('/employee',employeeRouter)
app.use('/appointment',appointmentRouter)
app.use('/service',serviceRouter)
app.use('/payment',paymentRouter)

app.use('/user',userRouter)
app.use(authenticateToken)

