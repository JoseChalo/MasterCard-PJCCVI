import {
    getConnection
} from "./database/connection.js"
import sql from 'mssql'

export const getTarjetas = async (req, res) => {
    const { gmailUser } = req.params; // Usamos el correo del usuario
    try {
      const pool = await getConnection();
  
      // Realizamos la consulta que une las tablas 'users', 'cardsUser' y 'tarjetas'
      const result = await pool.request()
        .input('gmailUser', sql.VarChar, gmailUser)
        .query(`
          SELECT T.titular AS nombre, RIGHT(T.numero, 4) AS ultimosDigitos, 
          FORMAT(T.fecha_venc, 'yyyy-MM') AS fechaVencimiento, 
          T.monto_disponible, T.monto_autorizado, T.numero
          FROM tarjetas T
          INNER JOIN cardsUser CU ON T.numero = CU.numeroTarjeta
          INNER JOIN users U ON U.gmail = CU.idUser
          WHERE U.gmail = @gmailUser
        `);
  
      if (result.recordset.length > 0) {
        // Devolvemos la nueracion completa 
        const tarjetas = result.recordset.map(tarjeta => ({
          nombre: tarjeta.nombre,
          ultimosDigitos: tarjeta.ultimosDigitos,
          fechaVencimiento: tarjeta.fechaVencimiento,
          monto_disponible: tarjeta.monto_disponible,
          monto_autorizado: tarjeta.monto_autorizado,
          numero: tarjeta.numero
        }));
        res.json(tarjetas);
      } else {
        res.status(404).json({ message: 'No se encontraron tarjetas para este usuario.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tarjetas', error });
    }
  };

export const createUser = async (req, res) => {
    try {
        const pool = await getConnection();
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
            .input("monto_autorizado", sql.Decimal(14, 2), parseFloat(req.body.monto_autorizado).toFixed(2))
            .input("monto_disponible", sql.Decimal(14, 2), parseFloat(req.body.monto_disponible).toFixed(2))
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
            .input("gmailUser", sql.Char, req.params.gmailUser)
            .query('SELECT * FROM users WHERE gmail = @gmailUser');

        if (result.recordset.length > 0) {
            return res.json(result.recordset);
        } else {
            return res.status(400).send('Usuario no encontrado.');
        }
    } catch (error) {
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
            .input("monto_autorizado", sql.Decimal(14, 2), parseFloat(req.body.monto_autorizado).toFixed(2))
            .input("monto_disponible", sql.Decimal(14, 2), parseFloat(req.body.monto_disponible).toFixed(2))
            .query('INSERT INTO tarjetas (numero, titular, tipo, fecha_venc, num_seguridad, monto_autorizado, monto_disponible) VALUES (@numero, @titular, @tipo, @fecha_venc, @num_seguridad, @monto_autorizado, @monto_disponible)');
        res.json({
            tarjetaId: result.recordset[0]
        });
    } catch (error) {
        console.error('Error al crear tarjeta:', error);
        res.status(500).send("Error al crear tarjeta.");
    }
};


export const createTransacciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const resultTransaccion = await pool.request()
            .input("monto", sql.Decimal(14, 2), parseFloat(req.body.numero).toFixed(2))
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
        console.error('Error al crear la trasaccion: ', error);
        res.status(500).send("Error al crear la trasaccion.");
    }
};

