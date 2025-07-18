// app/_components/ProductGrid.tsx or app/home/ProductGrid.tsx

import { getAllProducts } from "@/lib/api/products"; // replace with your Prisma call
import ProductCard from "@/components/ProductCard";

export default async function ProductGrid() {
  const products = await getAllProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-10">
      {products.map((product) => (
        <div key={product.id} className="relative z-10">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
