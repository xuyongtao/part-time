var configs = {
  appID: "wx4e7341e2ae882201",
  appsecret: "86ba9b392dcef4c9436f9d2bcc14bac8",
  token: "mytoken"
};

var menu = {
  button: [
    {
      type: "click",
      name: "免费领书",
      key: "get_book"
    },
    {
      name: "菜单",
      sub_button: [
        {
          type: "view",
          name: "搜索",
          url: "http://www.baidu.com/"
        },
        {
          type: "click",
          name: "赞一下我们",
          key: "like"
        }
      ]
    }
  ]
};

var path = require("path");
var express = require("express");
var wechat = require("wechat");
var wechatApi = require("wechat-api");
var bodyParser = require("body-parser");
var Promise = require("thenfail").default;
var api = new wechatApi(configs.appID, configs.appsecret);
var app = express();
var port = "80";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../assets"), { maxAge: 2592000000 }));

app.use(
  "/wechat",
  wechat("token", function(req, res, next) {
    api.createMenu(menu, function(err, result) {
      console.log("creatMenu");
      if (err) {
        console.log("创建菜单失败");
      } else {
        var A = req.weixin;

        if (A.MsgType == "event" && A.Event == "CLICK" && A.EventKey == "get_book") {
          api.sendText(A.FromUserName, "功能正在开发中.....", function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          });
        } else if (A.MsgType == "event" && A.Event == "CLICK" && A.EventKey == "like") {
          api.sendText(A.FromUserName, "您的支持是我们的无限动力", function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          });
        } else {
          res.send("success");
        }
      }
    });
  })
);

app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.error(err);
  } else {
    console.info(`the express server has been listened at port: ${port}`);
  }
});
