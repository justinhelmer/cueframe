const path = require('path');
const app = require('./app');

if (process.env.NODE_ENV === 'development') {
  // set up watcher to automatically delete require cache when changes are detected to anything in ./app
  console.log('running in dev mode; starting file watcher');
  const watcher = require('chokidar').watch(path.join(__dirname, 'app'));
  watcher.on('ready', () => {
    console.log('File watcher is ready')
    watcher.on('all', (event, p) => {
      console.log('detected change to', p)
      Object.keys(require.cache).forEach((id) => {
        if (id.startsWith(path.resolve(__dirname, 'app'))) {
          console.log('deleting', id, 'from require cache')
          delete require.cache[id];
        }
      })
    });
  });
}

app.listen(process.env.PORT || 9000, () => {
  console.log('\napplication server running on port 9000');
});