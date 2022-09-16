import UsuarioService from './js/services/Usuario-services.js';
import PostService from './js/services/Posts-services.js';
import cors from 'cors';
import  express  from 'express';
import MateriaService from './js/services/materias-services.js ';
import ComentarioService from './js/services/comentario-services.js';

import PostRouter from './js/controllers/postController.js';

let srvUsuarios = new UsuarioService();
let srvPosts = new PostService();
let srvMaterias = new MateriaService();
let srvComentarios = new ComentarioService();

const app = express();
const port = 3004;
console.log(port);


app.use(express.json())
app.use(cors({
    origin: '*'
}));

app.use("",PostRouter);


app.get('/AgarrarComentarioPorId/:Id?', (req, res) => {   //
    const Id = req.params.Id;
    srvComentarios.getCommentById(Id)
        .then(val => res.send(val))     
})

app.get('/AgarrarUsuarioPorId/:Id?', (req, res) => {   //Funciona
    const Id = req.params.Id;
    srvUsuarios.getById(Id)
        .then(val => res.send(val))     
})

app.get('/AgarrarTodasLasMaterias',(req,res)=>{
    srvMaterias.getAll().then(val=>{res.send(val)})
})


app.post("/crearUsuario", function (req, res) {   //Funciona
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

app.get("/VerificarMaile/:nombre?", function (req, res) {   //Funciona
    
    srvUsuarios.verificarMail(req.params.nombre)
    .then(val =>{res.send(val)})


})

app.get("/AgarrarPorNombre/:nombre?", function (req, res) {   //Funciona
    
    srvUsuarios.getByName(req.params.nombre)
    .then(val =>{res.send(val)})


})

app.get("/VerificarNombre/:nombre?", function (req, res) {   //Funciona
    
    srvUsuarios.verificarNombre(req.params.nombre)
    
    .then(val =>{res.send(val)})

    //res.send("1");


})


app.get('/getVotosByComentarioID/:Id?', async (req, res) => {    //


        let votos = await srvComentarios.getVotosHechosAComentario(req.params.Id);
        console.log(votos)
        let counter = 0;
        votos.forEach(voto=>{
            if (voto.Voto == 1){
                counter = counter + 1;
            }
        })
    
        console.log(counter);
        res.status(200).json({cantidad : counter })
        //res.send(counter);

})




app.post("/crearComentario", function (req, res) {     //Funciona!!!!
    let comentarioCreado = {
    idUsuario : req.body.idUsuario, 
    idPost : req.body.idPost,
    texto : req.body.texto
    };
    srvComentarios.insert(comentarioCreado.idUsuario,comentarioCreado.idPost,comentarioCreado.texto);
    res.send("COMENTARIO CREADO"); //Volver a mandar el post
})

app.get('/iniciarSession/:nombre?&:contrasena?', (req, res) => {    //Funciona
    srvUsuarios.iniciarSession(req.params.nombre, req.params.contrasena)
        .then(val => res.send(val));     
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

