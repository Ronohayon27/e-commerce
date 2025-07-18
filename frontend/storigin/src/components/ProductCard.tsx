"use client";
import React, { useState } from "react";
import { ProductDTO } from "../../../../shared/types/product";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ProductDTO;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Add default values if product is undefined
  const safeProduct = product || {
    id: "",
    name: "Product Name",
    description: "Product Description",
    price: 0,
    image: "/images/samsung-tv.webp",
    category: "Category",
    stock: false,
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    // Here you would add the actual logic to add the product to the cart
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would add the actual logic to add/remove from favorites
  };

  return (
    <div
      className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative z-10"
      onClick={(e) => {
        // Prevent event bubbling
        e.stopPropagation();
      }}
    >
      {/* Image container with relative positioning for favorite button */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={safeProduct.image}
          alt={safeProduct.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         25vw"
          className="transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-500"
          } hover:bg-red-500 hover:text-white transition-colors duration-300 cursor-pointer`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorite ? "white" : "none"} />
        </button>
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {safeProduct.name}
          </h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
            {safeProduct.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-1 flex-grow">
          {safeProduct.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-gray-900">
            ${safeProduct.price.toFixed(2)}
          </span>
          <span
            className={`text-sm ${
              safeProduct.stock ? "text-green-500" : "text-red-500"
            }`}
          >
            {safeProduct.stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* View Details button */}
        <Link
          href={`/product/${safeProduct.id}`}
          className="mt-3 w-full py-2 px-4 rounded-md flex items-center justify-center bg-gray-700 text-white hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
        >
          View Details
        </Link>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!safeProduct.stock}
          className={`mt-3 w-full py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-300 ${
            safeProduct.stock
              ? isAddedToCart
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={18} className="mr-2" />
          {isAddedToCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
