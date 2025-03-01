import express from 'express'
import {addCustomer, deleteCustomer, getAllCustomer, getAllCustomerCount} from "../database/customer-prisma-data";
import {deleteEmployee} from "../database/employee-date";

const  router = express.Router();

    router.post('/add', async (req,res) =>{
        try {
            res.send(await addCustomer(req.body))
        }catch (error){
            console.log("error save customer" + error)
        }
    })

    router.get('/getAll', async (req,res) =>{

        try {
            res.json(await getAllCustomer())
        }catch (error){
            console.log("error get All Customer "+error)
        }
    })

router.get('/getAllCount', async (req,res) =>{

    try {
        res.json(await getAllCustomerCount())
    }catch (error){
        console.log("error get All Customer "+error)
    }
})
router.delete("/delete/:id",async (req,res) => {
    const  id:string = req.params.id;

    try {
        await deleteCustomer(id);
        res.send("Delete Customer")
    }catch (error){
        console.log("delete Customer error"+error)
    }
})
export default router;