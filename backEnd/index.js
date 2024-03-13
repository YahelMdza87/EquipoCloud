import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from './config.js'
import pg from 'pg'

const app = express();
const pool = new pg.Pool({
    host: 'dpg-cnoi2gacn0vc73bh8k20-a.oregon-postgres.render.com',
    database: 'domoticloud',
    user: 'admin',
    password: 'yuM7EwcKsPHI27gB536RselFhrPe46pL',
    port: 5432
})

app.use(cors({
    origin: FRONTEND_URL
}))

app.get('/users', async(req, res) => {
    
    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.send({
        pong: result.rows[0].now,
    });
});

app.listen(3000, () => {
    console.log('server started')
});