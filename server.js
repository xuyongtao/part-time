var configs = {
  appID: "wx4e7341e2ae882201",
  appsecret: "86ba9b392dcef4c9436f9d2bcc14bac8",
  token: "token"
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
          key: "user_like"
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
  wechat(configs.token, function(req, res, next) {
    api.createMenu(menu, function(err, result) {
      console.log("creatMenu");
      if (err) {
        console.log("创建菜单失败");
      } else {
        var A = req.weixin;
        var userOpenId = A.FromUserName;

        if (A.MsgType == "event" && A.Event == "CLICK" && A.EventKey == "get_book") {
          // 获取用户的基本信息
          new Promise((resolve, reject) => {
            api.getUser({ openid: userOpenId, lang: "zh_CN" }, (err, result) => {
              if (err) {
                reject(err);
              } else {
                console.log("inner headimgurl: " + result.headimgurl);
                resolve(result.headimgurl);
              }
            });
          })
            // .then(headimgurl => {
            //   console.log("outter headimgurl: " + headimgurl);

            //   return new Promise((resolve, reject) => {
            //     api.uploadImage(headimgurl, (err, result) => {
            //       if (err) {
            //         reject(err);
            //       } else {
            //         console.log("mediaId: " + result.media_id);
            //         resolve(result.media_id);
            //       }
            //     });
            //   });
            // })
            // .then(mediaId => {
            //   return new Promise((resolve, reject) => {
            //     api.sendImage(userOpenId, mediaId, (err, result) => {
            //       if (err) {
            //         reject(err);
            //       }
            //     });
            //   });
            // })
            .then(() => {
              return new Promise((resolve, reject) => {
                api.sendText(userOpenId, "功能正在开发中.....", (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              });
            })
            .fail(err => {
              console.log(err);
            })
            .handle(() => {
              res.send("success");
            });

          // api.sendText(userOpenId, "功能正在开发中.....", function(err, result) {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     res.send("success");
          //   }
          // });
        } else if (A.MsgType == "event" && A.Event == "CLICK" && A.EventKey == "user_like") {
          api.sendText(userOpenId, "您的支持是我们的无限动力", function(err, result) {
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
