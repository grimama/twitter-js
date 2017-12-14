const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');


module.exports = function makeRouterWithSockets (io) {

router.get('/tweets', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', {
    tweets: tweets,
    showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var list = tweetBank.find( {name: req.params.name} );
  res.render( 'index', {
    tweets: list,
    showForm: true,
    name: req.params.name,
    title: 'Twitter.js',
    username: req.params.name
  });
});

router.get('/tweets/:id', (req, res, next) => {
  var list = tweetBank.find( {id: +req.params.id} );
  res.render('index', {
    tweets: list,
    id: req.params.id,
    title: 'Twitter.js'
  })
})

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/tweets');
});


return router
}
