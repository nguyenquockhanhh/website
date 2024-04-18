var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken')
var configs = require('../config/config')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: [String],
        default: ["USER"]
    },
    status: {
        type: Boolean,
        default: true
    },
    email: String
}, { timestamps: true })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

userSchema.methods.getJWT = function () {
    var token = jwt.sign({ id: this._id , username: this.username , role: this.role}, configs.SECRET_KEY, {
        expiresIn: configs.EXP_JWT
    });
    return token;
}
userSchema.methods.genTokenResetPassword = function () {
    this.ResetPasswordToken = crypto.randomBytes(30).toString('hex');
    this.ResetPasswordExp = Date.now() + 60 * 1000 * 10;
    return this.ResetPasswordToken;
}

module.exports = new mongoose.model('user', userSchema);