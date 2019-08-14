var express = require('express');
var router = express.Router();
var pool = require('../db');
var app = express();

app.use(express.json( {type: "*/*"} ));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

/* GET users listing. */
router.get('/api-test/fichas/v1/alumnos/:dni', function(req, res, next) {
    var sql = "SELECT * FROM demo_fichas WHERE DNI="+req.params.dni;
    getQuery(sql, function(data){
        res.status(200);
        //res.render('data', { data: data });
        res.send(data);
    });
});

router.get('/api-test/fichas/v1/alumnos/', function(req, res, next) {
    var sql = "SELECT * FROM demo_fichas";
    getQuery(sql, function(data){
        res.status(200);
        //res.render('data', { data: data });
        res.send(data);
    });
});

router.post('/api-test/fichas/v1/alumnos/', function (req, res, next) {
    var sql = "INSERT INTO demo_fichas (DNI, Nombre, Apellidos, Direccion, Telefono, Equipo)" +
        "VALUES ('" + req.body.DNI + "', '" + req.body.Nombre + "', '" + req.body.Apellidos + "','" +
        req.body.Direccion + "', '" + req.body.Telefono + "','" + req.body.Equipo + "');";
    doPostDeleteUpdate(sql, function (data) {
       res.status(200);
       res.send(data);
    });
});

router.put('/api-test/fichas/v1/alumnos/:dni', function (req, res, next) {
    var sql = "UPDATE demo_fichas" +
        "SET Nombre='" + req.body.Nombre + "', Apellidos='" + req.body.Apellidos + "', Direccion='" + req.body.Direccion + "'," +
        "Telefono='" + req.body.Telefono + "', Equipo='" + req.body.Equipo + "' WHERE DNI = '" + req.body.DNI + "';";
    doPostDeleteUpdate(sql, function (data) {
        res.status(200);
        res.send(data);
    })
});

router.delete('/api-test/fichas/v1/alumnos/:dni', function (req, res, next) {
    var sql = "DELETE FROM demo_fichas WHERE DNI ='" + req.params.dni + "';";
    doPostDeleteUpdate(sql, function (data) {
        res.status(200);
        res.send(data);
    })

});

function getQuery(sql, callback){
    pool.query(sql, function (err, rows, fields) {
        var respuesta;
        if (err) {
            respuesta = JSON.parse('[{"NUMREG":-1}]');
            console.log('Connection result error '+err);
            //throw err;
        } else {
            var numreg = rows.length;
            respuesta = JSON.parse('[{"NUMREG":'+numreg+'}]');
            if(numreg>0){
                rows.map(function(ficha) {
                    respuesta.push(ficha);
                });
            }
        }
        console.log('The response is: ', JSON.stringify(respuesta))
        return callback(respuesta);
    })
}
function doPostDeleteUpdate (sql, callback){
    pool.query(sql, function (err, rows, fields) {
        var respuesta;
        if (err) {
            respuesta = JSON.parse('[{"NUMREG":-1}]');
            console.log('Connection result error '+err);
            //throw err;
        } else {
            respuesta = JSON.parse('[{"NUMREG":1}]');
        }
        console.log('The response is: ', JSON.stringify(respuesta))
        return callback(respuesta);
    });
}

module.exports = router;
