import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from './config.js'
import pg from 'pg'

const app = express();
const itemsPool = new pg.Pool({
    connectionString: 'postgres://admin:yuM7EwcKsPHI27gB536RselFhrPe46pL@dpg-cnoi2gacn0vc73bh8k20-a.oregon-postgres.render.com/domoticloud',
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors({
    origin: FRONTEND_URL
}))

app.get('/users', async(req, res) => {
    
    const result = await itemsPool.query('SELECT NOW()')
    console.log(result)
    res.send({
        pong: result.rows[0].now,
    });
});

app.post('/stemp/:temp', (req, res) => {
    const temp = req.params.temp;
    const data = req.body; // Accede al objeto JSON enviado en el cuerpo de la solicitud
    console.log(data);
    res.send(`La temperatura es ${temp}`);
  });

app.get('/gtemp', (req, res) => {
    res.send(`La temperatura es ${temp}`);
});

app.listen(3000, () => {
    console.log('server started')
});