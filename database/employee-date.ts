import { PrismaClient } from "@prisma/client";
import {Employee} from "../model/employee";

const prisma = new PrismaClient()

export async function addEmployee(employee :Employee){
    try {
        await prisma.employee.create({
            data:{
                employeeId:employee.employeeId,
                employeeName:employee.employeeName,
                email:employee.email,
                phone:employee.phone,
                designation:employee.designation,
                salary:employee.salary
            }
        })
        console.log("Employee Save successfully")
        return 'Employee save Successfully '
    }catch (error){
        console.log(error)
    }

}

export async function getAllEmployee(){
    try {
        return await prisma.employee.findMany()

    }catch (error){
        return error;
    }
}

export async function deleteEmployee(id:string){
    try {
        await prisma.employee.delete({
            where:{employeeId: id}
        })
        console.log('Employee Delete Successfully')
        return 'Employee Delete Successfully'

    }catch (error){
        return error
    }
}
export async function updateEmployee(id: string, employee: Employee){
    try{
        await prisma.employee.update({
            where:{ employeeId : id},
            data:{
                employeeName: employee.employeeName,
                email: employee.email,
                phone: employee.phone,
                designation:employee.designation,
                salary:employee.salary
            }
        })
        return 'Update success'
    }catch(err){
        console.log("error updating customer", err);
        return  err
    }
}
