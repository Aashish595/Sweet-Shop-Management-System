import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaCandyCane,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaHeart,
} from "react-icons/fa";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <FaCandyCane className="text-3xl" />,
      title: "Wide Variety",
      description:
        "Choose from hundreds of delicious sweets in different categories",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "Easy Purchase",
      description: "Simple and secure purchasing process with instant updates",
      color: "from-primary-500 to-yellow-500",
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Premium Quality",
      description: "Only the finest ingredients used in all our sweets",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <FaTruck className="text-3xl" />,
      title: "Fast Delivery",
      description: "Quick delivery to satisfy your sweet cravings faster",
      color: "from-green-500 to-teal-500",
    },
  ];

  const popularCategories = [
    { name: "Chocolate", icon: "🍫", count: 25, color: "bg-amber-100" },
    { name: "Candy", icon: "🍭", count: 18, color: "bg-pink-100" },
    { name: "Cake", icon: "🎂", count: 12, color: "bg-red-100" },
    { name: "Ice Cream", icon: "🍦", count: 15, color: "bg-blue-100" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-pink-500 rounded-3xl text-white p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-sweet mb-4">
            Welcome to Sweet Shop! 🍬
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your one-stop destination for delicious sweets and treats
          </p>
          <div className="flex flex-wrap gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-colors text-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/sweets"
                className="px-8 py-3 bg-white text-primary-600 font-bold rounded-full hover:bg-gray-100 transition-colors text-lg flex items-center space-x-2"
              >
                <FaShoppingCart />
                <span className=" text-blue-500">Shop Now</span>
              </Link>
            )}
          </div>
        </div>
        {/* Floating Icons */}
        <div className="absolute top-0 right-0 opacity-10">
          <div className="text-9xl">🍭🍫🍬🍪🎂🍦</div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Sweet Shop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index}>
              <div
                className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white w-fit mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCategories.map((category) => (
            <Link
              key={category.name}
              to={`/sweets?category=${category.name.toLowerCase()}`}
              className={`${category.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-bold text-gray-800">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.count} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <div className="inline-block p-1 bg-gradient-to-r from-primary-400 to-pink-400 rounded-full">
          <div className="bg-white rounded-full p-8">
            <FaHeart className="text-4xl text-pink-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to satisfy your sweet tooth?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of happy customers who trust Sweet Shop for their
              daily dose of sweetness!
            </p>
            <Link
              to={isAuthenticated ? "/sweets" : "/register"}
              className="btn-primary text-lg px-8 py-3"
            >
              {isAuthenticated ? "Browse Sweets" : "Create Account"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
