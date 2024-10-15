import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod
} from '../../controllers/clientes/clientes.controller'
const router = express.Router();

// /api/clientes

router.get('/', getMethod); //api/clientes -> obtiene todas las clientes
router.get('/:id', getMethodById); //api/clientes/1 -> obtiene una categoria en especifico
router.post('/', postMethod)//api/clientes -> crea una nueva categoria
router.put('/:id', putMethod); //api/clientes/1 -> actualiza una categoria
router.delete('/:id', deleteMethod); //api/clientes -> elimina una categoria

export default router;