"use client";

import { useState } from "react";
import { CartItemDTO } from "@shared/types/cart";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  item: CartItemDTO;
}

export default function CartItemRow({ item }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (newQty: number) => {
    if (newQty < 1) return;
    setLoading(true);
    // await fetch PATCH here
    setQuantity(newQty);
    setLoading(false);
  };

  const removeItem = async () => {
    setLoading(true);
    // await fetch DELETE here
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src={"/images/samsung-tv.webp"}
          alt={item.product.name}
          fill
          className="rounded-md object-cover border"
          sizes="96px"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="font-medium text-sm">{item.product.name}</div>
        <div className="text-muted-foreground text-sm">
          ${item.product.price.toFixed(2)}
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => updateQuantity(parseInt(e.target.value))}
            className="w-20"
            disabled={loading}
          />
          <Button
            variant="ghost"
            onClick={removeItem}
            disabled={loading}
            className="text-destructive px-2 text-sm"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className="font-semibold text-sm">
        ${(item.product.price * quantity).toFixed(2)}
      </div>
    </div>
  );
}
