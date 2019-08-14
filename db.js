var mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit   : 10, 
  host              : 'localhost',
  user              : 'pruebas',
  password          : 'pruebas',
  database          : 'test',
  debug             : ['ComQueryPacket', 'RowDataPacket']
});

console.log('Connection pool initialized...');
module.exports = pool;
