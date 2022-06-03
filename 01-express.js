/*const express = require("express");
const app = express();
const PORT = 3000;
let posts = [];
let usuarios = [];
let detalles = [];

app.use(express.json())

const sql = require('mssql')

async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=A-BTA-07,1433;Database=StudyShare;User Id=ALMAGRO\46443039;')
        const result = await sql.query`select * from Usuario where id = ${0}`
        console.log(result)
    } catch (err) {
        // ... error checks
    }
}

 
app.post("/crearPost", function (req, res) {
    let postCreado = {
        idUsuario : req.body.idUsuario,
        tipo : req.body.tipo,
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        ID: req.body.ID,
        linkArchivo : req.body.linkArchivo

    };

    posts.push(postCreado);
            //NombreJugador: req.body.Nombres[i
    res.send("POST CREADO");
})




app.get("/mostrarPosts", function (req, res) {
    res.send(posts);
})

app.get("/buscarPorNombre/:titulo?", function (req, res) {
    
    let titulo = req.params.titulo;
    let i = posts.filter(post => post.titulo == titulo);

    let o =[

    ];
    i.forEach(element => {  //aca podriamos hacer un link desde la app/html que utilice este ID para otra funcion que le devuelva los datos del post
        o.push({
            ID: element.tipo,
            titulo: element.titulo
        })

    });

    res.send(o);
})


 /*
app.get("/cartones/:Nombre?", function(req,res){
    let Nombre = req.params.Nombre;
    let i = ArrayDeCartones.find(Carton => Carton.NombreJugador == Nombre);
    if(Nombre){
        res.send(i);
    } else{
        res.send(ArrayDeCartones); 
    }
    
});
*/
 
/*

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
 */

import config from './js/services/db.js';
import UsuarioService from './js/services/Usuario-services.js';
import PostService from './js/services/Posts-services.js';
import sql from 'mssql';
import  express  from 'express'

let srvUsuarios = new UsuarioService();
let srvPosts = new PostService();
const app = express()
const port = 3000
console.log(port);


app.get('/AgarrarUsuarioPorId/:Id?', (req, res) => {
    let Id = req.params.Id;
    let obj = srvUsuarios.getById(Id);

    obj.then(val => res.send(val))     
})

app.get('/AgarrarPostPorId/:Id?', (req, res) => {
    let Id = req.params.Id;
    let obj = srvPosts.getById(Id);

    obj.then(val => res.send(val))     
})


app.post("/crearPost", function (req, res) {
    let postCreado = {
        idUsuario : req.body.idUsuario,
        tipo : req.body.tipo,
        titulo : req.body.titulo,
        descripcion : req.body.descripcion,
        linkArchivo : req.body.linkArchivo

    };
    
    srvPosts.insert(postCreado.idUsuario,postCreado.tipo, postCreado.titulo, postCreado.descripcion, postCreado.Puntuacion,linkArchivo);


    //posts.push(postCreado);
    
    res.send("POST CREADO");
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

