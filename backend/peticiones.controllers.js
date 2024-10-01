import {
    getConnection
} from "./database/connection.js"
import sql from 'mssql'

export const getTarjetas = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().input("numero", sql.Char, req.params.numero).query('SELECT * FROM tarjetas WHERE numero = @numero');
    //console.log(result);
    res.json(result.recordset);
};

export const createUser = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("gmail", sql.VARCHAR, req.body.gmail)
        .input("contra", sql.VARCHAR, req.body.contra)
        .input("nombre", sql.VARCHAR, req.body.nombre)
        .query('INSERT INTO users (gmail, contra, nombre) VALUES (@gmail, @contra, @nombre)');
    //console.log(result);
    res.json(result.recordset);
};

export const createTarjeta = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input("gmail", sql.VARCHAR, req.body.gmail)
        .input("contra", sql.VARCHAR, req.body.contra)
        .input("nombre", sql.VARCHAR, req.body.nombre)
        .query('INSERT INTO users (gmail, contra, nombre) VALUES (@gmail, @contra, @nombre)');
    console.log(result.recordset);
    res.send("Tarjeta Creada");
};