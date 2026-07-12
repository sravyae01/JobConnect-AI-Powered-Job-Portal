import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top 10 Resume Tips to Get Hired",
    category: "Career",
    author: "JobConnect",
    date: "July 10, 2026",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600",
  },
  {
    id: 2,
    title: "How to Crack Technical Interviews",
    category: "Interview",
    author: "HR Team",
    date: "July 8, 2026",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
  },
  {
    id: 3,
    title: "LinkedIn Profile Tips for Freshers",
    category: "Career",
    author: "JobConnect",
    date: "July 5, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Career Blog
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-10">
          Learn, Grow and Get Hired
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition"
            >

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">

                <span className="text-blue-600 text-sm font-semibold">
                  {blog.category}
                </span>

                <h2 className="text-xl font-bold mt-3">
                  {blog.title}
                </h2>

                <p className="text-gray-500 mt-4">
                  {blog.author}
                </p>

                <p className="text-gray-400 text-sm">
                  {blog.date}
                </p>

               <Link
    to={`/blog/${blog.id}`}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
>
    Read More
</Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Blog;