import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero.svg";

const Hero = () => {
  const [popularSearches, setPopularSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularSearches();
  }, []);

  const fetchPopularSearches = async () => {
    try {
      const response = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/popular-searches/"
      );

      setPopularSearches(response.data);
    } catch (error) {
      console.log("Failed to load popular searches:", error);
    }
  };

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Section */}
          <div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              #1 Job Portal Platform
            </span>

            <h1 className="text-5xl font-bold mt-6 leading-tight">
              Find The Job
              <br />
              <span className="text-blue-600">
                That Fits Your Life
              </span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8">
              Search thousands of jobs from top companies.
              Build your career with trusted employers and
              apply in just one click.
            </p>

<div className="mt-10 flex gap-4">

  <button
    onClick={() => navigate("/jobs")}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
  >
    Explore Jobs
  </button>

  <button
    onClick={() => navigate("/register")}
    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition"
  >
    Get Started
  </button>

</div>
            {/* Popular Searches */}

            <div className="mt-8">

              <h4 className="font-semibold mb-3">
                Popular Searches
              </h4>

              <div className="flex flex-wrap gap-3">

                {popularSearches.length > 0 ? (
                  popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        navigate(
                          `/jobs?search=${encodeURIComponent(search)}`
                        )
                      }
                      className="bg-white shadow px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
                    >
                      {search}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No popular searches available.
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* Right Section */}

          <div className="flex justify-center">

            <img
              src={heroImage}
              alt="Hero"
              className="w-full max-w-xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;