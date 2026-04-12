/**
 * Main application layout
 * Wraps all pages with shared header and footer
 */

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Spinner } from "@/components/atoms/Spinner";
import { OfflineBanner } from "@/components/organisms/OfflineBanner";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export const MainLayout = () => {
  // Scroll to top on pathname changes (real navigation)
  useScrollToTop();

  return (
    <>
      <OfflineBanner />
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
