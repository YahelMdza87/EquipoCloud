import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';

//RUTA PARA EDITAR USUARIO
router.patch('/usuario', async (req, res) => {
    try{
        const idusuario = req.body.idusuario; 
        const usuario = req.body.usuario; 
        const pass = req.body.pass; 
        const nombre = req.body.nombre; 
        const correo = req.body.correo; 
        const cargo = req.body.cargo; 
            if (correo.trim() === "" || pass.trim() === "") {
                res.status(200).json({"messsage":"Tu usuario, correo  o contraseña no puede estar vacio"});
                return;
            } else {
                try {                       
                    const result = await itemsPool.query('UPDATE usuarios SET usuario = $1, correo = $2, nombre = $3, cargo = $4, pass = $5 WHERE idusuario = $6', [usuario,correo,nombre,cargo,pass,idusuario]);
                    res.status(200).json({"messsage":"Usuario editado exitosamente"});
                } catch (error) {
                    console.error('Error al editar el usuario:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar el usuario"});
                }   
            }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});

//RUTA PARA EDITAR ZONAS
router.patch('/zona', async (req, res) => {
    try{
    const idzona = req.body.idzona; 
    const nuevazona = req.body.nuevazona; 
    const nuevoidedificio = req.body.nuevoidedificio;
        if (nuevazona.trim() === "" || nuevoidedificio.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de zona o tipo de edificio no puede estar vacio"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('UPDATE zonas SET nombrezona = $1, fk_id_tipoedificio = $2 WHERE id_zona = $3', [nuevazona,nuevoidedificio,idzona]);
                    res.status(200).json({"messsage":"Zona editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar la zona:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar la zona"});
                }
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }   
});


//RUTA PARA EDITAR CUARTOS
router.patch('/cuarto', async (req, res) => {
    try{
    const idcuarto = req.body.idcuarto; 
    const nuevocuarto = req.body.nuevocuarto; 
        if (nuevocuarto.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de cuarto no puede estar vacio"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('UPDATE cuartos SET cuarto = $1 WHERE id_cuarto = $2', [nuevocuarto,idcuarto]);
                    res.status(200).json({"messsage":"Cuarto editado exitosamente"});
                } catch (error) {
                    console.error('Error al editar el cuarto:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar el cuarto"});
                }   
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }                  
});

//RUTA PARA EDITAR SENSORES
router.patch('/sensor', async (req, res) => {
    try{
    const idsensor = req.body.idsensor;
    const idseñal = req.body.idseñal;  
    const nuevosensor = req.body.nuevosensor; 
        if (idseñal.trim() === "" || nuevosensor.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de senor o tipo de señal no puede estar vacio"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('UPDATE sensores SET nombresensor = $1, fk_id_señal = $2 WHERE id_sensor = $3', [nuevosensor,idseñal,idsensor]);
                    res.status(200).json({"messsage":"Sensor editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar el sensor:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar el sensor"});
                }   
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }    
});

//RUTA PARA EDITAR NOMBRE COMUNIDAD
router.patch('/comunidad', async (req, res) => {
    try{
    const idcomunidad = req.body.idcomunidad;
    const nuevacomunidad = req.body.nuevacomunidad;  
        if (nuevacomunidad.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de comunidad no puede estar vacio"});
            return;
        } else {
                try {                       
                    const result = await itemsPool.query('UPDATE comunidades SET nombrecomunidad = $1 WHERE id_comunidad = $2', [nuevacomunidad,idcomunidad]);
                    res.status(200).json({"messsage":"Comunidad editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar comunidad:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar la comunidad"});
                }   
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }  
});

//RUTA PARA EDITAR TIPO DE EDIFICIO
router.patch('/tipoedificio', async (req, res) => {
    try{
    const idedificio = req.body.idedificio;
    const nuevoedificio = req.body.nuevoedificio; 
        if (nuevoedificio.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de tipo de edificio no puede estar vacio"});
            return;
        } else { 
                try {                       
                    const result = await itemsPool.query('UPDATE tipoedificio SET tipoedificio = $1 WHERE id_tipoedificio = $2', [nuevoedificio,idedificio]);
                    res.status(200).json({"messsage":"Tipo de edificio editado exitosamente"});
                } catch (error) {
                    console.error('Error al editar el tipo de edificio:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar el tipo de edifcio"});
                }   
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }  
});

//RUTA PARA EDITAR TIPO DE EDIFICIO
router.patch('/signal', async (req, res) => {
    try{
    const idseñal = req.body.idseñal;
    const nuevaseñal = req.body.nuevaseñal;  
        if (nuevaseñal.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de señal no puede estar vacio"});
            return;
        } else { 
                try {                       
                    const result = await itemsPool.query('UPDATE señales SET señal = $1 WHERE id_señal = $2', [nuevaseñal,idseñal]);
                    res.status(200).json({"messsage":"Señal editada exitosamente"});
                } catch (error) {
                    console.error('Error al editar la señal:', error);
                    res.status(500).json({"message":"Error interno del servidor al editar la señal"});
                }  
        } 
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }  
});

export default router;
