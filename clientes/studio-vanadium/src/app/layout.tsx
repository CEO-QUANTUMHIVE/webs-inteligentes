import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Vanadium",
  description: "Studio Vanadium is a Surabaya based design studio specializing in branding and graphic design. We offer multidisciplinary services, including visual identities, packaging, motion, digital and print design, environmental graphics, and UIUX design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
