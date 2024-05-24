import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users', formData);
      console.log('User registered successfully:', response.data);
      // Log in the user upon successful registration
      login(response.data);
      // Redirect to the home page after successful registration
      navigate(`/`);
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error - display error message or do other actions
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">Join us by registering your account.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input input-bordered" required />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="input input-bordered" required />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input input-bordered" required />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
