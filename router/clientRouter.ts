import express from "express";
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Client} from "../model/client";
import {addClient, getClientDetails, verifyClientCredentials} from "../database/client-data";
import {Customer} from "../model/customer";
import {addCustomer} from "../database/customer-prisma-data";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const router = express.Router();

router.post("/client-login", async (req, res) => {
    console.log('client Login')
    const clientEmail = req.body.client.clientEmail;
    const clientPassword = req.body.client.clientPassword

    const client : Client = {clientName: "", clientPhone: 0, clientEmail,clientPassword};

    try{
        const isVerified =  await verifyClientCredentials(client);

        if(isVerified){
            const token = jwt.sign({ clientEmail }, process.env.MOBILE_SECRET_KEY as Secret, {expiresIn: "59m"});
            const refreshToken = jwt.sign({ clientEmail }, process.env.MOBILE_REFRESH_TOKEN as Secret, {expiresIn: "7d"});
            res.json({accessToken : token, refreshToken : refreshToken});
        }else{
            res.status(403).send('Invalid credentials')
            console.log('client Invalid credentials')
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

router.post("/client-register", async (req, res) => {
    console.log('Register', req.body);
    const clientName = req.body.client.clientName;
    const clientEmail = req.body.client.clientEmail;
    const clientPhone = req.body.client.clientPhone;
    const clientPassword = req.body.client.clientPassword


    const customerName = req.body.client.clientName;
    const customerEmail = req.body.client.clientEmail;
    const customerPhone = req.body.client.clientPhone;

    const client : Client = {clientName,clientEmail, clientPhone,clientPassword};
     const customer:Customer = { customerId: uuidv4(),customerName,customerEmail,customerPhone}

    try{
        const registration = await addClient(client);
         await addCustomer(customer)
        res.status(201).json(registration);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
        console.log('register')
    }

})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(refresh_token as string, process.env.MOBILE_REFRESH_TOKEN as Secret) as {clientEmail: string, iat: number};
        const token = jwt.sign({ clientEmail: payload.clientEmail }, process.env.MOBILE_SECRET_KEY as Secret, {expiresIn: "59m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
        console.log('token')
    }
})

export function authenticateClientToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log(token);
    if(!token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(token as string, process.env.MOBILE_SECRET_KEY as Secret) as {clientEmail: string, iat: number};
        console.log(payload.clientEmail);
        req.body.username = payload.clientEmail;
        next();
    }catch(err){
        res.status(401).send(err);
        console.log('authentication')
    }
}
router.get("/me", authenticateClientToken, async (req, res) => {
    const clientEmail = req.body.username;
    try {
        const client = await getClientDetails(clientEmail);

        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return; // ✅ `return` statement add කිරීම
        }

        res.json(client); // ✅ `return` නොකර response send කරනවා
    } catch (error) {
        console.error("Error fetching logged-in client:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;