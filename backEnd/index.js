import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from './config.js'
import { POSTGRE_URL } from './config.js'
import pg from 'pg'

const app = express();
app.use(express.json());

//CONEXIÓN A BASE DE DATOS
export const itemsPool = new pg.Pool({
    connectionString: POSTGRE_URL,
    ssl: {  
        rejectUnauthorized: false
    }
});

//Puerto que permite hacer conexiones web entre distintos sitios
app.use(cors(
    // {origin: '*'}
    {origin: FRONTEND_URL}
))

//RUTAS POR SUBCARPETAS
import searchesRouter from './routes/searches.js';
app.use('/searches', searchesRouter);

import addRouter from './routes/add.js';
app.use('/add', addRouter);

import changesRouter from './routes/changes.js';
app.use('/changes', changesRouter);

import deleteRouter from './routes/delete.js';
app.use('/delete', deleteRouter);

app.listen(3000, () => {
    console.log('server started')
});