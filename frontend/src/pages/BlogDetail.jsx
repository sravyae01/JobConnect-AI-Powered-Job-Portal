import React from "react";
import { useParams, Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    category: "Career",
    title: "Top 10 Resume Tips to Get Hired",
    author: "JobConnect",
    date: "July 10, 2026",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
    content: `
A resume is your first impression.

1. Keep your resume to one page.
2. Tailor it to every job.
3. Add measurable achievements.
4. Mention technical skills.
5. Include projects.
6. Use action verbs.
7. Keep formatting clean.
8. Proofread carefully.
9. Add certifications.
10. Keep your contact details updated.

Following these tips can significantly improve your chances of getting shortlisted.
`,
  },
  {
    id: 2,
    category: "Interview",
    title: "How to Crack Technical Interviews",
    author: "HR Team",
    date: "July 8, 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    content: `
Technical interviews test both your knowledge and problem-solving ability.

Prepare DSA.
Practice coding daily.
Revise DBMS, OS, CN.
Build projects.
Communicate your thought process clearly.
Stay confident.
`,
  },
  {
    id: 3,
    category: "Career",
    title: "LinkedIn Profile Tips for Freshers",
    author: "JobConnect",
    date: "July 5, 2026",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
    content: `
Optimize your LinkedIn profile.

Upload a professional photo.
Write a strong headline.
Showcase projects.
Add certifications.
Connect with recruiters.
Post regularly.
`,
  },
];

const BlogDetail = () => {
  const { id } = useParams();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Blog Not Found</h1>

        <Link
          to="/blog"
          className="text-blue-600 mt-5 inline-block"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-10">

          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
            {blog.category}
          </span>

          <h1 className="text-4xl font-bold mt-5">
            {blog.title}
          </h1>

          <p className="text-gray-500 mt-3">
            {blog.author} • {blog.date}
          </p>

          <div className="mt-8 whitespace-pre-line leading-8 text-gray-700">
            {blog.content}
          </div>

          <Link
            to="/blog"
            className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            ← Back to Blogs
          </Link>

        </div>

      </div>

    </div>
  );
};

export default BlogDetail;