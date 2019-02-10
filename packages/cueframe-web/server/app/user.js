const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();

router.all('/*', session({
  secret: 'sd823sdf9432s',
  resave: false,
  saveUninitialized: false,
}));

const jsonParser = bodyParser.json();

router.post('/api/user/login', jsonParser, (req, res) => {
  if (req.body.email === 'test@test.com' && req.body.password === 'test') {
    req.session.user = {
      id: 123,
      name: 'Test User',
    };
    res.cookie('user.id', 123);
    res.json(req.session.user);
  } else {
    res.sendStatus(400);
  }
});

router.post('/api/user/logout', jsonParser, (req, res) => {
  req.session.user = {};
  res.sendStatus(200);
});

router.get('/api/user/:id', (req, res) => {
  if (req.params.id === '123' && req.session.user) {
    res.json(req.session.user);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;