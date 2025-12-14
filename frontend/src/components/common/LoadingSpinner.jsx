
const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary-500',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} 
        border-4 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;