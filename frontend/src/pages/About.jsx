import { FaTasks, FaClock, FaMobile, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Taskly</h1>
          <p className="text-xl max-w-3xl mx-auto">
            The smart way to manage your tasks and boost your productivity
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Taskly was created with a simple mission: to help people organize their work and life 
            more efficiently, reducing stress and improving productivity.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
              <FaTasks className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">
              Easily create, organize, and track your tasks with our intuitive interface.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-purple-100 text-purple-600 rounded-full mb-4">
              <FaClock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Deadline Tracking</h3>
            <p className="text-gray-600">
              Never miss a deadline with our powerful reminder and notification system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full mb-4">
              <FaMobile className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
            <p className="text-gray-600">
              Access your tasks from any device - desktop, tablet, or mobile.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-red-100 text-red-600 rounded-full mb-4">
              <FaShieldAlt className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Your data is always secure with our enterprise-grade security measures.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Alex Johnson</h3>
              <p className="text-blue-600">Founder & CEO</p>
              <p className="mt-2 text-gray-600">
                Alex has over 10 years of experience in productivity tools and software development.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sarah Thompson</h3>
              <p className="text-blue-600">Lead Developer</p>
              <p className="mt-2 text-gray-600">
                Sarah is a full-stack developer with expertise in React and Node.js.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Michael Chen</h3>
              <p className="text-blue-600">UX Designer</p>
              <p className="mt-2 text-gray-600">
                Michael creates intuitive and beautiful user experiences that help users be more productive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;