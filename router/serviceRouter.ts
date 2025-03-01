import express from 'express'
import {addAppointment, deleteAppointment, getAllAppointment, updateAppointment} from "../database/appointment-data";
import {deleteEmployee, updateEmployee} from "../database/employee-date";
import {Service} from "@prisma/client";
import {addService, deleteService, getAllService, getAllServiceCounts, updateService} from "../database/service-data";

const  router = express.Router();

router.post('/add', async (req,res) =>{
    res.send(await addService(req.body))
})

router.get('/getAll', async (req,res) =>{

    try {
        res.json(await getAllService())
    }catch (error){
        console.log("error get All Service "+error)
    }
})

router.get('/getAllCount', async (req,res) =>{

    try {
        res.json(await getAllServiceCounts())
    }catch (error){
        console.log("error get All Service "+error)
    }
})

router.delete("/delete/:id",async (req,res) => {
    const  id:string = req.params.id;

    try {
        await deleteService(id);
        res.send("Delete Service")
    }catch (error){
        console.log("delete Service error"+error)
    }
})

router.put("/update/:id",async (req, res) => {
    const id:string = req.params.id;
    const service : Service = req.body;

    try{
        await updateService(id, service);
        res.send('Service Updated');
        console.log("Service Update")
    }catch(err){
        console.log("error updating service", err);
    }
})

export default router;