import config from './db.js'
import sql from 'mssql'

class etiquetaService{
    getAffected = async (nombreEtiqueta) => {
        let rowsAffected = 0;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pNombre', sql.NVarChar, nombreEtiqueta)
            .query("select ID from etiquetas where nombre = @pNombre");
            rowsAffected = result.recordsets[0][0];
        }catch(error){
            console.log(error)
        }
        console.log(rowsAffected)
        return [rowsAffected]
    }






    crearEtiqueta = async (nombre) => {
        let returnEntity = null;
        console.log('debug en insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
              .input('pnombre', sql.NVarChar, nombre)
              .query("INSERT INTO Posts (nombre) VALUES (@pnombre) SELECT SCOPE_IDENTITY() as 'L'");   
              returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        console.log(returnEntity[0])
        return returnEntity[0]
    }
    

}







export default etiquetaService