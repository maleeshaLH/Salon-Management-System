import {PrismaClient} from "@prisma/client";
import {Service} from "../model/service";

const prisma = new PrismaClient()

export async function addService(service :Service){
    try {
        await prisma.service.create({
            data:{
                serviceId:service.serviceId,
                name:service.name,
                duration:service.duration,
                price:service.price,
            }
        })

        console.log("Service Save successfully")
        return 'Service save Successfully..!'
    }catch (error){
        console.log(error)
    }

}

export async function getAllService(){
    try {
        return await prisma.service.findMany()

    }catch (error){
        return error;
    }
}

export async function getAllServiceCounts(){
    try {
        return await prisma.service.count()

    }catch (error){
        return error;
    }
}

export async function deleteService(id:string){
    try {
        await prisma.service.delete({
            where:{serviceId: id}
        })
        console.log("Service Delete")
        return 'Service Delete Successfully'
    }catch (error){
        return error
    }
}
export async function updateService(id: string, service: Service){
    try{
        await prisma.service.update({
            where:{ serviceId : id},
            data:{
                name:service.name,
                duration:service.duration,
                price:service.price,
            }
        })
        return 'Service Update success'
    }catch(err){
        console.log("error updating service", err);
        return  err
    }
}
