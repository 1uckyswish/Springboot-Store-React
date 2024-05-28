// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewRecipe from './components/NewRecipe';
import RecipeInfo from './components/RecipeInfo';
import AuthorRecipes from './components/AuthorRecipes';
import NotFound from './components/NotFound';
import EditRecipe from './components/EditRecipe';
import EditProfile from './components/EditProfile.jsx';
import Developer from './components/Developer.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-recipe" element={<NewRecipe />} />
           <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/recipe/:id" element={<RecipeInfo />} />
        <Route path="/author-recipes/:id" element={<AuthorRecipes />} />
          <Route path="/developer" element={<Developer />} />
         <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
