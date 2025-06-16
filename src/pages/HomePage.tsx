import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FlyMe</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline font-medium">Home</Link>
            <Link to="/my-bookings" className="hover:underline font-medium">My Bookings</Link>
            <Link to="/login" className="hover:underline font-medium">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Flight</h2>
          <p className="text-xl mb-8">Discover amazing deals on flights to destinations worldwide</p>
          
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="from" className="block text-gray-700 mb-2">From</label>
                <input 
                  type="text" 
                  id="from" 
                  className="w-full p-2 border border-gray-300 rounded text-gray-800" 
                  placeholder="City or Airport"
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-gray-700 mb-2">To</label>
                <input 
                  type="text" 
                  id="to" 
                  className="w-full p-2 border border-gray-300 rounded text-gray-800" 
                  placeholder="City or Airport"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  className="w-full p-2 border border-gray-300 rounded text-gray-800"
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'London'].map((city) => (
              <div key={city} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{city}</h3>
                  <p className="text-gray-600 mb-4">Experience the magic of {city}</p>
                  <button className="text-blue-600 font-medium hover:underline">View Flights</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FlyMe</h3>
              <p className="text-gray-400">Your trusted partner for flight bookings worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/my-bookings" className="text-gray-400 hover:text-white">My Bookings</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: support@flyme.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FlyMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;