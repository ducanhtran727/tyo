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
import { useState } from "react"

const CardMain = () => {
  const [keyTab, setKeyTab] = useState("1")

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
  ]

  const onFinish = () => {}

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
        onFinishFailed={({errorFields}) => {

          console.log(errorFields.map(item => item.name.join()),'errorFields---------')

          notification.error({
            message: "Có lỗi",
            description: `${errorFields.map(item => item.name.join()).join()} bị bỏ trống`
          })
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Card className="w-[888px]">
          <Tabs
            activeKey={keyTab}
            tabPosition="left"
            items={items}
            onTabClick={(key) => {
              setKeyTab(key)
            }}
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
