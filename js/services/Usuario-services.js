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
        return returnEntity[0][0]

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
        if (returnEntity){
        return returnEntity[0][0]
        }else{
            returnEntity={"Error":"404"}
            return returnEntity;
        }
    }

    getByName = async (nombre) => {
        let returnEntity = null;
        let aaa=0;
        console.log('debug en getbiNAME')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pNombre', sql.VarChar, nombre)
                    .query("select * from Usuario where nombre = @pNombre");
                    
            returnEntity = result.recordsets;
            aaa=result.rowsAffected;
        }catch(error){
            console.log(error)
        }

        
        console.log(returnEntity);
        return returnEntity[0][0];
    
    }

    insert = async (mailNew, nombreNew, contrasenaNew, reputacionNew, fotodeperfilNew) => {
        let rowsAffected = 0;
        console.log('debug en insert nombre')
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


    verificarNombre = async (nombre) => {
        let rowsAffected = 0;

        console.log('debug en verificar Nombre')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pNombre', sql.NVarChar, nombre)
            .query("select * from Usuario where nombre = @pNombre");  
            rowsAffected = await result.rowsAffected;
        }catch(error){
            console.log(error)
        }


        if (rowsAffected==1){
            console.log("nel");
            return false;   //Un nombre ya existe

        }else{
            console.log("SEs");
            return true;    //Un nombre no existe
        }

    }

    verificarMail = async (mail) => {
        let rowsAffected = 0;

        console.log('debug en verificar mail')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pMail', sql.NVarChar, mail)
            .query("select * from Usuario where mail = @pMail");  
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
        
        if (rowsAffected==1){
            return false;
        }else{
            return true;
        }

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



    iniciarSession = async (usuario, contrasena) => {
        let rowsAffected = 0;
        let usuarioADevolver = null;
        console.log('debug en getbidi')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pUsuario', sql.NVarChar, usuario)
                    .input('pConstrasena', sql.NVarChar, contrasena)
                    .query("select * from Usuario where nombre = @pUsuario AND contrasena = @pConstrasena");
                    
                    rowsAffected = result.rowsAffected;
                    usuarioADevolver = result.recordsets;
                    console.log(usuarioADevolver);
        }catch(error){
            console.log(error)
        }

        if (rowsAffected==1){
            return usuarioADevolver[0][0];
        }else{
            return false;
        }
    }
}

export default UsuarioService