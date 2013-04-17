var State = require('../shared/State');
var ClientState = require('./ClientState');
var io = require('socket.io-client');

global.io = io;

module.exports = Client;

function Client(state) {
  this.state = state;
}

Client.prototype.listen = function (host, callback) {
  var self = this;
  this.socket = io.connect(host);
  this.socket.on('init', function (map) {
    console.log('initing map: ' + JSON.stringify(map));
    self.state.init(map, self);
    callback();
  });
  this.socket.on('YieldPull', function (map) {
    var state = new State(map);
    self.state.yieldPull(state);
    console.log('yieldPull: ' + state);
  });
};

Client.prototype.yieldPush = function () {
  this.socket.emit('YieldPush', this.state);
};