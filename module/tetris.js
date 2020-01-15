var tetris = {
  /*本地存储对象: localstorage
  * limitSize：10240Kb（wx.getStorageInfoSync().limitSize）
  */
  storageTool : {
    /*设置 对象 同步版本
    * key: 对象的键
    * value: 对象
    * return: 是否成功
    */
    setString: function (key, value) {
      try{
        wx.setStorageSync(key, value);
        return true;
      }catch(e){
        console.error(e);
        return false;
      }
    },
    /*设置 对象 异步版本
    * obj：json格式对象，key，data项必填，可选项包括3个回调函数，success，fail，complete
    * return: 是否成功
    */
    setStringAsync: function (obj) {
      wx.setStorage(obj);
    },
    /*获得 对象
    * key: 对象的键
    * nullReturn: 结果为null的时候，返回的替代值（选填项）
    * return: 对象
    */
    getString: function (key, nullReturn) {
      try {
        var value = wx.getStorageSync(key)
        if (value == null && nullReturn != undefined)
          return nullReturn;
        else
          return value;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    /*移除 某个存储
    * key: 存储的键
    * return: 是否成功
    */
    remove: function (key) {
      if (localStorage) {
        localStorage.removeItem(key);
        return true;
      }
      else
        return false;
    },
    /*设置某对象的当日数量值（数字型） 到storage。
    * itemName: 对象的名字
    * itemIncrement: 增量值（默认每次增量为1）
    */
    setDailyCount: function (itemName, itemIncrement) {
      if (localStorage) {
        //先判断是否已经存在
        //debugger
        var today = dateTool.getDate();
        var dailyCount = JSON.parse(localStorage.getItem("DailyCount"));
        if (dailyCount != null && dailyCount["date"] == today) {
          //修改
          var value = dailyCount["list"][itemName] == undefined ? 0 : dailyCount["list"][itemName];
          var itemValue = parseInt(value) + itemIncrement;
          dailyCount["list"][itemName] = itemValue;
        }
        else {
          //新建
          dailyCount = {};
          dailyCount["date"] = today;
          dailyCount["list"] = { itemName: itemIncrement };
        }
        localStorage.setItem("DailyCount", JSON.stringify(dailyCount));
        return true;
      }
      else
        return false;
    },
    /*从storage中 获取某对象的当日数量值。
    * itemName: 对象的名字
    * return：对象的当日数量值（数字型）
    */
    getDailyCount: function (itemName) {
      if (localStorage) {
        //先判断是否已经存在
        //debugger
        var today = dateTool.getDate();
        var dailyCount = JSON.parse(localStorage.getItem("DailyCount"));
        if (dailyCount != null && dailyCount["date"] == today) {
          //读取
          var value = dailyCount["list"][itemName] == undefined ? 0 : dailyCount["list"][itemName];
          var itemValue = parseInt(value);
          return itemValue;
        }
        else {
          return 0;
        }
      }
      else
        return 0;
    },

    /*设置对象当日的值 到 storage列表中
    * listName: list的名字
    * itemName: 对象的名字
    * itemValue: 对象的值
    */
    setItemIntoList: function (listName, itemName, itemValue) {
      if (localStorage) {
        //先判断是否已经存在
        //debugger
        var today = dateTool.getDate();
        var myList = JSON.parse(localStorage.getItem(listName));
        if (myList != null && myList["date"] == today) {
          //修改
          myList["list"]["" + itemName] = itemValue;
        }
        else {
          //新建
          myList = {};
          myList["date"] = today;
          myList["list"] = {};
          myList["list"][itemName] = itemValue;
        }
        localStorage.setItem(listName, JSON.stringify(myList));
        return true;
      }
      else
        return false;
    },
    /*从storage 获取 列表中对象当日的值
    * listName: list的名字
    * itemName: 对象的名字
    */
    getItemFromList: function (listName, itemName) {
      if (localStorage) {
        //先判断是否已经存在
        //debugger
        var today = dateTool.getDate();
        var myList = JSON.parse(localStorage.getItem(listName));
        if (myList != null && myList["date"] == today) {
          //读取
          return myList["list"][itemName];
        }
        else {
          return null;
        }
      }
      else
        return undefined;
    },
    /*删除Storage中 JSON列表对象中的 某一个的键的值
    * istName: list的名字
    * itemName: 对象的名字
    */
    delItemFromList: function (listName, itemName) {
      if (localStorage) {
        //先判断是否已经存在
        //debugger
        var today = dateTool.getDate();
        var myList = JSON.parse(localStorage.getItem(listName));
        if (myList != null && myList["date"] == today) {
          //读取
          if (myList["list"][itemName] != undefined) {
            delete myList["list"][itemName];
          }
        }
        localStorage.setItem(listName, JSON.stringify(myList));
        return true;
      }
      else
        return false;
    },
    /*清空 全部存储
    * return: 是否成功
    */
    clear: function () {
      try {
        wx.clearStorageSync();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
  dialog : {
    //需要重写

  },
  /*字符串工具类*/
  stringTool : {
    /*生成随机的数字构成的字符串
    * length: 字符串长度
    * return: 数字构成的字符串
    */
    getRandomNumberString: function (length) {
      var verticode = "";
      var code = "";
      for (i = 0; i < length; i++) {
        code = Math.floor(Math.random() * 10);
        verticode += code;
      }
      return verticode;
    },
    /*截取字符串
    * inputString: 百分比字符串，例如89%
    * startIndex: 开始位置
    * length: 字符串长度
    * nullReturn: 结果为null/undefined的时候，返回的替代值（选填项）
    * return: 截取后的字符串
    */
    getRange: function (inputString, startIndex, length, nullReturn) {
      if (inputString == null || inputString == undefined) {
        if (nullReturn != undefined)
          return nullReturn;
        else
          return "";
      }
      else
        return inputString.substring(startIndex, length);
    },
    /*html标签做转义
    * inputString：包含html标签的字符串
    * return: 转义后的新字符串
    */
    html2text: function (inputString) {
      if (typeof (inputString) == "string") {
        return inputString.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[/]/g, "&#47;");
      }
      else
        return "";
    },
    /*百分比字符串转化★★★☆☆。每20%一颗★
    * inputString: 百分比字符串，例如89%
    * return: ★★★☆☆ 格式
    */
    percentageToStar: function (inputString) {
      //debugger
      var pace = 20;
      var amount = parseInt(inputString.substring(0, inputString.length - 1));
      var count1 = Math.floor(amount / pace);
      var count2 = 5 - count1;
      var outputString = "";
      for (i = 0; i < count1; i++)
        outputString += "★";
      for (j = 0; j < count2; j++)
        outputString += "☆";
      return outputString;
    },
    /*将日期字符串 转化为 日期对象
    * inputString: 日期字符串。YYYY-DD-MM HH:MM:SS
    * return: 日期对象。
    */
    stringToDate: function (inputString) {
      var converted = Date.parse(inputString);
      var tmpDate = new Date(converted);
      if (isNaN(tmpDate)) {
        var arys = inputString.split('-');
        tmpDate = new Date(arys[0], arys[1], arys[2]);
      }
      return tmpDate;
    },
    /*将格式有差异的日期字符串标准化。去掉时区和微秒
    * inputString: 日期字符串。如果使用了日期对象，则异常处理
    * return: 标准格式的日期字符串。YYYY-DD-MM HH:MM:SS
    */
    unifyDateString: function (inputString) {
      if (typeof inputString == 'string')//如果是字符串转换为日期型
      {
        //IE和Safari需要使用带T和微秒的日期格式
        if (getBrowser().browser == "ie" || getBrowser().browser == "safari" || getBrowser().browser == "unknown") {
          return inputString;
        }
        else
          return inputString.replace("T", " ").split(".")[0];
      }
      else if (typeof inputString == 'object')//如果错误的输入了日期对象
      {
        return dateTool.getDate2(inputString, 'yyyy-MM-dd HH:mm:ss');
      }
      else {
        return "错误的日期格式！";
      }
    },
    /*解析url字符串，转为Json对象。url只能是某网页开头，例如：Karma_Friend_Content?Tab=ReceiveRequests
    * inputString: url字符串
    * return: Json对象。结构为：{PageName: "Karma_Friend_Content", Tab:"ReceiveRequests", 其他参数: "其他参数的值"}
    */
    urlToJson: function (inputString) {
      if (inputString == undefined || inputString == "") {
        return {};
      }
      else {
        var pageName = inputString.split('?')[0];
        var pageParm = inputString.split('?')[1];
        var rerturnJson = { PageName: pageName };

        if (pageParm != undefined) {
          var params = pageParm.split("&");
          for (var i = 0; i < params.length; i++) {
            rerturnJson[params[i].split('=')[0]] = params[i].split('=')[1];
          }
        }
        return rerturnJson;
      }
    },
    /*使用正则表达式 验证 字符串格式
    * type: 检测类型。字符串：email|mobile|postalcode 等
    * inputString: 待验证的字符串
    * return: 是否通过
    */
    validate: function (type, inputString) {
      var regs = {
        email: /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        mobile: /^1(3|4|5|7|8)\d{9}$/,
        postalcode: /^[1-9][0-9]{5}$/,
        qq: /[1-9][0-9]{4,}/,
        url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      }
      var reg = regs[type];
      if (reg.test(inputString))
        return true;
      else
        return false;
    },
  },


  /*角色方法*/
  role : {
    /*判断是否包含某个角色
    * userRole: 第一角色（传入V_VUBI.UserRole）
    * roles: 额外角色集合（传入V_VUBI.Roles）
    * roleId: 角色Id
    */
    hasRole: function (userRole, roles, roleId) {
      if (userRole == roleId)
        return true;
      var result = false;
      $(roles).each(function (index, data) {
        if (data.RoleId == roleId) {
          result = true;
          return false;       //找到就跳出循环
        }
      });
      return result;
    },
    /*判断能否访问
    * userRole: 第一角色（传入V_VUBI.UserRole）
    * permission: 权限Id
    */
    canVisit: function (userRole, permission) {
      if (userRole >= permission)
        return true;
      else
        return false;
    },
    /*判断是否包含某个角色组
    * roles: 角色集合（传入V_VUBI.Roles）
    * roleGroupId: 角色组Id（User = 10, StarUser = 20）
    */
    hasRoleGroup: function (roles, roleGroupId) {
      if (roleGroupId == 10)
        return true;
      var result = false;
      $(roles).each(function (index, data) {
        if (data.RoleGroup == roleGroupId) {
          result = true;
          return false;       //找到就跳出循环
        }
      });
      return result;
    },
    /*弹框反馈缺少某个角色的消息
    * roleId: 角色Id
    * action: 操作行为。例如 写信、约会
    */
    requireRole: function (roleId, action) {
      var action = action == undefined ? "" : action;
      dialog.showMessage('warning', '角色限制', action + '需要<strong>' + systemEnums.getUserRoleName(roleId) + '</strong>角色. 赶快升级吧！');
    },
    /*判断角色的样式
    * roleId: 角色Id
    * return: 角色对应的样式。default|info|warning|danger
    */
    getStyle: function (roleId) {
      var roleStyle;
      switch (roleId) {
        case 11:
          roleStyle = 'default';
          break;
        case 12:
          roleStyle = 'info';
          break;
        case 13:
          roleStyle = 'warning';
          break;
        case 14:
          roleStyle = 'danger';
          break;
        default:
          roleStyle = 'default';
          break;
      }
      return roleStyle;
    },
  },
/*短信验证码*/
smsVerticode: {
    /*触发验证码倒计时
    **$trigger：jquery对象,如$('#asd')
    **num：倒计时的秒数
    */
    hsTime: function ($trigger, num) {
      var i = setInterval(function () {
        num--;
        $trigger.attr("disabled", true).html(num + '秒后可重发');
        if (num == 0) {
          $trigger.removeAttr("disabled").html('重新发验证码');
          clearInterval(i);//清除定时器  
        }
      }, 1000);
    }
  },
/*短信验证码*/
smsVerticode2 : {
    /*触发验证码倒计时
    **$trigger：jquery对象,如$('#asd')
    **num：倒计时的秒数
    */
    hsTime: function ($trigger, num) {
      var i = setInterval(function () {
        num--;
        $trigger.attr("disabled", true).html(num + '秒后可重发');
        if (num == 0) {
          $trigger.removeAttr("disabled").html('重新发验证码');
          clearInterval(i);//清除定时器  
        }
      }, 1000);
    }
  },

/*打的标签*/
  makeTags : {
    handleTags: function (mytags) {
      var tagDesc = "";
      var tags = mytags.split(' ');
      $.each(tags, function (index, tag) {
        if (tag != "") {
          tagDesc += '<span class="label label-default" style="margin-right:5px;font-size:8px;color:grey;background-color:#fff;border:1px solid grey;">' + tag + '</span>';
        }
      });
      return tagDesc;
    }
  },

/*权限方法*/
  privilege : {
    /*判断是否包含某个权限
    * privileges: 角色集合（传入V_VUBI.Privileges）
    * privilegeId: 权限Id
    */
    hasPrivilege: function (privileges, privilegeId) {
      var result = false;
      $(privileges).each(function (index, data) {
        if (data.PrivilegeId == privilegeId) {
          result = true;
          return false;       //找到就跳出循环
        }
      });
      return result;
    },
    /*弹框反馈缺少某个权限的消息
    * privilegeId: 权限Id
    * action: 操作行为。例如 写信、约会
    */
    requirePrivilege: function (privilegeId, action) {
      var action = action == undefined ? "" : action;
      dialog.showMessage('info', '权限不足', action + '需要<strong>' + systemEnums.getPrivilegeName(privilegeId) + '</strong>权限. 请完善个人资料，获得这个权限吧！');
    },

  },

/*角色组（个人、管理员、服务商等）*/
  roleGroup: {
    /*获取目标的主页Url
    * targetRole: 目标的角色
    * targetTd: 目标的Id
    * return: 是否包含。目标的主页Url
    */
    getClickEvent: function (targetRole, targetTd) {
      var url;
      switch (targetRole) {
        case 10:    //User
          url = "Profile/Info?UserId=" + targetTd;
          break;
        case 60:    //Partner
          url = "Partner/Info?PartnerId=" + targetTd;
          break;
        case 80:    //Agent
          url = "Agent/Info?AgentId=" + targetTd;
          break;
        case 100:    //Vendor
          url = "Vendor/Info?VendorId=" + targetTd;
          break;
        case 200:    //Operator
          url = "Operator/Info?OperatorId=" + targetTd;
          break;
        case 210:    //AI
          url = "";
          break;
        default:
          url = "";
          break;
      }
      if (url != "")
        return ' onclick="master.openPage(\'' + url + '\',true)" ';
      else
        return "";
    },

  },

/*联系*/
  nexus : {
    /*判断是否包含某个联系
    * nexusList: 联系集合集合（传入list）
    * nexuseType: 联系类型
    * return: 是否包含。true/false
    */
    hasNexus: function (nexusList, nexuseType) {
      var result = false;
      $(nexusList).each(function (index, data) {
        if (data.UserNexusType == nexuseType) {
          result = true;
          return false;       //找到就跳出循环
        }
      });
      return result;
    },
    /*判断某个联系的天数：现存联系返回持续天数，过去的联系返回结束后的天数
    * nexusList: 联系集合集合（传入list）
    * nexuseType: 联系类型
    * return: 天数
    */
    hasNexusDays: function (nexusList, nexuseType) {
      var days = 0;
      $(nexusList).each(function (index, data) {
        if (data.UserNexusType == nexuseType) {
          if (data.EndDate == null)
            days = dateTool.daysPast(data.StartDate);
          else
            days = dateTool.daysPast(data.EndDate);
          return false;       //找到就跳出循环
        }
      });
      return days;
    },
    /*判断是否 大于等于某个联系
    * nexusList: 联系集合集合（传入list）
    * nexuseType: 联系类型
    * return: 大于等于。true/false
    */
    moreThan: function (nexusList, nexuseType) {
      var result = false;
      $(nexusList).each(function (index, data) {
        if (data.UserNexusType >= nexuseType) {
          result = true;
          return false;       //找到就跳出循环
        }
      });
      return result;
    },
    /*新增某个联系
    * nexusList: 联系集合集合（传入list）
    * nexuse: 对象
    */
    addNexus: function (nexusList, nexus) {
      var exist = false;
      $(nexusList).each(function (index, data) {
        if (data.UserNexusType == nexus.UserNexusType) {
          exist = true;
          return false;       //找到就跳出循环
        }
      });
      if (!exist)
        nexusList.push(nexus)
    },
    /*删除某个联系
    * nexusList: 联系集合集合（传入list）
    * nexuseType: 联系类型
    */
    delNexus: function (nexusList, nexuseType) {
      $(nexusList).each(function (index, data) {
        if (data.UserNexusType == UserNexusType) {
          nexusList.splice(index, 1);
          return false;       //找到就跳出循环
        }
      });
    },
  },

/*前端 数据解析功能*/
systemEnums : {
    /*获得 用户角色名称
    * userRoleId: 用户角色Id
    */
    getUserRoleName: function (userRoleId) {
      var names = {
        k11: "新用户", k12: "会员", k13: "诚信会员", k14: "诚信会员II"
      }
      return names['k' + userRoleId] == undefined ? "未知" : names['k' + userRoleId];
    },
    /*获得 权限名称
    * privilegeId: 权限Id
    */
    getPrivilegeName: function (privilegeId) {
      var names = {
        k11: "查看资料", k12: "搜索会员",
        k21: "新人展示", k22: "社交沟通", k23: "站内活动", k24: "免费服务",
        k31: "精确搜索", k32: "查看匹配", k33: "黑名单",
        k41: "照片加密",
        k51: "统计报表", k52: "优先服务",
        k61: "个性装扮", k62: "个性相册", k65: "实时聊天",
        k71: "排名靠前", k72: "增强相册", k74: "美丽缘分", k75: "离线聊天",
        k81: "数据分析",
        k91: "隐身浏览", k95: "账号保护",
        k100: "发起聚会",
        k121: "星秀展示",
        k131: "更多好友",
        k141: "破格写信",
      }
      return names['k' + privilegeId];
    },
    /*获得 访问权限名称
    * visitPermissionId: 访问权限Id
    */
    getVisitPermissionName: function (visitPermissionId) {
      var names = {
        k11: "公开", k12: "会员", k13: "诚信会员", k14: "诚信会员II"
      }
      return names['k' + visitPermissionId] == undefined ? "未知" : names['k' + visitPermissionId];
    },
    /*获得 婚姻状态
    * statusValue: 婚姻状态的值
    */
    getMarriageStatus: function (statusValue) {
      var names = {
        k1: "未婚", k2: "离异", k3: "丧偶", k9: "已婚"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 约会状态
    * statusValue: 约会状态的值
    */
    getDatingStatus: function (statusValue) {
      var names = {
        k1: "征友中", k2: "约会中", k3: "恋爱中", k4: "已结婚"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 请求状态
    * statusValue: 请求状态的值
    */
    getRequestStatus: function (statusValue) {
      var names = {
        k1: "新请求", k2: "已读", k3: "已反馈", k6: "已撤销", k7: "已退出", k8: "已过期", k9: "已结束", k10: "已收藏", k99: "已删除"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 聚会后的评价分值 枚举
    * statusValue: 请求状态的值
    */
    getAPRemarkScore: function (statusValue) {
      var names = {
        k1: "很差", k2: "没劲", k3: "一般", k4: "不错", k5: "愉快"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 文章类型 枚举
    * statusValue: 文章类型的值
    */
    getArticleType: function (statusValue) {
      var names = {
        k0: "全部类型", k1: "生活随笔", k2: "感情心得", k3: "爱情故事", k4: "网站征文", k5: "转载博文", k9: "其他杂文"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 视频类型 枚举
    * statusValue: 视频类型的值
    */
    getVideoType: function (statusValue) {
      var names = {
        k0: "全部类型", k1: "个人介绍", k2: "爱情观点", k3: "工作学习", k4: "业余生活", k5: "社交活动", k9: "其他视频"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 课程类型 枚举
    * statusValue: 文章类型的值
    */
    getCourseType: function (statusValue) {
      var names = {
        k0: "全部类型", k1: "恋爱技巧", k2: "约会礼仪", k3: "专家建议", k4: "麻辣观点", k9: "其他"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
    /*获得 服务状态 枚举
    * statusValue: 服务状态的值
    */
    getServiceStatus: function (statusValue) {
      var names = {
        k0: "新服务", k1: "已触发", k2: "已处理", k6: "已拒绝", k9: "已过期"
      }
      return names['k' + statusValue] == undefined ? "未知" : names['k' + statusValue];
    },
  },


  
}


module.exports.tetris = tetris