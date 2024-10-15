import express from "express";
import {
  getMethodById,
  postMethod,
  putMethod,
  deleteMethod,
} from "../../controllers/pedidosItems/pedidosItems.controller";
const router = express.Router();

// /api/pedidos

router.get("/:id", getMethodById); //api/pedidos/1 -> obtiene los items de un pedido
router.post("/", postMethod); //api/pedidos -> crea una nueva categoria
router.put("/:id", putMethod); //api/pedidos/1 -> actualiza una categoria
router.delete("/:id", deleteMethod); //api/pedidos -> elimina una categoria

export default router;
