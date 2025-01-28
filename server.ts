import express from 'express'
import customerRouter from './router/customerRouter'
const app  = express() ;
app.use(express.json())

app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');

    next();
})

app.listen(3001, ()=>{
    console.log("Server running on port 3001");
});

app.use('/customer', customerRouter)