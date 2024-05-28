import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const AuthorRecipes = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchRecipesAndAuthor = async () => {
      try {
        const [recipesResponse, authorResponse] = await Promise.all([
          axios.get(`http://localhost:8080/recipes/user/${id}`),
          axios.get(`http://localhost:8080/users/${id}`)
        ]);
        setRecipes(recipesResponse.data);
        setAuthor(authorResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipesAndAuthor();
  }, [id]);

   if (recipes.length === 0) {
    return <NotFound />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-full h-full bg-yellow-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
<h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
  View {author?.username}'s Created Recipes
</h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Explore other recipes created by {author?.name}</p>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {recipes.map(recipe => (
              <div key={recipe.id} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div className="rounded-lg h-96 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src={recipe?.imageUrl} />
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{recipe.name}</h2>
                <p className="text-base leading-relaxed mt-2">{recipe.description}</p>
                <a className="text-yellow-500 inline-flex items-center mt-3" href={`/recipe/${recipe.id}`}>View Recipe
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorRecipes;
