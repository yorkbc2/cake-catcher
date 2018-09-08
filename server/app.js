var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
var Schema = mongoose.Schema;
var mongooseKey = fs.readFileSync(path.resolve(__dirname, 'mongoose.key'), 'utf8');
var RecordSchema = new Schema({
    username: {type: String, required: true, unique: false},
    scores: {type: Number, required: true, unique: false},
    date: {type: Date, required: true, default: Date.now()}
});

var Record = mongoose.model('Record', RecordSchema, 'records');

mongoose.connect(mongooseKey, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept");
    next();
});

app.get('/api/v1/records', (req, res) => {
    Record.find({})
        .sort({'scores': -1})
        .limit(10)
        .exec((err, result) => {
            if (err) throw err;
            res.status(200)
                .json(result);
        });
});

app.post('/api/v1/records', (req, res) => {
    var username = req.body.username;
    var scores = req.body.scores;
    if (username && scores) 
    {
        var record = new Record({
            username: username,
            scores: scores
        });

        record.save((err) => {
            if (err) throw err;
            res.status(200)
                .json({status: true, message: "You have successfuly added to the board"});
        });
    }
    
    res.status(200);
});

app.listen(process.env.PORT || 4800, () => {
    console.log("Huh, server is running!");
});