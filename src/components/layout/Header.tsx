import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  className?: string;
};

const Header = ({ className = "" }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "w-full h-20 flex items-center justify-between px-8 md:px-16 lg:px-24 bg-white shadow-sm fixed top-0 z-50",
        className,
      )}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Param Soni
          </span>
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex items-center space-x-8"
      >
        <NavLink to="/" isActive={location.pathname === "/"}>
          Home
        </NavLink>
        <NavLink to="/about" isActive={location.pathname === "/about"}>
          About
        </NavLink>
        <NavLink to="/portfolio" isActive={location.pathname === "/portfolio"}>
          Portfolio
        </NavLink>
        <NavLink
          to="/certification"
          isActive={location.pathname === "/certification"}
        >
          Certification
        </NavLink>
        <NavLink to="/resume" isActive={location.pathname === "/resume"}>
          Resume
        </NavLink>
        <NavLink to="/contact" isActive={location.pathname === "/contact"}>
          Contact
        </NavLink>
      </motion.nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-0 right-0 bg-white shadow-md z-40 overflow-hidden md:hidden"
          >
            <div className="flex flex-col py-4">
              <MobileNavLink
                to="/"
                onClick={toggleMobileMenu}
                isActive={location.pathname === "/"}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                to="/about"
                onClick={toggleMobileMenu}
                isActive={location.pathname === "/about"}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                to="/portfolio"
                onClick={toggleMobileMenu}
                isActive={location.pathname === "/portfolio"}
              >
                Portfolio
              </MobileNavLink>
              <MobileNavLink
                to="/certification"
                onClick={toggleMobileMenu}
                isActive={location.pathname === "/certification"}
              >
                Certification
              </MobileNavLink>
              <MobileNavLink
                to="/resume"
                onClick={toggleMobileMenu}
                isActive={location.pathname === "/resume"}
              >
                Resume
              </MobileNavLink>
              <MobileNavLink
                to="/contact"
                onClick={toggleMobileMenu}
                isActive={location.pathname === "/contact"}
              >
                Contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
};

const NavLink = ({
  to,
  children,
  className = "",
  isActive = false,
}: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-gray-700 hover:text-black transition-colors duration-200 font-medium relative group",
        isActive ? "text-black" : "",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-black to-red-600 transition-all duration-300 group-hover:w-full",
          isActive ? "w-full" : "w-0",
        )}
      />
    </Link>
  );
};

type MobileNavLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

const MobileNavLink = ({
  to,
  children,
  onClick,
  isActive = false,
}: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-8 py-3 text-gray-700 hover:bg-gray-50 transition-colors",
        isActive
          ? "text-black font-medium border-l-4 border-red-500 bg-gray-50"
          : "",
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
