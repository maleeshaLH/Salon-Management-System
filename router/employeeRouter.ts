import express from 'express'
import {addEmployee, deleteEmployee, getAllEmployee} from "../database/employee-date";
import {getAllCustomer} from "../database/customer-prisma-data";

const  router = express.Router();

router.post('/add', async (req,res) =>{
    res.send(await addEmployee(req.body))
})

router.get('/getAll', async (req,res) =>{

    try {
        res.json(await getAllEmployee())
    }catch (error){
        console.log("error get All Employee "+error)
    }
})

router.delete("/delete/:id",async (req,res) => {
    const  id:string = req.params.id;

    try {
        await deleteEmployee(id);
        res.send("Delete Employee")
    }catch (error){
        console.log("delete Employee error"+error)
    }
})
export default router;