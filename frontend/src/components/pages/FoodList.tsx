import { useEffect, useState } from "react";
import { getFoods } from "../../api/food";

type Food = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
 
};

export default function FoodList() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [message, setMessage] = useState<string>("");

  
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    const fetchFoods = async () => {
      if (!adminId) {
        setMessage("Admin not logged in.");
        return;
      }

      // try {
      //   const data = await getFoods(adminId);
      //   setFoods(data);
      //   setMessage("");
      // } catch (error) {
      //   setMessage("Failed to fetch foods.");
      // }
    };

    fetchFoods();
  }, [adminId]);

  return (
    <div>
      <h1>Menu</h1>
      {message && <p>{message}</p>}
      <div>
        {foods.map((food) => (
          <div key={food.id}>
            <h3>{food.name}</h3>
          
            <p>{food.description}</p>
            <p>₹{food.price}</p>
            <img src={food.imageUrl} alt={food.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
