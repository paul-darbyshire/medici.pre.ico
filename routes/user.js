// Simpe test app form to connect to mysql
// local or cloud (Heroku) and query database
const express = require('express');
const mysql = require('mysql');
var config = require('../config/config.js');
var secure = require('../public/js/secure.js');

const router = express.Router();

router.get('/messages', (req, res) => {
  console.log("Show some messages...");
  res.end();
});

const pool = mysql.createPool(config.local);
//const pool = mysql.createPool(config.heroku);
function getConnection() {
  return pool;
}

router.get('/users', (req, res) => {
    const connection = getConnection();
    const queryString = "SELECT * FROM users";
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
  
router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id);
  
    const connection = getConnection();
  
    const userId = req.params.id;
    const queryString = "SELECT * FROM users WHERE id = ?";
    connection.query(queryString, [userId], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err);
        res.sendStatus(500);
        return;
        // throw err
      }
  
      console.log("Fetched user successfully...");
  
      const users = rows.map((row) => {
        console.log(row.username);
        return { userName: row.username, passWord: row.password };
      });
  
      res.json(users);
    });
  });

  router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...");
    
    console.log("Username: " + req.body.create_username);
    console.log("Password: " + req.body.create_password);
    var userName = secure.encrypt(req.body.create_username);
    var passWord = req.body.create_password;


    console.log('encrypted: ', userName.content);
    console.log('decrypted: ', secure.decrypt(userName));
  
    const queryString = "INSERT INTO users (username, password) VALUES (?, ?)";
    getConnection().query(queryString, [userName.content, passWord], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err);
        res.sendStatus(500);
        return;
      }
  
      console.log("Inserted a new user with ID: ", results.insertId);
      res.end();
    });
  });

module.exports = router;