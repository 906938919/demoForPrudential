import request from "@/utils/request"

export function fetchList(params = {}) {
  return request({
    url: '/topics',
    method: 'GET',
    params
  })
}

export function fetchLogin(data = {}) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export function fetchUserInfo(params = {}) {
  return request({
    url: '/user/info',
    method: 'GET',
    params
  })
}

export function fetchGoodCate(params = {}) {
  return request({
    url: '/good/cates',
    method: 'GET',
    params
  })
}

export function fetchGoodList(params = {}) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

export function fetchUpdateGood(data = {}) {
  return request({
    url: '/good/update',
    method: 'POST',
    data
  })
}

export function fetchDeleteGood(data = {}) {
  return request({
    url: '/good/delete',
    method: 'POST',
    data
  })
}

export function fetchGoodInfo(params = {}) {
  return request({
    url: '/good/info',
    method: 'GET',
    params
  })
}