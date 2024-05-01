import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';

router.post('/idusu', async (req, res) => {
    try{
    const correo = req.body.correo; 
    try {
        const result = await itemsPool.query('SELECT * FROM usuarios where correo = ($1);', [correo]);
        res.send(result.rows); // Envía solo los datos de los usuarios
    } catch (error) {
        console.error('Error al obtener el id del usuarios', error);
        res.status(500).json({"message":"Error al obtener usuarios"});
    }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});


export default router;