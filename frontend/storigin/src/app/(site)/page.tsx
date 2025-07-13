import { HeroSection } from "@/components/landing/HeroSection";
import ProductCard from "@/components/ProductCard";
import { generateMockProduct } from "@/data/mocks/productsMock"; // make sure this is your util

export default function Home() {
  const products = Array.from({ length: 12 }, () => generateMockProduct());

  return (
    <main className="w-full">
      <div className="px-4 md:px-14 lg:px-20 xl:px-40 2xl:px-52 space-y-12">
        <HeroSection />

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}
