import React, { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser,logout } = useAuthStore();
  
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  
  
  const onLogout = async()=>{
    await logout();
    
}

  console.log("AUTH_USER", authUser);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 py-3">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      {/* Logo */}
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
        MyApp
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200 font-medium"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile + Profile */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-10">
              <nav className="flex flex-col gap-4">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-gray-800 dark:text-gray-200 hover:underline"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2 w-40 shadow-xl">
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            {authUser?.role === "ADMIN" && (
              <DropdownMenuItem asChild>
                <Link to="/add-problem">Add Problem</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
