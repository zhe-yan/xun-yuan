var environment = {
  name: "DEV",                        //DEV 或 STG 或 PRD
  self: "Mobile",
  domain: "Lover-Match",
  since: (new Date('2016-12-28')),    //初创日期
  version: "2.12",
  ajax: {
    timeout: 100000,                //100秒
  },
  api: {
    MainSite: "http://192.168.0.105:65435",
    MallSite: "http://localhost:28459",
  },
  chat: {
    host: "http://192.168.0.108:8080/signalr"
  },
  heartbeat: {
    rate: 600000,                   //心跳频率：次/10分钟
  }
}

module.exports.environment = environment