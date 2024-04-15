import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';


//RUTA PARA OBTENER LOS TIPOS DE EDIFICIO
router.get('/tipoedificio', async (req,res) => {
    try {
        const result = await itemsPool.query('select * from tipoedificio;');
        res.send(result.rows);
    } catch (error) {
        console.error('Error al obtener tipos de edificios', error);
        res.status(500).send('Error al obtener los tipos de edificios disponibles');
    }
});

//RUTA PARA OBTENER LOS USUARIOS
router.get('/usuarios', async (req, res) => {
    try {
        const result = await itemsPool.query('SELECT * FROM usuarios');
        res.send(result.rows); // Envía solo los datos de los usuarios
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

//RUTA PARA OBTENER NÚMERO DE USUARIOS
router.get('/numusu', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(correo) from usuarios;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

router.post('/allsignals', async(req, res) => {
    const usu = req.body.usu; 
    try {                                   
        const result = await itemsPool.query('Select nombresensor, valor, señales.señal, cuartos.cuarto , zonas.nombrezona, usuarios.usuario FROM sensores      INNER JOIN señales ON sensores.fk_id_señal = señales.id_señal INNER JOIN cuartos ON sensores.fk_id_cuarto = cuartos.id_cuarto INNER JOIN zonas ON cuartos.fk_id_zona = zonas.id_zona INNER JOIN usuarios ON zonas.fk_id_usuario = usuarios.idusuario where usuarios.usuario = $1',[usu]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener señales:', error);
        res.status(500).send('Error al obtener señales');
    }  

});

export default router;
