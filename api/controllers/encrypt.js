var request = require('request');
module.exports = function (req, res) {
    if (req.headers['content-type'] !== 'application/json') {
        res.json(400, {
            'err': 'err'
        })
    }
    if (!req.body['plaintext']) {
        res.json(400, {
            'errr': 'errr'
        })
    }
    if (req.body['plaintext'].match(/[^0-9,a-f]/)) {
        res.json(400, {
            'errr': 'errr'
        })
    }
    if (req.body['plaintext'] > 16) {
        res.json(413, {
            "message": "給人看的錯誤說明"
        })
    }


    var decode = {
        uri: 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
        method: 'POST',
        json: {
            "plaintext": "deadbeef"
        }
    };
    request(decode, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the shortened url.
        }
        res.json(
            body
        )
    });
}

