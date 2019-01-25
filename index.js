var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
    res.send("Hola mundo");
});

app.use(router);

mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
    if(err) {
        console.log("Error: " + err);
    }
    app.listen(3000, function() {
        console.log("Servidor Node en el puerto 3000");
    });
});