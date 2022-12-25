import { get } from "../utils"

const findName = async()=>{
  let data = await get('/chinese-chess-users');
  return data
}
export {
  findName
}