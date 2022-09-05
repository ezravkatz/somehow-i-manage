// const { redirect } = require("express/lib/response");
const mysql2 = require("mysql2");
const app = require('express')();
// //const router = require("../routes/user");

//connection
const pool = mysql2.createPool({
  connectionLimit: 100,
  port: 8080,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//router
app.get('/',(req, res) => {
  res.render('home', {});
});

//view users
exports.view = (req, res) => {
 
pool.getConnection((err, connection) => {
  if(err) throw err;
  console.log('Connected as ID' + connection.threadId);

  connection.query('SELECT * FROM user ORDER BY id DESC', (err, rows) => {
    connection.release();

    if(!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table \n', rows)
  });
});
};

// //getting list of users

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

// //View users
// exports.view = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err; 
//     console.log("Connected as ID" + connection.threadId);
 

//   //user connection
//   connection.query("SELECT * FROM user", (err, rows) => {
//     //when finished, release
//     connection.release();

//     if (!err) {
//       redirect.render = ( ("main", { rows }));
//     } else {
//       console.log(err);
//     }
//   });

//     console.log("Data from user table: \n", rows);
//   });
// }


// //User search

// exports.find = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //search configuration
//   const searchTerm = req.body.Search;
//   connection.query(
//     "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
//     ["%" + searchTerm + "%", "%" + searchTerm + "%"],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         redirect.render("main", { rows });
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     }
//   );
// };

// exports.form = (req, res) => {
//   res.render("add-user");
// };

// // get user by ID
// app.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//       if(err) throw err
//       connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
//           connection.release() // release when finished
//           if (!err) {
//               res.send(rows)
//           } else {
//               console.log(err)
//           }
          
//           console.log('The data from user table is: \n', rows)
//       })
//   })
// });

// //add user

// exports.add = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;
//   exports.find = (req, res) => {
//     pool.getConnection((err, connection) => {
//       if (err) throw err; //not connected
//       console.log("Connected as ID" + connection.threadId);

//       let searchTerm = req.body.Search;
//     });

//     //user connection
//     connection.query(
//       "INSERT INTO user first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
//       [first_name, last_name, email, phone, comments],
//       (err, rows) => {
//         //when finished, release
//         connection.release();

//         if (!err) {
//           redirect.render("add-user", { alert: "User successfully added!" });
//         } else {
//           console.log(err);
//         }

//         console.log("Data from user table: \n", rows);
//       }
//     );
//   };
// };

// //edit user

// exports.edit = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //user connection
//   connection.query(
//     "SELECT * FROM user WHERE id = ?",
//     [req.params.id],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         redirect.render("main", { rows });
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     }
//   );
// };

// //update user

// exports.update = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;

//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //user connection
//   connection.query(
//     "UPDATE user SET first_name = ?, last_name = ? email = ?, phone = ?, comment = ? WHERE id = ?>",
//     [first_name, last_name, email, phone, comments, req.params.id],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         pool.getConnection((err, connection) => {
//           if (err) throw err; //not connected
//           console.log("Connected as ID" + connection.threadId);
//         });

//         //user connection
//         connection.query(
//           "SELECT * FROM user WHERE id = ?",
//           [req.params.id],
//           (err, rows) => {
//             //when finished, release
//             connection.release();

//             if (!err) {
//               redirect.render("main", {
//                 rows,
//                 alert: `${first_name} has been updated.`,
//               });
//             } else {
//               console.log(err);
//             }

//             console.log("Data from user table: \n", rows);
//           }
//         );
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     }
//   );
// };

// //delete user

// exports.delete = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //user connection
//   connection.query(
//     "DELETE * FROM user WHERE id = ?",
//     [req.params.id],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         redirect.render("/", { rows });
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     });
  

//   // //search configuration
//   // connection.query(
//   //   "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
//   //   ["%" + searchTerm + "%", "%" + searchTerm + "%"],
//   //   (err, rows) => {
//   //     //when finished, release
//   //     connection.release();

//   //     if (!err) {
//   //       redirect.render("main", { rows });
//   //     } else {
//   //       console.log(err);
//   //     }

//   //     console.log("Data from user table: \n", rows);
//   //   }
//   // );

// exports.form = (req, res) => {
//   res.render("add-user");
// };

// //add user

// exports.add = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;
//   exports.find = (req, res) => {
//     pool.getConnection((err, connection) => {
//       if (err) throw err; //not connected
//       console.log("Connected as ID" + connection.threadId);

//       let searchTerm = req.body.Search;
//     });

//     //user connection
//     connection.query(
//       "INSERT INTO user first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
//       [first_name, last_name, email, phone, comments],
//       (err, rows) => {
//         //when finished, release
//         connection.release();

//         if (!err) {
//           redirect.render("add-user", { alert: "User successfully added!" });
//         } else {
//           console.log(err);
//         }

//         console.log("Data from user table: \n", rows);
//       }
//     );
//   };
// };

// //edit user

// exports.edit = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //user connection
//   connection.query(
//     "SELECT * FROM user WHERE id = ?",
//     [req.params.id],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         redirect.render("main", { rows });
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     }
//   );
// };

// //update user

// exports.update = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;

//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //user connection
//   connection.query(
//     "UPDATE user SET first_name = ?, last_name = ? email = ?, phone = ?, comment = ? WHERE id = ?>",
//     [first_name, last_name, email, phone, comments, req.params.id],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         pool.getConnection((err, connection) => {
//           if (err) throw err; //not connected
//           console.log("Connected as ID" + connection.threadId);
//         });

//         //user connection
//         connection.query(
//           "SELECT * FROM user WHERE id = ?",
//           [req.params.id],
//           (err, rows) => {
//             //when finished, release
//             connection.release();

//             if (!err) {
//               redirect.render("main", {
//                 rows,
//                 alert: `${first_name} has been updated.`,
//               });
//             } else {
//               console.log(err);
//             }

//             console.log("Data from user table: \n", rows);
//           }
//         );
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     }
//   );
// };

// //delete user

// exports.delete = (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err; //not connected
//     console.log("Connected as ID" + connection.threadId);
//   });

//   //user connection
//   connection.query(
//     "DELETE * FROM user WHERE id = ?",
//     [req.params.id],
//     (err, rows) => {
//       //when finished, release
//       connection.release();

//       if (!err) {
//         redirect.render("/", { rows });
//       } else {
//         console.log(err);
//       }

//       console.log("Data from user table: \n", rows);
//     });
//   };
// }
  module.exports = pool;
//   module.exports = userController;