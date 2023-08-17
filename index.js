// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const ifInvalidDate = (date) => { return date === 'Invalid Date'}
// for the 2015-12-25 api endpoint...
app.get("/api/:date", function (req, res) {

  const date = new Date(req.params.date)
  if (ifInvalidDate(date)) {
    res.json("Invalid Date")
  } else {
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  }
});

// for the api/1451001600000 endpoint...
app.get("/api/1451001600000", function (req, res) {
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
