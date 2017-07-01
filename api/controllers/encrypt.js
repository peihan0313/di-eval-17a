var request = require('request');

function encrypt(req, res) {
    if (req.headers['content-type'] !== 'application/json') {
        res.json(400, {
            message: 'Bad Request'
        })
    }
    if (!req.body['plaintext']) {
        res.json(400, {
            message: 'Bad Request'
        })
    }
    if (req.body['plaintext'].match(/[^0-9,a-f]/)) {
        res.json(400, {
            message: 'Bad Request'
        })
    }
    if (req.body['plaintext'] > 16) {
        res.json(413, {
            message: "Entity Too Large"
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
        res.json(200,
            body
        )
    });
}
module.exports = {
    encrypt
}

