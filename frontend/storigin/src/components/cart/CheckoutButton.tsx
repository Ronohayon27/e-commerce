"use client";
import { Button } from "../ui/button";
export default function CheckoutButton() {
  return (
    <Button
      onClick={() => alert("Proceeding to checkout...")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Checkout
    </Button>
  );
}
