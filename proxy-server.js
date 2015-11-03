var http = require('http')
var httpProxy = require('http-proxy')
var redis = require('redis')
var express = require('express')

// Redis client
var client = redis.createClient(6379, '127.0.0.1', {})

// 
var proxy = httpProxy.createProxyServer();
var proxyServerApp = express();

// HTTP Proxy SERVER listening on port 9090
var proxyServer = proxyServerApp.listen(9090, function () {
   var host = proxyServer.address().address;
   var port = proxyServer.address().port;
  
   console.log('Proxy server listening at http://%s:%s', host, port)

});

// Proxy server redirecting all the http requests to the target servers in a round robin fashion
proxyServerApp.all('/*', function(req, res) {
    client.rpoplpush("targetServers", "targetServers", function(err, value) {
        console.log("Sending request to %s", value);
        proxy.web(req, res, {target: value});
    });
});

