import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotFound from './NotFound';

const RecipeInfo = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipes/${id}`);
        setRecipe(response.data);

        const userResponse = await axios.get(`http://localhost:8080/users/${response?.data?.userId}`);
        setUserDetails(userResponse.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/recipes/${id}`);
      navigate('/'); // Navigate to home or a specific page after deletion
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!recipe) {
    return <NotFound />;
  }

  const instructionsList = recipe.instructions.split('. ').map((instruction, index) => (
    <li key={index}>{instruction.trim()}</li>
  ));

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg overflow-hidden">
            <img alt="content" className="object-cover object-center h-full w-full" src={recipe?.imageUrl} />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-slate-500 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5M4.285 9.567a.5.5 0 0 0-.183.683A4.5 4.5 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.5 3.5 0 0 1 8 11.5a3.5 3.5 0 0 1-3.032-1.75.5.5 0 0 0-.683-.183m5.152-3.31a.5.5 0 0 0-.874.486c.33.595.958 1.007 1.687 1.007s1.356-.412 1.687-1.007a.5.5 0 0 0-.874-.486.93.93 0 0 1-.813.493.93.93 0 0 1-.813-.493"/>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{recipe?.name}</h2>
                <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-2"></div>
                <p className="text-accent mb-2 text-md italic">Recipe by {userDetails?.username}</p>

                <p className="text-base">{recipe?.description}</p>
                {user?.id === recipe?.userId && (
                  <div className="mt-4">
                    <Link to={`/edit-recipe/${recipe.id}`} className="text-yellow-500 inline-flex items-center mr-4">
                      Edit Recipe
                    </Link>
                                 {/* Open the modal using document.getElementById('ID').showModal() method */}
<p className="text-red-500 inline-flex items-center cursor-pointer" onClick={() => document.getElementById('my_modal_1').showModal()}>Delete Recipe</p>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Confirm Deletion</h3>
<p className="py-4 text-gray-700 font-semibold">
  Are you sure you want to delete this recipe? <br/>
  <span className="text-red-500">This action cannot be undone.</span>
</p>
    <div className="modal-action">
      <button onClick={() => document.getElementById('my_modal_1').close()} className="btn">Cancel</button>
      <button onClick={handleDelete} className="btn btn-error">Delete Recipe</button>
    </div>
  </div>
</dialog>

                  </div>
                )}
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <div className="mb-4">
                <div className="flex flex-col mb-4">
                  <p className="text-base font-semibold text-slate-500">
                    Calories: <span className='text-yellow-500'>{recipe?.calories}</span>
                  </p>
                  <p className="text-base font-semibold text-slate-500">
                    Nutrition: <span className='text-accent'>{recipe?.nutrition}</span>
                  </p>
                </div>
                <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
                <ul className="list-disc pl-4">
                  {instructionsList}
                </ul>
              </div>
              <Link to={`/author-recipes/${recipe?.userId}`} className="text-yellow-500 inline-flex items-center">
                Discover additional recipes from {userDetails?.username}
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeInfo;
