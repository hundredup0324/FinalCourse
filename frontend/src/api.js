import axios from "axios";
import API_BASE_URL from "./config"; // Ensure this points to your backend base URL
import { getCSRFToken } from './utils/csrf';

const instance = axios.create({
  
});
const csrfToken = getCSRFToken();


// Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await instance.get(`${API_BASE_URL}/courses/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Fetch single course details
export const fetchCourseDetails = async (id) => {
  try {
    const response = await instance.get(`${API_BASE_URL}/courses/${id}/fetch_details/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw error;
  }
};

// Add course to cart
export const addCourseToCart = async (courseId) => {
  try {
    const response = await instance.post(`${API_BASE_URL}/cart/`, { id: courseId });
    return response.data;
  } catch (error) {
    console.error("Error adding course to cart:", error);
    throw error;
  }
};

// Fetch cart items
export const fetchCartItems = async () => {
  try {
    const response = await instance.get(`${API_BASE_URL}/cart/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Remove course from cart
export const removeCourseFromCart = async (courseId) => {
  try {
      console.log(`Sending DELETE request for course ID: ${courseId}`);
      const response = await instance.delete(`${API_BASE_URL}/cart/${courseId}/`);
      console.log("API Response:", response.data);
      return response.data;
  } catch (error) {
      console.error(`Error removing course ${courseId}:`, error);
      throw error;
  }
};


// Confirm enrollment
export const confirmEnrollment = async () => {
  try {
    const response = await instance.post(`${API_BASE_URL}/cart/confirm/`);
    return response.data;
  } catch (error) {
    console.error("Error confirming enrollment:", error);
    throw error;
  }
};

// Submit contact form
export const submitContactForm = async (data) => {
  try {
    const response = await instance.post(`${API_BASE_URL}/contact/`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// User registration
export const registerUser = async (name,email,password) => {
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({"username":name,"email":email,"password":password }),
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// User login
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({credentials}),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
