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
            res.status(200).json({"mensaje": "El correo ya esta registrado a un usuario"});
        }

    } catch (error) {
        console.error('Error interno del servidor', error);
        res.status(500).send('Error interno del servidor');
    }
});

//RUTA PARA ALTA TEMPERATURA
router.post('/temphum', async (req, res) => {
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

//RUTA PARA CREAR CUARTOS
router.post('/cuarto', async (req, res) => {
    const zona = req.body.zona; 
    const nombrecuarto = req.body.nombrecuarto;
                    
                try {  
                    const idzona = await itemsPool.query('SELECT id_zona FROM zonas WHERE nombreZona = ($1);', [zona]);                             
                    const result = await itemsPool.query('INSERT INTO cuartos (cuarto,fk_id_zona) values ($1,$2)', [nombrecuarto,idzona.rows[0].idzona]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al dar de alta el cuarto:', error);
                    res.status(500).send('Error interno del servidor al dar de alta el cuarto');
                }            
});


//RUTA PARA CREAR SENSOR
router.post('/sensor', async (req, res) => {
    const cuarto = req.body.cuarto; 
    const nombresensor = req.body.nombresensor;
    const señal = req.body.señal; 
    const valor = 0

                try {  
                    const idcuarto = await itemsPool.query('SELECT id_cuarto FROM cuartos WHERE cuarto = ($1);', [cuarto]);                             
                    const idseñal = await itemsPool.query('SELECT id_señal FROM señales WHERE señal = ($1);', [señal]);                             
                    const result = await itemsPool.query('INSERT INTO sensores (nombresensor,valor,fk_id_cuarto,fk_id_señal) values ($1,$2,$3,$4) RETURNING id_sensor', [nombresensor,valor,idcuarto.rows[0].id_cuarto,idseñal.rows[0].id_señal]);            
                    res.status(200).json(result.rows[0].id_sensor);
                } catch (error) {
                    console.error('Error al dar de alta el sensor:', error);
                    res.status(500).send('Error interno del servidor al dar de alta el sensor');
                }            
});

//RUTA PARA DAR DE ALTA TIPODEEDIFICIO
router.post('/tipoedificio', async (req, res) => {
    const nombreedificio = req.body.nombreedificio; 
                try {  
                    const result = await itemsPool.query('INSERT INTO tipoedificio (tipoedificio) values ($1) RETURNING id_tipoedificio', [nombreedificio]);
                    res.status(200).json(result.rows[0].id_tipoedificio);
                } catch (error) {
                    console.error('Error al dar de alta el tipo de edificio:', error);
                    res.status(500).send('Error interno del servidor al dar de alta el tipo de edificio');
                }            
});

//RUTA PARA DAR DE ALTA SEÑAL
router.post('/signal', async (req, res) => {
    const nombreseñal = req.body.nombreseñal; 
                try {  
                    const result = await itemsPool.query('INSERT INTO señales (señal) values ($1) RETURNING id_señal', [nombreseñal]);
                    res.status(200).json(result.rows[0].id_señal);
                } catch (error) {
                    console.error('Error al dar de alta la señal:', error);
                    res.status(500).send('Error interno del servidor al dar de alta la señal');
                }            
});

//RUTA PARA DAR DE ALTA COMUNIDADES
router.post('/comunidad', async (req, res) => {
    const nombrecomunidad = req.body.nombrecomunidad; 
    const usu = req.body.usu;
                try {  
                    const idusuario = await itemsPool.query('SELECT idusuario FROM usuarios WHERE usuario = ($1);', [usu]);                             
                    const result = await itemsPool.query('INSERT INTO comunidades (nombrecomunidad,fk_id_usuario) values ($1,$2)', [nombrecomunidad,idusuario.rows[0].idusuario]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al dar de alta comunidad:', error);
                    res.status(500).send('Error interno del servidor al dar de alta comunidad');
                }            
});

//RUTA PARA DAR DE ALTA COLABORADOR
router.post('/colaborador', async (req, res) => {
    const usu = req.body.usu;
    const comunidad = req.body.comunidad;
                try {  
                    const idusuario = await itemsPool.query('SELECT idusuario FROM usuarios WHERE usuario = ($1);', [usu]);                             
                    const idcomunidad = await itemsPool.query('SELECT id_comunidad FROM comunidades WHERE nombrecomunidad = ($1);', [comunidad]);                             
                    const result = await itemsPool.query('INSERT INTO colaboradores (fk_id_comunidad,fk_id_usuario) values ($1,$2)', [idcomunidad.rows[0].id_comunidad,idusuario.rows[0].idusuario]);
                    res.status(200).json({});
                } catch (error) {
                    console.error('Error al dar de alta colaborador:', error);
                    res.status(500).send('Error interno del servidor al dar de alta colaborador');
                }            
});

export default router;
