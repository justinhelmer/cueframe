const express = require('express');
const path = require('path');

const app = express();

// put require statements for routers inside the request, to force it to reload the file if require cache has been deleted (i.e. chokidar)
(function attachRouters() {
  app.use((req, res, next) => require('./user')(req, res, next));
  app.use((req, res, next) => require('./file')(req, res, next));
})();

app.use(express.static(path.resolve(__dirname, '../../build')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

module.exports = app;
