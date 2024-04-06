import axiosInstance from "@/api/baseRequest"
import { PlusOutlined } from "@ant-design/icons"
import { Modal, Upload, message } from "antd"
import type { RcFile, UploadProps } from "antd/es/upload"
import type { UploadFile } from "antd/es/upload/interface"
import { useEffect, useState } from "react"

message.config({
  maxCount: 1,
})
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })


export interface IUploadProductImageProps {
  onChange?: (value: any) => void
  value?: any[]
}
const UploadProductImage = ({ onChange, value }: IUploadProductImageProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    )
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    onChange &&
      onChange(
        newFileList.map((item) => {
          return {
            ...item,
            path: item.response,
          }
        })
      )
  }

  const uploadButton = (
    <div className="flex flex-col items-center justify-center">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept=".png , .jpg, .jpeg, .heic"
        multiple
        beforeUpload={(file, files) => {
          return new Promise((resolve, reject) => {
            const isLt2M = file.size / 1024 / 1024 < 10
            if (files.length + fileList.length > 50) {
              message.error("Tối đa 50 ảnh!")
              reject(false)
            }

            if (!isLt2M) {
              message.error("Ảnh dung lượng tối đa 10MB")
              reject(false)
            } else resolve(true)
          })
        }}
        customRequest={async ({
          onSuccess,
          onError,
          file,
          filename,
          data,
          onProgress,
        }) => {
          const fmData = new FormData()
          fmData.append("image", file)

          try {
            const response = await axiosInstance.request({
              url: "/common/v4/upload-files",
              method: "POST",
              baseURL: "https://api-v3.meeyland.com",
              onUploadProgress: (event) => {
                onProgress && onProgress(event.event)
              },
              headers: {
                contentType: "multipart/form-data",
              },
              data: fmData,
            })


            onSuccess && onSuccess(response.data.data)
          } catch (err: any) {
            onError && onError(err)
          } finally {
          }
        }}

        // beforeUpload={beforeUpload}
      >
        {fileList.length >= 50 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width={"100%"}
      >
        <div className="w-full h-[70vh] relative">
          <img
            alt="example"
            className="w-full h-full absolute object-cover"
            src={previewImage}
          />
        </div>
      </Modal>
    </>
  )
}

export default UploadProductImage
