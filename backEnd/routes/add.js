import express from 'express';
const router = express.Router();
import { itemsPool } from '../index.js';


//RUTA PARA ALTA USUARIO
router.post('/usu', async (req, res) => {
    try{
        const usu = req.body.usu; 
        const correo = req.body.correo;  
        const nombre = req.body.nombre;  
        const cargo = req.body.cargo;  
        const pass = req.body.pass;  
        //validacion de correo y usuario no vacios
        if (usu.trim() === "" || correo.trim() === "" || pass.trim() === "") {
            res.status(200).json({"messsage":"Tu usuario, correo  o contraseña no puede estar vacio"});
            return;
        } else {

                    //validacion de correo valido
                    const validaciondecorreo = /\S+@\S+\.com/;
                    if (validaciondecorreo.test(correo)) {
                        
                    } else {
                        res.status(200).json({"messsage":"Tu correo no es valido "});
                        return;
                    }

            try {
                const correoQuery = await itemsPool.query('SELECT correo FROM usuarios WHERE correo = ($1);', [correo]);
                if (correoQuery.rows.length === 0) {
                    try {
                        const result = await itemsPool.query('INSERT INTO usuarios (usuario,correo,nombre,cargo,contraseña) VALUES ($1,$2,$3,$4,$5)', [usu,correo,nombre,cargo,pass]);
                        res.status(200).json({"messsage":"Usuario dado de alta con exito"});
                        return;
                    } catch (error) {
                        console.error('Error al insertar usuario:', error);
                        res.status(500).json({"message":"Error interno del servidor al insertar usuario, verifica los datos"});
                        return;
                    }            
                } else {
                    res.status(200).json({"mensaje": "El correo ya esta registrado a un usuario, ingrese otro"});
                    return;
                }
                
            } catch (error) {
                console.error('Error interno del servidor', error);
                res.status(500).json({"message":"Error interno del servidor al dar alta usuario, verifica los datos"});
            }
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});
    
    //RUTA PARA ALTA TEMPERATURA
    router.post('/temphum', async (req, res) => {
    try{
        const idsensortemp = req.body.idsensortemp;
        const temp = req.body.temp; 
        const idsensorhum = req.body.idsensorhum;
        const hum = req.body.hum; 
                    try {                                   
                        const query1 = await itemsPool.query('UPDATE sensores SET valor = $1 where id_sensor = $2', [temp,idsensortemp]);
                        const query2 = await itemsPool.query('UPDATE sensores SET valor = $1 where id_sensor = $2', [hum,idsensorhum]);
                        res.status(200).json({});
                    } catch (error) {
                        console.error('Error al enviar señal:', error);
                        res.status(500).json({"message":"Error interno del servidor, los datos no son validos"});
                    }            
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
  });


//RUTA PARA CREAR ZONAS
router.post('/zona', async (req, res) => {
    try{
    const nombrezona = req.body.nombrezona; 
    const idusu = req.body.idusu;
    const idtipoedificio = req.body.idtipoedificio;

        if (nombrezona.trim() === "" || idusu.trim() === ""  || idtipoedificio.trim() === "") {
            res.status(200).json({"messsage":"Tu zona, usuario o tipo de edificio no puede estar vacio"});
            return;
        } else {
                    try {  
                        const result = await itemsPool.query('INSERT INTO zonas (nombrezona,fk_id_usuario,fk_id_tipoedificio) values ($1,$2,$3)', [nombrezona,idusu,idtipoedificio]);
                        res.status(200).json({"messsage":"Zona añadida con exito"});
                    } catch (error) {
                        console.error('Error al dar de alta la zona:', error);
                        res.status(500).json({"message":"Error interno del servidor al dar de alta la zona, verifica tus datos"});
                    }  
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});

//RUTA PARA CREAR CUARTOS
router.post('/cuarto', async (req, res) => {
    try{
        const idzona = req.body.idzona; 
        const nombrecuarto = req.body.nombrecuarto;
        if (idzona.trim() === "" || nombrecuarto.trim() === "") {
            res.status(200).json({"messsage":"Tu zona o nombre de cuarto no puede estar vacio"});
            return;
        } else {
                    try {                               
                        const result = await itemsPool.query('INSERT INTO cuartos (cuarto,fk_id_zona) values ($1,$2)', [nombrecuarto,idzona]);
                        res.status(200).json({"messsage":"Cuarto añadido con exito"});
                    } catch (error) {
                        console.error('Error al dar de alta el cuarto:', error);
                        res.status(500).json({"message":"Error interno del servidor al dar de alta el cuarto, verifica tus datos"});
                    }  
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});


//RUTA PARA CREAR SENSOR
router.post('/sensor', async (req, res) => {
    try{
        const idcuarto = req.body.idcuarto; 
        const nombresensor = req.body.nombresensor;
        const idseñal = req.body.idseñal; 
        const valor = 0

        if (idcuarto.trim() === "" || nombresensor.trim() === "" || idseñal.trim() === "") {
            res.status(200).json({"messsage":"Tu zona o nombre de cuarto no puede estar vacio"});
            return;
        } else {
                    try {  
                        const result = await itemsPool.query('INSERT INTO sensores (nombresensor,valor,fk_id_cuarto,fk_id_señal) values ($1,$2,$3,$4) RETURNING id_sensor', [nombresensor,valor,idcuarto,idseñal]);            
                        res.status(200).json(result.rows[0].id_sensor);
                    } catch (error) {
                        console.error('Error al dar de alta el sensor:', error);
                        res.status(500).json({"message":"Error interno del servidor al dar de alta el sensor, verifica tus datos"});
                    }     
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});

//RUTA PARA DAR DE ALTA TIPODEEDIFICIO
router.post('/tipoedificio', async (req, res) => {
    try{
        const nombreedificio = req.body.nombreedificio; 
        if (nombreedificio.trim() === "") {
            res.status(200).json({"messsage":"Tu nombre de edificio no puede estar vacio"});
            return;
        } else {
                    try {  
                        const result = await itemsPool.query('INSERT INTO tipoedificio (tipoedificio) values ($1) RETURNING id_tipoedificio', [nombreedificio]);
                        res.status(200).json(result.rows[0].id_tipoedificio);
                    } catch (error) {
                        console.error('Error al dar de alta el tipo de edificio:', error);
                        res.status(500).json({"message":"Error interno del servidor al dar de alta el tipo de edificio, verifica tus datos"});
                    } 
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});

//RUTA PARA DAR DE ALTA SEÑAL
router.post('/signal', async (req, res) => {
        try{
        const nombreseñal = req.body.nombreseñal; 
            if (nombreseñal.trim() === "") {
                res.status(200).json({"messsage":"Tu nombre de señal no puede estar vacio"});
                return;
            } else {
                    try {  
                        const result = await itemsPool.query('INSERT INTO señales (señal) values ($1) RETURNING id_señal', [nombreseñal]);
                        res.status(200).json(result.rows[0].id_señal);
                    } catch (error) {
                        console.error('Error al dar de alta la señal:', error);
                        res.status(500).json({"message":"Error interno del servidor al dar de alta la señal, verifica tus datos"});
                    }    
            }
        }catch(error){
            res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
        }
});

//RUTA PARA DAR DE ALTA COMUNIDADES
router.post('/comunidad', async (req, res) => {
    try{
    const nombrecomunidad = req.body.nombrecomunidad; 
    const idusuadmicom = req.body.idusuadmicom;
        if (nombrecomunidad.trim() === "" || idusuadmicom.trim() === "") {
            res.status(200).json({"messsage":"Tu usuario administrador de la comunidad o comunidad no puede estar vacio"});
            return;
        } else {
                try {  
                    const result = await itemsPool.query('INSERT INTO comunidades (nombrecomunidad,fk_id_usuario) values ($1,$2)', [nombrecomunidad,idusuadmicom]);
                    res.status(200).json({"messsage":"Comunidad dada de alta exitosamente"});
                } catch (error) {
                    console.error('Error al dar de alta comunidad:', error);
                    res.status(500).json({"message":"Error interno del servidor al dar de alta comunidad, verifica tus datos"});
                }
        }     
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});

//RUTA PARA DAR DE ALTA COLABORADOR
router.post('/colaborador', async (req, res) => {
    try{
    const idusucolab = req.body.idusucolab;
    const idcomunidad = req.body.idcomunidad;
        if (idusucolab.trim() === "" || idcomunidad.trim() === "") {
            res.status(200).json({"messsage":"Tu usuario colaborador o comunidad no puede estar vacio"});
            return;
        } else {
                try {  
                    const result = await itemsPool.query('INSERT INTO colaboradores (fk_id_comunidad,fk_id_usuario) values ($1,$2)', [idcomunidad,idusucolab]);
                    res.status(200).json({"messsage":"Colaborador añadido exitosamente"});
                } catch (error) {
                    console.error('Error al dar de alta colaborador:', error);
                    res.status(500).json({"message":"Error interno del servidor al dar de alta colaborador, verifica los datos enviados"});
                }
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    } 
});





export default router;
