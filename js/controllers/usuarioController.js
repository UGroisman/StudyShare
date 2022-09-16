import { Router } from "express";
import UsuarioService from '../services/Usuario-services.js';

let srvUsuarios = new UsuarioService();

const router = Router();

router.get('/AgarrarUsuarioPorId/:Id?', (req, res) => {   //Funciona
    const Id = req.params.Id;
    srvUsuarios.getById(Id)
        .then(val => res.send(val))     
})

router.post("/crearUsuario", function (req, res) {   //Funciona
    let usuarioCreado = {
        mail : req.body.mail, 
        nombre : req.body.nombre,
        contrasena : req.body.contrasena,
        fotodeperfil : req.body.fotodeperfil,
    };
    srvUsuarios.verificarNombre(usuarioCreado.nombre).then(val=>{
        if (val==true){
            srvUsuarios.insert(usuarioCreado.mail, usuarioCreado.nombre, usuarioCreado.contrasena, 0, usuarioCreado.fotodeperfil).then(

                srvUsuarios.getByName(usuarioCreado.nombre).then(val=>{res.send(val)})
            )
        }else{
            res.send("NONO");
        }
    })

    
})

router.get("/VerificarMaile/:nombre?", function (req, res) {   //Funciona
    
    srvUsuarios.verificarMail(req.params.nombre)
    .then(val =>{res.send(val)})


})

router.get("/AgarrarPorNombre/:nombre?", function (req, res) {   //Funciona
    
    srvUsuarios.getByName(req.params.nombre)
    .then(val =>{res.send(val)})


})

router.get("/VerificarNombre/:nombre?", function (req, res) {   //Funciona
    
    srvUsuarios.verificarNombre(req.params.nombre)
    
    .then(val =>{res.send(val)})

    //res.send("1");


})




router.get('/iniciarSession/:nombre?&:contrasena?', (req, res) => {    //Funciona
    srvUsuarios.iniciarSession(req.params.nombre, req.params.contrasena)
        .then(val => res.send(val));     
})

export default router;