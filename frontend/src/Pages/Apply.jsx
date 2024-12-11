import React, { useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../styles/Apply.css';
import { CartContext } from '../Components/Context/CartContext';
import data_product from '../Components/Assets/all_courses'

const Apply = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);

    const [course, setCourse] = React.useState(null); // State for course details

    // Load course details from `all_courses.js`
    React.useEffect(() => {
        const loadCourseDetails = () => {
            const courseData = data_product.find((item) => item.id === parseInt(id));
            if (courseData) {
                setCourse(courseData);
            } else {
                console.error("Course not found");
            }
        };

        loadCourseDetails();
    }, [id]);

    const handleConfirm = () => {
        if (course) {
            // Update the cart context
            setCart([...cart, course]);

            // Navigate to the cart page
            navigate('/cart');
        }
    };

    return (
        <div className="apply-page">
            <h1>Course Selected: </h1>
            {course ? (
                <>
                    <img src={course.image} alt={course.name} />
                    <h2>{course.name}</h2>
                    <p>{course.concept}</p>
                    <p>{course.concept_elaborate}</p>
                    <p><strong>Duration:</strong>{course.duration}</p>
                    <p><strong>Tutor: </strong>{course.tutor}</p>
                    <p><strong>Duration: </strong>{course.duration}</p>
                    
                    <button onClick={handleConfirm}>Enroll</button>
                </>
            ) : (
                <p>Loading course details...</p>
            )}
        </div>
    );
};

export default Apply;
