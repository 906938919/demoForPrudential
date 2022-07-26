import { useRoutes } from 'react-router-dom'
import loadable from '@loadable/component'
import {
  AppOutline,
  AppstoreOutline,
  ReceiptOutline,
  ShopbagOutline,
  UserOutline,
  GlobalOutline
} from 'antd-mobile-icons'

const Home = loadable(() => import('./home'))
const Sort = loadable(() => import('./sort'))
const Suprise = loadable(() => import('./suprise'))
const Cart = loadable(() => import('./cart'))
const User = loadable(() => import('./user'))
const Test = loadable(() => import('./Counter'))

export const element = [
  {
    path: "/",
    title: "首页",
    element: <Home />,
    icon: <AppOutline />
  },
  {
    path: "/sort",
    title: "分类",
    element: <Sort />,
    icon: <AppstoreOutline />
  },
  {
    path: "/suprise",
    title: "京喜",
    element: <Suprise />,
    icon: <ReceiptOutline />
  },
  {
    path: "/cart",
    title: "购物车",
    element: <Cart />,
    icon: <ShopbagOutline />
  },
  {
    path: "/user",
    title: "用户",
    element: <User />,
    icon: <UserOutline />
  },
  {
    path: "/test",
    title: "测试",
    element: <Test />,
    icon: <GlobalOutline />
  }
]

export default () => {
  return useRoutes(element)
}


