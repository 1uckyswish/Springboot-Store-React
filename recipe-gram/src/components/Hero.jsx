import React from 'react'

function Hero() {
  return (
   <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1627907228175-2bf846a303b4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
        <h1 className="mb-1 text-5xl font-bold">Welcome 👋🏻</h1>
      <h1 className="mb-5 text-5xl font-bold">To Recipe Gram</h1>
      <p className="mb-5">    Discover a world of culinary delights! Share your favorite recipes and explore diverse flavors from various cultures. Join us in celebrating the joy of cooking and the rich tapestry of global cuisines.
</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  )
}

export default Hero