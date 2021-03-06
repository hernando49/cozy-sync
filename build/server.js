// Generated by CoffeeScript 1.9.0
var application, initialize;

initialize = require('./server/initialize');

application = module.exports = function(callback) {
  var americano, options;
  americano = require('americano');
  options = {
    name: 'sync',
    port: process.env.PORT || 9116,
    host: process.env.HOST || "127.0.0.1",
    root: __dirname
  };
  return require('./server/models/webdavaccount').first(function() {
    return americano.start(options, function(err, app, server) {
      var Realtimer, User, realtime;
      User = require('./server/models/user');
      Realtimer = require('cozy-realtime-adapter');
      realtime = Realtimer({
        server: server
      }, ['event.*']);
      realtime.on('user.*', function() {
        return User.updateUser();
      });
      User.updateUser();
      return initialize(function() {
        if (callback != null) {
          return callback(app, server);
        }
      });
    });
  });
};

if (!module.parent) {
  application();
}
