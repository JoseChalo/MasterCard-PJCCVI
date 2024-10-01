import {
    getConnection
} from "./database/connection.js"
import sql from 'mssql'

export const getTarjetas = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("numero", sql.Char, req.params.numero)
        .query('SELECT * FROM tarjetas WHERE numero = @numero');
    res.json(result.recordset);
};

export const createUser = async (req, res) => {
    try {
        const pool = await getConnection();
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
        await pool.request().rollbackTransaction();
        console.error('Error al crear usuario y tarjeta:', error);
        res.status(500).send("Error al crear usuario y tarjeta.");
    }
};

export const getUser = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("gmail", sql.Char, req.params.gmail)
        .query('SELECT * FROM users WHERE gmail = @gmail');
    res.json(result.recordset);
};

export const createTarjeta = async (req, res) => {
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
    res.send("Tarjeta Creada");
};

export const createTransacciones = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("numero", sql.Char, req.body.numero)
        .input("titular", sql.Char, req.body.titular)
        .input("tipo", sql.Char, req.body.tipo)
        .input("fecha_venc", sql.Date, req.body.fecha_venc)
        .input("num_seguridad", sql.Char, req.body.num_seguridad)
        .input("monto_autorizado", sql.Numeric, req.body.monto_autorizado)
        .input("monto_disponible", sql.Numeric, req.body.monto_disponible)
        .query('INSERT INTO terjetas (numero, titular, tipo, fecha_venc, num_seguridad, monto_autorizado, monto_disponible) VALUES (@numero, @titular, @tipo, @fecha_venc, @num_seguridad, @monto_autorizado, @monto_disponible)');
    console.log(result.recordset);
    res.send("Tarjeta Creada");
};