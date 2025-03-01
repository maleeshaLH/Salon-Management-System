import { PrismaClient } from "@prisma/client";
import {Appointment} from "../model/appointment";

const prisma = new PrismaClient()

export async function addAppointment(appointment :Appointment){
    try {
        await prisma.appointment.create({
            data:{
                appointmentId:appointment.appointmentId,
                date:appointment.date,
                time:appointment.time,
                serviceType:appointment.serviceType,
                customerId:appointment.customerId,
                employeeId:appointment.employeeId
            }
        })
        console.log("Appointment Save successfully")
        return 'Appointment save Successfully..!'
    }catch (error){
        console.log(error)
    }

}

export async function getAllAppointment(){
    try {
        return await prisma.appointment.findMany()

    }catch (error){
        return error;
    }
}
export async function getAllAppointmentCount(){
    try {
        return await prisma.appointment.count()

    }catch (error){
        return error;
    }
}

export async function deleteAppointment(id:string){
    try {
        await prisma.appointment.delete({
            where:{appointmentId: id}
        })
        console.log("Appointment Delete")
        return 'Appointment Delete Successfully'
    }catch (error){
        return error
    }
}
export async function updateAppointment(id: string, appointment: Appointment){
    try{
        await prisma.appointment.update({
            where:{ appointmentId : id},
            data:{
                date:appointment.date,
                time:appointment.time,
                serviceType:appointment.serviceType,
                customerId:appointment.customerId,
                employeeId:appointment.employeeId
            }
        })
        return 'Appointment Update success'
    }catch(err){
        console.log("error updating appointment", err);
        return  err
    }
}
