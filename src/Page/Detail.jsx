import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLocationDot, FaMapLocationDot, FaUserTie, FaBuildingColumns } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Event/${id}`);
        if (!response.ok) throw new Error("Event not found");
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBook = () => {
    if (event) navigate(`/book/${event._id}`);
  };

  const toggleShow = () => setShowMore(!showMore);
  const userrole = localStorage.getItem('role');

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
          <div className="h-64 bg-gray-200"></div>
          <div className="p-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- ERROR STATE ---
  if (error || !event) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800">{error || "Event not found."}</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 hover:underline">Go Back</button>
      </section>
    );
  }

  const shortText = event.desc?.slice(0, 150);

  return (
    <section className="min-h-screen py-12 px-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-purple-50 to-white flex justify-center items-center font-sans">
      
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-indigo-200/50">
        
        {/* --- HERO IMAGE SECTION --- */}
        <div className="relative w-full h-80 sm:h-96 group overflow-hidden">
          <img
            src={event.image || '/images/default.jpg'}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-gray-100 transform transition hover:scale-110">
            <span className="text-lg font-bold text-emerald-600">₹{event.price}</span>
            <span className="text-xs text-gray-500 font-medium ml-1">/ entry</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
               <span className="px-3 py-1 bg-indigo-600/90 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                 {event.category}
               </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight shadow-sm">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Event Details</h3>
              
              <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 hover:bg-indigo-50 transition">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                  <SlCalender size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                  <p className="font-semibold text-gray-800">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.startTime} - {event.endTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-rose-50/50 rounded-xl border border-rose-100 hover:bg-rose-50 transition">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
                  <FaLocationDot size={20} />
                </div>
                <div className="w-full">
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  {event.maplink ? (
                    <a
                      href={event.maplink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between font-semibold text-gray-800 hover:text-rose-600 transition"
                    >
                      <span className="truncate">{event.location}</span>
                      <FaMapLocationDot className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                    </a>
                  ) : (
                    <p className="font-semibold text-gray-800">{event.location}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <FaBuildingColumns /> <span>{event.college}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Organizer & Guests</h3>
              
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Organized By</p>
                <p className="font-bold text-gray-800 text-lg">{event.organizer || "Unknown"}</p>
              </div>

              {Array.isArray(event.chiefguests) && event.chiefguests.length > 0 && (
                <div>
                   <p className="text-xs text-gray-400 font-bold uppercase mb-2 flex items-center gap-1">
                     <FaUserTie /> Chief Guests
                   </p>
                   <div className="flex flex-wrap gap-2">
                     {event.chiefguests.map((guest, idx) => (
                       <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-full shadow-sm font-medium">
                         {guest.trim()}
                       </span>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-100 my-8" />

          {/* --- DESCRIPTION --- */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">About this Event</h3>
            <div className="text-gray-600 leading-relaxed text-base">
              {showMore ? event.desc : shortText + (event.desc?.length > 150 ? "..." : "")}
            </div>
            {event.desc && event.desc.length > 150 && (
              <button
                onClick={toggleShow}
                className="mt-2 text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition flex items-center gap-1"
              >
                {showMore ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>

          {userrole === 'user' && (
            <div className="mt-10">
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transform transition hover:-translate-y-1 active:translate-y-0"
                onClick={handleBook}
              >
                Book Your Spot Now
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">Limited seats available. Book fast!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Detail;