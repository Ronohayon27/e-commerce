export type PublicUserDTO = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

// TODO: MAYBE CHANGE IN THE FUTURE TO A MORE COMPLEX OBJECT
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
};
