import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import peticionesRoutes from './peticiones.routes.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(peticionesRoutes);

const dbConfig = {
  user: 'pjCCVI',
  password: 'pjccvi',
  server: 'localhost',
  database: 'pjCCVI',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

sql.connect(dbConfig, err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a SQL Server');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});