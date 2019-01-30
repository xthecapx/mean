var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var mongoose = require('mongoose');
var Pins = require('../models/Pins.js');
var requestPromise = require('request-promise-native');

/* GET ALL PINS */
router.get('/', function(req, res, next) {
  Pins.find(function(err, pins) {
    if (err) return next(err);
    res.json(pins);
  });
});

/* GET SINGLE PIN BY ID */
router.get('/:id', function(req, res, next) {
  Pins.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// ["http", "http"]
function getMetadataFromAssets(assets) {
  return Promise.all(
    assets.map(async asset => {
      return await requestPromise({ url: asset.url });
    })
  );
}

/* SAVE PIN */
router.post('/', async function(req, res, next) {
  const _pins = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    percentage: 0,
    tags: [],
    assets: []
  };

  getMetadataFromAssets(req.body.assets)
    .then(htmls => {
      htmls.forEach(html => {
        const $ = cheerio.load(html);
        const webpageTitle = $('title').text();
        const metaDescription = $('meta[name=description]').attr('content');

        _pins.assets.push({
          title: webpageTitle,
          description: metaDescription,
          readed: false
        });
      });

      Pins.create(_pins, function(err, post) {
        if (err) return next(err);
        res.json(post);
      });
    })
    .catch(error => {
      next(error);
    });
});

/* UPDATE PIN */
router.put('/:id', function(req, res, next) {
  Pins.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PIN */
router.delete('/:id', function(req, res, next) {
  Pins.findByIdAndRemove(req.params.id, req.body, function(err, post) {
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
