'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.js');
const proposals = require('./proposals.js');

const app = express();
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index'));

app.post('/proposal', (req, res) =>
    proposals.process(new Proposal(req))
    .then(() => res.sendStatus(200)));

const server = app.listen(config.port, function() {
    console.log('server is up, port ' + config.port);
});

// model
function Proposal(req) {
    this.fromPoint = req.body.fromPoint;
    this.toPoint = req.body.toPoint;
    this.fromTime = req.body.fromTime;
}

// for tests
module.exports = server;

// ok... user can post a request like so:
/*
    {
        fromPoint: [lat, long],
        toPoint: [lat, long],
        fromTime: Long,
        toTime: Long
    }

    if someone already posted similar request,
    we create a chat room connecting these people

    they talk and call a taxi or not, whatever.
    we don't care. we just connect.

    participants can close chat at any time and withdraw
    their requests.

    all requests are gone after time.
*/