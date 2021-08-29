const oktaWrapper = require('./js/api.js');
const express = require('express');
const path = require("path");
var cors = require('cors');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Provide files on demand
app.get('/', (req, res) => provide(res, 'index.html'));
app.get('/js/handleErrors.js', (req, res) => provide(res, 'js/handleErrors.js'));
app.get('/js/callMessage.js', (req, res) => provide(res, 'js/callMessage.js'));
app.get('/js/oktaSignIn.js', (req, res) => provide(res, 'js/oktaSignIn.js'));
app.get('/css/todolist.css', (req, res) => provide(res, 'css/todolist.css'));
app.get('/app/client.html', (req, res) => provide(res, 'app/client.html'));
app.get('/js/todolist.js', (req, res) => provide(res, 'js/todolist.js'));
app.get('/img/okta.png', (req, res) => provide(res, 'img/okta.png'));
app.get('favicon.ico', (req, res) => provide(res, 'img/okta.ico'));

// REST API redirects
app.post('/data/save', verifyToken, (req, res) => oktaWrapper.checkData(req, res, 'save'));
app.get('/data/restore', verifyToken, (req, res) => oktaWrapper.checkData(req, res, 'restore'));

function provide(res, file) {
  res.sendFile(path.join(__dirname, file));
}

function verifyToken(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    req.token = bearerHeader.split(' ')[1];
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// Listen for requests
app.listen(port, () => console.log(`Server app listening at http://localhost:${port}`));