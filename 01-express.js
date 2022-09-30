import cors from 'cors';
import  express  from 'express';
import MateriaService from './js/services/materias-services.js ';


import PostRouter from './js/controllers/postController.js';
import ComentarioRouter from './js/controllers/comentarioController.js';
import UsuarioRouter from './js/controllers/usuarioController.js';
import VotosRouter from './js/controllers/votosController.js';

let srvMaterias = new MateriaService();

const app = express();
const port = 3004;
console.log(port);


app.use(express.json())
app.use(cors({
    origin: '*'
}));

app.use("",PostRouter);
app.use("",ComentarioRouter);
app.use("",UsuarioRouter);
app.use("",VotosRouter);






app.get('/AgarrarTodasLasMaterias',(req,res)=>{
    srvMaterias.getAll().then(val=>{res.send(val)})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

