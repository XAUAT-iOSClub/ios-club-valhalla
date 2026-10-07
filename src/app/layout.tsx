import type {Metadata} from "next";
import type {ReactNode} from "react";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "iOS Club 凌烟阁",
    description: "纪念那些曾经为人民服务的伟大的人",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100`}
        >
        <Header/>
        <main className="flex-grow">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
