import React from "react";

const stats = [
  {
    number: "10K+",
    title: "Active Job Seekers",
  },
  {
    number: "500+",
    title: "Hiring Companies",
  },
  {
    number: "2K+",
    title: "Jobs Posted",
  },
  {
    number: "95%",
    title: "Success Rate",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}

      <div className="bg-blue-600 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            About JobConnect
          </h1>

          <p className="mt-5 text-lg">
            Connecting talented professionals with top companies across the world.
          </p>

        </div>

      </div>

      {/* Our Story */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center">
          Our Story
        </h2>

        <p className="text-gray-600 text-center mt-6 leading-8 max-w-4xl mx-auto">
          JobConnect was built to simplify the hiring process for both job seekers
          and employers. Our platform helps candidates discover exciting career
          opportunities while enabling companies to find the right talent quickly
          and efficiently.
        </p>

      </div>

      {/* Mission & Vision */}

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h3 className="text-2xl font-bold text-blue-600">
            Our Mission
          </h3>

          <p className="text-gray-600 mt-4">
            To connect skilled professionals with companies through a simple,
            fast, and reliable recruitment platform.
          </p>

        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h3 className="text-2xl font-bold text-blue-600">
            Our Vision
          </h3>

          <p className="text-gray-600 mt-4">
            To become one of the most trusted online job portals by providing
            innovative hiring solutions for everyone.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Our Achievements
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-blue-600">
                {item.number}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* Contact */}

      <div className="bg-white py-16">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-bold">
            Contact Us
          </h2>

          <p className="text-gray-600 mt-4">
            📧 support@jobconnect.com
          </p>

          <p className="text-gray-600 mt-2">
            📞 +91 98765 43210
          </p>

          <p className="text-gray-600 mt-2">
            📍 Bangalore, Karnataka, India
          </p>

        </div>

      </div>

    </div>
  );
};

export default About;