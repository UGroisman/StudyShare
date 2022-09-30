import { Router } from "express";
import votosService from '../services/votos-services.js';

let srvVotos = new votosService();

const router = Router();

router.get('/votosDePost/:Id?', async (req, res) => {   //Funciona
    const Id = req.params.Id;
    let votos = await srvVotos.getVotosByIdPost(Id);
    let cantidadFinal = 0
    console.log(votos);

    votos.forEach(element => {
        if (element.Voto==1){
            cantidadFinal++;
        }else{
            cantidadFinal--;
        }
    });

    console.log(cantidadFinal)
    res.status(200).json({cantidad : cantidadFinal })
})

router.get('/verificarSiUsuarioYaVoto/:Id?', async (req, res) => {   //Funciona
    const Id = req.params.Id;
    let votos = await srvVotos.getVotosByIdPost(Id);
    let cantidadFinal = 0
    console.log(votos);

    votos.forEach(element => {
        if (element.Voto==1){
            cantidadFinal++;
        }else{
            cantidadFinal--;
        }
    });

    console.log(cantidadFinal)
    res.status(200).json({cantidad : cantidadFinal })
})

export default router;