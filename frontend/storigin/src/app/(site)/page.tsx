// app/page.tsx

import { HeroSection } from "@/components/landing/HeroSection";
import ProductGrid from "@/components/landing/ProductGrid";
import ProductSkeletonGrid from "@/components/skeletons/product/ProductSkeletonGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full">
      <div className="px-4 md:px-14 lg:px-20 xl:px-40 2xl:px-4 space-y-12 py-8">
        <HeroSection />

        <section className="mt-8 relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Products
          </h2>

          <Suspense fallback={<ProductSkeletonGrid />}>
            <ProductGrid />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
