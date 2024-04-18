var ResHelper = require('../helper/ResponseHandle');
var jwt = require('jsonwebtoken');
var configs = require('../config/config')

module.exports = {
  verifyToken: function(req, res, next) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      ResHelper.ResponseSend(res, false, 404, "vui long dang nhap");
      return;
    }
    let token = req.headers.authorization.split(" ")[1];
    try {
        let decoded = jwt.verify(token, configs.SECRET_KEY);
        req.decoded = decoded;
      next();
    } catch (error) {
      ResHelper.ResponseSend(res, false, 404, "vui long dang nhap");
    }
  },

  verifyTokendmin : function(req, res, next){
    if (!req.decoded || !req.decoded.role || !req.decoded.role.includes("ADMIN")) {
      

        ResHelper.ResponseSend(res, false, 403, "Không có quyền truy cập");
        return;
    }
    next();
  }
};
