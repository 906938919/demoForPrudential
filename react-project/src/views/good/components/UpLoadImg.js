import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import {
  Upload,
  Modal,
} from 'antd';

export default props => {

  const { value, onChange } = props
  const [fileList, setFileList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setFileList([{
        thumbUrl: `http://localhost:9999${value}`
      }])
    }
  }, [value])

  const imgChange = ({ file, fileList }) => {
    setFileList([...fileList])
    if (file.response) {
      onChange(file.response.data.img)
    }
  }

  const imgRemove = () => {
    onChange('')
  }

  const onPreview = async (file) => {
    setIsModalVisible(true);

  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <ImgCrop rotate>
        <Upload
          name='good'
          action="http://localhost:9090/api/v1/react/upload/img"
          listType="picture"
          fileList={fileList}
          onChange={imgChange}
          onRemove={imgRemove}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>

      </ImgCrop>
      <Modal title="图片预览" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <img src={`http://localhost:9999${value}`} style={{ width: "100%" }} />
      </Modal>
    </>
  )
}