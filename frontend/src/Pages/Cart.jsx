import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Components/Context/CartContext';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems, removeCourseFromCart, confirmEnrollment } from '../api';
import data_product from '../Components/Assets/all_courses'; // Import course data

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Fetch cart items from the backend and match them with course details from `all_courses.js`
    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const cartData = await fetchCartItems(); // Fetch cart item IDs from API
                // Map cart item IDs to course details in `all_courses.js`
                console.log("cartData",cartData)
                const matchedCourses = cartData.map((id) =>
                    data_product.find((course) => course.id === id)
                ).filter(Boolean); // Filter out undefined matches
                setCart(matchedCourses);
            } catch (error) {
                console.error("Failed to load cart items:", error);
            }
        };

        loadCartItems();
    }, [setCart]);

    const handleConfirm = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            setLoading(true);
            await confirmEnrollment(cart.map((course) => course.id)); // Send course IDs to API
            alert("Enrollment confirmed for all courses in the cart!");
            setCart([]); // Clear the cart locally
            navigate('/');
        } catch (error) {
            console.error("Failed to confirm enrollment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        console.log(`Attempting to remove course with ID: ${id}`);
        try {
            const apiResponse = await removeCourseFromCart(id); // API call
            console.log("API Response:", apiResponse);
            const newCart = cart.filter(course => course.id !== id); // Filter out the removed course
            console.log("Updated Cart after removal:", newCart);
            setCart(newCart); // Update state
            alert("Course removed successfully!");
        } catch (error) {
            console.error(`Failed to remove course with ID ${id} from cart:`, error);
            alert("Failed to remove the course. Please try again.");
        }
    };
    
    
    return (
        <div className="cart-page">
            <h1>Your Cart:</h1>
            {loading && <p>Processing...</p>}
            {cart.length > 0 ? (
                <>
                    {cart.map((course, index) => (
                        <div key={index} className="cart-item">
                            <h2>{course.name}</h2>
                            <img src={course.image} alt={course.name} />
                            <button
                                onClick={() => {
                                    console.log(`Remove button clicked for course ID: ${course.id}`);
                                    handleRemove(course.id);
                                }}
                            >
                                Remove
                            </button>

                        </div>
                    ))}
                    <button className="confirm" onClick={handleConfirm} disabled={loading}>
                        {loading ? "Processing..." : "Confirm Enrollment"}
                    </button>
                </>
            ) : (
                <p>No courses in the cart</p>
            )}
        </div>
    );
};

export default Cart;
