"use client";

import { AUTH_KEY } from "@/constant/nav";
import { ScreenSizeContext } from "@/context/ScreenSize.context";
import { Form, Input, Modal, Select, notification } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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

  const params = usePathname();

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
  }, [params]);

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
      <div
        className={clsx(
          "ml-4 cursor-pointer text-white",
          authData === AUTH_KEY ? "" : "hidden"
        )}
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth");
            window.location.pathname = "en";
          }
        }}
      >
        Đăng xuất
      </div>

      <div
        className={clsx(
          "ml-4 cursor-pointer text-white",
          authData === AUTH_KEY ? "hidden" : ""
        )}
        onClick={() => {
          setOpen(true);
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
            } else {
              notification.error({
                message: 'Sai tên tài khoản hoặc mật khẩu'
              })
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
