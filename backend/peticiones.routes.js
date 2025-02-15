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
    autorizacionTarjeta,
    pagar
} from './peticiones.controllers.js';

const router = Router();

router.get("/transacciones/:numeroTarjeta", getTransacciones);
router.get("/user/:gmailUser", getUser);
router.post("/tarjetas", createTarjeta);
router.post("/user", createUser);
router.post("/transacciones", createTransacciones);
router.post("/pagar", pagar);
router.get("/tarjetas/user/:gmailUser", getTarjetas); 

router.get("/autorizacion", autorizacionTarjeta);

export default router;