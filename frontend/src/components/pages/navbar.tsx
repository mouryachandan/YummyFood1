import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import profile from "./image/profile_icon.png";

interface NavbarProps {
  cart: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, searchQuery, setSearchQuery }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || localStorage.getItem("admin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    setUser(null);
    navigate("/");
  };

  const handleAddress = () => {
    // Navigate to the address page or modal
    navigate("/address");
  };

  return (
    <nav
      className="w-full text-white p-4 h-72 shadow-md bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop')",
      }}
    >
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Foodie</div>
        <ul className="flex space-x-4 font-semibold">
          <li className="hover:text-red-500">
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-red-500">
            <Link to="/menu">Menu</Link>
          </li>
          <li className="hover:text-red-500">
            <Link to="/services">Services</Link>
          </li>
          <li className="hover:text-red-500">
            <Link to="/about">About</Link>
          </li>
        </ul>

        <div className="flex space-x-4 items-center">
          <Link to="/cart" className="flex items-center">
            <ShoppingCart className="text-red-500" />
            <span>{cart.length}</span>
          </Link>

          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user && <span className="text-lg font-semibold">{user.name}</span>}
              <img
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
                <button
                  onClick={handleAddress}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white"
                >
                  Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <h2 className="text-2xl font-semibold">Welcome to My Foodie Restaurant</h2>
      </div>

      {/* ✅ Fixed Search Input */}
      <div className="text-center mt-4">
        <div className="relative inline-block w-1/2">
          <input
            type="text"
            placeholder="Search for food..."
            className="w-full p-2 pl-10 text-lg rounded-md border text-slate-950 border-gray-300 focus:outline-none focus:border-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-950">
            🔍
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
