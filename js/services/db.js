

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

const config = {
  user: 'Gumpydevv',
  password: '1234',
  server:'A-CIDI-117',
  database: 'StudyShare',
  options :{
    trustServerCertificate : true,
    trustedConnection : true
  }
}

export default config