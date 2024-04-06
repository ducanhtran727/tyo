/* eslint-disable @next/next/no-img-element */
"use client";

import { Table, Modal, List, Button } from "antd";
import { useRouter } from "next/navigation";

import { ScreenSizeContext } from "@/context/ScreenSize.context";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "@/api/baseRequest";
import type { TableProps } from "antd";
import { EyeFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { LIST_DATA } from "@/constant/nav";
import { Pagination } from "antd";
import { Image } from "antd";
import { AUTH_KEY } from "@/constant/nav";

const listDate = [
  "arrivalDateJapan",
  "employmentStartDate",
  "emergencyContactDateOfBirth",
  "employmentStartDate",
  "parentDateOfBirth",
  "desiredMoveInDate",
];

export default function ListDataView({ params }: any) {
  const { isMobile, isTablet } = useContext(ScreenSizeContext);

  const [open, setOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [currentData, setCurrentData] = useState<any>(null);

  const [totalData, setTotalData] = useState();

  const [page, setPage] = useState(1);

  const onClose = () => {
    setCurrentData(null);
    setOpen(false);
  };

  const getList = async (filter: any) => {
    setLoading(true);

    const res = await axiosInstance.request({
      method: "GET",
      baseURL: "http://103.72.96.110:3000",
      url: "/applicants",
      params: filter,
      headers: {},
    });

    if (res.data) {
      setData(res.data.docs);
      setTotalData(res.data.totalDocs);
      setPage(res.data.page);
    }
    setLoading(false);
  };

  useEffect(() => {
    getList({
      page: 1,
      limit: 10,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("auth");
      if (item !== AUTH_KEY) {
        router.push("/en");
      }
    }
  }, []);

  const formatDate = (date: any) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Tên ghi bằng katakana",
      key: "katakanaName",
      dataIndex: "katakanaName",
    },
    {
      title: "Email đang dùng",
      key: "currentEmail",
      dataIndex: "currentEmail",
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <EyeFilled
            onClick={() => {
              setCurrentData(record);
              setOpen(true);
            }}
          />
        );
      },
    },
  ];

  const router = useRouter();

  const changeLang = (lang: string) => {
    router.push(`${lang}`);
  };

  async function downloadImage(imageSrc: any) {
    const images = await Promise.all(imageSrc?.map((item: any) => fetch(item)));
    const imageBlog = await Promise.all(images.map((item) => item?.blob()));
    const imageURLs = imageBlog.map((item) => URL.createObjectURL(item));

    const link = document.createElement("a");

    imageURLs.forEach((item) => {
      link.href = item;
      link.download = "image file name here";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  return (
    <>
      <Table
        dataSource={data}
        loading={loading}
        className=""
        columns={columns}
        pagination={false}
        scroll={{
          x: isMobile ? 456 : "",
        }}
      />
      <Pagination
        className="!mt-4"
        current={page}
        total={totalData}
        pageSize={10}
        onChange={(page) => {
          getList({
            page,
          });
        }}
      />
      <Modal
        title="Thông tin khách hàng"
        open={open && currentData}
        footer={null}
        onCancel={onClose}
      >
        <div className="max-h-[80vh] overflow-auto px-4">
          {Object.keys(LIST_DATA).map((item) => (
            <List.Item key={item}>
              <List.Item.Meta
                title={
                  <div className="font-semibold">
                    {LIST_DATA[item as keyof typeof LIST_DATA] + ":"}
                  </div>
                }
                description={
                  currentData
                    ? listDate.includes(item)
                      ? formatDate(
                          currentData[item as keyof typeof currentData]
                        )
                      : currentData[item as keyof typeof currentData]
                    : null
                }
              />
            </List.Item>
          ))}
          <div className="font-semibold mb-3">
            Hình ảnh:{" "}
            <Button
              className="ml-3"
              onClick={() => {
                downloadImage(
                  currentData?.images?.map(
                    (item: any) =>
                      `http://103.72.96.110:3000/images/${item?.data?.filename}`
                  )
                );
              }}
            >
              Tải hình ảnh
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            {currentData?.images?.map((item: any) => {
              return (
                <Image
                  src={`http://103.72.96.110:3000/images/${item?.data?.filename}`}
                  alt="'wwwww"
                  key={item}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}
