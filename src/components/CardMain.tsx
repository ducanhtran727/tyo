"use client";

import axiosInstance from "@/api/baseRequest";
import { ScreenSizeContext } from "@/context/ScreenSize.context";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Tabs, notification } from "antd";
import Card from "antd/es/card/Card";
import { useContext, useState } from "react";
import ImagesUpload from "./ImagesUpload";
import InfoContactPerson from "./InfoContactPerson";
import InfoCustomer from "./InfoCustomer";
import InfoJob from "./InfoJob";
import InfoParent from "./InfoParent";

const CardMain = () => {
  const [keyTab, setKeyTab] = useState("1");

  const { isMobile, isTablet } = useContext(ScreenSizeContext);

  const [istStudent, setIsStudent] = useState(null);

  const items = [
    {
      label: "Thông tin khách hàng",
      key: "1",
      children: (
        <InfoCustomer
          istStudent={istStudent}
          setIsStudent={(val: any) => {
            setIsStudent(val);
          }}
        />
      ),
    },
    {
      label: "Thông tin việc làm",
      key: "2",
      children: <InfoJob />,
    },
    {
      label: "Thông tin Bố hoặc Mẹ",
      key: "3",
      children: <InfoParent />,
    },
    {
      label: "Thông tin người liên lạc khẩn cấp",
      key: "4",
      children: <InfoContactPerson />,
    },
    {
      label: "Thông tin hình ảnh",
      key: "5",
      children: <ImagesUpload />,
    },
  ];

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      istStudent,
      images: values.images
        .map((item: any) => {
          return {
            data: item.response,
          };
        })
        .filter((item: any) => item?.data),
    };

    try {
      const res = await axiosInstance.request({
        method: "POST",
        baseURL: "http://103.72.96.110:3000",
        url: "/applicants",
        data: payload,
      });

      if (res.status === 200) {
        form.resetFields();
        notification.success({
          message: "Thành công",
          description: "Gửi thông tin thành công",
        });
      }
    } catch {}
  };

  return (
    <ConfigProvider
      form={{
        validateMessages: {
          required: () => {
            return "Không được bỏ trống";
          },
        },
      }}
    >
      <Form
        form={form}
        onFinishFailed={({ errorFields }) => {
          notification.error({
            message: "Có lỗi",
            description: `Kiểm tra lại các mục có thông tin bị bỏ trống`,
          });
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Card rootClassName="md:w-[888px] w-[calc(100vw_-_56px)] !overflow-x-hidden">
          <Tabs
            activeKey={keyTab}
            tabPosition={isMobile ? "top" : "left"}
            items={items}
            onTabClick={(key) => {
              setKeyTab(key);
            }}
            moreIcon={<EllipsisOutlined />}
          ></Tabs>
          <div className="flex gap-4 justify-end mt-3">
            {+keyTab < 5 ? (
              <Button
                type="default"
                size="large"
                onClick={() => {
                  setKeyTab((+keyTab + 1).toString());
                }}
              >
                Bước tiếp theo
              </Button>
            ) : null}
            <Button size="large" type="primary" htmlType="submit">
              Gửi
            </Button>
          </div>
        </Card>
      </Form>
    </ConfigProvider>
  );
};

export default CardMain;
