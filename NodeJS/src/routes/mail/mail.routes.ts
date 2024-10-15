import express from 'express';
import {
    postMethod
} from '../../controllers/mail/mail.controller'
const router = express.Router();

// /api/mail


router.post('/', postMethod)//api/mail -> crea una nueva categori

export default router;