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
          url: "http://www.soso.com/"
        },
        {
          type: "click",
          name: "赞一下我们",
          key: "V1001_GOOD"
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
        var wechatA = req.weixin;

        if (wechatA.MsgType == "event" && wechatA.Event == "CLICK" && wechatA.EventKey == "get_book") {
          res.send("功能正在开发中.....");
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
