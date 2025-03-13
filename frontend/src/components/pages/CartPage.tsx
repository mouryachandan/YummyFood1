// src/components/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchCartRequest, updateQuantityRequest, removeItemRequest, updateRatingAndCommentRequest } from "../../store/address/card/cardSlice";
import { setAddress } from "../../store/address/addressSlice";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items: cart, loading, error } = useSelector((state: RootState) => state.cart);


  const userdata = localStorage.getItem("user");
  const userId = userdata ? JSON.parse(userdata).id : null;

  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    receiverName: "",
    houseNumber: "",
    address: "",
    nearbyLandmark: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartRequest(userId));
    }
  }, [userId, dispatch]);

  const updateItemQuantity = (cartItemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      dispatch(updateQuantityRequest({ cartItemId, newQuantity, change }));
    }
  };

  const removeFromCart = (cartItemId: number) => {
    dispatch(removeItemRequest(cartItemId));
  };

  const handleRatingChange = (cartItemId: number, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [cartItemId]: rating,
    }));
  };

  const handleCommentChange = (cartItemId: number, comment: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [cartItemId]: comment,
    }));
  };

  const saveRatingAndComment = (cartItemId: number) => {
    const rating = ratings[cartItemId];
    const comment = comments[cartItemId];
    dispatch(updateRatingAndCommentRequest({ cartItemId, rating, comment }));
  };

  const handleAddressSubmit = () => {
    if (
      newAddress.receiverName &&
      newAddress.houseNumber &&
      newAddress.address &&
      newAddress.nearbyLandmark &&
      newAddress.phoneNumber
    ) {
      dispatch(setAddress(newAddress));  // Save the address to Redux
      setShowAddressForm(false);  // Close the address form
      alert("Address submitted successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500 font-medium">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg shadow-md p-4">
                <img src={item.Food?.imageUrl} alt={item.Food?.name} className="w-full h-40 object-cover rounded-md" />
                <h3 className="font-semibold text-lg mt-2">{item.Food?.name}</h3>
                <p className="text-gray-600">{item.Food?.description}</p>
                <p className="text-red-600 font-bold">₹{item.Food?.price}</p>

                <div className="flex items-center justify-center mt-4 space-x-2">
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity, -1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                  >
                    -
                  </button>

                  <span className="text-lg font-medium px-2">{item.quantity}</span>

                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity, 1)}
                    className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-2">Quantity changed: {item.changeCount}</p>

                <button onClick={() => removeFromCart(item.id)} className="mt-4 w-full bg-red-500 py-2 rounded-md hover:bg-red-600">
                  Remove
                </button>

                {/* Rating and Comment Section */}
                <div className="mt-4">
                  <h4 className="font-semibold">Rate this item</h4>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(item.id, star)}
                        className={`text-xl ${ratings[item.id] >= star ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <h4 className="font-semibold mt-2">Leave a comment</h4>
                  <textarea
                    rows={3}
                    value={comments[item.id] || ""}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    placeholder="Write your comment here"
                    className="w-full p-2 mt-2 border rounded-md"
                  />

                  <button
                    onClick={() => saveRatingAndComment(item.id)}
                    className="mt-2 w-full bg-blue-500 py-2 rounded-md text-white hover:bg-blue-600"
                  >
                    Save Rating and Comment
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAddressForm(true)}
              className="bg-yellow-500 text-white px-6 py-3 text-lg rounded-md hover:bg-yellow-600"
            >
              Add Address
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold text-center mb-4">Enter Your Address</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Receiver Name</label>
                <input
                  type="text"
                  value={newAddress.receiverName}
                  onChange={(e) => setNewAddress({ ...newAddress, receiverName: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">House No.</label>
                <input
                  type="text"
                  value={newAddress.houseNumber}
                  onChange={(e) => setNewAddress({ ...newAddress, houseNumber: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Nearby Landmark</label>
                <input
                  type="text"
                  value={newAddress.nearbyLandmark}
                  onChange={(e) => setNewAddress({ ...newAddress, nearbyLandmark: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={newAddress.phoneNumber}
                  onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddressSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
