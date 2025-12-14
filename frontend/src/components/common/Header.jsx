import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APP_NAME } from '../../utils/constants';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          {APP_NAME}
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/sweets" className="hover:text-blue-600">
            Sweets
          </Link>

          {isAdmin && (
            <Link to="/admin" className="hover:text-blue-600">
              Admin
            </Link>
          )}

          {user ? (
            <>
              <span className="text-gray-600">
                {user.username} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
