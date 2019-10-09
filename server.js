const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();
const port = process.env.PORT || 5000;

const selectAll = 'SELECT * FROM animal_counts';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ARC',
  password: '1234',
  database: 'animal_db',
  dateStrings: true

});

// ALTER USER 'ARC'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'
// GRANT ALL PRIVILEGES ON *.* TO 'ARC'@'localhost' WITH GRANT OPTION;

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database has been connected successfully')
    console.log('ARC demo is Loading...')

  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// console.log(connection);
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  connection.query(selectAll, (err, results) => {
    if (err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  })
});


app.listen(port, () => console.log(`Listening on port ${port}`));