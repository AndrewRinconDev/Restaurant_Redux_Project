import express from "express";
import {
  getMethod,
  getMethodById,
  postMethod,
  putMethod,
  deleteMethod,
} from "../../controllers/pedidos/pedidos.controller";
const router = express.Router();

// /api/pedidos

router.get("/", getMethod); //api/pedidos -> obtiene todas las pedidos
router.get("/:id", getMethodById); //api/pedidos/1 -> obtiene una categoria en especifico
router.post("/", postMethod); //api/pedidos -> crea una nueva categoria
router.put("/:id", putMethod); //api/pedidos/1 -> actualiza una categoria
router.delete("/:id", deleteMethod); //api/pedidos -> elimina una categoria

export default router;
