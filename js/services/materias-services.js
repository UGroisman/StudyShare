import config from './db.js'
import sql from 'mssql'

class MateriaService{
    getAll = async () => {
        const query = "select * from Materia";
        console.log('debug en getAll')
        let pool = await sql.connect(config);
        let result = await pool.request()
                        .query(query);
        const returnEntity = result.recordsets;
        return returnEntity[0][0]
    }

}





export default MateriaService