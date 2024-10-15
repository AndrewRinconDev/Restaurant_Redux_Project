import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod
} from '../../controllers/categorias/categorias.controller'
const router = express.Router();

// /api

router.get('/', getMethod); //api/categorias -> obtiene todas las categorias
router.get('/:id', getMethodById); //api/categorias/1 -> obtiene una categoria en especifico
router.post('/', postMethod); //api/categorias -> crea una nueva categoria
router.put('/:id', putMethod); //api/categorias/1 -> actualiza una categoria
router.delete('/:id', deleteMethod); //api/categorias -> elimina una categoria

export default router;
