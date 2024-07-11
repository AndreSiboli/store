import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.scss";
import MainContainer from "./components/layout/MainContainer";
import { PrivateRouteProvider } from "@/_contexts/PrivateRoute";
import { UserProvider } from "@/_contexts/UserContext";
import { CartProvider } from "@/_contexts/CartContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Store",
  description: "This is a fictional site about a web store.",
  creator: "André Siboli",
  keywords: "store, products, shopping",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <PrivateRouteProvider>
          <UserProvider>
            <CartProvider>
              <MainContainer>{children}</MainContainer>
            </CartProvider>
          </UserProvider>
        </PrivateRouteProvider>
      </body>
    </html>
  );
}
