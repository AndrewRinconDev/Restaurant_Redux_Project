import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const uploadMethod = async(req: Request, res: Response) => {
    try {
        const {file} = req;
        console.log("mostrando file", file)
        return res.status(200).json({data: file})
    } catch (error) {
        console.log("error::controller::upload", error);
        return res.status(500).json(error);
    }
}


export {
    uploadMethod,
}