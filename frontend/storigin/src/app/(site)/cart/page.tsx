import React from "react";
import ProductCard from "@/components/ProductCard";
import { generateMockProduct} from "@/data/mocks/productsMock";


const CartPage = async () => {
  // Create an array of promises and then await them all at once
  const productPromises = Array.from({ length: 12 }, () => generateMockProduct());
  const products = await Promise.all(productPromises);
  return (<div className="px-4 md:px-14 lg:px-20 xl:px-40 2xl:px-52 py-8"> 
    <section className="mt-8 relative z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative z-10">
            <ProductCard product={product} />
          </div>
    ))}
  </div>
</section>
</div>)
};

export default CartPage;
