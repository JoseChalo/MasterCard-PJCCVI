import sql from 'mssql';

const dbCredentials = {
    user: "PJCCVI",
    password: "pjccvi",
    server: "localhost",
    database: "pjCCVI",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}


export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbCredentials);
        return pool;
    } catch (error) {
        console.log(error, 'Error al conectar base de datos');
    }
};
