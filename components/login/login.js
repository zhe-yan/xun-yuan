// pages/login/login.js
var tetris = require("../../module/tetris").tetris;
var ajax = require("../../module/ajax").ajax;

Component({
    data: {

        showTopTips: false,
        ExternalToken: "",
        V_VUBI : {},

        accounts: ["微信号", "QQ", "Email"],
        accountIndex: 0,

        isAgree: false,
        formData: {

        },
        rules: [{
            name: 'username',
            rules: {
                required: true,
                message: '用户名必填'
            },
        }, {
            name: 'password',
            rules: [{
                required: true,
                message: '密码必填'
            }],
        }]
    },
    methods: {
        checkboxChange: function (e) {
            console.log('checkbox发生change事件，携带value值为：', e.detail.value);

            var checkboxItems = this.data.checkboxItems,
                values = e.detail.value;
            for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
                checkboxItems[i].checked = false;

                for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                    if (checkboxItems[i].value == values[j]) {
                        checkboxItems[i].checked = true;
                        break;
                    }
                }
            }

            this.setData({
                checkboxItems: checkboxItems,
                [`formData.checkbox`]: e.detail.value
            });
        },
        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value,
                [`formData.date`]: e.detail.value
            })
        },
        formInputChange(e) {
            const {
                field
            } = e.currentTarget.dataset
            this.setData({
                [`formData.${field}`]: e.detail.value
            })
        },
        bindAccountChange: function (e) {
            console.log('picker account 发生选择改变，携带值为', e.detail.value);

            this.setData({
                accountIndex: e.detail.value
            })
        },
        bindAgreeChange: function (e) {
            this.setData({
                isAgree: !!e.detail.value.length
            });
        },
        submitForm() {
            var self = this;
            this.selectComponent('#form').validate((valid, errors) => {
                console.log(self.data)

            })

            ajax.getData({
                url:"../MAPI/Account/Authorization",
                postdata: {
                    Action: 'signin',
                    LoginName: self.data.formData.username,
                    LoginPassword: self.data.formData.password,
                    LoginLocation: "chongqing",
                    LoginDeviceType: 9,
                    LoginIP: "192.168.0.194" 
                },
                success: function (res) {
                    console.log(res.data)
                    if (res.data.type == "success") {
                        //清空聊天记录
                        tetris.storageTool.remove("roomList");
                        tetris.storageTool.remove("msgList");
                        self.data.ExternalToken = res.data.returnobject.ExternalToken;
                        //SignalRUser = res.data.returnobject.SignalRUser.replace(/%2F/g, "/");
                        self.data.V_VUBI = res.data.returnobject.V_UBI;
                        //缓存用户数据
                        console.log("緩存前檢查")
                        console.log("token:"+self.data.ExternalToken)
                        tetris.storageTool.setString("loginName", self.data.formData.username);
                        tetris.storageTool.setString("redisUser_ExternalToken", self.data.ExternalToken);
                        //tetris.storageTool.setString("signalRUser", SignalRUser);
                        tetris.storageTool.setString("vubi", self.data.V_VUBI);
                        tetris.storageTool.setString("popupCard", res.data.returnobject.V_UBI.UserId.toString());
                        console.log("緩存後檢查")
                        console.log("token:"+tetris.storageTool.getString("redisUser_ExternalToken"))
                        //重置心跳时间
                        //heartBeat.reset();
                        //master跳转
                        //跳转
                        if (self.data.V_VUBI.LivePlaceCity == '' || self.data.V_VUBI.LivePlaceCity == null ||
                        self.data.V_VUBI.LivePlaceCountry == '' || self.data.V_VUBI.LivePlaceCountry == null ||
                        self.data.V_VUBI.LivePlaceProvince == '' || self.data.V_VUBI.LivePlaceProvince == null) {
                            //完整信息
                        } else {
                            wx.switchTab({
                                url: '../index/index',
                            })
                        }
                    } else {
                        //$("#lm-login-msg").html(SignIn.message);
                    }
                }
            })
        }
    }
});