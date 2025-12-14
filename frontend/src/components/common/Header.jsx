import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APP_NAME } from '../../utils/constants';
import { FaCandyCane, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaCandyCane className="text-pink-500 text-2xl" />
          <span className="text-xl font-bold text-gray-800">
            {APP_NAME}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/sweets" className={navLinkClass}>
            Sweets
          </NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-2 text-gray-700">
                <FaUserCircle className="text-2xl" />
                <div className="text-sm leading-tight">
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
