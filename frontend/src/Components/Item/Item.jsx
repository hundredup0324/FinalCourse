import React from 'react';
import './Item.css';
import { useNavigate } from 'react-router-dom';

const Item = ({ id, image, name, concept }) => {
    const navigate = useNavigate();

    const handleEnroll = () => {
        navigate(`/apply/${id}`); // Navigate to the Apply page with the course ID
    };

    return (
        <div className="item">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{concept}</p>
            <button onClick={handleEnroll}>Select</button>
        </div>
    );
};

export default Item;
