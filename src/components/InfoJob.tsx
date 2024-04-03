import { Form, Input, DatePicker, InputNumber } from "antd"

const InfoJob = () => {
  const { RangePicker } = DatePicker

  return (
    <div>
      <div className="text-center text-base font-semibold mb-4">
        THÔNG TIN VIỆC LÀM
      </div>
      <Form.Item
        label="Tên và địa chỉ cty"
        rules={[{ required: true }]}
        name={"dateCome"}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Số điện thoại nơi làm việc"
        className="w-full"
        rules={[{ required: true }]}
        name={"name-2"}
      >
        <InputNumber className="!w-full" />
      </Form.Item>
      <Form.Item
        label="Làm việc từ tháng- năm nào"
        rules={[{ required: true }]}
        name={"name"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Đến Nhật từ khi nào. Tháng - năm"
        rules={[{ required: true }]}
        name={"name-1"}
      >
        <RangePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Cty làm về ngành, lĩnh vực gì"
        rules={[{ required: true }]}
        name={"name-3"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Vị trí làm việc bộ phận nào"
        rules={[{ required: true }]}
        name={"name-4"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lương mỗi tiếng được bao nhiêu tiền ( tháng tổng = ... ) "
        rules={[{ required: true }]}
        name={"name-5"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Thời gian làm việc từ - đến "
        rules={[{ required: true }]}
        name={"name-5"}
      >
        <Input />
      </Form.Item>
    </div>
  )
}

export default InfoJob
