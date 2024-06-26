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
        res.status(500).json({"message":"Error al obtener los tipos de edificios disponibles"});
    }
});

//RUTA PARA OBTENER IDUSUARIO
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

//RUTA PARA OBTENER LOS USUARIOS
router.get('/usuarios', async (req, res) => {
    try {
        const result = await itemsPool.query('SELECT * FROM usuarios');
        res.send(result.rows); // Envía solo los datos de los usuarios
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).json({"message":"Error al obtener usuarios"});
    }
});

//RUTA PARA OBTENER CORREO
router.get('/correousers', async (req, res) => {
    try {
        const result = await itemsPool.query('SELECT correo FROM usuarios');
        res.send(result.rows); // Envía solo los datos de los usuarios
    } catch (error) {
        console.error('Error al obtener correo de los usuarios', error);
        res.status(500).json({"message":"Error al obtener el correo de los usuarios"});
    }
});


//RUTA PARA OBTENER NÚMERO DE USUARIOS
router.get('/numusu', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(correo) from usuarios;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).json({"message":"Error al obtener usuarios"});
    }
});

//RUTA PARA OBTENER NÚMERO DE ZONAS
router.get('/numzonas', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(id_zona) from zonas;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener zonas', error);
        res.status(500).json({"message":"Error al obtener zonas"});
    }
});

//RUTA PARA OBTENER NÚMERO DE CUARTOS
router.get('/numcuartos', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(id_cuarto) from cuartos;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener cuartos', error);
        res.status(500).json({"message":"Error al obtener cuartos"});
    }
});

//RUTA PARA OBTENER NÚMERO DE SENSORES
router.get('/numsensores', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(id_sensor) from sensores;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener sensores', error);
        res.status(500).json({"message":"Error al obtener sensores"});
    }
});

//RUTA PARA OBTENER NÚMERO DE COMUNIDADES
router.get('/numcomunidades', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(id_comunidad) from comunidades;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener comunidades', error);
        res.status(500).json({"message":"Error al obtener comunidades"});
    }
});

//RUTA PARA OBTENER NÚMERO DE COLABORADORES
router.get('/numcolaboradores', async (req, res) => {
    try {
        const result = await itemsPool.query('select count(id_colaborador) from colaboradores;');
        res.send(result.rows[0].count);
    } catch (error) {
        console.error('Error al obtener colaboradores', error);
        res.status(500).json({"message":"Error al obtener colaboradores"});
    }
});

//RUTA PARA OBTENER NÚMERO DE PESO DE ALMACENAMIENTO DE LA BASE DE DATOS
router.get('/storage', async (req, res) => {
    try {
        const result = await itemsPool.query("SELECT pg_size_pretty(pg_database_size('domoticloud')) AS storage;");
        res.send(result.rows);
    } catch (error) {
        console.error('Error al obtener el tamaño de almacenamiento ocupado', error);
        res.status(500).json({"message":"Error al obtener el tamaño de almacenamiento ocupado"});
    }
});

//RUTA PARA OBTENER TODOS LOS TIPOS DE SEÑALES
router.get('/signal', async (req, res) => {
    try {
        const result = await itemsPool.query('select * from señales;');
        res.send(result.rows);
    } catch (error) {
        console.error('Error al obtener los tipos de señales', error);
        res.status(500).json({"message":"Error al obtener tipos de señales"});
    }
});

