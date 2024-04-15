import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';


//RUTA PARA ALTA USUARIO
router.post('/usu', async (req, res) => {
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

//RUTA PARA ALTA TEMPERATURA
router.post('/temp', async (req, res) => {
    const temp = req.body.temp; // Accede al objeto JSON enviado en el cuerpo de la solicitud
    const idsensor = req.body.idsensor;
                try {                                   //UPDATE sensores SET valor = 10 WHERE fk_id_cuarto = 1 AND fk_id_señal = 1
                    const result = await itemsPool.query('UPDATE sensores SET valor = $1 where id_sensor = $2', [temp,idsensor]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al enviar señal:', error);
                    res.status(500).send('Error interno del servidor');
                }            
  });

//RUTA PARA ALTA HUMEDAD
  router.post('/hum', async (req, res) => {
    const hum = req.body.hum; // Accede al objeto JSON enviado en el cuerpo de la solicitud
    const idsensor = req.body.idsensor;
                try {                                   
                    const result = await itemsPool.query('UPDATE sensores SET valor = $1 where id_sensor = $2', [hum,idsensor]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al enviar señal:', error);
                    res.status(500).send('Error interno del servidor');
                }            
  });

//RUTA PARA CREAR ZONAS
router.post('/zona', async (req, res) => {
    const nombrezona = req.body.nombrezona; 
    const usu = req.body.usu;
    const idtipoedificio = req.body.idtipoedificio;
                
                try {  
                    const idusuario = await itemsPool.query('SELECT idusuario FROM usuarios WHERE usuario = ($1);', [usu]);                             
                    const result = await itemsPool.query('INSERT INTO zonas (nombrezona,fk_id_usuario,fk_id_tipoedificio) values ($1,$2,$3)', [nombrezona,idusuario.rows[0].idusuario,idtipoedificio]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al dar de alta la zona:', error);
                    res.status(500).send('Error interno del servidor al dar de alta la zona');
                }            
});

export default router;
