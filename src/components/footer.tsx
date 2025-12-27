import React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 sticky bottom-0">
      <div className="flexcolum max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-start">
        <div className="flex flex-col gap-4 items-center">
          <img src="../../logo.webp" className="h-12 rounded" />
          <p>Wildberries</p>
        </div>
        <div className="flex justify-center text-center">
          <ul className="space-y-2">
            <li>
              <a className="hover:text-purple-400">About Us</a>
            </li>
            <li>
              <a className="hover:text-purple-400">Terms & Conditions</a>
            </li>
            <li>
              <a className="hover:text-purple-400">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:text-purple-400">Help</a>
            <li>
            </li>
              <a className="hover:text-purple-400">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex space-x-6">
          <ul className="space-y-2">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center nop pt-6 pl-20">2025 Wildberries. All rights reserved.</p>
    </footer>
  );
};
export default Footer;