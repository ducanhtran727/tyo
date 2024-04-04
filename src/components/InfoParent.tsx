import { Form, Input, DatePicker, InputNumber } from "antd"

const InfoParent = () => {
  return (
    <div>
      <div className="text-center text-base font-semibold mb-4">
        THÔNG TIN BỐ HOẶC MẸ
      </div>
      <Form.Item label="Họ và tên Bố hoặc Mẹ" rules={[{ required: true }]} name={"parentName"}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngày tháng năm sinh"
        rules={[{ required: true }]}
        name={"parentDateOfBirth"}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        className="w-full"
        rules={[{ required: true }]}
        name={"parentPhone"}
      >
        <InputNumber className="!w-full" />
      </Form.Item>
      <Form.Item label="Địa chỉ" rules={[{ required: true }]} name={"parentAddress"}>
        <Input />
      </Form.Item>
    </div>
  )
}

export default InfoParent
