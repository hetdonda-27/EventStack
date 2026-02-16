import { useNavigate } from "react-router-dom";
import {
  FaIndianRupeeSign,
  FaLocationDot,
  FaClock,
  FaBuildingColumns,
  FaTicket
} from "react-icons/fa6";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return null;

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
      onClick={() => navigate(`/events/${event._id}`)}
    >

      <div className="relative h-52 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-6xl animate-bounce">🎉</span>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/50 uppercase tracking-wide">
            {event.category || "Event"}
          </span>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-lg p-2 text-center shadow-sm min-w-[50px]">
          <p className="text-xs font-bold text-slate-500 uppercase">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
          </p>
          <p className="text-lg font-extrabold text-slate-800 leading-none">
            {new Date(event.date).getDate()}
          </p>
        </div>

        {/* Dark Gradient Overlay at bottom of image for contrast */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">

        <h3 className="text-md font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.desc || "No description available for this event."}
        </p>

        <div className="mt-auto space-y-2 mb-4">

          <div className="flex items-center text-slate-600 text-sm-0.500rpm">
            <FaLocationDot className="text-indigo-500 mr-2 flex-shrink-0" />
            <span className="truncate">{event.location || "Location TBA"}</span>
          </div>

          <div className="flex justify-between items-center text-sm-0.500rpm text-slate-600">
            <div className="flex items-center">
              <FaClock className="text-indigo-500 mr-2" />
              <span>{event.startTime || "TBA"}</span>
            </div>
          </div>

          <div className="flex items-center text-md font-medium text-slate-400">
            <FaBuildingColumns className="mr-2" />
            <span className="truncate">{event.college || "University Event"}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">

          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Ticket Price</span>
            <div className="flex items-center text-lg font-bold text-slate-800">
              <FaIndianRupeeSign className="text-sm mr-0.5" />
              {/* {event.price > 0 ? event.price : "Free"} */}
              {event.price}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${event._id}`);
            }}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <FaTicket />
            Book Now
          </button>

        </div>
      </div>
    </div>
  );
};

export default EventCard;