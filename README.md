# 🚀 JobConnect – AI-Powered Job Portal Platform

JobConnect is a modern full-stack job portal platform built using **React.js** and **Django REST Framework**. It provides a secure and user-friendly environment where employers can post and manage job openings, while job seekers can search, apply, and track job applications. The platform includes role-based authentication, resume management, dynamic job listings, company exploration, and a responsive user interface. The architecture is designed to support future AI-powered enhancements such as resume analysis and intelligent job recommendations.

---

# 📌 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Google Authentication
- Role-Based Access Control (Employer & Job Seeker)
- Forgot Password using Email OTP
- Password Reset

---

## 👨‍💼 Employer Features
- Employer Dashboard
- Post New Jobs
- Edit Existing Jobs
- Delete Job Posts
- View Posted Jobs
- View Applicants
- Dashboard Statistics

---

## 👨‍🎓 Job Seeker Features
- Browse Available Jobs
- Search Jobs
- Filter Jobs by Location
- Filter by Employment Type
- Filter by Experience Level
- View Job Details
- Apply for Jobs
- Track Applied Jobs
- User Profile Management
- Upload Resume
- View Uploaded Resume

---

## 🏢 Companies
- Dynamic Company Listings
- Company Search
- View Jobs by Company

---

## 📝 Career Blog
- Career Guidance Articles
- Resume Tips
- Interview Preparation Tips
- Job Search Guidance

---

## 🎨 User Interface
- Responsive Design
- Modern Dashboard
- Clean UI/UX
- Dynamic Data Rendering
- Protected Routes
- Toast Notifications
- Loading Indicators

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- React Toastify

## Backend
- Django
- Django REST Framework
- JWT Authentication
- Django Filter
- SQLite

## Programming Language
- Python
- JavaScript

---

# 📂 Project Structure

```text
JobConnect/
│
├── backend/
│   ├── users/
│   ├── jobs/
│   ├── applications/
│   ├── chat/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Backend Setup

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Apply database migrations

```bash
python manage.py migrate
```

Start the backend server

```bash
python manage.py runserver
```

Backend will run on:

```
http://127.0.0.1:8000/
```

---

## Frontend Setup

Install dependencies

```bash
npm install
```

Start the React development server

```bash
npm start
```

Frontend will run on:

```
http://localhost:3000/
```

---

# 📸 Project Modules

- Home Page
- User Authentication
- Employer Dashboard
- Job Listings
- Job Search & Filters
- Job Details
- Company Listings
- Candidate Profile
- Resume Upload
- My Applications
- Career Blog

---

# 🔮 Future Enhancements

- AI Resume Analyzer
- Company Profile Pages
- AI Job Recommendation System
- Saved Jobs Enhancement
- Email Notifications
- Interview Scheduling
- Video Interview Support
- Live Chat

---

# 👨‍💻 Developed By

**Sravya E**

Bachelor of Engineering (Electronics and Communication Engineering)

East West Institute of Technology

Bengaluru, Karnataka, India

---

## 📄 License

This project is developed for educational, learning, and portfolio purposes.