import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-3/4 m-5 bg-white text-black p-4 flex justify-between items-center shadow-2xl rounded-xl">
      {/* Left side: Logo */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <Image src="/logo.png" alt="Logo" width={60} height={60}></Image>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side: Signup, Login, Cart */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-12 mr-10">
          <NavigationMenuItem>
            <NavigationMenuLink href="/signup">Signup</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/login">Login</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/cart">
              <ShoppingCart />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Header;
