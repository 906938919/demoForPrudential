import { Select } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGoodCate } from "@/store/action/good"
const { Option } = Select





const CateSelect = props => {
  const { allowClear, value, onChange } = props
  const dispatch = useDispatch()
  const { cates } = useSelector(state => state.good)

  useEffect(() => {
    dispatch(getGoodCate())
  }, [])

  return (
    <Select
      allowClear={allowClear}
      value={value}
      onChange={onChange}
      style={{
        width: "100%"
      }}
    >
      {
        allowClear && <Option value=''>全部</Option>
      }
      {
        cates.map(ele => (
          <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
        ))
      }
    </Select>
  )
}

CateSelect.defaultProps = {
  value: '',
  onChange: () => { },
  allowClear: false
}

export default CateSelect