function Footer() {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto flex justify-center items-center text-white">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">My Awesome App By meriem sagaama</span>
          <span className="text-gray-500">|</span>
          
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer hover:text-gray-300">Privacy Policy</span>
          <span className="text-gray-500">|</span>
          <span className="cursor-pointer hover:text-gray-300">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
