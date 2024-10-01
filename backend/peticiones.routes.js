import {
    Router
} from 'express';
import {
    getTarjetas,
    createUser,
    createTarjeta,
    createTransacciones,
    getTransacciones,
    getUser,
    autorizacionTarjeta
} from './peticiones.controllers.js';

const router = Router();

router.get("/tarjetas/:numero", getTarjetas);
router.get("/transacciones/:numero", getTransacciones);
router.get("/user/:gmail", getUser);
router.post("/tarjetas", createTarjeta);
router.post("/user", createUser);
router.post("/transacciones", createTransacciones);

router.get("/autorizacion", autorizacionTarjeta);

export default router;