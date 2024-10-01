import {
    Router
} from 'express';
import {
    getTarjetas,
    createUser,
    createTarjeta,
    createTransacciones
} from './peticiones.controllers.js';

const router = Router();

router.get("/tarjetas/:numero", getTarjetas);
router.post("/tarjetas", createTarjeta);
router.post("/user", createUser);
router.post("/transacciones", createTransacciones);

export default router;