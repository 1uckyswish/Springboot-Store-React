// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="https://cdn2.hubspot.net/hubfs/242200/shutterstock_774749455.jpg"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            404 - Page Not Found
          </h1>
          <p className="mb-8 leading-relaxed">
            Sorry, the page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                Go to Home
              </button>
            </Link>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
