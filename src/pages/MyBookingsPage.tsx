import React from 'react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

const MyBookingsPage: React.FC = () => {
  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: 'BK001',
      flightNumber: 'FL123',
      from: 'New York',
      to: 'London',
      date: '2023-12-15',
      status: 'confirmed'
    },
    {
      id: 'BK002',
      flightNumber: 'FL456',
      from: 'Paris',
      to: 'Tokyo',
      date: '2023-11-20',
      status: 'completed'
    },
    {
      id: 'BK003',
      flightNumber: 'FL789',
      from: 'Sydney',
      to: 'Dubai',
      date: '2024-01-10',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>
        
        {bookings.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flightNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.from} to {booking.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                      {booking.status === 'confirmed' && (
                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
              Book a Flight
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
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

export default MyBookingsPage;