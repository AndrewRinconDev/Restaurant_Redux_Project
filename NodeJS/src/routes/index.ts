import express from "express";
import categoriasRoutes from "./categorias/categorias.routes";
import clientesRoutes from "./clientes/clientes.routes";
import pedidosRoutes from "./pedidos/pedidos.routes";
import pedidosItemsRoutes from "./pedidosItems/pedidosItems.routes";
import productosRoutes from "./productos/productos.routes";
import usuariosRoutes from "./usuarios/usuarios.routes";
import mailRoutes from "./mail/mail.routes";
import uploadRoutes from "./upload/upload.routes";

const router = express.Router();

// /api

router.use("/categorias", categoriasRoutes); //api/categorias
router.use("/clientes", clientesRoutes); //api/clientes
router.use("/pedidos", pedidosRoutes); //api/pedidos
router.use("/pedidosItems", pedidosItemsRoutes); //api/pedidos
router.use("/productos", productosRoutes); //api/productos
router.use("/usuarios", usuariosRoutes); //api/usuarios
router.use("/mail", mailRoutes); //api/usuarios
router.use("/upload", uploadRoutes); //api/usuarios

export default router;
