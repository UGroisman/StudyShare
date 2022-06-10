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

app.use(express.json())

app.get('/AgarrarUsuarioPorId/:Id?', (req, res) => {   //Funca
    let Id = req.params.Id;
    let obj = srvUsuarios.getById(Id);

    obj.then(val => res.send(val))     
})

app.get('/AgarrarPostPorId/:Id?', (req, res) => {    //Funca
    let Id = req.params.Id;
    let obj = srvPosts.getById(Id);

    obj.then(val => res.send(val))     
})


app.post("/crearPost", function (req, res) {     //AHORA SI FUNCA AAAAAAA
    let postCreado = {
    idUsuario : req.body.idUsuario, 
    tipo : req.body.tipo,
    titulo : req.body.titulo,
    descripcion : req.body.descripcion,
    linkArchivo : req.body.linkArchivo
    };
    srvPosts.insert(postCreado.idUsuario,postCreado.tipo, postCreado.titulo, postCreado.descripcion, 0,postCreado.linkArchivo);
    res.send("POST CREADO");
})

app.post("/crearUsuario", function (req, res) {   //Worky worky?
    let usuarioCreado = {
    mail : req.body.mail, 
    nombre : req.body.nombre,
    contrasena : req.body.contrasena,
    fotodeperfil : req.body.fotodeperfil,
    };

    srvUsuarios.insert(usuarioCreado.mail, usuarioCreado.nombre, usuarioCreado.contrasena, 0, usuarioCreado.fotodeperfil);
    res.send("USUARIO CREADO");
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

