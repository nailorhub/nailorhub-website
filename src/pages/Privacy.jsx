import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-500 hover:text-[#1a6fb5] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#1e1e2f] mb-6">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-[#1e1e2f] mt-10 mb-4">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you submit a project request through our website, we collect your name, email address, 
            company name, and details about your project needs. This information is used solely to evaluate 
            your request and follow up if your project aligns with our current focus.
          </p>

          <h2 className="text-2xl font-bold text-[#1e1e2f] mt-10 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use the information you provide to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 leading-relaxed mb-4 space-y-2">
            <li>Review and evaluate project requests</li>
            <li>Communicate with potential clients about their projects</li>
            <li>Improve our services and website experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1e1e2f] mt-10 mb-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We take reasonable measures to protect your personal information from unauthorized access, 
            disclosure, or misuse. Your data is stored securely and is only accessible to authorized personnel.
          </p>

          <h2 className="text-2xl font-bold text-[#1e1e2f] mt-10 mb-4">Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We do not sell, trade, or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-bold text-[#1e1e2f] mt-10 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or how we handle your information, 
            please contact us at{" "}
            <a href="mailto:patrick@nailorhub.com" className="text-[#1a6fb5] hover:underline">
              patrick@nailorhub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}