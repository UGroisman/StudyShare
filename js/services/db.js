

/*
const sql = require('mssql')
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,  // true for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

async () => {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from Usuario where id = ${0}`
  console.dir(result)
  console.log(result)
 } catch (err) {
  // ... error checks
 }
} */

/*
const config = {
  user: 'idkk',
  password: 'idk',
  server:'A-CIDI-157',
  database: 'StudyShare',
  options :{
    trustServerCertificate : true,
    trustedConnection : true
  }
}*/


const config = {
  user: 'idkk',
  password: 'idk',
  server:'A-PHZ2-CIDI-049',
  database: 'StudyShare',
  options :{
    trustServerCertificate : true,
    trustedConnection : true
  }
}

export default config