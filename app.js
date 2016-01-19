var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.route('/bleat/:id')
    .get(function(request, response) {
        var id = request.params.id;
        getBleat(id, function(data) {
            response.json(data);
        });
    });

app.route('/bleat/:id/replies')
    .get(function(request, response) {
        var curr_id = request.params.id;
        var path = __dirname + '\\dataset-medium\\bleats\\';
        var replies = [];
        fs.readdir(path, function(err, list) {
            list.forEach(function(id) {
                getBleat(id, function(data) {
                    if (data.in_reply_to === curr_id) {
                        replies.push(id);
                    }
                });
            });
            response.json(replies);
        });
    });

app.route('/bleat/:id/conversation')
    .get(function(request, response) {
        var id = request.params.id;
        var conversation = [];
        var getPrecursor = function getPrecursor(data) {
            if (!data.in_reply_to) {
                response.json(conversation);
            } else {
                conversation.push(data.in_reply_to);
                getBleat(data.in_reply_to, getPrecursor);
            }
        }
        getBleat(id, getPrecursor);
    });

function getBleat(id, callback) {
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
        callback(data);
    });
}

app.route('/user/:username/details')
    .all(function(request, response, next) {
        request.username = request.params.username.toLowerCase();
        next();
    })
    .get(function(request, response) {
        var username = request.username;
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
            if (data.listens) {
                data.listens = data.listens.split(' ');
            }
            response.json(data);
        });
    });

app.route('/user/:username/bleats')
    .all(function(request, response, next) {
        request.username = request.params.username.toLowerCase();
        next();
    })
    .get(function(request, response) {
        var username = request.username;
        var page = request.query.page;
        var per_page = 16;
        var path = __dirname + '\\dataset-medium\\users\\' + username + '\\bleats.txt';
        fs.readFile(path, function(err, data) {
            if (err) {
                response.status(404).json('No bleats found for that username');
                return;
            }
            data = data.toString();
            data = data.split('\n');
            data = data.filter(function(id) {
                return id;
            });
            data.reverse();
            if (page) {
                if (page >= 1) {
                    data = data.slice((page-1)*per_page,page*per_page);
                    if (data.length === 0) {
                        response.status(404).json('No bleats on this page');
                    } else {
                        response.json(data);
                    }
                } else {
                    response.status(400).json('Invalid page number');
                }
            } else {
                response.json(data);
            }
        });
    });

app.listen(8080);
