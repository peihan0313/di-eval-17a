'use strict';
var bodyParser = require('body-parser')
var request = require('request');


var encrypt=require('./api/controllers/encrypt.js')
var kv = require('./api/controllers/kv.js')
var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerRestify.create(config, function (err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log(`Listening on http://127.0.0.1:${port}`);
});


app.post('/kv/:base64', kv.postKEY)
app.get('/kv/:base64', kv.getKEY)
app.del('/kv/:base64', kv.deleteKEY)
app.post('/encrypt', encrypt)

/*app.post('/kv/:base64', function (req, res) {
  if (URLSafeBase64.validate(req.params.base64)) {
    VALUE[req.params.base64] = req.body.VALUE
    //console.log(obj)
    let now = moment.utc().format()
    //console.log(now)
    res.json({
      TS: now
    })
  } else {
    res.json(400, {
      "message": "給人看的錯誤說明"
    })
  }
})

app.get('/kv/:base64', function (req, res) {
  if (URLSafeBase64.validate(req.params.base64)) {
    
    if (VALUE[req.params.base64]) {
      let now = moment.utc().format()
      var value = VALUE[req.params.base64]
      res.json({
        "VALUE": value,
        TS: now,
      })
    } else {
      res.json(404)
    }

  } else {
    res.json(400, {
      "message": "給人看的錯誤說明"
    })
  }
})
app.del('/kv/:base64', function (req, res) {
  if (URLSafeBase64.validate(req.params.base64)) {
    if (VALUE[req.params.base64]) {
      let now = moment.utc().format()
      var value = VALUE[req.params.base64]
      res.json(200, {
        "OLD_VALUE": value,
        TS: now,
      })
      delete VALUE[req.params.base64]
    } else {
      res.json({
        TS: now,
      })
    }
  } else {
    res.json(400, {
      "message": "給人看的錯誤說明"
    })
  }
})*/


