import React, { useState, useMemo } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FontSizeOutlined,
  TranslationOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import screenfull from 'screenfull'
import { Dropdown, Menu, Breadcrumb, Avatar } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';

import { toggleAntdSize, toggleAntdLang, reset } from '@/store/action'
import { useBreadcrumb } from '@/hooks'


export default (props) => {
  const { collapsed, onCollapsed } = props
  const { antdSize, antdLang } = useSelector(state => state.global)
  const { userinfo } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()//跳转
  const [full, setFull] = useState(false)
  const breads = useBreadcrumb()

  function toggleFull() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  useMemo(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setFull(screenfull.isFullscreen)
      });
    }
  }, [])

  const langMenu = [
    { id: "1", value: "zh", label: "中文" },
    { id: "2", value: "en", label: "English" }
  ]

  const sizeMenu = [
    { id: "1", value: "small", label: "Small" },
    { id: "2", value: "middle", label: "Middle" },
    { id: "3", value: "large", label: "Large" }
  ]

  function skipTo(ele) {
    if (ele.path) {
      navigate(ele.path, { replace: true })
    }
  }

  return (
    <div className='my-header'>
      <div className="trigger" onClick={() => onCollapsed(false)} >
        {
          collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
        }
      </div>

      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/', { replace: true })}>
          <HomeOutlined />
        </Breadcrumb.Item>
        {
          breads.map(ele => (
            <Breadcrumb.Item
              key={ele.id}
              onClick={() => skipTo(ele)}>
              <span>{ele.label}</span>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>

      <div className="icons">
        <div className="display">
          {
            full ? <FullscreenExitOutlined onClick={() => toggleFull()} /> : <FullscreenOutlined onClick={() => toggleFull()} />
          }
        </div>

        <Dropdown
          overlay={
            <Menu
              items={
                sizeMenu.map(ele => ({
                  key: ele.id,
                  label: (
                    <div
                      style={{ color: ele.value == antdSize ? 'var(--ant-primary-color)' : 'black' }}
                      onClick={() => dispatch(toggleAntdSize(ele.value))}
                    >{ele.label}</div>
                  )
                }))
              }
            />
          }
          placement="bottomLeft">
          <FontSizeOutlined />
        </Dropdown>

        <Dropdown
          overlay={
            <Menu
              items={
                langMenu.map(ele => ({
                  key: ele.id,
                  label: (
                    <div
                      style={{ color: ele.value == antdLang ? 'var(--ant-primary-color)' : 'black' }}
                      onClick={() => dispatch(toggleAntdLang(ele.value))}
                    >{ele.label}</div>
                  )
                }))
              }
            />
          }
          placement="bottomLeft">
          <TranslationOutlined />
        </Dropdown>


        <Dropdown
          overlay={<Menu
            items={[{ label: (<div onClick={() => dispatch(reset())}> logout</div>) }]} />}
          placement="bottom">
          <Avatar shape="square" size={48} src={userinfo.avatar} />
        </Dropdown>

      </div>
    </div>
  )
}