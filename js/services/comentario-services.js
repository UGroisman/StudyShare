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

    
}


export default ComentarioService