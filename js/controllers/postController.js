import { Router } from "express";
import PostService from '../services/Posts-services.js';
import etiquetaService from '../services/etiqueta-services.js';

let srvPosts = new PostService();
let srvEtiqueta = new etiquetaService();

const router = Router();


router.get('', async (req, res) => {
    const post = await srvPosts.getAll();
    res.status(200).json(post);

})

router.get('/TraerPostsMasRecientes/', async (req, res) => {    //Funciona
    srvPosts.get5MoreRecent()
        .then(async posts => {
            for (const post of posts)
                post.tags = await srvPosts.getEtiquetasPorId(post.ID);
            res.json(posts);
        });
})

//De aca en adelante probar si con el router funciona

router.get('/AgarrarPostPorId/:Id?', (req, res) => {    //Funciona
    const Id = req.params.Id;
    srvPosts.getById(Id)
        .then(val => res.send(val))     
})

router.post("/crearPost", async (req, res) => {     //Funciona!!!!
    let postCreado = {
    idUsuario : req.body.idUsuario, 
    tipo : req.body.tipo,
    titulo : req.body.titulo,
    descripcion : req.body.descripcion,
    linkArchivo : req.body.linkArchivo,
    idMateria : req.body.idMateria,
    tags: req.body.tags
    };
    let tags = postCreado.tags;
    let tagID = {};

    let idPost= 0;
    idPost = await srvPosts.insert(postCreado.idUsuario,postCreado.tipo, postCreado.titulo, postCreado.descripcion, 0,postCreado.linkArchivo,postCreado.idMateria);
    // falta el if de que si bo existe esa tag
    tags.forEach(async tagNombre=>{ //por cada NOMBRE DE ETIQUETA EN EL ARRAY ETIQUETA
        tagID = await srvEtiqueta.getAffected(tagNombre)  // Te devuelve el ID de la etiqueta a partir del nombre
        srvPosts.meterEtiquetaAPost(tagID.ID,idPost.L) //tagID en realidad no es un int, sino que no se porque lo pone como {ID : 1}
            
        console.log(await srvPosts.getEtiquetasPorId(idPost.L)) 
        /*if(tagID===0){                              
            idEtiquetaCreada = srvEtiqueta.crearEtiqueta(tagNombre);
            //console.log(idEtiquetaCreada + "AAAAAAAAAAAA");
           //srvPosts.meterEtiquetaAPost(idPost,idEtiquetaCreada)
        }*/
    })


    res.send("POST CREADO"); //Volver a mandar el post?
})

router.get('/getComentariosByPostId/:Id?', (req, res) => {    //funciona
    srvPosts.getComentariosByPostId(req.params.Id)
        .then(val => res.send(val));
})

router.get('/getComentariosByPostIdTop5/:Id?', (req, res) => {    //funciona
    srvPosts.getComentariosByPostIdTop5(req.params.Id)
        .then(val => res.send(val));
})

router.get('/BuscarPosts/:Titulo', (req, res) => {    //Funciona
    srvPosts.getByTitleTop5(req.params.Titulo)
        .then(val => res.send(val));     
})

router.get('/getVotosByPostID/:Id?', async (req, res) => {    //

    let votos = await srvPosts.getVotosHechosAPost(req.params.Id);
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

export default router;

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

/*
app.get('/TraerPostsMasRecientes/', async (req, res) => {    //Funciona
    srvPosts.get5MoreRecent()
        .then(async posts => {
            for (const post of posts)
                post.tags = await srvPosts.getEtiquetasPorId(post.ID);
            res.json(posts);
        });
})*/