
import { useNavigate } from "react-router-dom";
import momos from './image/momos.jpg';
import idli from './image/idali.jpeg';
import dosa from './image/dosa.jpg';
import Paratha from './image/paratha.jpg';
import Cake from './image/cack.jpg';
import PaniPuri from './image/pani_poori.webp';
import FishFry from './image/puttu.avif';
import samosa from './image/samosa.jpg';
import Manchuriyan from './image/manchuriyan.jpg';
import Briyani from './image/Briyani.webp';
import poori from './image/pani_poori.webp'
import Pizza from './image/pizza.jpg';

const foodOptions = [
  { id: 21, name: "Thali", image: "https://thumbs.dreamstime.com/b/indian-thali-26440151.jpg" },
  { id: 26, name: "Idli", image: idli },
  { id: 2, name: "Dosa", image: dosa },
  { id: 3, name: "Briyani", image: Briyani },
  { id: 4, name: "Poori", image: poori},
  { id: 5, name: "Paratha", image: Paratha },
  { id: 6, name: "Puttu", image: FishFry },
  { id: 7, name: "Cake", image: Cake },
  { id: 8, name: "PaniPuri", image: PaniPuri },
  { id: 9, name: "Momos", image: momos },
  { id: 10, name: "FishFry", image: FishFry },
  { id: 11, name: "Samosa", image: samosa },
  { id: 12, name: "Manchurian", image: Manchuriyan },
  { id: 13, name: "Pizza", image: Pizza },

];



export default function FoodDelivery() {
  const navigate = useNavigate();

  const foodItems = [
    { id: 1, name: "Icecream", description: "Chocolate & vanilla", price: 10, imageUrl: "https://media.istockphoto.com/id/626535998/photo/vanilla-and-chocolate-ice-cream.jpg?s=612x612&w=0&k=20&c=uvC6kQ5aVewKK1mtEa7HkqAGZch5Yv3FMnaDCidElKk=" },
    { id: 2, name: "popcorn", description: "The best popcorn", price: 15, imageUrl: "https://media.istockphoto.com/id/508300585/photo/the-perfect-entertainment-snack.jpg?s=612x612&w=0&k=20&c=5PoT8bxUW-I-pipZEjTc0tjMTLS-Q9CmZsro7Qeoo1c=" },
    { id: 3, name: "Strawberries", description: "Chaines Thali", price: 7, imageUrl: "https://media.istockphoto.com/id/483120255/photo/asian-oranage-chicken-with-green-onions.jpg?s=612x612&w=0&k=20&c=0T_g_J5OSnmCei1Slgr1128wzAhzceRvLjd94R3gkgs=" },
    { id: 4, name: "Sendwiches", description: "The best Sendwiches", price: 18, imageUrl: "https://media.istockphoto.com/id/510482834/photo/sandwich-bread-tomato-lettuce-and-yellow-cheese.jpg?s=612x612&w=0&k=20&c=Q69t_vK73KXddedlvN4RmFcPL34mCwEqprJvbDTyOWo=" },
  ];

  const testimonials = [
    {
      Dishes: "See All Veg Food",
      id: 1,
      name: "Veg Thali",
      description: "Explore all the vegetarian food options available near you.",
      image: "https://media.istockphoto.com/id/1158578874/photo/indian-hindu-veg-thali-food-platter-selective-focus.jpg?s=612x612&w=0&k=20&c=ZHAsJ9sJJoeAmwD3iU1Oo2YSKn_BG6JoE7zuG1frxwg=",
      path: "/veg-food",
    },
    {
      Dishes: "See All Non-Veg Food",
      id: 2,
      name: "Non-Veg Thali",
      description: "Discover all the non-vegetarian food options in your area.",
      image: "https://rohansindianbistro.com/wp-content/uploads/2024/01/image_750x_651f7edc6a5c6.jpg",
      path: "/non-veg-food",
    },
  ];

  return (
    <div className="font-sans bg-gray-100 text-gray-800 p-5">
      <header className="flex items-center justify-between mt-24 p-5 gap-10">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">
            The Fastest Delivery in <span className="text-red-500">Your Home</span>
          </h1>
          <p className="mt-4 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse velit facere reprehenderit dolores ad, architecto voluptate perferendis aspernatur neque. Iusto vitae maiores illum eveniet fugiat dicta et iste natus quam?</p>
          <button className="mt-5 bg-red-500 text-white px-6 py-3 rounded-md text-lg hover:bg-red-600">
            Order Now
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5 flex-1">
          {foodItems.map((food) => (
            <div key={food.id} className="bg-white p-5 rounded-lg text-center shadow-md">
              <img src={food.imageUrl} alt={food.name} className="w-40 h-30 rounded-lg mx-auto object-cover" />
              <h3 className="mt-2 font-bold">{food.name}</h3>
              <p>{food.description}</p>
              <p className="text-red-500 font-bold">₹{food.price}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Order Our Best Food Options</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {foodOptions.map((food) => (
              <div
                key={food.name}
                onClick={() => navigate(`/food/${food.name}`)}
                className="cursor-pointer flex flex-col items-center w-32 bg-white border rounded-full shadow-md p-3 transition-transform hover:scale-110"
              >
                <img src={food.image} alt={food.name} className="w-32 h-20 object-cover rounded-full" />
                <p className="mt-2 text-sm font-bold">{food.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-white text-center py-4">
        <h2 className="text-xl font-semibold mb-5">Our Menu Categories</h2>
        <div className="flex justify-center gap-10 mb-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="cursor-pointer flex flex-col items-center w-64 bg-white border border-gray-300 rounded-lg shadow-md p-5 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-32 h-32 rounded-lg object-cover" 
        />
              <h3 className="mt-4 text-lg font-bold">{testimonial.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{testimonial.description}</p>
              <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
                {testimonial.Dishes}
              </button>
            </div>
          ))}
        </div>
        <p className="text-black">© 2025 Foodie. All rights reserved.</p>
      </footer>
    </div>
  );
}
