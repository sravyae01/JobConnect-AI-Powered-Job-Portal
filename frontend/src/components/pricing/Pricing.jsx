import React from "react";

const plans = [
  {
    id: 1,
    name: "Free",
    price: "₹0",
    color: "border-gray-300",
    button: "bg-gray-800",
    features: [
      "Browse Jobs",
      "Apply to 5 Jobs / Month",
      "Basic Profile",
      "Email Support",
    ],
  },
  {
    id: 2,
    name: "Premium",
    price: "₹499 / Month",
    color: "border-blue-600",
    button: "bg-blue-600",
    popular: true,
    features: [
      "Unlimited Job Applications",
      "Priority Support",
      "Resume Review",
      "Interview Preparation",
      "Featured Profile",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    color: "border-green-600",
    button: "bg-green-600",
    features: [
      "Unlimited Hiring",
      "Company Branding",
      "Dedicated Manager",
      "Analytics Dashboard",
      "24/7 Support",
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center">
          Pricing Plans
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-12">
          Choose the perfect plan for your career.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan) => (

            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg border-2 ${plan.color} p-8 relative`}
            >

              {plan.popular && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h2 className="text-3xl font-bold">
                {plan.name}
              </h2>

              <p className="text-2xl text-blue-600 font-bold mt-4">
                {plan.price}
              </p>

              <ul className="mt-8 space-y-4">

                {plan.features.map((feature, index) => (
                  <li key={index}>
                    ✅ {feature}
                  </li>
                ))}

              </ul>

              <button
                className={`w-full mt-10 ${plan.button} text-white py-3 rounded-xl hover:opacity-90 transition`}
              >
                Choose Plan
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Pricing;