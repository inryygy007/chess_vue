// 1.引入axios
import axios from "axios";

export function request() {
  axios.create({
    baseURL: "",
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
  });
}
