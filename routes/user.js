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
router.post('/user_task',jwt.verifyToken,joi.user_task,userModule.user_task)
router.patch('/updateTask',jwt.verifyToken,joi.updateTask,userModule.updateTask)
router.delete('/deleteTask',jwt.verifyToken,joi.deleteTask,userModule.deleteTask)
module.exports = router;
