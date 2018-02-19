const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

//allows sends objects through HTTP post and through into the database
app.use('/client', express.static('client'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>
  res.sendFile(`${__dirname}/index.html`)
);

app.listen(PORT, () =>
  console.log(`Your server is running on ${PORT}`)
);
