<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" :theme="chatBarTheme" active-name="1">
          <MenuItem name="1">
            <Icon type="ios-paper"/>
            内容管理
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people"/>
            用户管理
          </MenuItem>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>
              统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
          <MenuItem name="4">
            <Icon type="ios-construct"/>
            综合设置
          </MenuItem>
        </Menu>
        <br>
      </Header>
      <Layout>
        <Layout :style="{padding: '0 24px 24px'}">
          <!--        主体-->
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Scroll height="500" :on-reach-top="handleReachTop">
              <List item-layout="vertical" :border="false">
                <ListItem v-for="(item,index) in historyMsgList[currentUser]" :key="index">
                  <!-- user-->
                  <Card v-if="staffInfo.nickName!==item.nickName" class="card-left"
                        :bordered="false" dis-hover>
                    <Avatar :src=userInfoList[currentUser].avatar title="avatar"/>
                    <label style="margin-left: 8pt;">{{ userInfoList[currentUser].nickName }}</label>
                    <p style="margin-left: 30pt;margin-top: 10pt;">
                      {{ item.msg }}
                    </p>
                  </Card>
                  <!-- staff-->
                  <Card v-else="" class="card-right" :bordered="false" dis-hover>
                    <label style="margin-right: 8pt;">{{ staffInfo.nickName }}</label>
                    <Avatar :src=staffInfo.avatar title="avatar"/>
                    <p style="margin-right: 30pt;margin-top: 10pt;">
                      {{ item.msg }}
                    </p>
                  </Card>
                </ListItem>
              </List>
            </Scroll>
          </Content>
          <Footer>
            <Menu mode="horizontal" :theme="chatBarTheme" active-name="1">
              <MenuItem name="1">
                <Icon type="ios-paper"/>
                内容管理
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-people"/>
                用户管理
              </MenuItem>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-stats"/>
                  统计分析
                </template>
                <MenuGroup title="使用">
                  <MenuItem name="3-1">新增和启动</MenuItem>
                  <MenuItem name="3-2">活跃分析</MenuItem>
                  <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                  <MenuItem name="3-4">用户留存</MenuItem>
                  <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
              </Submenu>
              <MenuItem name="4">
                <Icon type="ios-construct"/>
                综合设置
              </MenuItem>
            </Menu>
            <Input v-model="chatMsg.msg" type="textarea" :rows="6" placeholder="Enter something..."/>
            <Button type="error" class="option_btn">关闭</Button>

            <Button type="success" class="option_btn" v-on:click="sendMessage">发送</Button>
          </Footer>
        </Layout>
        <Sider width="400" hide-trigger :style="{background: '#fff'}">
          <Scroll height="800" :on-reach-top="handleReachTop">
            <Card v-for="item in userInfoList" :key="item.nickName"
                  style="margin: 16px 0">
              <label style="float: left" :id="item.nickName">
                <Icon type='ios-call'/>
              </label>
              <Avatar :src=item.avatar title="avatar"/>
              <label v-on:click="selectuser($event)">{{ item.nickName }}</label>
            </Card>
          </Scroll>
        </Sider>
      </Layout>

    </Layout>
  </div>
</template>
<script>
import $ from "jquery"
import requestService, {deleteRequest, get} from "@/utils/requestService"

