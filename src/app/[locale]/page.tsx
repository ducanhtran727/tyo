"use client"

import { Select } from "antd"
import { useRouter } from "next/navigation"
import CardMain from "@/components/CardMain"

export default function Home({ params }: any) {
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

  const router = useRouter()

  const changeLang = (lang: string) => {
    router.push(`${lang}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardMain />
    </main>
  )
}
