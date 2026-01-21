
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ISD Portal. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/about" className="hover:text-indigo-600">About</a>
          <a href="/privacy" className="hover:text-indigo-600">Privacy Policy</a>
          <a href="/contact" className="hover:text-indigo-600">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
