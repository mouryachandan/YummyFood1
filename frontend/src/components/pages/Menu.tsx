import { useEffect, useState } from "react";
import axios from "axios";
import { getFoods } from "../../api/food"; 

type Food = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantName: string;  
};

interface MenuProps {
  searchQuery: string;
}

const Menu: React.FC<MenuProps> = ({ searchQuery }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFoods()
      .then((fetchedFoods) => {
        setFoods(fetchedFoods);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
        setError("Failed to load menu. Please try again.");
        setLoading(false);
      });
  }, []);

  const onAddToCart = async (food: Food) => {
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData).id : null;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/cart/add", {
        userId,
        foodId: food.id,
      });
      alert(`${food.name} added to cart!`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading menu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="py-6 px-3 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Explore More Food</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div 
              key={food.id} 
              className="bg-white border rounded-md shadow-sm hover:shadow-md transition-all duration-300 p-3 text-center transform hover:scale-105"
            >
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-24 object-cover rounded-sm"
              />
              <h3 className="font-medium text-sm mt-1 text-gray-800">{food.name}</h3>
              <p className="text-gray-500 text-xs">{food.restaurantName}</p>
              <p className="text-red-600 font-bold text-sm mt-1">₹{food.price}</p>
             
              <button
                onClick={() => onAddToCart(food)}
                className="mt-2 bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition duration-200"
              >
                Add
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No food items found</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
