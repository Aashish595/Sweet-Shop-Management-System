import { useAuth } from '../context/AuthContext';
import SweetList from '../components/sweets/SweetList';

const SweetsPage = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <SweetList isAdmin={isAdmin} />
    </div>
  );
};

export default SweetsPage;
