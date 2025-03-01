import express from 'express'
import {
    addAppointment,
    deleteAppointment,
    getAllAppointment,
    getAllAppointmentCount,
    updateAppointment
} from "../database/appointment-data";
import {Appointment, Employee} from "@prisma/client";

const  router = express.Router();

router.post('/add', async (req,res) =>{
    res.send(await addAppointment(req.body))
})

router.get('/getAll', async (req,res) =>{

    try {
        res.json(await getAllAppointment())
    }catch (error){
        console.log("error get All Employee "+error)
    }
})

router.get('/getAllCount', async (req,res) =>{

    try {
        res.json(await getAllAppointmentCount())
    }catch (error){
        console.log("error get All Employee "+error)
    }
})

router.delete("/delete/:id",async (req,res) => {
    const  id:string = req.params.id;

    try {
        await deleteAppointment(id);
        res.send("Delete Appointment")
    }catch (error){
        console.log("delete Appointment error"+error)
    }
})

router.put("/update/:id",async (req, res) => {
    const id:string = req.params.id;
    const appointment : Appointment = req.body;

    try{
        await updateAppointment(id, appointment);
        res.send('Appointment Updated');
        console.log("Appointment Update")
    }catch(err){
        console.log("error updating appointment", err);
    }
})

export default router;