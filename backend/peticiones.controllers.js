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
        const gmailExist = await pool.request()
            .input("gmail", sql.VarChar, req.body.gmail)
            .query('SELECT * FROM users WHERE gmail = @gmail');

        const tarjetaExist = await pool.request()
            .input("numero", sql.VarChar, req.body.numero)
            .query('SELECT * FROM tarjetas WHERE numero = @numero');

        // Si ya existe el gmail
        if (gmailExist.recordset.length > 0) {
            return res.status(409).json({
                message: "El correo ya está registrado."
            });
        }
        // Si ya existe la tarjeta
        if (tarjetaExist.recordset.length > 0) {
            return res.status(409).json({
                message: "El número de tarjeta ya está registrado."
            });
        }

        // Crear el usuario
        const resultUser = await pool.request()
            .input("gmail", sql.VarChar, req.body.gmail)
            .input("contra", sql.VarChar, req.body.contra)
            .input("nombre", sql.VarChar, req.body.nombre)
            .query('INSERT INTO users (gmail, contra, nombre) VALUES (@gmail, @contra, @nombre)');

        // Crear la tarjeta
        const resultTarjeta = await pool.request()
            .input("numero", sql.Char, req.body.numero)
            .input("titular", sql.Char, req.body.titular)
            .input("tipo", sql.Char, req.body.tipo)
            .input("fecha_venc", sql.Date, req.body.fecha_venc)
            .input("num_seguridad", sql.Char, req.body.num_seguridad)
            .input("monto_autorizado", sql.Numeric, req.body.monto_autorizado)
            .input("monto_disponible", sql.Numeric, req.body.monto_disponible)
            .query('INSERT INTO tarjetas (numero, titular, tipo, fecha_venc, num_seguridad, monto_autorizado, monto_disponible) VALUES (@numero, @titular, @tipo, @fecha_venc, @num_seguridad, @monto_autorizado, @monto_disponible)');

        // Asociar la tarjeta con el usuario
        const resultCardsUser = await pool.request()
            .input("numeroTarjeta", sql.Char, req.body.numero)
            .input("idUser", sql.VarChar, req.body.gmail)
            .query('INSERT INTO cardsUser (numeroTarjeta, idUser) VALUES (@numeroTarjeta, @idUser)');

        // Devolver respuesta exitosa
        res.status(201).json({
            message: "Usuario y tarjeta creados exitosamente.",
            userId: req.body.gmail,
            tarjetaId: req.body.numero
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

        if (result.recordset.length > 0) {
            return res.json(result.recordset);
        } else {
            return res.status(400).send('Usuario no encontrado.');
        }
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
        const {
            tarjeta,
            nombre,
            fecha_venc,
            num_seguridad,
            monto,
            tienda,
            formato
        } = req.query;
        const pool = await getConnection();
        const result = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .query('SELECT * FROM tarjetas WHERE numero = @numero;');
        const fechaFormat = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .query("SELECT FORMAT(fecha_venc, 'yyyy-MM') AS fecha_venc FROM tarjetas WHERE numero = @numero;");

        const tarjetaInfo = result.recordset[0];

        if ((result.recordset.length <= 0) ||
            (nombre.trim() !== tarjetaInfo.titular.trim()) ||
            (fecha_venc >= fechaFormat.recordset[0].fecha_venc) ||
            (num_seguridad.trim() !== tarjetaInfo.num_seguridad.trim()) ||
            (monto > tarjetaInfo.monto_disponible)) {
            console.log('Parametros incorrectos.');
            return res.json({
                "autorización": {
                    "emisor": "MasterCard",
                    "tarjeta": nombre,
                    "status": 0,
                    "numero": tarjeta
                }
            });
        }

        const resultCambioMonto = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .input("monto", sql.Numeric, monto)
            .query('UPDATE tarjetas SET monto_disponible = monto_disponible - @monto WHERE numero = @numero;');
        const insertTransacciones = await pool.request()
            .input("monto", sql.Numeric, monto)
            .input("proveniente", sql.VarChar, tienda)
            .query("INSERT INTO transacciones (monto, proveniente, tipo) VALUES (@monto, @proveniente, 'consumo'); SELECT SCOPE_IDENTITY() AS id;");
        const insertTrans_echas = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .input("idTrans", sql.Int, insertTransacciones.recordset[0].id)
            .query('INSERT INTO trans_echas (numeroTarjeta, idTrans) VALUES (@numero, @idTrans);');
        

        if (formato == 'json') {
            console.log("Pago echo exitosamente. ");
            return res.json({
                "autorización": {
                    "emisor": "MasterCard",
                    "tarjeta": tarjetaInfo.titular.trim(),
                    "status": 1,
                    "numero": tarjetaInfo.numero.trim()
                }
            });
        } else if (formato == 'xml') {
            console.log("Pago echo exitosamente. ");
            const xmlResponse = `
                <autorizacion>
                    <emisor>MasterCard</emisor>
                    <tarjeta>${tarjetaInfo.titular.trim()}</tarjeta>
                    <status>1</status>
                    <numero>${tarjetaInfo.numero.trim()}</numero>
                </autorizacion>
            `;
            res.set('Content-Type', 'application/xml');
            return res.send(xmlResponse);
        }
    } catch (error) {
        console.error('Error en la autorización de tarjeta: ', error);
        return res.status(500).send("Error en la autorización de tarjeta.");
    }
};