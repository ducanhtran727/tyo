import { Form, Input, DatePicker, InputNumber } from "antd"

const InfoContactPerson = () => {
  return (
    <div>
      <div className="text-center text-base font-semibold mb-4">
        THÔNG TIN NGƯỜI LIÊN LẠC KHẨN CẤP
      </div>
      <Form.Item
        label="Họ và tên"
        rules={[{ required: true }]}
        name={"emergencyContactName"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        className="w-full"
        rules={[{ required: true }]}
        name={"emergencyContactPhone"}
      >
        <InputNumber className="!w-full" />
      </Form.Item>
      <Form.Item
        label="Ngày tháng năm sinh"
        rules={[{ required: true }]}
        name={"emergencyContactDateOfBirth"}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Địa chỉ nhà < tên toà nhà + số phòng >"
        rules={[{ required: true }]}
        name={"emergencyContactAddress"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mối quan hệ"
        rules={[{ required: true }]}
        name={"emergencyContactRelationship"}
      >
        <Input />
      </Form.Item>
    </div>
  )
}

export default InfoContactPerson
