import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';

//RUTA PARA EDITAR ZONAS
router.patch('/zona', async (req, res) => {
    const idzona = req.body.idzona; 
    const nuevazona = req.body.nuevazona; 
    const nuevoidedificio = req.body.nuevoidedificio;
                try {                       
                    const result = await itemsPool.query('UPDATE zonas SET nombrezona = $1, fk_id_tipoedificio = $2 WHERE id_zona = $3', [nuevazona,nuevoidedificio,idzona]);
                    res.status(200).json({"messsage":"Zona editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar la zona:', error);
                    res.status(500).send('Error interno del servidor al editar la zona');
                }   
});


//RUTA PARA EDITAR CUARTOS
router.patch('/cuarto', async (req, res) => {
    const idcuarto = req.body.idcuarto; 
    const nuevocuarto = req.body.nuevocuarto; 
                try {                       
                    const result = await itemsPool.query('UPDATE cuartos SET cuarto = $1 WHERE id_cuarto = $2', [nuevocuarto,idcuarto]);
                    res.status(200).json({"messsage":"Cuarto editado exitosamente"});
                } catch (error) {
                    console.error('Error al editar el cuarto:', error);
                    res.status(500).send('Error interno del servidor al editar el cuarto');
                }   
});

//RUTA PARA EDITAR SENSORES
router.patch('/sensor', async (req, res) => {
    const idsensor = req.body.idsensor;
    const idseñal = req.body.idseñal;  
    const nuevosensor = req.body.nuevosensor; 
                try {                       
                    const result = await itemsPool.query('UPDATE sensores SET nombresensor = $1, fk_id_señal = $2 WHERE id_sensor = $3', [nuevosensor,idseñal,idsensor]);
                    res.status(200).json({"messsage":"Sensor editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar el sensor:', error);
                    res.status(500).send('Error interno del servidor al editar el sensor');
                }   
});

//RUTA PARA EDITAR NOMBRE COMUNIDAD
router.patch('/comunidad', async (req, res) => {
    const idcomunidad = req.body.idcomunidad;
    const nuevacomunidad = req.body.nuevacomunidad;  
                try {                       
                    const result = await itemsPool.query('UPDATE comunidades SET nombrecomunidad = $1 WHERE id_comunidad = $2', [nuevacomunidad,idcomunidad]);
                    res.status(200).json({"messsage":"Comunidad editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar comunidad:', error);
                    res.status(500).send('Error interno del servidor al editar la comunidad');
                }   
});

//RUTA PARA EDITAR TIPO DE EDIFICIO
router.patch('/tipoedificio', async (req, res) => {
    const idedificio = req.body.idedificio;
    const nuevoedificio = req.body.nuevoedificio;  
                try {                       
                    const result = await itemsPool.query('UPDATE tipoedificio SET tipoedificio = $1 WHERE id_tipoedificio = $2', [nuevoedificio,idedificio]);
                    res.status(200).json({"messsage":"Tipo de edificio editado exitosamente"});
                } catch (error) {
                    console.error('Error al editar el tipo de edificio:', error);
                    res.status(500).send('Error interno del servidor al editar el tipo de edifcio');
                }   
});

//RUTA PARA EDITAR TIPO DE EDIFICIO
router.patch('/signal', async (req, res) => {
    const idseñal = req.body.idseñal;
    const nuevaseñal = req.body.nuevaseñal;  
                try {                       
                    const result = await itemsPool.query('UPDATE señales SET señal = $1 WHERE id_señal = $2', [nuevaseñal,idseñal]);
                    res.status(200).json({"messsage":"Señal editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar la señal:', error);
                    res.status(500).send('Error interno del servidor al editar la señal');
                }   
});

export default router;
