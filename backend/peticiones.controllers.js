import {
    getConnection
} from "./database/connection.js"
import sql from 'mssql'

export const getTarjetas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("numero", sql.Char, req.params.numero)
            .query('SELECT * FROM tarjetas WHERE numero = @numero');
        res.json(result.recordset);    
    } catch (error) {
        await pool.request().rollbackTransaction();
        console.error('Datos de tarjeta incorrectos:', error);
        res.status(500).send("Datos de tarjeta incorrectos.");
    }
};

export const createUser = async (req, res) => {
    const pool = await getConnection();
    try {
        const resultUser = await pool.request()
            .input("gmail", sql.VarChar, req.body.gmail)
            .input("contra", sql.VarChar, req.body.contra)
            .input("nombre", sql.VarChar, req.body.nombre)
            .query('INSERT INTO users (gmail, contra, nombre) VALUES (@gmail, @contra, @nombre)');

        const resultTarjeta = await pool.request()
            .input("numero", sql.Char, req.body.numero)
            .input("titular", sql.Char, req.body.titular)
            .input("tipo", sql.Char, req.body.tipo)
            .input("fecha_venc", sql.Date, req.body.fecha_venc)
            .input("num_seguridad", sql.Char, req.body.num_seguridad)
            .input("monto_autorizado", sql.Numeric, req.body.monto_autorizado)
            .input("monto_disponible", sql.Numeric, req.body.monto_disponible)
            .query('INSERT INTO tarjetas (numero, titular, tipo, fecha_venc, num_seguridad, monto_autorizado, monto_disponible) VALUES (@numero, @titular, @tipo, @fecha_venc, @num_seguridad, @monto_autorizado, @monto_disponible)');

        const resultCardsUser = await pool.request()
            .input("numeroTarjeta", sql.Char, resultTarjeta.recordset[0].numeroTarjeta)
            .input("idUser", sql.VarChar, resultUser.recordset[0].id)
            .query('INSERT INTO cardsUser (numeroTarjeta, idUser) VALUES (@numeroTarjeta, @idUser)');

        res.json({
            userId: resultUser.recordset[0],
            tarjetaId: resultTarjeta.recordset[0],
            resultCardsUser: resultCardsUser.recordset[0]
        });
    } catch (error) {
        console.error('Error al crear usuario y tarjeta:', error);
        res.status(500).send("Error al crear usuario y tarjeta.");
    }
};

export const getUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("gmail", sql.Char, req.params.gmail)
            .query('SELECT * FROM users WHERE gmail = @gmail');
        res.json(result.recordset);
    } catch (error) {
        await pool.request().rollbackTransaction();
        console.error('Datos de usuario incorrectos:', error);
        res.status(500).send("Datos de usuario incorrectos.");
    }
};

export const createTarjeta = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("numero", sql.Char, req.body.numero)
            .input("titular", sql.Char, req.body.titular)
            .input("tipo", sql.Char, req.body.tipo)
            .input("fecha_venc", sql.Date, req.body.fecha_venc)
            .input("num_seguridad", sql.Char, req.body.num_seguridad)
            .input("monto_autorizado", sql.Numeric, req.body.monto_autorizado)
            .input("monto_disponible", sql.Numeric, req.body.monto_disponible)
            .query('INSERT INTO tarjetas (numero, titular, tipo, fecha_venc, num_seguridad, monto_autorizado, monto_disponible) VALUES (@numero, @titular, @tipo, @fecha_venc, @num_seguridad, @monto_autorizado, @monto_disponible)');
        res.json({
            tarjetaId: result.recordset[0]
        });  
    } catch (error) {
        await pool.request().rollbackTransaction();
        console.error('Error al crear tarjeta:', error);
        res.status(500).send("Error al crear tarjeta.");
    }
};

export const createTransacciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const resultTransaccion = await pool.request()
            .input("monto", sql.Numeric, req.body.numero)
            .input("tipo", sql.Char, req.body.titular)
            .query('INSERT INTO transacciones (monto, tipo) VALUES (@monto, @tipo)');  

        const resultTransEchas = await pool.request()
            .input("numeroTarjeta", sql.Char, req.body.numero)
            .input("idTrans", sql.Int, req.body.titular)
            .query('INSERT INTO trans_echas (numeroTarjeta, idTrans) VALUES (@numeroTarjeta, @idTrans)');
            
        res.json({
            TransaccionId: resultTransaccion.recordset[0],
            TransEchas: resultTransEchas.recordset[0]
        });
    } catch (error) {
        await pool.request().rollbackTransaction();
        console.error('Error al crear la trasaccion: ', error);
        res.status(500).send("Error al crear la trasaccion.");
    }
};

export const getTransacciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("numero", sql.Char, req.params.numero)
            .query('SELECT T.monto, T.tipo, T.id from transacciones T INNER JOIN (SELECT * from trans_echas E INNER JOIN  tarjetas C ON E.numeroTarjeta = C.numero) A ON T.id = A.idTrans where A.numero = @numero;');
        res.json(result.recordset); 
    } catch (error) {
        await pool.request().rollbackTransaction();
        console.error('Error al conseguir transacciones de la tarjeta: ', error);
        res.status(500).send("Error al conseguir transacciones de la tarjeta.");
    }
};

export const autorizacionTarjeta = async (req, res) => {
    try {
        const { tarjeta, nombre, fecha_venc, num_seguridad, monto, tienda, formato } = req.query;
        var validar = true;
        const pool = await getConnection();
        const result = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .query('SELECT * FROM tarjetas WHERE numero = @numero;');

        const tarjetaInfo = result.recordset[0];

        if(nombre == tarjetaInfo.titular && fecha_venc == tarjetaInfo.fecha_venc && num_seguridad == tarjetaInfo.num_seguridad && (monto <= tarjetaInfo.monto_disponible)){
            if(formato == 1){

            } else if(formato == 0) {
                
            }
        } else {
            validar = false;
        }         
        res.json(result.recordset); 
    } catch (error) {
        await pool.request().rollbackTransaction();
        console.error('Datos de tarjeta incorrectos:', error);
        res.status(500).send("Datos de tarjeta incorrectos.");
    }
};