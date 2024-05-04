import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "suneditor/dist/css/suneditor.min.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer, toast } from "react-toastify";

import tw from "~/lib/tw";
import UiProvider from "~/provider/UiProvider";
import QueryProvider from "~/provider/QueryProvider";
import ScrollTop from "~/components/ScrollTop";
import ClientLayout from "~/components/ClientLayout";

const roboto = Roboto({
   subsets: ["latin"],
   weight: ["300", "400", "500", "700", "900"],
   variable: "--font-roboto",
});

export const metadata: Metadata = {
   title: "Đức Mạnh gia dụng",
   description:
      "Đức Mạnh gia dụng chuyên cung cập sản phẩm gia dụng trong và ngoài nước",
   icons: {
      icon: "/assets/favicon.ico",
   },
   openGraph: {
      title: "Đức Mạnh gia dụng",
      description:
         "Đức Mạnh gia dụng chuyên cung cập sản phẩm gia dụng trong và ngoài nước",
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={tw(roboto.variable, "font-roboto bg-[--gray-100-color]")}
         >
            <QueryProvider>
               <ToastContainer
                  position="bottom-left"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  className="select-none"
               />
               <ScrollTop />
               <NextTopLoader color="var(--blue-color)" height={2} />
               <UiProvider>
                  <ClientLayout>{children}</ClientLayout>
               </UiProvider>
            </QueryProvider>
         </body>
      </html>
   );
}
