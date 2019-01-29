var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Pins.js');

/* GET ALL PINS */
router.get('/', function(req, res, next) {
  Book.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PIN BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PIN */
router.post('/', function(req, res, next) {
  Book.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PIN */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PIN */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET PAGE INFO */
// curl -i -X POST -H "Content-Type: application/json" -d '{ "url": "https://www.youtube.com/watch?v=WaH8BR4peGs" }' localhost:3000/api/page-info
router.post('/info', function(req, res, next) {
  if (req.body.url) {
    request({ url: req.body.url }, function(error, response, body) {
      if (error) return next(error);

      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        const webpageTitle = $('title').text();
        const metaDescription = $('meta[name=description]').attr('content');
        const webpage = {
          title: webpageTitle,
          metaDescription: metaDescription
        };
        res.json(webpage);
      }
    });
  }
});

module.exports = router;
