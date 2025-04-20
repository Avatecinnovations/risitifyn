import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/assets/images/logo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-brand-dark text-white py-4">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo className="h-8 md:h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/features"
            className="hover:text-brand-primary transition-colors"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="hover:text-brand-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className="hover:text-brand-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about-us"
            className="hover:text-brand-primary transition-colors"
          >
            About Us
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Link to="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-brand-primary transition-colors"
              >
                Log in
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign up for free
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark pt-2 pb-4">
          <div className="container-custom space-y-2 flex flex-col">
            <Link
              to="/features"
              className="py-2 hover:text-brand-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="py-2 hover:text-brand-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="py-2 hover:text-brand-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about-us"
              className="py-2 hover:text-brand-primary transition-colors"
            >
              About Us
            </Link>
            <div className="pt-2 space-y-3">
              {user ? (
                <Link to="/dashboard" className="btn-primary inline-block">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-brand-primary transition-colors"
                  >
                    Log in
                  </Link>
                  <Link to="/signup" className="btn-primary inline-block">
                    Sign up for free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
