var express = require('express');
var router = express.Router();
var userModule=require('../controllers/user')
let joi=require('../config/joi')
let jwt=require('../config/jwt')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  })
router.post('/verifyEmail',joi.verifyMobile,userModule.verifyEmail)
router.post('/userSignup',joi.signup,userModule.userSignup)
router.get('/userLogin',joi.login,userModule.userLogin)
router.post('/addTask',joi.addTask,userModule.addTaskS)
router.patch('/updateTask',jwt.verifyToken,joi.updateTask,userModule.updateTask)
router.delete('/deleteTask',jwt.verifyToken,joi.deleteTask,userModule.deleteTask)
router.get('/getUserTask',jwt.verifyToken,joi.getUserTask,userModule.getUserTask)
module.exports = router;
