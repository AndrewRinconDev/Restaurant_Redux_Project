import express from "express";
import {
  getMethod,
  getMethodById,
  postMethod,
  putMethod,
  deleteMethod,
  loginMethod,
} from "../../controllers/usuarios/usuarios.controller";
import { validateToken } from "../../middlewares/token";
const router = express.Router();

// /api/usuarios

router.get("/", getMethod); //api/usuarios -> obtiene todas las usuarios
router.get("/:id", getMethodById); //api/usuarios/1 -> obtiene una categoria en especifico
router.post("/", postMethod); //api/usuarios -> crea una nueva categoria
router.post("/login", loginMethod); //api/usuarios -> crea una nueva categoria
router.post("/validateToken", validateToken); //api/usuarios -> crea una nueva categoria
router.put("/:id", putMethod); //api/usuarios/1 -> actualiza una categoria
router.delete("/:id", deleteMethod); //api/usuarios -> elimina una categoria

export default router;
