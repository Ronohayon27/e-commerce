import { faker } from "@faker-js/faker";

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

export function generateMockProduct(): MockProduct {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
    imageUrl: faker.image.urlLoremFlickr({
      category: "product",
      width: 300,
      height: 300,
    }),
    category: faker.commerce.department(),
    inStock: faker.datatype.boolean(),
    rating: parseFloat((Math.random() * 5).toFixed(1)),
  };
}
