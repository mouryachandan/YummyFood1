import React, { useEffect, useState } from "react";
import axios from "axios";
import { getFoods } from "../../api/food";
import { useParams, useNavigate } from "react-router-dom";

type Food = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantName: string; 
};

const FoodByName = () => {
  const { name } = useParams<{ name?: string }>();
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).id : null;

  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setError("User ID is required. Please log in.");
      setLoading(false);
      return;
    }

    const fetchFoods = async () => {
      try {
        setLoading(true);
        const data = await getFoods();

        const filteredFoods = name
          ? data.filter((food: Food) =>
              food.name.toLowerCase().includes(name.toLowerCase())
            )
          : data;

        setFoods(filteredFoods);
      } catch (err) {
        setError("Error fetching food items. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [name, userId]);

  const onAddToCart = async (food: Food) => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/cart/add", {
        userId,
        foodId: food.id,
      });
      alert("Item added to cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {name ? `Food: ${name}` : "Food Items"}
      </h1>

      {error && (
        <div className="text-center text-red-500">
          {error}{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 underline"
          >
            Login
          </button>
        </div>
      )}

      {loading && <p className="text-center text-gray-500">Loading food items...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food.id}
              className="bg-white border rounded-md shadow-sm hover:shadow-md transition-all duration-300 p-3 text-center transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/food/${food.name}`)}
            >
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-24 object-cover rounded-sm"
              />
              <h3 className="font-medium text-sm mt-1 text-gray-800">{food.name}</h3>
              <p className="text-gray-500 text-xs">{food.description}</p>
              <p className="text-gray-500 text-xs">{food.restaurantName}</p>
              <p className="text-red-600 font-bold text-sm mt-1">₹{food.price}</p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(food);
                }}
                className="mt-2 bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition duration-200"
              >
                Add
              </button>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center col-span-full text-gray-500">
              No {name || "food"} items available.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default FoodByName;
