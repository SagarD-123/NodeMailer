
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Swastik@123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// const {createPool} = require('mysql');

// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "Swastik@123",
//     database: "demo",
//     connectionLimit: 10,
//     authSwitchHandler: (data, callback) => {
//         if (data.pluginName === 'caching_sha2_password') {
//             // Implement custom authentication logic here
//             // For example, you can send a response to use a different authentication method
//             callback(null, Buffer.from([1]));
//         } else {
//             callback(new Error('Unsupported authentication plugin'));
//         }
//     }
// });


// pool.query(`select * from data`,(err,result,fields) => {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log(result);
// })