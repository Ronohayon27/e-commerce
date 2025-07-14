"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  LogIn,
  User,
  Search,
  List,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  className?: string;
}

export default function Header({ className }: NavBarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const isLoggedIn = false;

  const navItems: NavItem[] = [
    { name: "Categories", url: "/categories", icon: List },
    { name: "Cart", url: "/cart", icon: ShoppingCart },
    {
      name: isLoggedIn ? "Profile" : "Login",
      url: isLoggedIn ? "/profile" : "/login",
      icon: isLoggedIn ? User : LogIn,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-0 right-0 z-20 mb-6 sm:pt-6 pointer-events-none",
        className
      )}
    >
      <div className="flex items-center justify-between bg-background/60 border border-border backdrop-blur-lg py-1 px-3 rounded-full shadow-lg mx-auto w-[70%] pointer-events-auto">
        {/* Left side: Logo and Search */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="relative flex items-center justify-center px-4"
          >
            <div className="relative w-6 h-6 sm:w-10 sm:h-10">
              <Image
                src="/just-logo.svg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            {pathname === "/" && <AnimatedLamp />}
          </Link>
          {/* Search */}
          <div className="hidden md:flex items-center px-3 py-2 rounded-full bg-muted relative">
            <Search size={16} className="mr-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground"
            />
            {pathname === "/search" && <AnimatedLamp />}
          </div>
        </div>
        
        {/* Right side: Navigation links */}
        <div className="flex items-center gap-2">
          {/* Categories */}
          <NavLink
            item={navItems[0]}
            isMobile={isMobile}
            isActive={pathname === navItems[0].url}
          />

          {/* Cart and Login */}
          {navItems.slice(1).map((item) => (
            <NavLink
              key={item.name}
              item={item}
              isMobile={isMobile}
              isActive={pathname === item.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavLink({
  item,
  isMobile,
  isActive,
}: {
  item: NavItem;
  isMobile: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.url}
      className={cn(
        "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors ",
        "text-foreground/80 hover:text-primary",
        isActive && "bg-primary/10 text-primary"
      )}
    >
      {!isMobile && <span>{item.name}</span>}
      {isMobile && <Icon size={18} strokeWidth={2.5} />}
      {isActive && <AnimatedLamp />}
    </Link>
  );
}

function AnimatedLamp() {
  return (
    <motion.div
      layoutId="lamp"
      className="absolute inset-0 w-full rounded-full -z-10 bg-transparent"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full">
        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
      </div>
    </motion.div>
  );
}
