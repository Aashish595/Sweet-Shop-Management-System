import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCandyCane, FaShoppingCart, FaStar, FaTruck, FaHeart } from "react-icons/fa";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <FaCandyCane className="text-4xl" />,
      title: "Wide Variety",
      description: "Choose from hundreds of delicious sweets across categories",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaShoppingCart className="text-4xl" />,
      title: "Easy Purchase",
      description: "Simple and secure checkout with instant updates",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Premium Quality",
      description: "Only the finest ingredients used in all our sweets",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <FaTruck className="text-4xl" />,
      title: "Fast Delivery",
      description: "Quick delivery to satisfy your sweet cravings faster",
      color: "from-green-400 to-teal-500",
    },
  ];

  const popularCategories = [
    { name: "Chocolate", icon: "🍫", count: 25, color: "bg-amber-100" },
    { name: "Candy", icon: "🍭", count: 18, color: "bg-pink-100" },
    { name: "Cake", icon: "🎂", count: 12, color: "bg-red-100" },
    { name: "Ice Cream", icon: "🍦", count: 15, color: "bg-blue-100" },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to Sweet Shop! 🍬
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Your one-stop destination for premium sweets and delightful treats
          </p>
          <div className="flex flex-wrap gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-white/90 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/sweets"
                className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-white/90 transition flex items-center gap-2"
              >
                <FaShoppingCart />
                <span>Shop Now</span>
              </Link>
            )}
          </div>
        </div>
        <div className="absolute -top-10 right-0 opacity-10 text-9xl pointer-events-none">
          🍭🍫🍬🍪🎂🍦
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose Sweet Shop?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 text-center flex flex-col items-center gap-4"
            >
              <div className={`p-5 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularCategories.map((category) => (
            <Link
              key={category.name}
              to={`/sweets?category=${category.name.toLowerCase()}`}
              className={`${category.color} rounded-2xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <h3 className="font-bold text-gray-800">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.count} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="inline-block p-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full shadow-lg">
          <div className="bg-white rounded-full p-10 max-w-lg mx-auto">
            <FaHeart className="text-5xl text-pink-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to satisfy your sweet tooth?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of happy customers who trust Sweet Shop for their daily dose of sweetness!
            </p>
            <Link
              to={isAuthenticated ? "/sweets" : "/register"}
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition text-lg"
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
