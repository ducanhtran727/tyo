"use client"

import { Select, Modal, Form, Input } from "antd"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
import { ScreenSizeContext } from "@/context/ScreenSize.context"
import Link from "next/link"

const options = [
  {
    label: "日本語",
    value: "jp",
  },
  {
    label: "English",
    value: "en",
  },
  {
    label: "Tiếng Việt",
    value: "vi",
  },
]

export function AppHeader({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const changeLang = (lang: string) => {
    router.push(`${lang}`)
  }

  const onClose = () => {
    setOpen(false)
  }

  const { isMobile, isTablet } = useContext(ScreenSizeContext)

  return (
    <div className="flex z-50 justify-center md:justify-end p-4 items-center sticky top-0 left-0">
      <Select
        options={options}
        defaultValue={lang}
        className="w-32"
        onChange={(val) => {
          changeLang(val)
        }}
      />
      <div
        className="ml-4 cursor-pointer"
        onClick={() => {
          setOpen(true)
        }}
      >
        Đăng nhập
      </div>
      <Modal
        title="Đăng nhập"
        open={open}
        okText="Đăng nhập"
        cancelText="Hủy"
        onCancel={onClose}
      >
        <Form layout="vertical">
          <Form.Item
            label="Tài khoản"
            name="userName"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true }]}
          >
            <Input type="password"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
