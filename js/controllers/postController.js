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
        .then(async postss => {
            for (const post of postss)
                post.tags = await srvPosts.getEtiquetasPorId(post.ID);
            res.json(postss);
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
    let tagID = 0;
    let idPost= 0;
    let idEtiquetaCreada=null;

    let tagIDExtra =0;
    let postIDExtra =0;
    let today= new Date()
    console.log("DIAAAAAAAAAA")
    console.log(today);

    //aca se crea el post
    idPost = await srvPosts.insert(postCreado.idUsuario,postCreado.tipo, postCreado.titulo, postCreado.descripcion, 0,postCreado.linkArchivo,postCreado.idMateria);
    // falta el if de que si bo existe esa tag

    tags.forEach(async tagNombre=>{ //por cada NOMBRE DE ETIQUETA EN EL ARRAY ETIQUETA
        tagID = await srvEtiqueta.getAffected(tagNombre)  // Te devuelve el ID de la etiqueta a partir del nombre

        if (tagID){

        console.log("Este es el idtag:")
        console.log(tagID.ID)

        console.log("Este es el idpost:")
        console.log(idPost.L)

        srvPosts.meterEtiquetaAPost(tagID.ID,idPost.L) //tagID en realidad no es un int, sino que no se porque lo pone como {ID : 1}
        }else{
            console.log("LA ETIQUETA NO EXISTE")
            idEtiquetaCreada = await srvEtiqueta.crearEtiqueta(tagNombre);
            console.log("Ok, id de la nueva tag creada:")
            console.log(idEtiquetaCreada.L);
            srvPosts.meterEtiquetaAPost(idEtiquetaCreada.L,idPost.L)

        }

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

router.get('/getFiltroBusquedaPost1/:Titulo?', async (req, res) => {    //

    const Titulo = req.params.Titulo;//eee ???
    srvPosts.FiltroBusquedaPost1(Titulo)
        .then(val => res.send(val))    
    

    //console.log(val);
    //res.status(200).json({cantidad : counter })
    //res.send(counter);

})

router.get('/getPostsPorIdUsuario/:Id?', async (req, res) => {    //

    srvPosts.getPostsPorIdUsuario(req.params.Id)
    .then(async posts => {
        for (const post of posts)
            post.tags = await srvPosts.getEtiquetasPorId(post.ID);
        res.json(posts);
    });

})
/*
router.get('/getVotoPorUsuario/:Id?', async (req, res) => {    //

    srvPosts.getPostsPorIdUsuario(req.params.Id)
    .then(async posts => {
        for (const post of posts)
            post.tags = await srvPosts.getEtiquetasPorId(post.ID);
        res.json(posts);
    });

})*/


router.post('/updateVoto/', async (req, res) => {    //

    let idUsuario = req.body.idUsuario
    let idPost = req.body.idPost
    let voto = req.body.voto
    if (!await srvPosts.getVotoHechoAPostPorIDUsuario(idUsuario,idPost)){
        //Si no existe, lo creas
        srvPosts.InsertVotoHechoAPostPorIDUsuario(idUsuario,idPost,voto)
    } else{
        //Si ya existe, lo updateas
        srvPosts.updateVotoHechoAPostPorIDUsuario(idUsuario,idPost,voto)
    }

    res.send("LOOL")



    /*srvPosts.getPostsPorIdUsuario(req.params.Id)
    .then(async posts => {
        for (const post of posts)
            post.tags = await srvPosts.getEtiquetasPorId(post.ID);
        res.json(posts);
    });*/

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