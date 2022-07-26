import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useMenu } from '@/hooks'
import logo from '@/assets/oceanbase.webp'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function createItems(routes) {
  return routes.map(ele => {
    if (ele.hidden !== true) {
      if (!ele.children) {
        return getItem(
          <Link to={ele.path}>{ele.label}</Link>,
          ele.id,
          ele.icon)
      } else {
        return getItem(
          ele.label,
          ele.id,
          ele.icon,
          createItems(ele.children))
      }
    }
  })
}

export default props => {

  const [openkey, selectedkey] = useMenu()
  const { collapsed } = props
  const { sideLogo } = useSelector(state => state.global)
  const { accessRoutes } = useSelector(state => state.user)

  return (
    <>
      {
        sideLogo == true ?
          <div className={collapsed == true ? 'side-logo-small' : 'side-logo'}>
            <img src={logo} />
          </div> :
          ''
      }
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openkey]}
        selectedKeys={[selectedkey]}
        items={createItems(accessRoutes)}
      />
    </>
  )
}