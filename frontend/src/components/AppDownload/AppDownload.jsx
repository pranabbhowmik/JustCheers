import { assets } from "../../assets/assets";
import { Search } from "lucide-react";

const AppDownload = () => {
  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="container mx-auto px-4 sm:px-6 py-12  flex flex-col lg:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            The Fastest Alcohol Delivery App
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search your Drink..."
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-lg text-gray-600">
            Get Your Favorite Booze Delivered Right to Your Doorstep!
          </p>

          {/* App Store Buttons */}
          <div className="flex  gap-4 w-40">
            <img
              src={assets.app_store}
              alt="App Store"
              className="w-32 h-auto cursor-pointer"
            />
            <img
              src={assets.play_store}
              alt="Play Store"
              className="w-32 h-auto cursor-pointer"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative">
            <img
              src={assets.appdownload}
              alt="App Download"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
