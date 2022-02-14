const express = require('express');
let { onlyValidJwt } = require('../middleware/authMiddleware');
let Movie = require('../models/movie');
let router = express.Router();

router.get('/', async (req, res) => {
  let movies = await Movie.find();
  res.status(200).json(movies);
});

router.get('/:movieId', (req, res) => {
  Movie.findOne({
    _id: req.params.movieId
  }, (err, movie) => {
    if(err || !movie) {
      return res.status(400).json({message: 'Error while finding the movie', error: err});
    }

    res.status(200).json(movie);
  })
});

router.post('/', onlyValidJwt, async (req, res) => {
  let movie = new Movie();
  movie.title = req.body.title;
  movie.year = req.body.year;
  movie.stars = req.body.stars;
  movie.producent = req.body.producent;
  movie.userId = req.user._id;

  movie.save((err) => {
    if(err) {
      res.status(400).json({message: 'Error while adding movie', data: err});
    } else {
      res.status(200).json({message: 'Successfully added movie'});
    }
  })
});

router.post('/:movieId', onlyValidJwt, (req, res) => {
  Movie.findOne({
    _id: req.params.movieId
  }, (err, movie) => {
    if(err || !movie) {
      return res.status(400).json({message: 'Error while finding the movie', error: err});
    }

    if(movie.userId !== req.user._id) {
      return res.status(400).json({message: 'You do not have access to update that movie'});
    }

    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.stars = req.body.stars;
    movie.producent = req.body.producent;
    movie.userId = req.user._id;
  
    movie.save((err) => {
      if(err) {
        res.status(400).json({message: 'Error while updating movie', data: err});
      } else {
        res.status(200).json({message: 'Successfully updated movie'});
      }
    })
  })
});

router.delete('/:movieId', onlyValidJwt, (req, res) => {
  Movie.findOne({
    _id: req.params.movieId
  }, (err, movie) => {
    if(err || !movie) {
      return res.status(400).json({message: 'Error while finding the movie', error: err});
    }

    if(movie.userId !== req.user._id) {
      return res.status(400).json({message: 'You do not have access to update that movie'});
    }
  
    movie.delete((err) => {
      if(err) {
        res.status(400).json({message: 'Error while deleted movie', data: err});
      } else {
        res.status(200).json({message: 'Successfully deleted movie'});
      }
    })
  })
});

module.exports = router;