import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';

//RUTA PARA ELIMINAR UN SENSOR
router.delete('/sensor', async (req, res) => {
    try{
    const idsensor = req.body.idsensor; 
        if (idsensor.trim() === "") {
            res.status(200).json({"messsage":"Sensor no valido"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('DELETE from sensores where id_sensor = $1',[idsensor]);
                    res.status(200).json({"messsage":"Sensor eliminado con exito"});
                } catch (error) {
                    console.error('Error al eliminar el sensor:', error);
                    res.status(500).json({"message":"Error interno del servidor al eliminar el sensor"});
                } 
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }   
});

//RUTA PARA ELIMINAR UN CUARTO
router.delete('/cuarto', async (req, res) => {
    try{
    const idcuarto = req.body.idcuarto; 
        if (idcuarto.trim() === "") {
            res.status(200).json({"messsage":"Cuarto no valido"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('DELETE from cuartos where id_cuarto = $1',[idcuarto]);
                    res.status(200).json({"messsage":"Cuarto eliminado con exito"});
                } catch (error) {
                    console.error('Error al eliminar el sensor:', error);
                    res.status(500).json({"message":"Error interno del servidor al eliminar el cuarto"});
                } 
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }   
});

//RUTA PARA ELIMINAR UNA ZONA
router.delete('/zona', async (req, res) => {
    try{
    const idzona = req.body.idzona; 
        if (idzona.trim() === "") {
            res.status(200).json({"messsage":"Zona no valida"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('DELETE from zonas where id_zona = $1',[idzona]);
                    res.status(200).json({"messsage":"Zona eliminada con exito"});
                } catch (error) {
                    console.error('Error al eliminar la zona:', error);
                    res.status(500).send('Error interno del servidor al eliminar la zona');
                } 
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }    
});

//RUTA PARA ELIMINAR COLABORADORES
router.delete('/colaborador', async (req, res) => {
    try{
    const idcolab = req.body.idcolab;
        if (idcolab.trim() === "") {
            res.status(200).json({"messsage":"Colaborador no valido"});
            return;
        } else { 
                try {                       
                    const result = await itemsPool.query('DELETE from colaboradores where id_colaborador = $1',[idcolab]);
                    res.status(200).json({"messsage":"colaborador eliminado con exito"});
                } catch (error) {
                    console.error('Error al eliminar el colaborador:', error);
                    res.status(500).json({"message":"Error interno del servidor al eliminar el colaborador"});
                }   
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }    
});

//RUTA PARA ELIMINAR COMUNIDAD
router.delete('/comunidad', async (req, res) => {
    try{
    const idcomu = req.body.idcomu; 
        if (idcomu.trim() === "") {
            res.status(200).json({"messsage":"Comunidad no valida"});
            return;
        } else { 
                try {                       
                    const result = await itemsPool.query('DELETE from comunidades where id_comunidad = $1',[idcomu]);
                    res.status(200).json({"messsage":"comunidad eliminada con exito"});
                } catch (error) {
                    console.error('Error al eliminar la comunidad:', error);
                    res.status(500).json({"message":"Error interno del servidor al eliminar la comunidad"});
                } 
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }      
});

export default router;
