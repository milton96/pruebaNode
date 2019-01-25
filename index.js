var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//import models y controllers
var models = require("./models/tvshow")(app, mongoose);
var TVShowCtrl = require("./controllers/tvshowController");

//API routes
var router = express.Router();

router.get('/', function(req, res) {
    res.send("Hola mundo");
});

app.use(router);

var tvshows = express.Router();

tvshows.route('/tvshows').get(TVShowCtrl.findAllTVShows).post(TVShowCtrl.addTVShow);
tvshows.route('/tvshows/:id').get(TVShowCtrl.findById).put(TVShowCtrl.updateTVShow).delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);


//Conexion a base de datos
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
    if(err) {
        console.log("Error: " + err);
    }
    console.log("Conectado a la base de datos");
    app.listen(3000, function() {
        console.log("Servidor Node en el puerto 3000");
    });
});