//RUTA PARA OBTENER TODAS LAS SEÑALES Y SU ARBOL DE UN USUARIO
router.post('/allsignals', async(req, res) => {
    try{
    const idusu = req.body.idusu; 
        try {                                   
            const result = await itemsPool.query('Select id_sensor, nombresensor, valor, señales.señal, cuartos.cuarto , zonas.nombrezona, usuarios.usuario FROM sensores      INNER JOIN señales ON sensores.fk_id_señal = señales.id_señal INNER JOIN cuartos ON sensores.fk_id_cuarto = cuartos.id_cuarto INNER JOIN zonas ON cuartos.fk_id_zona = zonas.id_zona INNER JOIN usuarios ON zonas.fk_id_usuario = usuarios.idusuario where usuarios.idusuario = $1',[idusu]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener señales:', error);
            res.status(500).json({"message":"Error al obtener señales"});
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }  

});

//RUTA PARA OBTENER LAS COMUNIDADES ADMINISTRADAS POR EL USUARIO
router.post('/comunidad', async(req, res) => {
    try{
    const idcomunidad = req.body.idcomunidad; 
        try {                                   
            const result = await itemsPool.query('Select id_comunidad, nombrecomunidad FROM comunidades  where id_comunidad = $1',[idcomunidad]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener comunidad', error);
            res.status(500).json({"message":"Error al obtener comunidad"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }

});

//RUTA PARA OBTENER LAS COMUNIDADES ADMINISTRADAS POR EL USUARIO
router.post('/admincomunidad', async(req, res) => {
    try{
    const idadminusu = req.body.idadminusu; 
        try {                                   
            const result = await itemsPool.query('Select id_comunidad, nombrecomunidad FROM comunidades  where fk_id_usuario = $1',[idadminusu]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener señales:', error);
            res.status(500).json({"message":"Error al obtener señales"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }

});

//RUTA PARA OBTENER LAS COMUNIDADES COLABORADAS POR EL USUARIO
router.post('/colabencomunidad', async(req, res) => {
    try{
    const idcolabcomunidad = req.body.idcolabcomunidad; 
        try {                                   
            const result = await itemsPool.query('select id_colaborador, comunidades.id_comunidad, comunidades.nombrecomunidad, usuarios.idusuario, usuarios.usuario as administrador from colaboradores INNER JOIN comunidades ON colaboradores.fk_id_comunidad = comunidades.id_comunidad INNER JOIN usuarios ON comunidades.fk_id_usuario = usuarios.idusuario where colaboradores.fk_id_usuario =$1',[idcolabcomunidad]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener tus comunidades de las que eres colaborador:', error);
            res.status(500).json({"message":"Error al obtener tus comunidades de las que eres colaborador"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }

});


//RUTA PARA OBTENER LOS COLABORADORES DE UNA COMUNIDAD
router.post('/colabdecomunidad', async(req, res) => {
    try{
    const idcomunidad = req.body.idcomunidad; 
        try {                                   
            const result = await itemsPool.query('select id_colaborador, usuarios.usuario as colaborador, usuarios.correo from colaboradores INNER JOIN usuarios ON colaboradores.fk_id_usuario = usuarios.idusuario where fk_id_comunidad = ($1);', [idcomunidad]);  
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener los colaboradores de tu comunidad:', error);
            res.status(500).json({"message":"Error al obtener los colaboradores de tu comunidad"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }

});


//RUTA PARA LAS ZONAS DE UN USUARIO
router.post('/zonas', async(req, res) => {
    try{
    const idusu = req.body.idusu; 
        try {                                   
            const result = await itemsPool.query('select id_zona, nombrezona from zonas where fk_id_usuario =$1',[idusu]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener zonas:', error);
            res.status(500).json({"message":'Error al obtener las zonas del usuario'});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }

});

//RUTA PARA UNA ZONA EN ESPECIFICO
router.post('/zona', async(req, res) => {
    try{
    const idzona = req.body.idzona; 
        try {                                   
            const result = await itemsPool.query('select id_zona, nombrezona, usuarios.usuario as usuarioDueño, tipoedificio.tipoedificio as TipoDeEdificio from zonas INNER JOIN usuarios ON zonas.fk_id_usuario = usuarios.idusuario INNER JOIN tipoedificio ON zonas.fk_id_tipoedificio = tipoedificio.id_tipoedificio where id_zona =$1',[idzona]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener la zona:', error);
            res.status(500).json({"message":'Error al obtener la zona'});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }

});


//RUTA PARA LOS CUARTOS DE UN USUARIO
router.post('/cuartos', async(req, res) => {
    try{
    const idzona = req.body.idzona; 
        try {                                   
            const result = await itemsPool.query('select id_cuarto, cuarto from cuartos where fk_id_zona =$1',[idzona]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener cuartos:', error);
            res.status(500).json({"message":"Error al obtener los cuartos del usuario"});
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }  

});

//RUTA PARA UN CUARTO EN ESPECIFICO
router.post('/cuarto', async(req, res) => {
    try{
    const idcuarto = req.body.idcuarto; 
        try {                                   
            const result = await itemsPool.query('select id_cuarto, cuarto , (SELECT count(id_sensor) FROM sensores WHERE fk_id_cuarto = cuartos.id_cuarto) AS numerosensoresactivos from cuartos where id_cuarto =$1',[idcuarto]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener el cuarto:', error);
            res.status(500).json({"message":"Error al obtener el cuarto"});
        }
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }  

});

//RUTA PARA LOS SENSORES DE UN CUARTO
router.post('/sensors', async(req, res) => {
    try{
    const idcuarto = req.body.idcuarto; 
        try {                                   
            const result = await itemsPool.query('select id_sensor, nombresensor, valor from sensores where fk_id_cuarto =$1',[idcuarto]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener los sensores:', error);
            res.status(500).json({"message":"Error al obtener los sensores del usuario"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});

//RUTA PARA BUSCAR SENSORES DE UN CUARTO
router.post('/sensor', async(req, res) => {
    try{
    const idsensor = req.body.idsensor; 
        try {                                   
            const result = await itemsPool.query('select id_sensor, nombresensor, valor, señales.señal from sensores INNER JOIN señales ON sensores.fk_id_señal = señales.id_señal where id_sensor =$1',[idsensor]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener el sensor:', error);
            res.status(500).json({"message":"Error al obtener el sensor del usuario"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});

//RUTA PARA LECTURA DE FOCO
router.post('/rele', async(req, res) => {
    try{
    const idsensor = req.body.idsensor; 
        try {                                   
            const result = await itemsPool.query('select valor from sensores where id_sensor = $1',[idsensor]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error al obtener la señal:', error);
            res.status(500).json({"message":"Error al obtener la señal"});
        }  
    }catch(error){
        res.status(500).json({"message":"Error interno del servidor al obtener cabecera de datos"});
    }
});



export default router;
