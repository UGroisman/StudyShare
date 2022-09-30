import config from './db.js'
import sql from 'mssql'

class votosService{
    getVotosByIdPost = async (ID) => {
        let returnEntity = null;
        console.log('debug en getbidi')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .query("select Voto from UsuarioPuntajeAPost where IdPost=@pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
            return returnEntity[0];
    }

}







export default votosService