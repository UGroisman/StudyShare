import config from './db.js'
import sql from 'mssql'

class PostService{
    getAll = async () => {
        let returnEntity = null;
        console.log('debug en getAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("select * from Posts");
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity

    }

    getById = async (ID) => {
        let returnEntity = null;
        console.log('debug en getbidi')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .query("select * from Post where ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity
    }

    insert = async (idUsuario,tipo, titulo, descripcion, Puntuacion,linkArchivo) => {
        let rowsAffected = 0;
        console.log('debug en deñteado')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('ptipo', sql.Bit, tipo)
                .input('ptitulo', sql.NVarChar, titulo)
              .input('pdescripcion', sql.NVarChar, descripcion)
              .input('ppuntuacion', sql.Int, Puntuacion)
              .input('pidUsuario', sql.Int, idUsuario)
             .input('plink', sql.NVarChar, linkArchivo)
             .query("INSERT INTO Posts (idUsuario,tipo, titulo, descripcion, Puntuacion,linkArchivo) VALUES (@pidUsuario,@ptipo, @ptitulo, @pdescripcion, @ppuntuacion,@plink)");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

    updateNombre = async (ID, NewNombre) => {
        let rowsAffected = 0;
        console.log('debug en deñteado')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .input('pNewNombre', sql.NVarChar, NewNombre)
                    .query("UPDATE Usuario SET nombre = @pNewNombre  where ID = @pId");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

    deleteById = async (ID) => {
        let rowsAffected = 0;
        console.log('debug en deñteado')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .query("DELETE FROM Posts where ID = @pId");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

}



export default UsuarioServicios