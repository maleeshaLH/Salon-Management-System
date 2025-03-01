import express from 'express'
import {Payment} from "@prisma/client";
import {addPayment, deletePayment, getAllPayment, updatePayment} from "../database/payment-data";
import {authenticateToken} from "./userRouter";

// const app  = express() ;

const  router = express.Router();
// app.use(authenticateToken)

router.post('/add' ,async (req,res) =>{
    res.send(await addPayment(req.body))
})

router.get('/getAll', async (req,res) =>{

    try {
        res.json(await getAllPayment())
    }catch (error){
        console.log("error get All Payment "+error)
    }
})

router.delete("/delete/:id",async (req,res) => {
    const  id:string = req.params.id;

    try {
        await deletePayment(id);
        res.send("Delete Payment")
    }catch (error){
        console.log("delete Payment error"+error)
    }
})

router.put("/update/:id",async (req, res) => {
    const id:string = req.params.id;
    const payment : Payment = req.body;

    try{
        await updatePayment(id, payment);
        res.send('Payment Updated');
        console.log("Payment Update")
    }catch(err){
        console.log("error updating Payment", err);
    }
})

export default router;