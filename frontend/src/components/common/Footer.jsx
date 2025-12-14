import React from 'react';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        <p className="font-medium text-gray-700">{APP_NAME}</p>

        <div className="flex justify-center gap-4 mt-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/sweets" className="hover:text-blue-600">Sweets</a>
          <a href="/login" className="hover:text-blue-600">Login</a>
          <a href="/register" className="hover:text-blue-600">Register</a>
        </div>

        <p className="mt-3 text-xs">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
