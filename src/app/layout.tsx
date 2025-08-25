import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/header";
import Breadcrumb from "@/components/layout/breadcrumb";
import Footer from "@/components/layout/footer";
import { CartDrawer } from "@/features/cart/components";

export const metadata: Metadata = {
  title: "Skin Clinic Ecommerce Demo",
  description:
    "A demo ecommerce storefront built with Next.js, TypeScript, and React Query. Developed with a Storybook-first workflow, accessibility (WCAG 2.1 AA), and Chromatic visual testing.",
  applicationName: "Skin Clinic Demo",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "React Query",
    "Storybook",
    "Accessibility",
    "WCAG",
    "Chromatic",
    "Ecommerce",
    "Demo",
  ],
  authors: [{ name: "Graeme Houston", url: "https://github.com/iamgraeme" }],
  creator: "Graeme Houston",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-satoshi antialiased`}>
        <Providers>
          <Header />
          <main className="mx-auto w-[1240px] pb-20">
            <Breadcrumb />
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
