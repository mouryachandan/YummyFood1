import axios from "axios";

const API_URL = "http://localhost:4000/api/food";

export type Food = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantName: string;  
};

// ✅ Fetch Foods
// Updated getFoods function to handle name filtering
export const getFoods = async (): Promise<Food[]> => {
  // if (!adminId) throw new Error("Admin ID is required");

  try {
    const response = await axios.get(`${API_URL}/all`, {
      // params: { adminId, name },  // Pass 'name' if available
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch foods.");
  }
};
 

// ✅ Add Food
export const addFood = async (formData: FormData): Promise<Food> => {
  try {
    const response = await axios.post(`${API_URL}/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response)
    return response.data
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to add food.");
  }
};

// ✅ Delete Food
export const deleteFood = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    throw new Error("Failed to delete food.");
  }
};
