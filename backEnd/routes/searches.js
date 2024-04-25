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


//RUTA PARA OBTENER TODOS LOS TIPOS DE SEÑALES
router.get('/signal', async (req, res) => {
    try {
        const result = await itemsPool.query('select * from señales;');
        res.send(result.rows);
    } catch (error) {
        console.error('Error al obtener los tipos de señales', error);
        res.status(500).send('Error al obtener tipos de señales');
    }
});

//RUTA PARA OBTENER TODAS LAS SEÑALES Y SU ARBOL DE UN USUARIO
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

//RUTA PARA OBTENER LAS COMUNIDADES ADMINISTRADAS POR EL USUARIO
router.post('/admincomunidad', async(req, res) => {
    const adminusu = req.body.adminusu; 
    try {                                   
        const idusu = await itemsPool.query('SELECT idusuario FROM usuarios WHERE usuario = ($1);', [adminusu]);  
        const result = await itemsPool.query('Select nombrecomunidad FROM comunidades  where fk_id_usuario = $1',[idusu.rows[0].idusuario]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener señales:', error);
        res.status(500).send('Error al obtener señales');
    }  

});

//RUTA PARA OBTENER LAS COMUNIDADES COLABORADAS POR EL USUARIO
router.post('/colabcomunidad', async(req, res) => {
    const colabcomunidad = req.body.colabcomunidad; 
    try {                                   
        const idusu = await itemsPool.query('SELECT idusuario FROM usuarios WHERE usuario = ($1);', [colabcomunidad]);  
        const result = await itemsPool.query('select comunidades.nombrecomunidad, usuarios.usuario as administrador from colaboradores INNER JOIN comunidades ON colaboradores.fk_id_comunidad = comunidades.id_comunidad INNER JOIN usuarios ON comunidades.fk_id_usuario = usuarios.idusuario where colaboradores.fk_id_usuario =$1',[idusu.rows[0].idusuario]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener señales:', error);
        res.status(500).send('Error al obtener señales');
    }  

});

//RUTA PARA LAS ZONAS DE UN USUARIO
router.post('/zonas', async(req, res) => {
    const usu = req.body.usu; 
    try {                                   
        const idusu = await itemsPool.query('SELECT idusuario FROM usuarios WHERE usuario = ($1);', [usu]);  
        const result = await itemsPool.query('select nombrezona from zonas where fk_id_usuario =$1',[idusu.rows[0].idusuario]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener zonas:', error);
        res.status(500).send('Error al obtener las zonas del usuario');
    }  

});


//RUTA PARA LOS CUARTOS DE UN USUARIO
router.post('/cuartos', async(req, res) => {
    const zona = req.body.zona; 
    try {                                   
        const idzona = await itemsPool.query('SELECT id_zona FROM zonas WHERE nombrezona = ($1);', [zona]);  
        const result = await itemsPool.query('select cuarto from cuartos where fk_id_zona =$1',[idzona.rows[0].id_zona]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener cuartos:', error);
        res.status(500).send('Error al obtener los cuartos del usuario');
    }  

});

//RUTA PARA LOS SENSORES DE UN USUARIO
router.post('/sensors', async(req, res) => {
    const cuarto = req.body.cuarto; 
    try {                                   
        const idcuarto = await itemsPool.query('SELECT id_cuarto FROM cuartos WHERE cuarto = ($1);', [cuarto]);  
        const result = await itemsPool.query('select id_sensor, nombresensor, valor from sensores where fk_id_cuarto =$1',[idcuarto.rows[0].id_cuarto]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los sensores:', error);
        res.status(500).send('Error al obtener los sensores del usuario');
    }  

});

export default router;
