"use client";

import { Button } from "../ui/button";

export default function ClearCartButton() {
  const handleClearCart = async () => {
    //clearCart();
    //window.location.reload();
  };

  return (
    <Button
      onClick={handleClearCart}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Clear Cart
    </Button>
  );
}
