import { Router } from "express";
import ComentarioService from '../services/comentario-services.js';

let srvComentarios = new ComentarioService();

const router = Router();

router.get('/AgarrarComentarioPorId/:Id?', (req, res) => {   //
    const Id = req.params.Id;
    srvComentarios.getCommentById(Id)
        .then(val => res.send(val))     
})


router.get('/getVotosByComentarioID/:Id?', async (req, res) => {    //


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




router.post("/crearComentario", function (req, res) {     //Funciona!!!!
let comentarioCreado = {
idUsuario : req.body.idUsuario, 
idPost : req.body.idPost,
texto : req.body.texto
};
srvComentarios.insert(comentarioCreado.idUsuario,comentarioCreado.idPost,comentarioCreado.texto);
res.send("COMENTARIO CREADO"); //Volver a mandar el post
})

export default router;

