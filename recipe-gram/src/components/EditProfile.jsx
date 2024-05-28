import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user state from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        const userProfile = response.data;
        setFormData(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
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
      const response = await axios.put(`http://localhost:8080/users/${id}`, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('User profile updated successfully:', response.data);
      // Redirect to the user profile page after successful update
      navigate(`/author-recipes/${id}`);
    } catch (error) {
      console.error('Error updating user profile:', error);
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
          <h1 className="text-5xl font-bold text-center mb-6">Edit Profile</h1>
          <p className="py-6 text-center">{user ? "Update your profile details by filling out the form below." : "Please login or register to edit your profile."}</p>
        {user ? (
            <div className="card bg-base-100 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
              </div>
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

export default EditProfile;
