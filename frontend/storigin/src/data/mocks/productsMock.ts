import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { ProductDTO } from "@shared/types/product";
import { CartDTO, CartItemDTO } from "@shared/types/cart";

// Helper: Generate a mock product
function generateMockProduct(): ProductDTO {
  return {
    id: uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 300 })),
    image: faker.image.url(),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 50 }),
  };
}

// Helper: Generate a mock cart item
function generateMockCartItem(): CartItemDTO {
  return {
    id: uuid(),
    product: generateMockProduct(),
    quantity: faker.number.int({ min: 1, max: 5 }),
  };
}

// Main: Generate a mock cart
export function generateMockCart(
  userId = faker.string.uuid(),
  itemCount = 3
): CartDTO {
  const items = Array.from({ length: itemCount }, generateMockCartItem);

  return {
    id: uuid(),
    userId,
    items,
  };
}
