let express = require('express');
let request = require('request');
let bodyparser = require('body-parser');

let app = express();
app.use(bodyparser.urlencoded({extended: true}));

let webhook = 'https://discordapp.com/api/webhooks/367279365978980354/mRhaQl_167FOvxcTVN7wJWkRjREpwZh-jqbFQOCkJvZnvTO3Bbv4YGfgOaVYlEWoEPeB';

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
});

app.post('/webhook', (req, res) => {
    request({
       method: 'POST',
        url: webhook,
        json: {
            "content": '!event create ' + req.body.name,
            "username": 'BOTTER'
        }
    });

    setTimeout(function() {
        request({
            method: 'POST',
            url: webhook,
            json: {
                "content": '!event description ' + req.body.description,
                "username": 'BOTTER'
            }
        });
    }, 3000);

    setTimeout(function() {
        request({
            method: 'POST',
            url: webhook,
            json: {
                "content":  '!event startDate ' + req.body.date + "-" +req.body.startTime,
                "username": 'BOTTER'
            }
        });
    }, 6000);

    setTimeout(function() {
        request({
            method: 'POST',
            url: webhook,
            json: {
                "content":  '!event endDate ' + req.body.date + "-" +req.body.endTime,
                "username": 'BOTTER'
            }
        });
    }, 8000);

    setTimeout(function() {
        request({
            method: 'POST',
            url: webhook,
            json: {
                "content":  '!event confirm',
                "username": 'BOTTER'
            }
        });
    }, 10000);

    res.redirect('/');
});

app.listen(80, () =>{
    console.log('It works!')
});

