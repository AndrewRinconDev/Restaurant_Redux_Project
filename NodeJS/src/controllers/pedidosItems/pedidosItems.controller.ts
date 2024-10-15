import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getMethodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.pedidosItems.findMany({
      where: { pedidosId: id },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::pedidosItems", error);
    return res.status(500).json(error);
  }
};

const postMethod = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await prisma.pedidosItems.create({ data: body });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::pedidosItems", error);
    return res.status(500).json(error);
  }
};

const putMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await prisma.pedidosItems.update({
      where: { id: id },
      data: body,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::pedidos", error);
    return res.status(500).json(error);
  }
};

const deleteMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.pedidosItems.delete({
      where: { id: id },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::pedidos", error);
    return res.status(500).json(error);
  }
};

export { getMethodById, postMethod, putMethod, deleteMethod };
