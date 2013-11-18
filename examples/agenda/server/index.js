/**
 * Created by ticup on 15/11/13.
 */
var CloudTypes = require('../../../server/main.js');
var makeAgenda = require('./app');

var server = CloudTypes.createServer();
var port = process.env.PORT || 8080;

/* publish grocery cloudtypes through the http server */
makeAgenda(server).publish(port, __dirname + '/../../../');

console.log("#### CloudTypes Agenda Example server running on " + port + " ####");