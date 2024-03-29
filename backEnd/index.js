import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from './config.js'
import { POSTGRE_URL } from './config.js'
import pg from 'pg'

const app = express();
app.use(express.json());

//CONEXIÓN A BASE DE DATOS
const itemsPool = new pg.Pool({
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

//Ruta que obtiene estatus de la base de datos
app.get('/users', async(req, res) => {
    const result = await itemsPool.query('SELECT NOW()')
    console.log(result)
    res.send({
        pong: result.rows[0].now,
    });
});

//Ruta que da de alta la entrada de un usuario
app.post('/usu', async (req, res) => {
    const usu = req.body.usu; 
    const correo = req.body.correo; 
    
    try {
        const correoQuery = await itemsPool.query('SELECT correo FROM usuarios WHERE correo = ($1);', [correo]);
            if (correoQuery.rows.length === 0) {
                try {
                    const result = await itemsPool.query('INSERT INTO usuarios (usuario,correo) VALUES ($1,$2)', [usu,correo]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al insertar usuario:', error);
                    res.status(500).send('Error interno del servidor');
                }            
        } else {
            res.status(200).json({});
        }

    } catch (error) {
        console.error('Error al buscar usuario', error);
        res.status(500).send('Error interno del servidor');
    }
});


//Ruta que manda la temperatura de un usuario
app.post('/stemp', (req, res) => {
    const temp = req.body.temp; // Accede al objeto JSON enviado en el cuerpo de la solicitud
    res.send(`La temperatura es ${temp}`);
  });

//Ruta que obtiene el usuario y su peticion de señal
app.get('/gsignal', (req, res) => {
    const usu = req.body.usu; // Accede al objeto JSON enviado en el cuerpo de la solicitud
    const signal = req.body.signal
    console.log("Entre");
    res.send(`Tu usuario es ${usu} y tu señal es ${signal}`);
});

//Ruta para obtener los usuarios registrados
app.get('/usuarios', async (req, res) => {
    try {
        const result = await itemsPool.query('SELECT * FROM usuarios');
        console.log('Usuarios obtenidos:', result.rows); // Log the result for debugging
        res.send(result.rows); // Envía solo los datos de los usuarios
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

//Ruta que obtiene el número de usuarios
app.get('/numusu', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(correo) from usuarios;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

// app.get('/gtemp/:temp', (req, res) => {
//     const temp = req.params.temp;
//     res.send(`La temperatura es ${temp}`);
// });

app.listen(3000, () => {
    console.log('server started')
});