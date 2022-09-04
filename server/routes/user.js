const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');

//crud

router.get('/', function (req, res) {
  res.render('home', {});
});
router.get('/', function(req, res) {
  userController.view(rows)});
router.post('/', function (req, res) {
  userController.find(rows)});
// router.post('/:id', UserController.delete)
// router.post('/add-user', UserController.add);
// router.get('/edit-user', UserController.edit);
// router.post('/edituser/:id', UserController.update);

module.exports = router;