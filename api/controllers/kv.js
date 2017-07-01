
var URLSafeBase64 = require('urlsafe-base64');
var bodyParser = require('body-parser')
var moment = require('moment');


var VALUE = {

}



function getKEY(req, res) {
  if (URLSafeBase64.validate(req.params.base64)) {

    if (VALUE[req.params.base64]) {
      let now = moment.utc().format()
      var value = VALUE[req.params.base64]
      res.json(200,{
        "VALUE": value,
        TS: now,
      })
    } else {
      res.json(404,{
        message:'Not Found'
      })
    }

  } else {
    res.json(400, {
      "message": "req err"
    })
  }
}


function deleteKEY(req, res) {
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
      res.json(200,{
        TS: now,
      })
    }
  } else {
    res.json(400, {
      "message": "req err"
    })
  }
}

function postKEY(req, res) {
  if (URLSafeBase64.validate(req.params.base64)) {
    VALUE[req.params.base64] = req.body.VALUE
    //console.log(obj)
    let now = moment.utc().format()
    //console.log(now)
    res.json(200,{
      TS: now
    })
  } else {
    res.json(400, {
      "message": "req err"
    })
  }
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
