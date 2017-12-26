var configs = {
  appID: "wx4e7341e2ae882201",
  appsecret: "86ba9b392dcef4c9436f9d2bcc14bac8",
  token: "mytoken"
};

var menus = {
  button: [
    {
      type: "click",
      name: "今日歌曲",
      key: "V1001_TODAY_MUSIC"
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

var express = require("express");
var wechat = require("wechat");
var wechatApi = require("wechat-api");
var api = new wechatApi(configs.appID, configs.appsecret);
var app = express();
var port = "80";

app.get("/test", function(req, res) {
  res.send("hello world");
});

app.use(
  "/wechat",
  wechat("token", function(req, res, next) {
    api.createMenu(menu, function() {
      console.log(arguments);
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
