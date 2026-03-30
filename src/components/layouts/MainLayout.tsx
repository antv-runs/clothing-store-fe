/**
 * Main application layout
 * Wraps all pages with shared header and footer
 */

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
