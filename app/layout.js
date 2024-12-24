import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();
//PlausibleProvider 用于在 Next.js 应用中集成 Plausible 分析服务。Plausible 是一个简单、隐私友好的网页分析工具，它提供了一个轻量级的跟踪脚本，用于收集网站访问数据，同时尊重用户的隐私
//<ClientLayout>{children}</ClientLayout>：ClientLayout 是另一个 React 组件，它包裹 children props 传递的组件。根据注释，它包含客户端的所有包装器，如 Crisp 聊天支持、吐司消息、工具提示等。
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
