import loadable from "@loadable/component"
import {
  GlobalOutlined,
  MailOutlined,
} from '@ant-design/icons';

import Layout from "@/layout/Layout";
const DashBoard = loadable(() => import('@/views/dash/DashBoard'))
const GoodList = loadable(() => import('@/views/good/GoodList'))
const GoodForm = loadable(() => import('@/views/good/GoodForm'))

const Login = loadable(() => import('@/views/login/Login'))


export const routes = [
  {
    id: 10,
    label: "首页",
    path: "/dashboard",
    // roles: ['admin', 'editor'],
    element: <DashBoard />,
    icon: <GlobalOutlined />,
  },
  {
    id: 11,
    label: "商品管理",
    icon: <MailOutlined />,
    // roles: ['admin', 'editor'],
    children: [
      {
        id: 1101,
        label: "商品列表",
        path: "/good/list",
        // roles: ['admin'],
        element: <GoodList />
      },
      {
        id: 1102,
        label: "商品表单",
        path: "/good/add",
        // roles: ['editor'],
        element: <GoodForm />
      },
      {
        key: 1103,
        path: '/good/edit/:id',  // 动态路由
        element: <GoodForm />,
        // roles: ['editor'],
        hidden: true,   // 不放在Menu上
      }
    ]
  }
]

export const asyncRoutes = [
  {
    id: 0,
    path: "/",
    element: <Layout />,
    children: routes
  },
  {
    id: 1,
    path: "/login",
    element: <Login />
  }
]