import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {
  try {
    const result = await prisma.usuarios.findMany();
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::usuarios", error);
    return res.status(500).json(error);
  }
};

const getMethodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.usuarios.findUnique({ where: { id: id } });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::usuarios", error);
    return res.status(500).json(error);
  }
};

const postMethod = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    //Primero que no exista en la base de datos
    const exists = await prisma.usuarios.findUnique({
      where: { correo: body.correo },
    });
    if (exists) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya existe" });
    }
    const hashedPassword = await bcrypt.hashSync(body.clave, 10);
    body.clave = hashedPassword;
    const result = await prisma.usuarios.create({ data: body });
    return res.status(201).json(result);
  } catch (error) {
    console.log("error::controller::usuarios", error);
    return res.status(500).json(error);
  }
};

const loginMethod = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    //Primero que exista en la base de datos
    const exists = await prisma.usuarios.findUnique({
      where: { correo: body.correo },
    });
    if (!exists)
      return res.status(400).json({ message: "El usuario no existe" });

    //Validar la contraseña
    const isValidPassword = await bcrypt.compare(body.clave, exists.clave);
    if (!isValidPassword)
      return res.status(400).json({ message: "La contraseña es inválida" });

    //Generar el payload para el token
    const payload = {
      id: exists.id,
      nombres: exists.nombres,
      apellidos: exists.apellidos,
      role: exists.role,
    };
    //Generar y firmar el token
    const token = jwt.sign(payload, "u-catalunya-2023", { expiresIn: "1h" });
    return res.status(200).json({ jwt: token, userData: payload });
  } catch (error) {
    console.log("error::controller::usuarios", error);
    return res.status(500).json(error);
  }
};

const putMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const hashedPassword = await bcrypt.hashSync(body.clave, 10);
    body.clave = hashedPassword;
    const result = await prisma.usuarios.update({
      where: { id: id },
      data: body,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::usuarios", error);
    return res.status(500).json(error);
  }
};

const deleteMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.usuarios.delete({
      where: { id: id },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error::controller::usuarios", error);
    return res.status(500).json(error);
  }
};

export {
  getMethod,
  getMethodById,
  postMethod,
  loginMethod,
  putMethod,
  deleteMethod,
};
