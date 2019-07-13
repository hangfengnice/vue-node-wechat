export default {
  // webSocket 
  ws : null,
  init(config,onMessage,onError){
    if(this.ws) this.ws.close()

    // 实例 socket 对象
    this.ws = new WebSocket(`ws://localhost:3000/${config.user.id}`)

    // 客户端接受消息
    this.ws.onmessage = e => {
      let message = JSON.parse(e.data)
      onMessage && onMessage(message);

    }

    // 出错
    this.ws.onerror = error => {
      onError && onError(error)
    }


    this.ws.onclose= () => {
      this.ws = null
    }
  },
  send(msgObj) { // 发送消息时触发
    this.ws.send(JSON.stringify(msgObj))
  }
  

}