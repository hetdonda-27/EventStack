import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Card = ({ events = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="py-12">
       <div className="container mx-auto px-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Trending Events🔥</h1>
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card card-hover rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-36 object-contain rounded shadow bg-white"
                />
              ) : (
                <span className="text-6xl">{event.icon}</span>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {event.category}
                </span>
                <span className="text-gray-500 text-sm">{event.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4">📍 {event.location}</span>
                <span className="mr-4">⏰ {event.startTime}</span>
                <p className="text-sm font-medium flex items-center space-x">
                  <span className="text"><FaRupeeSign/></span>
                  <span className="text-sm">{event.price}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-indigo-600">{event.college}</span>
                <button className="bg-emerald-700 text-white px-4 py-2 text-sm rounded hover:bg-emerald-900 transition duration-200"
                  onClick={e => { e.stopPropagation(); navigate(`/events/${event.id}`); }}>
                  Book Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;