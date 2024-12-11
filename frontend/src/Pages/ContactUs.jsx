import React, { useState } from 'react';
import '../styles/ContactUs.css';
import { submitContactForm } from '../api'; // Import the API call

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState(null); // Track submission status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            await submitContactForm(formData); // Submit form data to the backend
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setStatus('Failed to send the message. Please try again.');
        }
    };

    return (
        <section className='contact'>
            <form onSubmit={handleSubmit}>
                <h2>Contact Form</h2>
                {status && <p className={`status ${status.includes('successfully') ? 'success' : 'error'}`}>{status}</p>}
                <div className='input-box'>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        className='field'
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label>E-mail Address</label>
                    <input
                        type="email"
                        name="email"
                        className='field'
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label>Your message</label>
                    <textarea
                        name="message"
                        className='field content'
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </section>
    );
};

export default ContactUs;
