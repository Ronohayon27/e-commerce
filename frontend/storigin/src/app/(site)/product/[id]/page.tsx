"use server";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import { getProductById } from "@/lib/api/products";
interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);
  const rating = 4.5;
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Thumbnail Navigation - could be expanded in a real app */}
          <div className="mt-4 flex gap-2 justify-center">
            <button className="w-20 h-20 border-2 border-primary rounded-md overflow-hidden relative">
              <Image
                src={product.image}
                alt="Thumbnail"
                fill
                className="object-cover"
              />
            </button>
            {/* Additional thumbnails would go here */}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {rating.toFixed(1)} ({Math.floor(Math.random() * 500) + 50}{" "}
              reviews)
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-4">
            ${product.price.toFixed(2)}
            <span className="ml-2 text-lg text-gray-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-green-600">Save 20%</span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Availability</h2>
            <div className="flex items-center">
              {product.stock ? (
                <>
                  <Check size={18} className="text-green-500 mr-2" />
                  <span className="text-green-500">In Stock</span>
                </>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={!product.stock}
              className={`py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300 ${
                product.stock
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>

            <button className="py-3 px-6 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300">
              <Heart size={20} className="mr-2" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
