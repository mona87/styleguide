/**
 * Main Node file
 */
var exec = require('child_process').exec,
    watcher = require('./modules/watcher'),
    livereloader = require('./modules/livereloader'),
    utils = require('./modules/utils'),
    http = require('http'),
    waitingTheServer = true,
    INTEGRATION_TEST = global.INTEGRATION_TEST || false,
    portfinder = require('portfinder'),
    PORT;

portfinder.getPort(function (err, port) {
    PORT = port;

    // Livereload server
    livereloader.start();

    // Initialize Harp
    exec('cd ' + utils.basePath + '&& harp server --port ' + PORT, utils.puts);
    if (!INTEGRATION_TEST) exec('echo "Starting Server on port ' + PORT + '.." && echo "PROGRESS:94"', utils.puts);
    waitTheServer();
});

function waitTheServer() {
    if(waitingTheServer) {
        http.get({
            host: '127.0.0.1',
            port: PORT,
            path: '/'
        }, function(res) {
            if(res.statusCode == 200) {
                if (!INTEGRATION_TEST) exec('echo "Done! Enjoy!" && echo "PROGRESS:100" && open "http://localhost:' + PORT + '"', utils.puts);
                if (INTEGRATION_TEST) INTEGRATION_TEST.run(PORT);
                waitingTheServer = false;

                // Files watcher
                watcher.start();
            }
            res.emit('end');
            waitTheServer();
        }).on('error', function(e) {
            // Nothing
            waitingTheServer = true;
            waitTheServer();
        });
    }
}
