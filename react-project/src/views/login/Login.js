import { Button, Form, Input } from 'antd';
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { login } from "@/store/action"
import "./index.scss"


export default () => {
  const dispatch = useDispatch()
  const onFinish = (value) => {
    dispatch(login(value))
  }

  return (
    <div className='login'>
      <Form
        name="basic"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <h1 className='login-title'>登录</h1>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%", borderRadius: "3px" }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}