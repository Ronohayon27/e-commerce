"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, StarHalf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type MockProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
};

const ProductCard: React.FC<{ product: MockProduct }> = ({ product }) => {
  const filledStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  const totalStars = 5;

  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="relative flex flex-col justify-between h-full rounded-2xl shadow-md border transition-all duration-300">
      {/* Heart Button (not affected by hover scaling) */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        aria-label="Add to favorites"
        onClick={() => setIsFavorited((prev) => !prev)}
      >
        <AnimatePresence mode="wait">
          {isFavorited ? (
            <motion.span
              key="filled"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500 transition-all duration-100" />
            </motion.span>
          ) : (
            <motion.span
              key="empty"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5 text-gray-600 transition-all duration-100" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hover scale only this part */}
      <div className="group hover:scale-[1.015] transition-transform duration-300 flex flex-col flex-grow">
        {/* Product Image */}
        <div className="relative w-full h-60 overflow-hidden rounded-t-2xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover bg-white"
          />
        </div>

        {/* Product Info */}
        <CardContent className="p-4 space-y-2 flex-grow">
          {/* Name and Price Row */}
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-base font-semibold truncate">{product.name}</h3>
            <p className="text-muted-foreground font-medium text-sm">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-1">
            {product.description}
          </p>

          {/* Category */}
          <p className="text-xs text-muted-foreground">{product.category}</p>

          {/* Stars */}
          <div className="flex gap-[2px]">
            {Array.from({ length: totalStars }).map((_, index) => {
              if (index < filledStars) {
                return (
                  <Star
                    key={index}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                  />
                );
              } else if (index === filledStars && hasHalfStar) {
                return (
                  <StarHalf key={index} className="w-4 h-4 text-yellow-400" />
                );
              } else {
                return <Star key={index} className="w-4 h-4 text-gray-300" />;
              }
            })}
          </div>

          {/* Out of stock message */}
          <p className="text-xs font-medium h-4 text-yellow-500">
            {!product.inStock ? "Currently out of stock" : ""}
          </p>
        </CardContent>

        {/* Action Buttons - Always at bottom */}
        <CardFooter className="p-4 pt-0 mt-auto flex flex-row gap-2">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;
