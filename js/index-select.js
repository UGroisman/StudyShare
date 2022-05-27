import config from './services/db.js';
import sql from 'mssql';
import UsuarioServicios from './services/Usuario-services.js';
/*
let pool = await sql.connect(config);
let result = await pool.request().query("select nombre from Usuario where ID = 1");

console.log(result.recordset[0].nombre);*/

console.log(UsuarioServicios.getAll())