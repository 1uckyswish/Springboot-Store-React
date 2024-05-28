import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

function HeroAd() {
    const { user } = useAuth(); // Access user state and logout function from AuthContext

  return (
    <>
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img className="object-cover object-center rounded-lg" alt="hero" src="https://images.pexels.com/photos/5908217/pexels-photo-5908217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Share Your Culinary Creations
          </h1>
          <p className="mb-8 leading-relaxed">Join our community of food enthusiasts! Whether you're a seasoned chef or a kitchen novice, we invite you to share your favorite recipes, cooking tips, and culinary adventures. Let's inspire each other to explore the endless possibilities of food!</p>
          <div className="flex justify-center">
            <Link to={user ? `/new-recipe` : `/register`} className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">Get Started</Link>
            <Link to="/developer" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Learn More from the developer</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default HeroAd;
