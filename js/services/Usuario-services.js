import config from './db.js'
import sql from 'mssql'

class UsuarioService{
    getAll = async () => {
        let returnEntity = null;
        console.log('debug en getAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("select * from Usuario");
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
                    .query("select * from Usuario where ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity
    }

    insert = async (mailNew, nombreNew, contrasenaNew, reputacionNew, fotodeperfilNew) => {
        let rowsAffected = 0;
        console.log('debug en deñteado')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pmailNew', sql.NVarChar, mailNew)
                .input('pnombreNew', sql.NVarChar, nombreNew)
              .input('pcontrasenaNew', sql.NVarChar, contrasenaNew)
             .input('preputacionNew', sql.Int, reputacionNew)
             .input('pfotodeperfilNew', sql.NVarChar, fotodeperfilNew)
             .query("INSERT INTO Usuario (mail, nombre, contrasena, reputacion, fotodeperfil) VALUES (@pmailNew, @pnombreNew, @pcontrasenaNew, @preputacionNew, @pfotodeperfilNew)");
                    
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
                    .query("DELETE FROM Usuario where ID = @pId");
                    
                 rowsAffected = result.rowsAffected;
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    }

}



export default UsuarioServicios