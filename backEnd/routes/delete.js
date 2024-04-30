import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';

//RUTA PARA ELIMINAR UN SENSOR
router.delete('/sensor', async (req, res) => {
    const idsensor = req.body.idsensor; 
                try {                       
                    const result = await itemsPool.query('DELETE from sensores where id_sensor = $1',[idsensor]);
                    res.status(200).json({"messsage":"Sensor eliminado con exito"});
                } catch (error) {
                    console.error('Error al eliminar el sensor:', error);
                    res.status(500).send('Error interno del servidor al eliminar el sensor');
                }   
});

//RUTA PARA ELIMINAR UN CUARTO
router.delete('/cuarto', async (req, res) => {
    const idcuarto = req.body.idcuarto; 
                try {                       
                    const result = await itemsPool.query('DELETE from cuartos where id_cuarto = $1',[idcuarto]);
                    res.status(200).json({"messsage":"Cuarto eliminado con exito"});
                } catch (error) {
                    console.error('Error al eliminar el sensor:', error);
                    res.status(500).send('Error interno del servidor al eliminar el cuarto');
                }   
});

//RUTA PARA ELIMINAR UNA ZONA
router.delete('/zona', async (req, res) => {
    const idzona = req.body.idzona; 
                try {                       
                    const result = await itemsPool.query('DELETE from zonas where id_zona = $1',[idzona]);
                    res.status(200).json({"messsage":"Zona eliminada con exito"});
                } catch (error) {
                    console.error('Error al eliminar la zona:', error);
                    res.status(500).send('Error interno del servidor al eliminar la zona');
                }   
});

//RUTA PARA ELIMINAR COLABORADORES
router.delete('/colaborador', async (req, res) => {
    const idcolab = req.body.idcolab; 
                try {                       
                    const result = await itemsPool.query('DELETE from colaboradores where id_colaborador = $1',[idcolab]);
                    res.status(200).json({"messsage":"colaborador eliminado con exito"});
                } catch (error) {
                    console.error('Error al eliminar el colaborador:', error);
                    res.status(500).send('Error interno del servidor al eliminar el colaborador');
                }   
});

//RUTA PARA ELIMINAR COLABORADORES
router.delete('/comunidad', async (req, res) => {
    const idcomu = req.body.idcomu; 
                try {                       
                    const result = await itemsPool.query('DELETE from comunidades where id_comunidad = $1',[idcomu]);
                    res.status(200).json({"messsage":"comunidad eliminada con exito"});
                } catch (error) {
                    console.error('Error al eliminar la comunidad:', error);
                    res.status(500).send('Error interno del servidor al eliminar la comunidad');
                }   
});

export default router;
