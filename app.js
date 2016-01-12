var fs = require('fs');
var express = require('express');
var app = express();

app.route('/bleat/:id')
    .get(function(request, response) {
        var id = request.params.id;
        var path = __dirname + '\\dataset-medium\\bleats\\' + id;
        fs.readFile(path, function(err, data) {
            if (err) {
                response.status(404).json('No bleat with that id');
                return;
            }
            data = data.toString();
            data = data.replace(/([^:]+): (.+)\n/g, function(a, b, c) {
                return '"'+b+'": ' + '"'+c+'",';
            })
            data = data.slice(0, -1);
            data = '{' + data + '}';
            data = JSON.parse(data);
            response.json(data);
        });
    });

app.route('/user/:username/details')
    .get(function(request, response) {
        var username = request.params.username;
        var path = __dirname + '\\dataset-medium\\users\\' + username + '\\details.txt';
        fs.readFile(path, function(err, data) {
            if (err) {
                response.status(404).json('No user with that username');
                return;
            }
            data = data.toString();
            data = data.replace(/([^:]+): (.+)\n/g, function(a, b, c) {
                return '"'+b+'": ' + '"'+c+'",';
            })
            data = data.slice(0, -1);
            data = '{' + data + '}';
            data = JSON.parse(data);
            response.json(data);
        });
    });

app.route('/user/:username/bleats')
    .get(function(request, response) {
        var username = request.params.username;
        var path = __dirname + '\\dataset-medium\\users\\' + username + '\\bleats.txt';
        fs.readFile(path, function(err, data) {
            if (err) {
                response.status(404).json('No user with that username');
                return;
            }
            data = data.toString();
            data = data.split('\n');
            response.json(data);
        });
    });

app.listen(8080);
