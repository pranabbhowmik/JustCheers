import { assets } from "../../assets/assets";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-white text-gray-600 py-16 px-8 md:px-16" id="contact-us">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Footer Left */}
        <div className="flex flex-col items-start gap-6">
          <img src={assets.logo} alt="Logo" className="w-44" />
          <p className=" text-sm font-semibold">
            Just Cheer offers quick, reliable alcohol delivery in 20 minutes,
            bringing your favorite drinks right to your door fast.
          </p>
          <div className="flex gap-4">
            <FaFacebookSquare className="w-8 h-8 text-black cursor-pointer" />

            <FaXTwitter className="w-8 h-8 cursor-pointer" />

            <FaLinkedin className="w-8 h-8  cursor-pointer" />
          </div>
        </div>

        {/* Footer Center */}
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold text-gray-800">COMPANY</h2>
          <ul className="space-y-3">
            <li className="cursor-pointer hover:text-red-500">Home</li>
            <li className="cursor-pointer hover:text-red-500">About us</li>
            <li className="cursor-pointer hover:text-red-500">Delivery</li>
            <li className="cursor-pointer hover:text-red-500">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Footer Right */}
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold text-gray-800">GET IN TOUCH</h2>
          <ul className="space-y-3">
            <li className="cursor-pointer">contact@justcheer.com</li>
          </ul>
          <div className="flex gap-4">
            <img
              src={assets.play_store}
              alt="Payment methods"
              className="w-36 cursor-pointer"
            />
            <img
              src={assets.app_store}
              alt="Payment methods"
              className="w-36 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <hr className="my-8 border-t border-gray-300" />
      <p className="text-center text-gray-600 text-sm">
        Copyright 2024 © Just Cheer - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
