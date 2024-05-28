import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { Link } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user state from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    calories: '',
    nutrition: '',
    description: '',
    instructions: '',
    userId: user?.id
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipes/${id}`);
        const recipe = response.data;
        setFormData({
          ...recipe,
          userId: recipe.userId // Ensure userId is set correctly
        });
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 255) {
      alert(`${name} should not exceed 255 characters`);
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the form data for debugging
    try {
      const response = await axios.put(`http://localhost:8080/recipes/${id}`, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Recipe updated successfully:', response.data);
      // Redirect to the recipe page after successful update
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      // Handle error - display error message or do other actions
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-6">Edit Recipe</h1>
          <p className="py-6 text-center">{user ? "Update your recipe details by filling out the form below." : "Please login or register to edit this recipe."}</p>
         {user ? (
           <div className="card bg-base-100 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipe Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Recipe Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="input input-bordered"
                  required
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img src={formData.imageUrl} alt="Recipe" className="rounded-lg" />
                    <button
                      type="button"
                      className="btn btn-ghost mt-2"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    >
                      Change Image
                    </button>
                  </div>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Calories</span>
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  placeholder="Calories"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nutrition</span>
                </label>
                <input
                  type="text"
                  name="nutrition"
                  value={formData.nutrition}
                  onChange={handleChange}
                  placeholder="Nutrition"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Instructions</span>
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Instructions (e.g., Toast bread. Mash avocado. Spread avocado on toast. Season with salt and pepper.)"
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <input type="hidden" name="userId" value={formData.userId} />
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Done Editing</button>
              </div>
            </form>
          </div>
         ): 
            <div className="flex justify-center">
              <Link to="/login" className="btn btn-primary mx-4">Login</Link>
              <Link to="/register" className="btn btn-primary mx-4">Register</Link>
            </div>
         }
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
