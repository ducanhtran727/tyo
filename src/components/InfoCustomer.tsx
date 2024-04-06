import { Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

const InfoCustomer = ({ istStudent, setIsStudent }: any) => {
  return (
    <div>
      <div className="text-center text-base font-semibold mb-4">
        THÔNG TIN KHÁCH HÀNG
      </div>
      <Form.Item
        label="Ngày muốn nhập nhà"
        rules={[{ required: true }]}
        name={"desiredMoveInDate"}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Tên ghi bằng katakana"
        rules={[{ required: true }]}
        name={"katakanaName"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Đến Nhật từ khi nào. Tháng - năm"
        rules={[{ required: true }]}
        name={"arrivalDateJapan"}
      >
        <DatePicker className="w-full" picker="month" />
      </Form.Item>
      <Form.Item
        label="Số điện thoại tình trạng nghe gọi ok ?"
        className="w-full"
        rules={[{ required: true }]}
        name={"phoneStatus"}
      >
        <InputNumber className="!w-full" />
      </Form.Item>
      <Form.Item
        label="Email đang dùng"
        rules={[{ required: true }]}
        name={"currentEmail"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nhà ở hiện tại ở được bao lâu và thuê bao nhiêu tiền / tháng"
        rules={[{ required: true }]}
        name={"currentResidenceDuration"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Thuê bao nhiêu tiền / tháng"
        rules={[{ required: true }]}
        name={"monthlyRent"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Địa chỉ đang sinh sống"
        rules={[{ required: true }]}
        name={"currentAddress"}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lý do chuyển nhà là gì"
        rules={[{ required: true }]}
        name={"reasonForMoving"}
      >
        <TextArea rows={5} />
      </Form.Item>
      <div className="flex items-center gap-3 mb-3">
        <Checkbox
          checked={istStudent}
          onClick={() => {
            setIsStudent(!istStudent);
          }}
        />
        <div>Có phải là học sinh ?</div>
      </div>
      {istStudent ? (
        <>
          <Form.Item
            label="Trường hiện tại học vào học từ khi nào"
            rules={[{ required: true }]}
            name={"currentSchool"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thời gian học buổi nào?"
            rules={[{ required: true }]}
            name={"schoolSchedule"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trường senmon-đại học sắp tới khi nào nhập học và trường địa điểm ga nào."
            rules={[{ required: true }]}
            name={"upcomingSchool"}
          >
            <Input />
          </Form.Item>
        </>
      ) : null}
    </div>
  );
};

export default InfoCustomer;
