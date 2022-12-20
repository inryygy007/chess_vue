// 1.引入axios
import axios from 'axios'

// 2.创建axios对象
const instance = axios.create({
  baseURL:'',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})