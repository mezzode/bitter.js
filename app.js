(function() {
    'use strict';
    var fs = require('fs');
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('bitter.db');
    var bcrypt = require('bcryptjs');
    var express = require('express');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser')
    var jwt = require('jsonwebtoken');
    var app = express();

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // token debugger
    app.route('/api/tokenDebug')
        .get(function(request, response) {
            var token = request.cookies.token;
            var decoded = jwt.verify(token, 'secret', function(err, data) {
                response.json(data);
            });
        });

    app.route('/api/authenticate')
        .post(function(request, response) {
            var user = request.body.username;
            var pass = request.body.password;
            db.get("SELECT password FROM users WHERE username = $user;", {'$user': user}, function(err, row) {
                if (err) {
                    console.log("Error: "+err);
                    response.json(false);
                    return err;
                } else if (!row) {
                    console.log("No user "+user);
                    response.json(false);
                    return;
                }
                bcrypt.compare(pass, row.password, function(err, res) {
                    if (err) return err;
                    if (res) {
                        if (request.query.remember) {
                            jwt.sign({user: user}, 'secret', {expiresIn: "30d"}, function(token) {
                                response.cookie('token', token, {maxAge: 1000*60*60*24*30});
                                response.json(user);
                            });
                        } else {
                            jwt.sign({user: user}, 'secret', {expiresIn: "1h"}, function(token) {
                                response.cookie('token', token);
                                response.json(user);
                            });
                        }
                    } else {
                        console.log("Incorrect password");
                        response.json(false);
                    }
                });
            });
        });

    app.route('/api/current')
        .get(function(request, response) {
            jwt.verify(request.cookies.token, 'secret', function(err, data) {
                if (err) {
                    response.json(false);
                    return err;
                }
                response.json(data.user);
            });
        })

    app.route('/api/bleat/')
        .post(function(request, response) {
            var token = request.cookies.token;
            jwt.verify(token, 'secret', function(err, data) {
                if (err) {
                    response.sendStatus(401);
                    return err;
                }
                var bleat = request.query.bleat;
                // write bleat to db
            });
        });

    app.route('/api/bleat/:id')
        .get(function(request, response) {
            var id = request.params.id;
            getBleat(id, function(data) {
                response.json(data);
            });
        })
        .delete(function(request, response) {
            var id = request.params.id;
            var token = request.cookies.token;
            jwt.verify(token, 'secret', function(err, data) {
                if (err) {
                    response.sendStatus(401);
                    return err;
                }
                var user = data.user;
                // if user owns bleat, mark as deleted
                // else 401
                response.sendStatus(401);
            });
        })
        .put(function(request, response) {
            var id = request.params.id;
            var user = request.query.user;
            var token = request.query.token;
            var bleat = request.query.bleat; // object
            // if user is valid and owns bleat, update bleat
        })
        .patch(function(request, response) {
            var id = request.params.id;
            var user = request.query.user;
            var token = request.query.token;
            var bleat = request.query.bleat; // object containing changes
            // if user is valid and owns bleat, update bleat
        });

    app.route('/api/bleat/:id/replies')
        .get(function(request, response) {
            var id = request.params.id;
            db.all("SELECT id FROM bleats WHERE in_reply_to = $id;", {'$id': id}, function(err, rows) {
                rows = rows.map(function(row) {
                    return row.id
                });
                response.json(rows);
            });
        });

    app.route('/api/bleat/:id/conversation')
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
        db.get("SELECT * FROM bleats WHERE id = $id;", {'$id': id}, function(err, row) {
            callback(row);
        });
    }

    app.route('/api/user/:username/details')
        .all(function(request, response, next) {
            // request.username = request.params.username.toLowerCase();
            request.username = request.params.username;
            next();
        })
        .get(function(request, response) {
            var username = request.username;
            db.get("SELECT username, full_name, home_suburb, home_latitude, home_longitude FROM users WHERE username = $user;", {'$user': username},
                function(err, row) {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    response.json(row);
                });
        });

    app.route('/api/user/:username/listens')
        .all(function(request, response, next) {
            // request.username = request.params.username.toLowerCase();
            request.username = request.params.username;
            next();
        })
        .get(function(request, response) {
            var username = request.username;
            db.all("SELECT listen FROM listens WHERE username = $user;", {'$user': username}, function(err, rows) {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    rows = rows.map(function(row) {
                        return row.listen;
                    });
                    response.json(rows);
                });
        });

    app.route('/api/user/:username/bleats')
        .all(function(request, response, next) {
            // request.username = request.params.username.toLowerCase();
            request.username = request.params.username;
            next();
        })
        .get(function(request, response) {
            var username = request.username;
            var page = request.query.page || 1;
            var per_page = 16;
            if (page <  1) {
                response.status(400).json('Invalid page number');
                return;
            }
            db.all(
                "SELECT id FROM bleats WHERE username = $user ORDER BY time DESC LIMIT $offset, $rows;",
                {'$user': username, '$offset': (page-1)*per_page, '$rows': per_page },
                function(err, rows) {
                    if (err || rows.length === 0) {
                        response.status(404).json('No bleats found');
                        console.log(err);
                        return;
                    }
                    rows = rows.map(function(row) {
                        return row.id;
                    });
                    response.json(rows);
                }
            );
        });

    app.route('/api/user/:username/picture')
        .all(function(request, response, next) {
            request.username = request.params.username.toLowerCase();
            next();
        })
        .get(function(request, response) {
            var username = request.username;
            var path = __dirname + '\\dataset-medium\\users\\' + username + '\\profile.jpg';
            var placeholder = __dirname + '\\public\\placeholder.png';
            fs.exists(path, function(exists) {
                if (exists)
                    response.sendFile(path);
                else
                    response.sendFile(placeholder);
            });
        })
        .put(function(request, response) {
            var id = request.params.id;
            var user = request.query.user;
            var token = request.query.token;
            var bleat = request.query.pic;
            // if user is valid, update pic
        });

    app.listen(8080);
})();
