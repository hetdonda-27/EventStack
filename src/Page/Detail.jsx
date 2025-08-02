import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../Data/card.json';
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';


const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = data.find(ev => String(ev.id) === String(id));
  const [showMore, setShowMore] = useState(false);
  const handleBook = () => {
    navigate(`/book/${event.id}`);
  };
  
  if (!event) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-medium text-gray-600">Event not found.</div>
      </section>
    );
  }

  const toggleShow = () => setShowMore(!showMore);
  const shortText = event.desc?.slice(0, 150);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex justify-center items-center">
      <div className="bg-white border border-indigo-100 rounded-2xl shadow hover:shadow-indigo-200 transition-shadow duration-300 w-full max-w-3xl overflow-hidden">

        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <img
            src={event.image || '/images/default.jpg'}
            alt={event.title}
            className="h-56 object-contain rounded-xl shadow bg-white"
          />
        </div>

        {/* Event Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

          <div className="text-gray-700 space-y-2 text-lg">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Category:</span> {event.category}
            </div>

            {event.organizer && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Organizer:</span> {event.organizer}
              </div>
            )}

            {/* Chief Guests List */}
            {Array.isArray(event.chiefguests) && event.chiefguests.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Chief Guests:</span>
                <ul className="list-disc list-inside pl-4 text-gray-800">
                  {event.chiefguests.map((guest, idx) => (
                    <li key={idx}>{guest.trim()}</li>
                  ))}
                {/* <Makepayment/> */}
                </ul>
              </div>
            )}

            {/* Date and Time */}
            <div className="flex items-center gap-2">
              <SlCalender className="text-indigo-500" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-indigo-500" />
              <span>Start: {event.startTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-indigo-500" />
              <span>End: {event.endTime}</span>
            </div>

            {/* Location with map link */}
            {event.maplink ? (
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-rose-600" />
                <a
                  href={event.maplink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  {event.location}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-rose-600" />
                <span>{event.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              🏫 <span>{event.college}</span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-emerald-600">
              Price: ₹{event.price}/-
            </div>
           </div>

          {/* Description */}
          <div className="text-gray-700 text-base leading-relaxed">
            <span className="font-semibold">Description: </span>
            {showMore ? event.desc : shortText + '...'}
            {event.desc && event.desc.length > 150 && (
              <button
                onClick={toggleShow}
                className="ml-2 text-indigo-600 underline text-sm hover:text-indigo-800 transition"
              >
                {showMore ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold py-3 rounded-lg shadow mt-4 transition w-full" onClick={handleBook}>
            Book Event
          </button>
        </div>
      </div>
    </section>
  );
};

export default Detail;
