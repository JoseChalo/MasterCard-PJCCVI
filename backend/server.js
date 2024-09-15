const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const dbConfig = {
  user: 'pjCCVI',
  password: 'pjccvi',
  server: 'localhost',
  database: 'pjCCVI',
  options: {
    encrypt: false,
    trustServerCertificate: true // certificados SSL
  }
};

sql.connect(dbConfig, err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a SQL Server');
  }
});

// Ruta para obtener datos
app.get('/items', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM tarjetas');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para agregar un nuevo ítem
app.post('/items', async (req, res) => {
  const { name } = req.body;
  try {
    //await sql.query`INSERT INTO Items (name) VALUES (${name})`;
    res.status(201).json({ message: 'Ítem creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el ítem' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
