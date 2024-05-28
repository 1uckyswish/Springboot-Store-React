import React from 'react'
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { Link } from 'react-router-dom';

function Hero() {
   const { user } = useAuth(); // Access user state and logout function from AuthContext

  return (
   <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
  <div className="hero-overlay bg-opacity-50"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
        <h1 className="mb-1 text-5xl font-bold">Welcome 👋🏻</h1>
      <h1 className="mb-5 text-5xl font-bold">To Recipe Gram</h1>
      <p className="mb-5">    Discover a world of culinary delights! Share your favorite recipes and explore diverse flavors from various cultures. Join us in celebrating the joy of cooking and the rich tapestry of global cuisines.
</p>
      <Link to={user ? `/new-recipe` : `/register`} className="btn btn-primary">Get Started</Link>
    </div>
  </div>
</div>
  )
}
///new-recipe
///register
export default Hero