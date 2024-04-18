var express = require('express');
var router = express.Router();
var userModel = require('../schemas/user')
var ResHelper = require('../helper/ResponseHandle');
var Validator = require('../validators/user');
const { validationResult } = require('express-validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var configs = require('../config/config')


router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    ResHelper.ResponseSend(res, false, 404, 'username va password phai dien day du');
    return;
  }
  let user = await userModel.findOne({ username: username });
  if (!user) {
    ResHelper.ResponseSend(res, false, 404, 'username hoac password khong dung');
    return;
  }
  var checkpass = bcrypt.compareSync(password, user.password);
  if (checkpass) {
    const token = user.getJWT();
    res.cookie('token', token);

    ResHelper.ResponseSend(res, true, 200, token);
  } else {
    ResHelper.ResponseSend(res, false, 404, 'username hoac password khong dung');
  }

});
router.post('/register', Validator.UserValidate(), async function (req, res, next) {
  var errors = validationResult(req).errors;
  if (errors.length > 0) {
    ResHelper.ResponseSend(res, false, 404, errors);
    return;
  }
  try {
    const existingUser = await userModel.findOne({username : req.body.username });
    if(existingUser) {
      ResHelper.ResponseSend(res, false, 400, "Tên người dùng đã tồn tại trong hệ thống.");
      return;
    }
    var newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: ['USER']
    })
    await newUser.save();
    ResHelper.ResponseSend(res, true, 200, newUser)
  } catch (error) {
    ResHelper.ResponseSend(res, false, 404, error)
  }
});

router.post('/logout', function(req, res) {
  // Xóa cookie token
  res.clearCookie('token');
  // Gửi phản hồi cho client
  res.send({ success: true, message: 'Đăng xuất thành công' });
});



module.exports = router;
