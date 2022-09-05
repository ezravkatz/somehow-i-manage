const express = require('express');
const app = express()
const userController = require('../controllers/userController');
const pool = require('../controllers/userController')
const router = express.Router();
const mysql2 = require("mysql2");

//crud

//view 

router.get('/', function (req, res) {
  res.render('home', {});
});

//render add user form
app.get('/add-user', (req, res) => {
  res.render('add-user', {});
});

//render edit user
app.get('/edit-user', (req, res) => {
  res.render('edit-user', {});
});

//render user data

router.get('/', (req, res) => {
  let sql = `SELECT * FROM user ORDER BY id DESC`;
  pool.query(sql, (err, data) => {
    if (err) throw err;
    res.render('home',  {});
  });
});


// new mysql2.ConnectionPool(config).connect().then(pool => {
//   return pool.query `SELECT * FROM user ORDER BY id DESC`
// }).then(result => {

//   res.render('home', {
//       rows: result.recordset
//   });

// }).catch(err => {
//   console.log(err);
// });


// router.get("/", (req, res) => {
//   let query = `SELECT * FROM user ORDER BY id DESC`;

//   pool.query(query, (err, data) => {
//     if(err) {
//       throw error
//     }
//     else {
//       res.render('home', {title: 'user', action:'list', sampleData:data})
//     }
//   });

// });


// app.get('', (req, res) => {
//   pool.getConnection((err, connection) => {
//     if(err) throw err
//     console.log('Connected as ID' + connection.threadID)
//     connection.query(`SELECT * from user`, (err, rows) => {
//       connection.release() //release connection when finished

//       if(!err) {
//         res.send(rows)
//       } else {
//         console.log(err)
//       }

//       console.log('The data from the usermanagement table is: \n', rows)
//     })
//   })
// });

// router.get('/userController', function(req, res) {
//   let sql = 'SELECT * FROM user';
//   pool.query(sql, function (err, data) {
//     if (err) throw err;
//     res.render('user', {});
//   });;

// });

// router.get('/', function (req, res) {
//   res.render('home', {});
// });
// router.get('/', function(req, res) {
//   userController.view()});
// router.post('/', function (req, res) {
//   userController.find()});
// router.post('/:id', function(req, res) {
//   userController.delete()});
// router.post('/add-user', function (req, res) {
//   userController.add()});
// router.get('/edit-user', function (req, res) {
//    userController.edit()});
// router.post('/edituser/:id', function (res, req) {
//    userController.update()});

module.exports = app;
module.exports = router;
