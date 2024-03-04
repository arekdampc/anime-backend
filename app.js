//importuję zmienne środowiskowe
require('dotenv').config();

// importuję expresa
const express = require('express');

const cors = require('cors');

// tworzę instancję expresa
const app = express();

//łączę się z bazą danych
const mongoose = require("mongoose");
//mongoose.connect('mongodb+srv://' + process.env.DB_USERNAME_ADMIN + ':' + process.env.DB_PASSWORD_ADMIN + '@mongodb.16fxibo.mongodb.net/library?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://arekdampc:NPMAwM2P24iFngUw@cluster0.xbir8oi.mongodb.net/?retryWrites=true&w=majority');
// logger
const morgan = require('morgan');
app.use(morgan('combined'));

// parsuję body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());
// routy
const animeRoutes = require('./api/routes/animes');
app.use('/animes', animeRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: 'Nie znaleziono ' });
});

module.exports = app;

