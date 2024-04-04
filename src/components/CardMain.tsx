"use client"

import Card from "antd/es/card/Card"
import {
  Button,
  Form,
  Radio,
  Space,
  Tabs,
  ConfigProvider,
  notification,
} from "antd"
import InfoCustomer from "./InfoCustomer"
import InfoContactPerson from "./InfoContactPerson"
import InfoJob from "./InfoJob"
import InfoParent from "./InfoParent"
import { useState, useContext } from "react"
import { ScreenSizeContext } from "@/context/ScreenSize.context"
import { EllipsisOutlined } from "@ant-design/icons"
import ImagesUpload from "./ImagesUpload"
import axiosInstance from "@/api/baseRequest"

const CardMain = () => {
  const [keyTab, setKeyTab] = useState("1")

  const { isMobile, isTablet } = useContext(ScreenSizeContext)

  const [istStudent, setIsStudent] = useState(null)

  const items = [
    {
      label: "Thông tin khách hàng",
      key: "1",
      children: <InfoCustomer />,
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
  ]

  const onFinish = async (values: any) => {
    console.log(values)

    const payload = {
      ...values,
      istStudent,
      images: values.images
        .map((item: any) => {
          return {
            data: item.response,
          }
        })
        .filter((item: any) => item?.data),
    }

    try {
      const res = await axiosInstance.request({
        method: "POST",
        baseURL: "https://5d62-118-69-6-99.ngrok-free.app",
        url: "applicants",
        data: payload,
      })

      console.log(res, "res--------")
    } catch {}
  }

  return (
    <ConfigProvider
      form={{
        validateMessages: {
          required: () => {
            return "Không được bỏ trống"
          },
        },
      }}
    >
      <Form
        onFinishFailed={({ errorFields }) => {
          notification.error({
            message: "Có lỗi",
            description: `Kiểm tra lại các mục có thông tin bị bỏ trống`,
          })
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
              setKeyTab(key)
            }}
            moreIcon={<EllipsisOutlined />}
          ></Tabs>
          <div className="flex gap-4 justify-end mt-3">
            {+keyTab < 4 ? (
              <Button
                type="default"
                size="large"
                onClick={() => {
                  setKeyTab((+keyTab + 1).toString())
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
  )
}

export default CardMain
