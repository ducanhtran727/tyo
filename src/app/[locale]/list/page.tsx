"use client"

import { Table ,List  } from "antd"
import { useRouter } from "next/navigation"

import { ScreenSizeContext } from "@/context/ScreenSize.context"
import { useContext } from "react"


export default function Home({ params }: any) {

  const { isMobile, isTablet } = useContext(ScreenSizeContext)


  const columns = [
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
    {
      title: "wwww",
      key: "www",
      dataIndex: "www",
    },
  ]

  const router = useRouter()

  const changeLang = (lang: string) => {
    router.push(`${lang}`)
  }

  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col items-center justify-between sm:p-24">
      <Table columns={columns} />
    </main>
  )
}
