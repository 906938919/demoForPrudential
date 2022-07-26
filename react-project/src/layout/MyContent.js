import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  SettingOutlined
} from '@ant-design/icons';
import MyDrawer from "./MyDrawer"

export default () => {
  const [show, setShow] = useState(false)
  return (
    <div className="main-content">
      {/* <h1>内容</h1> */}
      <div className="switch" onClick={() => setShow(true)} style={{ background: 'var(--ant-primary-color)' }}>
        <SettingOutlined />
      </div>
      <Outlet />
      <MyDrawer show={show} onClose={() => setShow(false)} />
    </div>
  )
}