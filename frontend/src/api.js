import API_BASE_URL from "./config"; // Ensure this points to your backend base URL
import { getCSRFToken } from './utils/csrf';
import {setCookie} from "./utils/auth";

const csrfToken = getCSRFToken();



// Fetch all courses
export const fetchCourses = async () => {
  try {
    // const response = await instance.get(`${API_BASE_URL}/courses/`);
    const response = await fetch(`${API_BASE_URL}/courses/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Fetch single course details
export const fetchCourseDetails = async (id) => {
  try {
    // const response = await instance.get(`${API_BASE_URL}/courses/${id}/fetch_details/`);
    const response = await fetch(`${API_BASE_URL}/courses/${id}/fetch_details/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw error;
  }
};

// Add course to cart
export const addCourseToCart = async (courseId) => {
  try {
    // const response = await instance.post(`${API_BASE_URL}/cart/`, { id: courseId });
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({id: courseId}),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding course to cart:", error);
    throw error;
  }
};

// Fetch cart items
export const fetchCartItems = async () => {
  try {
    // const response = await instance.get(`${API_BASE_URL}/cart/`);
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
    });
    console.log('responseData')
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Remove course from cart
export const removeCourseFromCart = async (courseId) => {
  try {
      console.log(`Sending DELETE request for course ID: ${courseId}`);
      // const response = await instance.delete(`${API_BASE_URL}/cart/${courseId}/`);
      const response = await fetch(`${API_BASE_URL}/cart/${courseId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });
    const responseData = await response.json();

      console.log("API Response:", responseData);
      return responseData;
  } catch (error) {
      console.error(`Error removing course ${courseId}:`, error);
      throw error;
  }
};


// Confirm enrollment
export const confirmEnrollment = async () => {
  try {
    // const response = await instance.post(`${API_BASE_URL}/cart/confirm/`);
    const response = await fetch(`${API_BASE_URL}/cart/confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error confirming enrollment:", error);
    throw error;
  }
};

// Submit contact form
export const submitContactForm = async (data) => {
  try {
    // const response = await instance.post(`${API_BASE_URL}/contact/`, data);
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({data}),
    });
    const responseData = await response.json();
    return responseData;
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
    const responseData = await response.json();
    return responseData;
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
    console.log("CSRF",responseData.user.username);
    setCookie(responseData.user.username,responseData.csrf_token,1);
    return responseData;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
