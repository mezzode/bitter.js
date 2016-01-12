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
            var dataToJson = function(data) {
                data = data.toString();
                data = data.replace(/([^:]+): (.+)\n/g, function(a, b, c) {
                    return '"'+b+'": ' + '"'+c+'",';
                })
                data = data.slice(0, -1);
                data = '{' + data + '}';
                data = JSON.parse(data);
                return data;
            };
            response.json(dataToJson(data));
        });
    });

app.listen(8080);
