import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostJob = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [posting, setPosting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    employment_type: "full_time",
    experience_level: "entry",
    salary_min: "",
    salary_max: "",
    skills_required: "",
    requirements: "",
    benefits: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/categories/"
      );

      setCategories(res.data.results);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load job categories.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setPosting(true);

    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job Posted Successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to post job.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Post New Job
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>

          <select
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="lead">Lead</option>
            <option value="executive">Executive</option>
          </select>

          <input
            type="number"
            name="salary_min"
            placeholder="Minimum Salary"
            value={formData.salary_min}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="salary_max"
            placeholder="Maximum Salary"
            value={formData.salary_max}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

        </div>

        <textarea
          name="skills_required"
          placeholder="Skills Required (comma separated)"
          value={formData.skills_required}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 w-full mt-6 h-24"
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 w-full mt-6 h-24"
        />

        <textarea
          name="benefits"
          placeholder="Benefits"
          value={formData.benefits}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 w-full mt-6 h-24"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 w-full mt-6 h-40"
        />

        <button
          onClick={handleSubmit}
          disabled={posting}
          className={`mt-8 px-8 py-3 rounded-xl text-white ${
            posting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {posting ? "Posting..." : "Post Job"}
        </button>

      </div>

    </div>
  );
};

export default PostJob;