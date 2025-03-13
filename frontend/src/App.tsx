import React, { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [userId] = useState(1); 


  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 
  const addToCart = (food: any) => {
    setCart((prevCart) => [...prevCart, { ...food }]);
  };

  return (
    <AppRoutes 
      cart={cart} 
      onAddToCart={addToCart} 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      userId={userId} 
    />
  );
};

export default App;
