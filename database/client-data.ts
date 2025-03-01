import { PrismaClient } from "@prisma/client";
import {Client} from "../model/client";
import bcrypt from "bcrypt";
import {User} from "../model/user";

const prisma = new PrismaClient()

export async function addClient(client :Client){
    const hashedPassword = await bcrypt.hash(client.clientPassword, 10);

    try {
       await prisma.client.create({
           data:{
               name:client.clientName,
               email:client.clientEmail,
               phone: client.clientPhone,
               password:hashedPassword
           }
       })
       console.log("Customer add successfully")
       return 'Customer save Successfully '
   }catch (error){
       console.log(error)
   }

}
export async function verifyClientCredentials(verifyClient: Client) {
    const clientData  = await prisma.client.findUnique({
        where: { email:verifyClient.clientEmail },
    });
    if (!clientData ) {
        return false;
    }
    const client: Client = {
        clientName: clientData.name,
        clientEmail: clientData.email,
        clientPhone: clientData.phone,
        clientPassword: clientData.password,
    };
    return await bcrypt.compare(verifyClient.clientPassword, client.clientPassword);
}

export async function getClientDetails(clientEmail: string) {
    try {
        const client = await prisma.client.findUnique({
            where: { email: clientEmail },
            select: {
                name: true,
                email: true,
                phone: true,
            },
        });

        return client;
    } catch (error) {
        console.error("Error fetching client details:", error);
        throw new Error("Database Error");
    }
}

// export async function getAllClient(){
//     try {
//         return await prisma.client.findMany()
//
//     }catch (error){
//         return error;
//     }
// }
//
// export async function deleteCustomer(id:string){
//     try {
//         await prisma.customer.delete({
//             where:{id: id}
//         })
//         return 'Customer Delete Successfully'
//     }catch (error){
//         return error
//     }
// }
// export async function updateCustomer(id: number, customer: Customer){
//     try{
//         await prisma.customer.update({
//             where:{ id : id},
//             data:{
//                 name: customer.customerName,
//                 email: customer.customerEmail,
//                 phone: customer.customerPhone
//             }
//         })
//         return 'Update success'
//     }catch(err){
//         console.log("error updating customer", err);
//         return  err
//     }
// }
