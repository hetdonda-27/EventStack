// Bookevent.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Bookevent = (event) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([{
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    age: '',
    gender: ''
  }]);

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      age: '',
      gender: ''
    }]);
  };

  const removeParticipant = (index) => {
    if (participants.length > 1) {
      const updatedParticipants = [...participants];
      updatedParticipants.splice(index, 1);
      setParticipants(updatedParticipants);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const isValid = participants.every(p =>
      p.firstname && p.lastname && p.email && p.age && p.gender
    );

    if (!isValid) {
      alert('Please fill all required fields for all participants');
      return;
    }

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert('Please login to continue');
      navigate('/login');
      return;
    }

    navigate('/book', {
      state: {
        participants,
        eventId: id,
        userId
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Event Registration
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter details for all attendees below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl shadow-indigo-100 overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Card Header */}
              <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm mr-3">
                    #{index + 1}
                  </span>
                  Participant Details
                </h2>
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="text-red-500 hover:bg-red-400 p-2 rounded-full transition-colors"
                    title="Remove Participant"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>


              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

                  {/* First Name */}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={participant.firstname}
                      onChange={(e) => handleParticipantChange(index, 'firstname', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Middle Name */}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Middle Name</label>
                    <input
                      type="text"
                      value={participant.middlename}
                      onChange={(e) => handleParticipantChange(index, 'middlename', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={participant.lastname}
                      onChange={(e) => handleParticipantChange(index, 'lastname', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Age <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={participant.age}
                      onChange={(e) => handleParticipantChange(index, 'age', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      min="1"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        value={participant.gender}
                        onChange={(e) => handleParticipantChange(index, 'gender', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 pb-12">

            <button
              type="button"
              onClick={addParticipant}
              disabled={participants.length >= 4}
              className={`w-full sm:w-auto px-6 py-3 border-2 border-dashed font-semibold rounded-xl flex items-center justify-center gap-2
      ${participants.length >= 4
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-500'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Participant
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all"
            >
              Proceed to Payment →
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Bookevent;