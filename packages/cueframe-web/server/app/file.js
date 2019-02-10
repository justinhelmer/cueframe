const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = express.Router();

router.post('/api/file/:name', bodyParser.raw({ type: 'application/octet-stream', limit: '1GB' }), (req, res) => {
  fs.appendFile(path.join(__dirname, '../uploads', req.params.name), Buffer.from(req.body), (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;