import { request } from "umi";

export function getList(params = {}) {
  return request(
    "https://cnodejs.org/api/v1/topics",
    {
      method: "GET",
      params
    }
  )
}