import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SeekerDashboard = () => {
  // Sample data - will be replaced with real API data
  const [stats, setStats] = useState({
    applications: 5,
    savedJobs: 3,
    interviews: 2,
    messages: 4
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Applications</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.applications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Saved Jobs</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.savedJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Interviews</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.interviews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Messages</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.messages}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">React Developer</p>
                <p className="text-sm text-gray-500">Google • Remote</p>
              </div>
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Pending</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Python Developer</p>
                <p className="text-sm text-gray-500">Microsoft • Hybrid</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Shortlisted</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Jobs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">UI/UX Designer</p>
                <p className="text-sm text-gray-500">Apple • On-site</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Data Scientist</p>
                <p className="text-sm text-gray-500">Amazon • Remote</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;