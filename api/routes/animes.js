const express = require('express');
const router = express.Router();


//importuję model książki
const Anime = require("../models/anime");
router.get('/', (req, res, next) => {
  Anime.find()
  .then(result => {
    res.status(200).json({
      wiadomosc: 'Lista wszystkich anime',
      info: result,
    });
  })
  .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res, next) => {
  const anime = new Anime ( {
    title: req.body.title,
    studio: req.body.studio,
    release: req.body.release,
  });
  anime.save()
    .then(result => {
      res.status(201).json({
        wiadomosc: 'Dodanie nowego rekordu anime',
        info: result,
      });

    })
    .catch(err => res.status(500).json(err))

});

router.get('/:animeId', (req, res, next) => {
  const id = req.params.animeId;
  Anime.findById(id)
    .then((result) => {
      res.status(200).json({
        wiadomosc: 'Szczegóły anime o numerze ' + id,
        info: result,
      });
    })
    .catch((err) => res.status(500).json(err));
});

router.put('/:animeId', (req, res, next) => {
  const id = req.params.animeId;
  Anime.findByIdAndUpdate(id, {
    title: req.body.title,
    studio: req.body.studio,
    release: req.body.release,
  })
    .then(() => {
      res
        .status(200)
        .json({ wiadomosc: 'Zmienono dane anime o numerze ' + id });
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:animeId', (req, res, next) => {
  const id = req.params.animeId;
  Anime.findByIdAndDelete(id)
  .then(() => {
    res.status(200).json({ wiadomosc: 'Usunięcie anime o numerze ' + id });  })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
