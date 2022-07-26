import { Col, Row, Input, DatePicker, Space, Table, Button, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import CateSelect from './components/CateSelect'
import { getGoodList } from "@/store/action/good"
import { fetchDeleteGood } from '@/api';
const { RangePicker } = DatePicker


export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cates, goodList, total } = useSelector(state => state.good)
  const [selectRow, setSelectRow] = useState([])
  const [filter, setFilter] = useState({
    page: 1,
    size: 2,
    name: '',
    cate: ''
  })
  const style = { display: "flex", alignItems: "center", justifyContent: "flex-end" }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <div><img src={`http://localhost:9999${record.img}`} style={{ height: "50px", width: "50px" }} /></div>
            <div>{text}</div>
          </>
        )
      }
    },
    {
      title: '品类',
      dataIndex: 'cate',
      key: 'cate',
      align: 'center',
      render: (text) => {
        let cate = cates.find(ele => (
          ele.cate === text
        ))
        return (<div> {cate.cate_zh}</div>)
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <div>{`￥${text.toFixed(2)}`}</div>,
    },
    {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      align: 'center',
      render: (text) => <div>{moment(text).format("YYYY年MM月DD日")}</div>,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"
            onClick={() => {
              navigate("/good/edit/" + record._id)
            }}>
            修改
          </Button>
          <Button type="danger"
            onClick={() => { deleteRow(record) }}>
            删除
          </Button>
        </Space >
      ),
    },
  ]

  useEffect(() => {
    dispatch(getGoodList(filter))
  }, [filter])

  const deleteRow = (record) => fetchDeleteGood({ ids: record._id }).then(res => {
    if (res.err === 0) {
      message.success("删除成功")
      dispatch(getGoodList(filter))
    }
  })


  // console.log('...', filter.page, filter.size);

  return (
    <div>
      <Row gutter={[0, 24]}>
        <Col span={2} style={style}>
          <div>名称：</div>
        </Col>
        <Col span={3}>
          <Input placeholder="搜索商品名" value={filter.name} onChange={e => setFilter({ ...filter, name: e.target.value, page: 1 })} />
        </Col>
        <Col span={2} style={style}>
          <div>品类：</div>
        </Col>
        <Col span={3}>

          <CateSelect
            allowClear={true}
            value={filter.cate}
            onChange={value => {
              setFilter({ ...filter, cate: value, page: 1 })
            }} />

        </Col>
        <Col span={2} style={style}>
          <div>日期：</div>
        </Col>
        <Col span={8}>
          <RangePicker
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={goodList}
            rowKey="_id"
            footer={() => {
              return (<Button danger disabled={selectRow.length > 0 ? false : true}>批量删除</Button>)
            }}
            rowSelection={{
              type: "checkbox",
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectRow(selectedRowKeys)
              }
            }}
            pagination={{
              total,
              current: filter.page,
              pageSize: filter.size,
              pageSizeOptions: [2, 5, 10, 20],
              showSizeChanger: true,
              onChange: (page, size) => {
                if (page !== filter.page) {
                  setFilter({ ...filter, page })
                }
                if (size !== filter.size) {
                  setFilter({ ...filter, size, page: 1 })
                }
                // if (page === filter.page) {
                //   setFilter({ ...filter, size, page: 1 })
                // } else {
                //   setFilter({ ...filter, page })
                // }
              }
            }}
          />
        </Col>
      </Row>
    </div>
  )
}