import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              JobPortal
            </h2>

            <p className="mt-4 text-gray-300">
              Find your dream job with thousands of verified
              companies around the world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Company
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Resources
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Contact
            </h3>

            <p className="text-gray-300">
              Bangalore, India
            </p>

            <p className="text-gray-300 mt-2">
              support@jobportal.com
            </p>

            <p className="text-gray-300 mt-2">
              +91 9876543210
            </p>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-400">
          © 2026 Job Portal. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;