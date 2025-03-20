import express from 'express';
import fs from 'fs';
import mysql from 'mysql2';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

const swaggerDocument = YAML.parse(fs.readFileSync('./user-api.yml', 'utf8'));

const db = mysql.createConnection({ host: "localhost", user: "root", database: "openapi", password: "" });
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
