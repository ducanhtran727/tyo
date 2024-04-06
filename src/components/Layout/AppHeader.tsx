"use client";

import { Select, Modal, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { ScreenSizeContext } from "@/context/ScreenSize.context";
import { AUTH_KEY } from "@/constant/nav";
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
];

export function AppHeader({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);

  const [authData, setAuthData] = useState<any>("");

  const router = useRouter();

  const changeLang = (lang: string) => {
    router.push(`${lang}`);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { isMobile, isTablet } = useContext(ScreenSizeContext);

  const [form] = Form.useForm();

  useEffect(() => {
    setAuthData(localStorage.getItem("auth"));
  }, []);

  return (
    <div className="flex z-50 justify-center md:justify-end p-4 items-center sticky top-0 left-0">
      <Select
        options={options}
        defaultValue={lang}
        className="w-32"
        onChange={(val) => {
          changeLang(val);
        }}
      />
      <>
        {typeof window !== "undefined" ? (
          <>
            {authData === AUTH_KEY ? (
              <div
                className="ml-4 cursor-pointer text-white"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("auth");
                    window.location.pathname = "en";
                  }
                }}
              >
                Đăng xuất
              </div>
            ) : (
              <div
                className="ml-4 cursor-pointer text-white"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Đăng nhập
              </div>
            )}
          </>
        ) : null}
      </>
      <Modal
        title="Đăng nhập"
        open={open}
        okText="Đăng nhập"
        cancelText="Hủy"
        onCancel={onClose}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (
              values.userName === "admin" &&
              values.currentPassword === "admin123" &&
              typeof window !== "undefined"
            ) {
              localStorage.setItem("auth", "YWRtaW46YWRtaW4xMjM");
              router.push("/en/list");
              setOpen(false);
            }
          }}
        >
          <Form.Item
            label="Tài khoản"
            name="userName"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="currentPassword"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          >
            <Input type="password" autoComplete="current-password"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
