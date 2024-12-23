import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className=" w-full bg-gray-800 border-t-2 border-gray-600 py-12">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex justify-between gap-1">
          {/* Logo & Copyright Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 p-6 flex flex-col items-start">
            <div className="flex items-center space-x-4 mb-6">
              <Logo width="70px" />
              <p className="text-lg font-semibold text-gray-300">DevUI</p>
            </div>
            <p className="text-sm text-gray-500">
              &copy; 2023 DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Company Links Section */}
          <div className="w-full md:w-1/4 lg:w-1/4 p-6">
            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-widest mb-4">
              Company
            </h3>
            <ul>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links Section */}
          <div className="w-full md:w-1/4 lg:w-1/4 p-6">
            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-widest mb-4">
              Support
            </h3>
            <ul>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Account
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Help
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links Section */}
          <div className="w-full md:w-1/4 lg:w-1/4 p-6">
            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-widest mb-4">
              Legals
            </h3>
            <ul>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  to="/"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
