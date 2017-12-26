var configs = {
  appID: "wx4e7341e2ae882201",
  appsecret: "86ba9b392dcef4c9436f9d2bcc14bac8",
  token: "mytoken"
};

var express = require("express");
var wechat = require("wechat");
var app = express();
var port = "8080";

app.use("/wechat", wechat("token", function(req, res, next) {}));
app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.error(err);
  } else {
    console.info(`the express server has been listened at port: ${port}`);
  }
});
