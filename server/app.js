//npm instal to install node
//npm start
// curl local host
var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var books = require('./routes/books');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books', books);
// Catchall route
//first thing to do on the server is to create the module
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