export default {
  data() {
    return {
      websocket: null,
      //重服务器里拿数据
      staffInfo: {
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        nickName: 'kf1',
        role: 1
      },
      userInfoList: {
        "name2": {
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          nickName: 'name2',
          role: 0
        },
      },
      chatMsg: {
        type: "chat", from: '', target: '', msg: ""
      },
      //文本信息
      currentUser: "",
      msgList: {
        //  消息队列模板
        // "name1": ["你好", "在吗"],
        //  C:["你好","在吗“]
      },
      historyMsgList: {
        // "name1":[ {name:name1 ,msg:你好},]
      }, chatBarTheme: 'dark'
    }
  }, created() {
    this.initWebSocket()
  },
  destroyed() {
    this.websocket.close();
  },
  methods: {
    handleReachTop() {
      return new Promise(resolve => {
        console.log(resolve)
      });
    },
    initWebSocket() { //初始化weosocket
      const wsuri = "ws://localhost:8888/ws";
      this.websocket = new WebSocket(wsuri);
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    },
    sendMessage() {
      if (this.isNullObj(this.currentUser)) {
        this.$Message.warning("请选择客户。。。")
        return 0;
      }
      //发送消息
      this.historyMsgList[this.currentUser].push({"nickName": this.staffInfo.nickName, "msg": this.chatMsg.msg})
      this.chatMsg.target = this.currentUser
      this.chatMsg.from = this.staffInfo.nickName
      this.websocket.send(JSON.stringify(this.chatMsg))
      //持久化
      this.saveSingleMsg(this.staffInfo.nickName, this.staffInfo.nickName, this.currentUser, this.chatMsg.msg, this.doSaveDialog)
      this.chatMsg.msg = ''
    },
    appendMessage(message) {
      // 接受消息
      console.log("收到消息" + message)
      let json = JSON.parse(message)
      this.disparch(json["type"], json);
    },
    disparch(type, data) {
      if (type === "unread") {
        this.unread(data)
      } else if (type === "chat") {
        this.receivedMsg(data)
      } else {
        return 0
      }
    },
    //拉取未读消息 格式： name:['','','']
    unread(jsonObj) {
      let user = jsonObj['user']
      let list = jsonObj['msgList']
      if (this.isNullObj(list)) {
        return
      }
      this.$set(this.msgList, user, list)
      //添加客户到列表
      this.addUserToList(user)
      //持久化消息
      this.saveListMsg(this.staffInfo.nickName, user, user, list, this.doSaveDialog)
    },
    //当前接收的消息
    receivedMsg(jsonObj) {
      let from = jsonObj['from']
      // //加载用户信息到列表中
      this.addUserToList(from)
      let msg = jsonObj['msg']
      // 持久化
      this.saveSingleMsg(this.staffInfo.nickName, from, from, msg, this.doSaveDialog)
      if (from === this.currentUser) {
        //正在与当前的客户进行通讯
        let list = this.historyMsgList[this.currentUser]
        if (this.isNullObj(list)) {
          list = []
        }
        list.push({"nickName": from, "msg": msg})
        this.$set(this.historyMsgList, this.currentUser, list)
        //强行刷新视图
        this.$forceUpdate()
      } else {
        //将消息放到待读队列
        let tar_list = this.msgList[from]
        if (this.isNullObj(tar_list)) {
          tar_list = []
        }
        tar_list.push(msg)
        this.msgList[from] = tar_list
        //待读消息数
        $("#" + from).html(tar_list.length)
      }
    },
    //持久化单条的消息
    saveSingleMsg(storeName, fromWho, toWho, msg, doSave) {
      return new Promise(function (resolve) {
        doSave(storeName, fromWho, toWho, msg)
        resolve(fromWho, msg)
      })
    },
    //持久化多条信息
    saveListMsg(storeName, fromWho, toWho, msgList, doSave) {
      return new Promise(function (resolve) {
        msgList.forEach(item => {
          doSave(storeName, fromWho, toWho, item)
        })
        resolve(msgList)
      })
    }
    , doSaveDialog(storeName, fromWho, toWho, msg) {
      //存储格式 "selfNickName": { userInfoNickName:[ {name:name1 ,msg:你好},]  , }
      let msgJsonObj = JSON.parse(localStorage.getItem(storeName))
      if (this.isNullObj(msgJsonObj)) {
        msgJsonObj = {}
      }
      let msglist = msgJsonObj[toWho]
      if (this.isNullObj(msglist)) {
        msglist = []
      }
      msglist.push({"nickName": fromWho, "msg": msg})
      let saveObj = {}
      saveObj[toWho] = msglist
      localStorage.setItem(storeName, JSON.stringify(saveObj))
    },

    loadHistoryFromLocal(staffInfoNickName) {
      console.log("读取本地缓存 " + staffInfoNickName)
      let his = JSON.parse(localStorage.getItem(staffInfoNickName))
      if (this.isNullObj(his)) {
        return 0
      }
      for (let userInfoListKey in his) {
        console.log("userInfoListKey " + userInfoListKey)
        let msgList = his[userInfoListKey]
        if (this.isNullObj(msgList)) continue
        let list = this.historyMsgList[userInfoListKey]
        if (this.isNullObj(list)) {
          list = []
        }
        msgList.forEach(item => {
          list.push(item)
        })
        this.$set(this.historyMsgList, userInfoListKey, list)
        console.log("加载本地缓存：" + JSON.stringify(this.historyMsgList[userInfoListKey]))
      }
    },
    addUserToList(userName) {
      var url = requestService.BaseHost + "/staff/" + userName
      get(url, {}, this.requestSuccess, this.requestError, this)
    },
    requestSuccess(res) {
      var data = res.data
      var nickName = data.nickName;
      var user = this.userInfoList[nickName]
      if (this.isNullObj(user)) {
        var info = {
          "nickName": nickName,
          "avatar": data.avatar,
          "role": data.role
        }
        this.$set(this.userInfoList, nickName, info)
        console.log("this.userInfoList[nickName] " + JSON.stringify(this.userInfoList))
        if (nickName === this.currentUser) {
          console.log("requestSuccess")
        } else {
          this.$nextTick(this.updataMsgNumberView(nickName))
        }
      }
    },
    requestError(res) {
      console.log("error res " + res)
    },
    selectuser(event) {
      //选定当前客户
      this.currentUser = event.target.innerHTML
      var his = this.historyMsgList[this.currentUser]
      //与当期客户正在通讯
      //消息从消息队列中移除
      var msgQueue = this.msgList[this.currentUser]
      this.msgList[this.currentUser] = []
      //将消息缓存
      if (!this.isNullObj(msgQueue) && msgQueue.length !== 0) {
        if (this.isNullObj(his)) {
          his = []
        }
        msgQueue.forEach(item => {
          his.push({"nickName": this.currentUser, "msg": item})
        })
        this.historyMsgList[this.currentUser] = his
        console.log("this.historyMsgList[this.staffInfo.nickName] " + JSON.stringify(this.historyMsgList[this.userInfoList[this.currentUser].nickName]))
      }
      this.$forceUpdate()
      this.haveRead(this.currentUser)
      //清空待读消息数目
      $("#" + this.currentUser).html("")
    }, haveRead(nickName) {
      deleteRequest(requestService.StaffHost + "/haveread/" + nickName, {})
    },
    //对象是否为空
    isNullObj(obj) {
      if (obj === null || obj === undefined || obj === "") {
        return true
      }
      return false
    }, updataMsgNumberView(nickName) {
      console.log("update msg nickName" + nickName)
      console.log("待读消息 " + this.msgList[nickName].length)
      // $("#" + nickName).html("<Icon type='ios-call' />")
    },
    websocketonmessage(e) {
      this.appendMessage(e.data)
    },
    websocketonopen() {
      //建立连接，发送个人信息
      let info = {type: "chat_basic_info", info: this.staffInfo}
      this.websocket.send(JSON.stringify(info))
      //加载本地消息
      this.loadHistoryFromLocal(this.staffInfo.nickName)
      //拉取未读消息
      this.pullUnreadMsg()
    }
    , pullUnreadMsg() {
      get(requestService.BaseHost + "/staff/unread", {}, this.pullMsgSucc, this.pullMsgErr)
    }, pullMsgSucc(res) {
      console.log("拉取未读消息 " + res.data)
    }, pullMsgErr(res) {
      console.log(res)
    },
    websocketonerror() {
      this.appendMessage("error")
    },
    websocketclose() {
      this.appendMessage("close")
    }
  }
}

</script>
<style scoped>
.ivu-list-item-meta {
  text-align: left;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.option_btn {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.card-right {
  text-align: right;
}

.card-left {
  text-align: left;
}

.ivu-list-split .ivu-list-item {
  border-bottom: 0px;
}

.headerBar {
  width: 100%;
}

.ivu-layout-header {
  height: 64px;
  line-height: 64px;
  padding: 0;
  background-color: #fff;
}

.ivu-menu-horizontal {
  height: 55px;
  line-height: 60px;
}

.ivu-layout-footer {
  background: #f5f7f9;
  padding: 0px;
  color: #515a6e;
  font-size: 14px;
}

</style>