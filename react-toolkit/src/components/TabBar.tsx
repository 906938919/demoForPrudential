import { TabBar } from 'antd-mobile'
import {
  useLocation,
  useNavigate
} from 'react-router-dom'
import { element } from '@/pages'
import styles from './TabBar.module.css'

export default () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()


  return (
    <>
      <div className={styles.bottom}>
        <TabBar activeKey={pathname} onChange={(key) => navigate(key)} safeArea={true}>
          {element.map(item => (
            <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
      <div className={styles.space} />
    </>
  )
}