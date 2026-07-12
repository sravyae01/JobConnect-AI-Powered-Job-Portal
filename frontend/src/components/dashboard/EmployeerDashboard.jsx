import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeerDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 4,
    totalApplicants: 28,
    interviewsScheduled: 5,
    newMessages: 3
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
        <Link
          to="/post-job"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Post New Job
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Applicants</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalApplicants}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Interviews</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.interviewsScheduled}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">Messages</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.newMessages}</p>
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applicants</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Applicant</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Position</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">John Doe</td>
                <td className="px-4 py-3">React Developer</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Pending</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Review</button>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Jane Smith</td>
                <td className="px-4 py-3">Python Developer</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Shortlisted</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeerDashboard;