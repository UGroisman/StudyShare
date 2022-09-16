import config from './db.js'
import sql from 'mssql'

class ComentarioService{
    getCommentById = async (IDs) => {
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select * from Comentario where ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]

    }

    insert = async (idUsuario,IdPost, Texto) => {
        let rowsAffected = 0;
        console.log('debug en insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
              .input('pIdUsuario', sql.Int, idUsuario)
              .input('pIdPost', sql.Int, IdPost)
              .input('pTexto', sql.NVarChar, Texto)
              .query("insert into Comentario (IdUsuario,IdPost,Texto) VALUES (@pIdUsuario,@pIdPost,@pTexto)");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

    getVotosHechosAComentario   = async (IDs) => {
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    /*.query("select  UPAC.IdUsuario as 'Usuario que voto', UPAC.Voto as 'Voto hecho', UPAC.IdComentario as 'comentarioVotado' from Comentario inner join UsuarioPuntajeAComentario UPAC on Comentario.ID = UPAC.IdComentario where ID = @pId");*/
                    .query("select  UPAC.Voto from Comentario inner join UsuarioPuntajeAComentario UPAC on Comentario.ID = UPAC.IdComentario where ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]

    }


}


export default ComentarioService