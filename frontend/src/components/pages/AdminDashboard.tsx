import { useState, useEffect } from "react";
import { addFood, deleteFood, getFoods } from "../../api/food";
import { useNavigate } from "react-router-dom";


type Food = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantName: string; 
};

type Admin = {
  id: number;
  name: string;
  restaurantName: string;
  email: string;
};

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState(""); 
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const adminData = localStorage.getItem("admin");
  const admin: Admin | null = adminData ? JSON.parse(adminData) : null;

  const fetchFoods = async () => {
    if (!admin) {
      setMessage("Admin not logged in.");
      return;
    }
    setIsLoading(true);
    try {
      const data = await getFoods();
      setFoods(data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to fetch foods.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (admin) fetchFoods();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please upload an image.");
      return;
    }

    if (!admin) {
      setMessage("Admin not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price).toString());
    formData.append("description", description);
    formData.append("image", image);
    formData.append("adminId", admin.id.toString());
    formData.append("restaurantName", restaurantName); 

    try {
      setMessage("Adding food...");
      await addFood(formData);
      setMessage("Food added successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setRestaurantName(""); 
      setImage(null);
      fetchFoods();
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setMessage("Deleting food...");
      await deleteFood(id);
      setMessage("Food deleted successfully!");
      fetchFoods();
    } catch (error) {
      setMessage("Failed to delete food.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {admin && (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              Profile
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-4">
                <p className="font-semibold">{admin.name}</p>
                <p className="text-sm text-gray-600">{admin.restaurantName}</p>
                <p className="text-sm text-gray-600">{admin.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {admin ? (
        <>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Food Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Restaurant Name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Add Food
              </button>
            </div>
          </form>

          <h2 className="text-2xl font-bold mb-4 text-center">Food List</h2>
          {isLoading ? (
            <p className="text-center text-gray-700">Loading...</p>
          ) : foods.length === 0 ? (
            <p className="text-center text-gray-500">No food items available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <div key={food.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-800">{food.restaurantName}</h4> 
                  <img src={food.imageUrl} alt={food.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
                  <p className="text-gray-600 mb-2">{food.description}</p>
                  <p className="text-gray-800 font-bold mb-4">₹{food.price}</p>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
