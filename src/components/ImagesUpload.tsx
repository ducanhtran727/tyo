import { Form, Input, DatePicker, InputNumber } from "antd"
import UploadImages from "./UploadImage"

const ImagesUpload = () => {
  return (
    <div>
      <div className="text-center text-base font-semibold mb-4">
        THÔNG TIN HÌNH ẢNH
      </div>
      <Form.Item label="Hình ảnh"  name={"images"}>
        <UploadImages />
      </Form.Item>
   
    </div>
  )
}

export default ImagesUpload
