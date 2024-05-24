import React from 'react';

const Stats = () => {
  return (
    <div className="w-full px-4 py-8 bg-gray-100 flex justify-center">
      <div className="stats shadow-lg mx-auto w-full max-w-6xl">
        <div className="stat place-items-center">
          <div className="stat-title">Recipe Downloads</div>
          <div className="stat-value">20K</div>
          <div className="stat-desc">In the past month</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Recipes</div>
          <div className="stat-value text-secondary">50+</div>
          <div className="stat-desc text-secondary">Growing every day</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 200 (5%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">New Registrations</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (7%)</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
