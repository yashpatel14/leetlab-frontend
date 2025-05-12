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
  

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const { authUser,logout } = useAuthStore();
  
  const onLogout = async()=>{
    await logout();
    
}

  console.log("AUTH_USER", authUser);

  return (
    <nav className="flex items-center justify-between w-full px-4 py-3 shadow-md bg-white dark:bg-gray-900">
      {/* Left - Logo */}
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        MyApp
      </div>

      {/* Center - Navigation Links (hidden on mobile) */}
      <div className="hidden md:flex gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className="text-gray-700 dark:text-gray-200 hover:underline"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right - Mobile Menu and Profile Button */}
      <div className="flex items-center gap-2">
        {/* Mobile Nav Toggle */}
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

        {/* Profile Button (Icon) */}
        <div
          
        >
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className="ml-2">
      <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="mt-2">
    <DropdownMenuItem asChild>
      <Link to="/profile">Profile</Link>
    </DropdownMenuItem>
    
    {authUser?.role === "ADMIN" && (
      <DropdownMenuItem asChild>
        <Link to="/add-problem">Add Problem</Link>
      </DropdownMenuItem>
    )}
    
    <DropdownMenuItem onClick={onLogout}>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
