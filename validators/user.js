var { check } = require('express-validator');
var util = require('node:util');

var options = {
    username: {
        min: 8,
        max: 42
    },
    password: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
    }
}

var Notifies = {
    EMAIL_NOTI: 'Sai Định dạng email',
    USERNAME_NOTI: 'username có %d đến %d kí tự',
    PASSWORD_NOTI: 'pass dài ít nhất %d kí tự,có kí tự hoa,ký hiệu,kí tự số'
}

module.exports = {
    UserValidate: function () {
        return [
            check('email', Notifies.EMAIL_NOTI).isEmail(),
            check('username', util.format(Notifies.USERNAME_NOTI, options.username.min, options.username.max)).isLength(options.username),
            check('password', util.format(Notifies.PASSWORD_NOTI, options.password.minLength, options.password.minUppercase, options.password.minLowercase, options.password.minSymbols, options.password.minNumbers)).isStrongPassword(options.password),
            //check('role', 'Role khong hop le').isIn(['USER', 'ADMIN', 'PUBLISHER'])
        ]
    }
}