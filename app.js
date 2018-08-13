// Simple express test app to start web server...
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use(morgan('short'));

const router = require('./routes/user.js');
app.use(router);

app.get("/", (req, res) => {
  console.log("Responding to ROOT route");
  res.send("Hello from ROOT");
});

const PORT = process.env.PORT || 3003;
// localhost:3003
// NOTE: CTRL + C to kill process OR:
// $ killall -9 node
// $ ps ax 
app.listen(PORT, () => {
  console.log("Server is listening on PORT: "+PORT);
});