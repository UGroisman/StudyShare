/* import config from './services/db.js';
import UsuarioService from './services/Usuario-services.js';
import sql from 'mssql';

/*
let pool = await sql.connect(config);
let result = await pool.request().query("select nombre from Usuario where ID = 1");

console.log(result.recordset[0].nombre);*/


let srv = new UsuarioService();
let obj = srv.getById(1);

obj.then(val => console.log(val))     