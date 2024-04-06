import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import ScreenSizeContextProVider from "@/context/ScreenSize.context"
import { AppHeader } from "@/components/Layout/AppHeader"
import { useTranslations } from "next-intl"



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children, params: {locale} 
}: Readonly<{
  children: React.ReactNode,
  params: {locale: any}
}>) {


  return (
    <html lang="en">
      <AntdRegistry>
        <ScreenSizeContextProVider>
          <body className="md:mx-auto overflow-x-hidden bg-white relative">
            <AppHeader lang={locale}  />
            {children}
          </body>
        </ScreenSizeContextProVider>
      </AntdRegistry>
    </html>
  )
}
