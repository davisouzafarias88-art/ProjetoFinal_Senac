const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL conectado!');
});

// Importar rotas modulares
app.use('/api', routes(db));

app.listen(3000, () => console.log('API rodando na porta 3000'));
