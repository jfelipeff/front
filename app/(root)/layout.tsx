"use client";

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Topbar from "@/components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />

        <main className="flex flex-row">
          <section className="main-container">
            <div className="w-full">{children}</div>
          </section>
        </main>
      </body>
    </html>
  );
}
