import { useNavigate, useRoutes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncRoutes, routes } from "@/views"
import { generateAccessRoutes } from "./store/action/permission";
import { getInfo } from "@/store/action"



export default function Permission(props) {
  const dispatch = useDispatch()
  const { token, userinfo, accessRoutes } = useSelector(state => state.user)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  //判断token，无token，未登录，跳转到登录页，有token则获取用户信息
  useEffect(() => {
    if (token) {
      dispatch(getInfo())
    } else {
      navigate('/login', { replace: true })
    }
  }, [token])

  //登陆且获取用户信息后，生产动态路由，跳转至首页
  useEffect(() => {
    if (userinfo.roles && accessRoutes.length === 0) {
      dispatch(generateAccessRoutes(routes, userinfo.roles))
    }
  }, [userinfo])

  useEffect(() => {
    // 在登录流程中，当路由规则生成完成后，跳转到系统首页
    if (accessRoutes.length > 0 && pathname === '/login') {
      navigate('/dashboard', { repalce: true })
    }
  }, [accessRoutes])

  // 登陆后，访问login页面或者/页面，跳转至首页
  useEffect(() => {
    if (!token && pathname !== "/login") {
      navigate('/login', { replace: true })
    }
    if (accessRoutes.length > 0 && pathname === "/login") {
      navigate('/dashboard', { replace: true })
    }
    if (accessRoutes.length > 0 && pathname === "/") {
      navigate('/dashboard', { replace: true })
    }
  }, [pathname])


  let arr = [...asyncRoutes]
  arr[0].children = accessRoutes

  const element = useRoutes(arr);
  return element;
}