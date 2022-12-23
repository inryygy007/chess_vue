const userMgr = require("./managers/userMgr");

class player {
  m_conn;
  m_account_id;
  m_dbIns;
  m_roomId;
  

  get roomId(){
    return this.m_roomId;
  }

  set roomId(r){
    this.m_roomId = r;
  }

  constructor() {
  }

  bind_socket(conn) {
    this.m_conn = conn;
  }

  async bind_db(id) {
    this.m_account_id = id;
    await userMgr.getOrCreateUser(id, true).then((res)=>{
      this.m_dbIns = res;
    })

    let a = 100;
  }

  setRoom(roomId){
    this.m_roomId = roomId;
  }
}


exports = module.exports = player;