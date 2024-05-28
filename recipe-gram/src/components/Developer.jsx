import React from 'react';

const Developer = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
  <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-2xl" alt="hero" src="https://avatars.githubusercontent.com/u/107442415?v=4" />
  <div className="text-center lg:w-2/3 w-full">
    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Greetings! 👋🏻 I'm Noel</h1>
    <p className="mb-8 leading-relaxed">
      Delighted to meet you! I'm Noel, the developer behind Recipe Gram. As a software engineer, I crafted this app using a blend of React, Spring Boot, Java, and MySQL. Every feature was tested with Postman to ensure a seamless experience. Now, I invite you to create an account and share your culinary masterpieces with the world.
    </p>
    <div className="flex justify-center">
      <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">LinkedIn</button>
      <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">GitHub</button>
    </div>
  </div>
</div>

    </section>
  );
};

export default Developer;
