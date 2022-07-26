import Link from "next/link"
// import styles from "../../styles/Layout.module.scss"
import { Menu } from "antd"
import type { MenuProps } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/router'


const Routes = [
  { label: <Link href="/">{"首页"}</Link>, key: "/" },
  { label: <Link href="/ssg">{"SSG"}</Link>, key: "/ssg" },
  { label: <Link href="/ssr">{"SSR"}</Link>, key: "/ssr" },
  { label: <Link href="/csr">{"CSR"}</Link>, key: "/csr" },
]


const Header: any = () => {
  const router = useRouter()
  const [current, setCurrent] = useState(router.pathname);
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={Routes} />
  )
}

const Footer: any = () => {
  return null
}


const Layout: any = ({ children }: any) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout