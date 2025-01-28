import express from 'express'
import {addCustomer} from "../database/customer-prisma-data";

const  router = express.Router();

    router.post('/add', async (req,res) =>{
        res.send(await addCustomer(req.body))
    })

export default router;