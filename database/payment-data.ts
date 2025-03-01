import { PrismaClient} from "@prisma/client";
import {Payment} from "../model/payment";

const prisma = new PrismaClient()

export async function addPayment(payment :Payment){
    try {
        await prisma.payment.create({
            data:{
                paymentId:payment.paymentId,
                appointmentId:payment.appointmentId,
                paymentDate:payment.paymentDate,
                amount:payment.amount,
            }
        })
        console.log("Payment Save successfully")
        return 'Payment save Successfully..!'
    }catch (error){
        console.log(error)
    }

}

export async function getAllPayment(){
    try {
        return await prisma.payment.findMany()

    }catch (error){
        return error;
    }
}

export async function deletePayment(id:string){
    try {
        await prisma.payment.delete({
            where:{paymentId: id}
        })
        console.log("Payment Delete")
        return 'Payment Delete Successfully'
    }catch (error){
        return error
    }
}
export async function updatePayment(id: string, payment: Payment){
    try{
        await prisma.payment.update({
            where:{ paymentId : id},
            data:{
                appointmentId:payment.appointmentId,
                paymentDate:payment.paymentDate,
                amount:payment.amount,
            }
        })
        return 'Payment Update success'
    }catch(err){
        console.log("error updating Payment", err);
        return  err
    }
}
