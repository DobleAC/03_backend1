//server.js
const express = require('express');
const app = express();
const neo4j = require("neo4j-driver");
const bodyParser = require('body-parser');
const PORT = 3000;


// const rutaPruebaMateria = require('./rutas/rutasalumnos');
// const rutaPruebaAlumno = require('./rutas/rutasmaterias');
const logger = require('./rutas/logger');
const rutaobtener = require('./rutas/rutaobtener');
const rutacrear = require('./rutas/rutacrear');

//middlewares
app.use(logger);

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use('/api', rutaobtener, rutacrear);
app.listen(PORT, () => { console.log('Server en http://localhost:' + PORT) });