export const getTransacciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("numeroTarjeta", sql.Char, req.params.numeroTarjeta)
            .query(`SELECT T.monto, T.tipo, T.id, T.proveniente, FORMAT( fecha, 'yyyy-MM-dd') AS fecha
                from transacciones T INNER JOIN 
                (SELECT * from trans_echas E INNER JOIN  tarjetas C ON E.numeroTarjeta = C.numero) A 
                ON T.id = A.idTrans where A.numero = @numeroTarjeta;`);
        res.json(result.recordset);
    } catch (error) {
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

        // Normalizar la fecha para tener siempre el formato 'YYYY-MM'
        const normalizarFecha = (fecha) => {
            // Verifica si la fecha está en formato 'yyyyMM'
            const regexYYYYMM = /^\d{4}(0[1-9]|1[0-2])$/;
            if (regexYYYYMM.test(fecha)) {
                return `${fecha.slice(0, 4)}-${fecha.slice(4, 6)}`;
            }
        
            // Intenta parsear la fecha normal
            const partes = fecha.split('-'); // Divide la fecha en año y mes
            const year = parseInt(partes[0], 10);
            const month = parseInt(partes[1], 10) - 1; // Resta 1 al mes
        
            // Crea un nuevo objeto Date con año y mes ajustados
            const parsedDate = new Date(year, month);
            if (isNaN(parsedDate.getTime())) {
                return null; // Si la fecha no es válida, retorna null
            }
        
            return `${year}-${('0' + (parsedDate.getMonth() + 1)).slice(-2)}`; // Devuelve en formato 'YYYY-MM'
        };
        

        const fecha_venc_normalizada = normalizarFecha(fecha_venc);
        if (!fecha_venc_normalizada) {
            console.log('Fecha inválida');
            return res.status(400).json({ error: "Fecha inválida" });
        }

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
            (fecha_venc_normalizada !== fechaFormat.recordset[0].fecha_venc) ||
            (num_seguridad.trim() !== tarjetaInfo.num_seguridad.trim()) ||
            (monto > tarjetaInfo.monto_disponible)) {
            console.log('Transacción rechazada.');
            return res.json({
                "autorización": {
                    "emisor": "MasterCard",
                    "tarjeta": tarjetaInfo.numero.trim(),
                    "status": 0,
                    "numero": 0
                }
            });
        }

        const hoy = new Date();
        const fechaISO = hoy.toISOString().split('T')[0];
        const montoRecibido = parseFloat(req.query.monto).toFixed(2);

        const resultCambioMonto = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .input("monto", sql.Decimal(14, 2), montoRecibido)
            .query('UPDATE tarjetas SET monto_disponible = CAST(monto_disponible AS DECIMAL(14, 2)) - CAST(@monto AS DECIMAL(14, 2)) WHERE numero = @numero;');

        const insertTransacciones = await pool.request()
            .input("monto", sql.Decimal(14, 2), monto)
            .input("proveniente", sql.VarChar, tienda)
            .input("fecha", sql.Date, fechaISO)
            .query("INSERT INTO transacciones (monto, proveniente, tipo, fecha) VALUES (@monto, @proveniente, 'consumo', @fecha); SELECT SCOPE_IDENTITY() AS id;");

        const insertTrans_echas = await pool.request()
            .input("numero", sql.Char, tarjeta)
            .input("idTrans", sql.Int, insertTransacciones.recordset[0].id)
            .query('INSERT INTO trans_echas (numeroTarjeta, idTrans) VALUES (@numero, @idTrans);');

        if (formato == 'json' || formato == 'JSON') {
            console.log("Pago realizado exitosamente.");
            return res.json({
                "autorización": {
                    "emisor": "MasterCard",
                    "tarjeta": tarjetaInfo.numero.trim(),
                    "status": 1,
                    "numero": insertTransacciones.recordset[0].id
                }
            });
        } else if (formato == 'xml' || formato == 'XML') {
            console.log("Pago realizado exitosamente.");
            const xmlResponse = `
                <autorizacion>
                    <emisor>MasterCard</emisor>
                    <tarjeta>${tarjetaInfo.numero.trim()}</tarjeta>
                    <status>1</status>
                    <numero>${insertTransacciones.recordset[0].id}</numero>
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


export const pagar = async (req, res) => {
    try {
        const pool = await getConnection();
        const hoy = new Date();
        const fechaISO = hoy.toISOString().split('T')[0];

        const tarjeta = await pool.request()
        .input("numero", sql.Char, req.body.numero)
        .query('SELECT * FROM tarjetas WHERE numero = @numero');

        if(tarjeta.recordset[0].monto_autorizado < (tarjeta.recordset[0].monto_disponible + req.body.monto)){
            return res.json({
                Mensaje: 'No se pudo realizar el pago. El monto ingresado sobrepasa al monto autorizado'
            });
        }

        const aumentarMonto = await pool.request()
            .input("numero", sql.Char, req.body.numero)
            .input("monto", sql.Decimal(14, 2), parseFloat(req.body.monto).toFixed(2))
            .query('UPDATE tarjetas SET monto_disponible = monto_disponible + @monto WHERE numero = @numero;');
        const insertTransacciones = await pool.request()
            .input("monto", sql.Decimal(14, 2), parseFloat(req.body.monto).toFixed(2))
            .input("fecha", sql.Date, fechaISO)
            .query("INSERT INTO transacciones (monto, proveniente, tipo, fecha) VALUES (@monto, 'Banco', 'pago', @fecha); SELECT SCOPE_IDENTITY() AS id;");
        const insertTrans_echas = await pool.request()
            .input("numero", sql.Char, req.body.numero)
            .input("idTrans", sql.Int, insertTransacciones.recordset[0].id)
            .query('INSERT INTO trans_echas (numeroTarjeta, idTrans) VALUES (@numero, @idTrans);');

        console.log('Tarjeta Pagada');
        res.json({
            Mensaje: 'Tarjeta Pagada'
        });
    } catch (error) {
        console.error('Error al realizar el pago: ', error);
        res.status(500).send("Error al realizar el pago.");
    }
};