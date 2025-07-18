import { generateMockCart } from "@/data/mocks/productsMock";
import { CartDTO, CartItemDTO } from "@shared/types/cart";
import CartItemRow from "@/components/cart/CartItemRow";
import ClearCartButton from "@/components/cart/ClearCartButton";
import CheckoutButton from "@/components/cart/CheckoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function CartPage() {
  const cart: CartDTO = await generateMockCart();
  const cartItems: CartItemDTO[] = cart.items;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-muted-foreground text-center">Your cart is empty.</p>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-6">
            {cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}

            <Separator />

            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </div>
              <div className="flex gap-4">
                <ClearCartButton />
                <CheckoutButton />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
