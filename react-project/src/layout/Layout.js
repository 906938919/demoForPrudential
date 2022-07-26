import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.variable.min.css';


import './style.scss'
import MySider from './MySider'
import MyHeader from './MyHeader'
import MyContent from './MyContent'

const { Header, Sider, Content } = Layout;

const antdLangs = {
  zh: zhCN,
  en: enUS
}


export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, antdSize, antdLang } = useSelector(state => state.global)

  ConfigProvider.config({
    theme: {
      primaryColor: theme,
    },
  });

  return (
    <ConfigProvider
      componentSize={antdSize}
      locale={antdLangs[antdLang]}
    >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <MySider collapsed={collapsed} />
        </Sider>

        <Layout className="site-layout">
          <Header>
            <MyHeader collapsed={collapsed} onCollapsed={() => { setCollapsed(!collapsed) }} />
          </Header>
          <Content>
            <MyContent />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}