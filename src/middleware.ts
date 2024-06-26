import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["jp", "vi", "en"],

  // Used when no locale matches
  defaultLocale: "jp",
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en|jp)/:path*"],
}
