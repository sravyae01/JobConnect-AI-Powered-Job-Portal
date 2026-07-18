import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../common/Loader"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    location: "",
    skills: "",
    experience: "",
    bio: "",
    current_company: "",
    current_position: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("access");

    if (!token) {
      toast.error("Please login first.");
      setLoading(false);
      return;
    }

    const response = await axios.get(
      "https://jobconnect-ai-powered-job-portal.onrender.com/api/users/profile/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(response.data);

    setFormData({
      first_name: response.data.first_name || "",
      last_name: response.data.last_name || "",
      phone: response.data.phone || "",
      location: response.data.profile?.location || "",
      skills: response.data.profile?.skills || "",
      experience: response.data.profile?.experience || "",
      bio: response.data.profile?.bio || "",
      current_company: response.data.profile?.current_company || "",
      current_position: response.data.profile?.current_position || "",
    });

  } catch (error) {
    console.log(error.response?.data);
    toast.error("Failed to load profile.");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.patch(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/users/profile/",
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,

          profile: {
            location: formData.location,
            skills: formData.skills,
            experience: formData.experience,
            bio: formData.bio,
            current_company: formData.current_company,
            current_position: formData.current_position,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      console.log(response.data);
console.log(response.data.profile.resume);

      setFormData({
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        phone: response.data.phone || "",
        location: response.data.profile?.location || "",
        skills: response.data.profile?.skills || "",
        experience: response.data.profile?.experience || "",
        bio: response.data.profile?.bio || "",
        current_company: response.data.profile?.current_company || "",
        current_position: response.data.profile?.current_position || "",
      });

      setIsEditing(false);

      toast.success("Profile Updated Successfully!");

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update profile.");
    }
  };

const handleResumeUpload = async () => {
  if (!resume) {
    toast.warning("Please select a resume.");
    return;
  }

  try {
    const token = localStorage.getItem("access");

    const data = new FormData();
    data.append("resume", resume);

    await axios.post(
      "https://jobconnect-ai-powered-job-portal.onrender.com/api/users/upload-resume/",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

   toast.success("Resume uploaded successfully!");

    fetchProfile();

  } catch (error) {
    console.log(error.response?.data);
    toast.error("Resume upload failed.");
  }
};

 if (loading) {
  return <Loader />;
}

if (!user) {
  return (
    <div className="text-center mt-20 text-red-600">
      Unable to load profile.
    </div>
  );
}
  return (
        <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.username}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>

            <span className="inline-block mt-3 bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
              {user.role}
            </span>
          </div>

        </div>

        {/* Profile Details */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div>
            <h3 className="font-semibold text-gray-700">First Name</h3>
            <p>{user.first_name || "Not Added"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Last Name</h3>
            <p>{user.last_name || "Not Added"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Phone</h3>
            <p>{user.phone || "Not Added"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Company</h3>
            <p>{user.company_name || "Not Added"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Skills</h3>
            <p>{user.profile?.skills || "Not Added"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Experience</h3>
            <p>{user.profile?.experience ?? 0} Years</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Current Company</h3>
            <p>{user.profile?.current_company || "Not Added"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Current Position</h3>
            <p>{user.profile?.current_position || "Not Added"}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-700">Bio</h3>
            <p>{user.profile?.bio || "Not Added"}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-700">Location</h3>
            <p>{user.profile?.location || "Not Added"}</p>
          </div>

        </div>

        {/* Resume Upload */}

        <div className="mt-10 border-t pt-8">

          <h2 className="text-2xl font-bold mb-5">
            Resume
          </h2>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="mb-5"
          />

          <br />

          <button
            onClick={handleResumeUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Upload Resume
          </button>

          {user.profile?.resume && (
            <div className="mt-6">

             <a
  href={
    user.profile.resume.startsWith("http")
      ? user.profile.resume
      : `https://jobconnect-ai-powered-job-portal.onrender.com${user.profile.resume}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 font-semibold hover:underline"
>
  📄 View Uploaded Resume
</a>

            </div>
          )}

        </div>

        {/* Edit Button */}

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {/* Edit Form */}

        {isEditing && (

          <div className="mt-10 border-t pt-8">

            <h2 className="text-2xl font-bold mb-6">
              Edit Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="current_company"
                value={formData.current_company}
                onChange={handleChange}
                placeholder="Current Company"
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="current_position"
                value={formData.current_position}
                onChange={handleChange}
                placeholder="Current Position"
                className="border rounded-lg px-4 py-3"
              />

            </div>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border rounded-lg px-4 py-3 w-full mt-6 h-32"
            />

            <button
              onClick={handleSave}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default Profile;