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
        name={"companyName"}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Số điện thoại nơi làm việc"
        className="w-full"
        rules={[{ required: true }]}
        name={"workPhone"}
      >
        <InputNumber className="!w-full" />
      </Form.Item>
      <Form.Item
        label="Làm việc từ tháng- năm nào"
        rules={[{ required: true }]}
        name={"employmentStartDate"}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Cty làm về ngành, lĩnh vực gì"
        rules={[{ required: true }]}
        name={"companyIndustry"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Vị trí làm việc bộ phận nào"
        rules={[{ required: true }]}
        name={"position"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lương mỗi tiếng được bao nhiêu tiền ( tháng tổng = ... ) "
        rules={[{ required: true }]}
        name={"monthlySalary"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Thời gian làm việc từ - đến "
        rules={[{ required: true }]}
        name={"workingHours"}
      >
        <Input />
      </Form.Item>
    </div>
  )
}

export default InfoJob
