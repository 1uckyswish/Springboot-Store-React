import React, { useState, useEffect } from 'react';
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/recipes`);
                console.log(response.data)
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((card, index) => (
                    <div key={index} className="card lg:card-side bg-base-100 shadow-xl" style={{ flexDirection: 'column' }}>
                        <figure>
                            <img src={card.imageUrl} alt="Recipe" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{card.name}</h2>
                            <p>{card.description}</p>
                            <div className="card-actions justify-evenly mt-4">
                                <button className="btn btn-accent">View Recipe</button>
                                <button className="btn btn-neutral-content">View User</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recipes;
