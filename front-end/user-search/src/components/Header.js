import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../context/UserContext';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state } = useUserContext();

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('bg-gray-800');
    document.body.classList.toggle('text-white');
  };

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          My Awesome App
        </Link>
        <div className="flex items-center">
          <button
            className="p-1 text-gray-300 dark:text-gray-100"
            onClick={handleDarkModeToggle}
          >
            {isDarkMode ? 'Light MODE' : 'Dark MODE'}
          </button>
        
        </div>
      </div>
    </header>
  );
}

export default Header;
