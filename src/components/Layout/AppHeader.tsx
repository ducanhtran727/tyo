"use client"

import { Select } from "antd"
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

export function AppHeader({ lang }: { lang: string; }) {
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const changeLang = (lang: string) => {
    router.push(`${lang}`)
    setOpen(false)
  }

  const { isMobile, isTablet } = useContext(ScreenSizeContext)

  return (
    <div className="flex w-full z-50 justify-end p-4 items-center sticky top-0 left-0">
      <Select
        options={options}
        defaultValue={lang}
        className="w-32"
        onChange={(val) => {
          changeLang(val)
        }}
      />
      <Link className="ml-4" href={'/'}>Đăng nhập</Link>
    </div>
  )
}
