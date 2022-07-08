import UsuarioService from './js/services/Usuario-services.js';
import PostService from './js/services/Posts-services.js';
import cors from 'cors';
import  express  from 'express'

/* nashe */

let srvUsuarios = new UsuarioService();
let srvPosts = new PostService();
const app = express()
const port = 3004
console.log(port);

app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.get('/AgarrarUsuarioPorId/:Id?', (req, res) => {   //Funciona
    let Id = req.params.Id;
    let obj = srvUsuarios.getById(Id);


    obj.then(val => res.send(val))     
    

})

app.get('/AgarrarPostPorId/:Id?', (req, res) => {    //Funciona
    let Id = req.params.Id;
    let obj = srvPosts.getById(Id);

    obj.then(val => res.send(val))     
})


app.post("/crearPost", function (req, res) {     //Funciona!!!!
    let postCreado = {
    idUsuario : req.body.idUsuario, 
    tipo : req.body.tipo,
    titulo : req.body.titulo,
    descripcion : req.body.descripcion,
    linkArchivo : req.body.linkArchivo,
    idMateria : req.body.idMateria
    };
    srvPosts.insert(postCreado.idUsuario,postCreado.tipo, postCreado.titulo, postCreado.descripcion, 0,postCreado.linkArchivo,postCreado.idMateria);
    res.send("POST CREADO"); //Volver a mandar el post
})

app.post("/crearUsuario", function (req, res) {   //Funciona
    let usuarioCreado = {
    mail : req.body.mail, 
    nombre : req.body.nombre,
    contrasena : req.body.contrasena,
    fotodeperfil : req.body.fotodeperfil,
    };

    srvUsuarios.insert(usuarioCreado.mail, usuarioCreado.nombre, usuarioCreado.contrasena, 0, usuarioCreado.fotodeperfil);
    res.send("USUARIO CREADO"); //volver a mandar usuario
})

/*
app.get('/TraerPostsMasRecientes/', async (req, res) => {    //Funciona
    let obj = srvPosts.get5MoreRecent();   

    obj.then(val => val.forEach( 
        function(value){
            console.log(value.ID)
            let etiquetasNombres = srvPosts.getEtiquetasByPostId(value.ID);
            etiquetasNombres.then(nombres => console.log(nombres))
        }
    ))
    obj.then(val => res.send(val)) 
})
*/

app.get('/TraerPostsMasRecientes/', async (req, res) => {    //Funciona
    let obj = srvPosts.get5MoreRecent();   

    obj.then(val => val.forEach( 
        function(value){
            console.log(value.ID)
            let etiquetasNombres = srvPosts.getEtiquetasByPostId(value.ID);
            etiquetasNombres.then(nombres => console.log(nombres))
        }
    ))
    obj.then(val => res.send(val)) 
})




app.get('/getComenatiosByPostId/:Id?', (req, res) => {    
    let obj = srvPosts.getComenatiosByPostId(req.params.Id);
    obj.then(val => res.send(val))     
})


app.get('/BuscarPosts/:Titulo', (req, res) => {    //Funciona
    let obj = srvPosts.getByTitleTop5(req.params.Titulo);
    obj.then(val => res.send(val))     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

