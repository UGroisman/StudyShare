import { Router } from "express";
import PostService from '../services/Posts-services.js';

let srvPosts = new PostService();

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

export default router;