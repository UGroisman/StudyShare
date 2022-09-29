import config from './db.js'
import sql from 'mssql'

class PostService{
    getAll = async () => {
        const query = "select Usuario.nombre, P.*, Materia.Nombre as Materia, Materia.ColorCode as Color from Posts P inner join Usuario on P.idUsuario = Usuario.ID inner join Materia on P.IdMateria = Materia.ID";
        console.log('debug en getAll')
        let pool = await sql.connect(config);
        let result = await pool.request()
                        .query(query);
        const returnEntity = result.recordsets;
        return returnEntity[0]
    }

    get5MoreRecent = async () => {
        let returnEntity = null;
        let etiquetasReturn = null;

        console.log('debug en getAll IVAN')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("select Usuario.nombre, P.*, Materia.Nombre as Materia, Materia.ColorCode as Color from Posts P inner join Usuario on P.idUsuario = Usuario.ID inner join Materia on P.IdMateria = Materia.ID");
/*            
            let pool2 = await sql.connect(config);
            let result2 = await pool.request().query("select etiquetas.nombre, Posts.ID from Posts inner join EtiquetasPorPost on Posts.ID = EtiquetasPorPost.IdPost inner join etiquetas on EtiquetasPorPost.IdEtiqueta = etiquetas.ID ");
        
            
*/           returnEntity = result.recordsets;
/*            etiquetasReturn = result2.recordsets;
            //console.log(etiquetasReturn[0][0]);
            returnEntity[0].push(etiquetasReturn[0]);
*/
        }catch(error){
            console.log(error)
        }

        return returnEntity[0];
    }

    getEtiquetasPorId = async (IDs) => {
        const query = "select etiquetas.nombre from Posts inner join EtiquetasPorPost on Posts.ID = EtiquetasPorPost.IdPost inner join etiquetas on EtiquetasPorPost.IdEtiqueta = etiquetas.ID where Posts.ID = @pId";
        const pool = await sql.connect(config);
        const rows = await pool.request()
            .input('pId', sql.Int, IDs)
            .query(query)
            .catch(console.error);
        const tags = rows.recordsets[0].map(row => row.nombre);
        return tags;
    }

    getPostsPorIdUsuario = async (IDs) => {
        let returnEntity = null;
        const query = "select Usuario.nombre, P.*, Materia.Nombre as Materia, Materia.ColorCode as Color from Posts P inner join Usuario on P.idUsuario = Usuario.ID inner join Materia on P.IdMateria = Materia.ID where idUsuario = @pId";
        const pool = await sql.connect(config);
        const rows = await pool.request()
            .input('pId', sql.Int, IDs)
            .query(query)
            .catch(console.error);
        returnEntity = rows.recordsets;
        return returnEntity[0];
    }


    getByTitleTop5 = async (TituloABuscar) => {  //not funcar
        let returnEntity = null;
        console.log('debug en getAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pTAB', sql.NVarChar, TituloABuscar)
            .query("select * from Posts where titulo like '%'+@pTAB+'%' order by Puntuacion desc"); // fix this
            
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]
    }

    getById = async (IDs) => {
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select Usuario.nombre, P.* from Posts P inner join Usuario on P.idUsuario = Usuario.ID where P.ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0][0]
    }

    getComentariosByPostId = async (IDs) => {  // ask next class
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select C.IdUsuario, C.Texto from Comentario C INNER JOIN Posts ON C.IdPost = Posts.ID where Posts.ID = @pId");

            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]
    }


    getComentariosByPostIdTop5 = async (IDs) => {  // ask next class
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                    .query("select top 5 C.IdUsuario, C.Texto from Comentario C INNER JOIN Posts ON C.IdPost = Posts.ID where Posts.ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]
    }

    getVotosHechosAPost   = async (IDs) => {
        let returnEntity = null;
        console.log('debug en get by id')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, IDs)
                   
                    .query("select  UPAP.Voto from Posts inner join UsuarioPuntajeAPost UPAP on Posts.ID = UPAP.IdPost where ID = @pId");
                    
            returnEntity = result.recordsets;
        }catch(error){
            console.log(error)
        }
        return returnEntity[0]

    }

    meterEtiquetaAPost = async (tagID,postID) => {
        let rowsAffected = null;

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
              .input('pTag', sql.Int, tagID)
              .input('pPost', sql.Int, postID)
              .query("insert into EtiquetasPorPost (IdEtiqueta,IdPost) values (@pTag,@pPost)");
            rowsAffected = result.rowsAffected
        }catch(error){
            console.log(error)
        }
        return rowsAffected

    }


    insert = async (idUsuario,tipo, titulo, descripcion, Puntuacion,linkArchivo,idMateria) => {
        let idPost = 0;
        console.log('debug en insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
              .input('ptipo', sql.Bit, tipo)
              .input('ptitulo', sql.NVarChar, titulo)
              .input('pdescripcion', sql.NVarChar, descripcion)
              .input('ppuntuacion', sql.Int, Puntuacion)
              .input('pidUsuario', sql.Int, idUsuario)
              .input('plink', sql.NVarChar, linkArchivo)
              .input('pidMateria', sql.Int, idMateria)
              .query("INSERT INTO Posts (idUsuario,tipo, titulo, descripcion, Puntuacion,linkArchivo,IdMateria,fecha) VALUES (@pidUsuario,@ptipo, @ptitulo, @pdescripcion, @ppuntuacion,@plink,@pidMateria,getDATE()) SELECT SCOPE_IDENTITY() as 'L'");
                    
              idPost = result.recordsets[0][0];
        }catch(error){
            console.log(error)
        }
        return idPost
    }

    //hacer el d update
    updateNombre = async (ID, NewNombre) => {
        let rowsAffected = 0;
        console.log('debug en updateNombre')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input('pId', sql.Int, ID)
                    .input('pNewNombre', sql.NVarChar, NewNombre)
                    .query("UPDATE Posts SET titulo = @pNewNombre  where ID = @pId");
                    
                 rowsAffected = result.rowsAffected; 
        }catch(error){
            console.log(error)
        }
        return rowsAffected
    
    }

    deleteById = async (ID) => {
        let rowsAffected = 0;
        console.log('debug en borrar por id')
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





export default PostService