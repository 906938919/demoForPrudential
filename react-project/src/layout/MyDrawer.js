import { Drawer, Col, Row, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { GithubPicker } from 'react-color';


import { toggleLogo, toggleTheme } from '@/store/action';


export default props => {
  const { show, onClose } = props
  const dispatch = useDispatch()
  const { sideLogo, theme } = useSelector(state => state.global)


  return (
    <div className='drawer-button'>
      <Drawer
        title="setting"
        placement={"right"}
        onClose={onClose}
        visible={show}
      // key={placement}
      >
        <Row>
          <Col span={16}>
            侧边logo
          </Col>
          <Col span={8}>
            <Switch checked={sideLogo} onChange={() => dispatch(toggleLogo())} />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={16}>
            主题颜色
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={24}>
            <GithubPicker
              color={theme}
              onChange={(color) => dispatch(toggleTheme(color.hex))}
              width={300} />
          </Col>
        </Row>
      </Drawer>
    </div>
  )
}