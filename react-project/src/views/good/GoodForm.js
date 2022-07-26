import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
} from 'antd';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CateSelect from './components/CateSelect'
import UpLoadImg from './components/UpLoadImg';
import { fetchUpdateGood, fetchGoodInfo } from "@/api"

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      offset: 4,
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};




export default () => {
  const [form] = Form.useForm()
  const [cate, setCate] = useState('')
  const [info, setInfo] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(info);
  const onFinish = (values) => {
    if (id) {
      fetchUpdateGood({ ...values, id }).then(res => {
        if (res.err === 0) {
          message.success('修改成功')
          navigate(-1)
        }
      })
    } else {
      fetchUpdateGood(values).then(res => {
        if (res.err === 0) {
          message.success('提交成功')
          navigate(-1)
        }
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchGoodInfo({ id }).then(res => {
        setInfo(res.data.info)
      })
    } else {
      setInfo({})
    }
  }, [id])

  useEffect(() => {
    if (info._id) {
      form.setFieldsValue(info)
    } else {
      form.resetFields()
    }
  }, [info])

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="商品名称"
        rules={[
          {
            required: true,
            message: '商品名称为必填字段',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="cate"
        label="品类"
        rules={[
          {
            required: true,
            message: '品类为必填字段',
          },
        ]}
      >
        <CateSelect
          value={cate}
          onChange={value => {
            setCate(value)
          }} />
      </Form.Item>

      <Form.Item
        name="price"
        label="价格"
        rules={[
          { required: true, message: '商品价格为必填字段' },
          // { type: "number", message: '商品价格必须为数字' },
        ]}
      >
        <InputNumber
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="img"
        label="图片"
        rules={[
          { required: true, message: '请上传图片' },
        ]}
      >
        <UpLoadImg />
      </Form.Item>

      <Form.Item
        name="desc"
        label="描述"
        rules={[
          { required: true, message: '描述为必填字段' },
          // { type: "string", message: '描正确填写描述' },
          { max: 50, message: '描述不得超过50字' },
          { min: 15, message: '描述不得小于15字' },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item name="hot" label="是否热销" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}