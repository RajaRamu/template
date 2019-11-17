var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression'); // Provides gzip compression for the HTTP response
const svelte = require('svelte/compiler');

require('svelte/register');
const App = require('./App.svelte').default;


var app = express();
var port = 3000;

// Enable gzip compression for all HTTP responses
app.use(compression());
// serve all the static resources from public folder
app.use('/static', serveStatic('public'));

app.use('/server', (req, res) => {
    const html = App.render({ name: 'svelte-ssr' });
    // TODO: 
    // 1. Pass this content to another template to build HTML 
    // 2. How to load client modules along with hydration(how to use same template b/w server and client)
    res.json(html);
});

app.listen(port, function(err) {
    if (err) {
        throw err;
    }
    console.log('Listening on port %d', port);
    console.log(`Try http://localhost:${port}/server`)

    // The browser-refresh module uses this event to know that the
    // process is ready to serve traffic after the restart
    if (process.send) {
        process.send('online');
    }
});