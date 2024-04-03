import { Form, Input, DatePicker, InputNumber } from "antd"

const InfoParent = () => {
  return (
    <div>
      <div className="text-center text-base font-semibold mb-4">
        THÔNG TIN BỐ HOẶC MẸ
      </div>
      <Form.Item label="Họ và tên" rules={[{ required: true }]} name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngày tháng năm sinh"
        rules={[{ required: true }]}
        name={"dateCome"}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        className="w-full"
        rules={[{ required: true }]}
        name={"name-2"}
      >
        <InputNumber className="!w-full" />
      </Form.Item>
      <Form.Item label="Địa chỉ" rules={[{ required: true }]} name={"name"}>
        <Input />
      </Form.Item>
    </div>
  )
}

export default InfoParent
