import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { createEvent } from "../services/eventservices";
import { getCategories } from "../services/categoryservices";
import { useNavigate } from 'react-router-dom';
import { 
  FaHeading, FaList, FaUserTie, FaCalendarDays, FaClock, 
  FaMapLocationDot, FaMap, FaBuildingColumns, FaIndianRupeeSign, 
  FaImage, FaAlignLeft, FaPlus, FaXmark 
} from "react-icons/fa6";

const CreateEvent = () => {
  const [status, setStatus] = useState('Create Event');
  const [currentGuest, setCurrentGuest] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      title: '', category: '', organizer: '', chiefguests: [],
      date: '', startTime: '', endTime: '', location: '',
      maplink: '', college: '', price: 0, desc: '', image: ''
    }
  });

  const chiefguests = watch('chiefguests', []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (currentGuest.trim()) {
      const newGuests = [...chiefguests, currentGuest.trim()];
      setValue('chiefguests', newGuests);
      setCurrentGuest('');
    }
  };

  const handleRemoveGuest = (index) => {
    const newGuests = chiefguests.filter((_, i) => i !== index);
    setValue('chiefguests', newGuests);
  };

  const onFormSubmit = async (data) => {
    setStatus('Creating...');
    try {
      const result = await createEvent(data);

      if (result.success) {
        setStatus('Success!');
        navigate('/makepayment', {
          state: {
            eventId: result.eventId,
            price: data.price,
            userId: localStorage.getItem('userId'),
            participants: []
          }
        });
      } else {
        setStatus(`Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      setStatus('Error');
      console.error('Event creation error:', err);
    }
  };

  // Helper component for labels
  const Label = ({ icon: Icon, text, required }) => (
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5">
      <Icon className="text-indigo-500" />
      {text}
      {required && <span className="text-red-500">*</span>}
    </label>
  );

  // Helper class for inputs
  const inputClass = (error) => `
    w-full px-4 py-2.5 rounded-lg border bg-slate-50 text-slate-800
    focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
    transition-all duration-200 outline-none
    ${error ? 'border-red-500 bg-red-50' : 'border-slate-200'}
  `;

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-4xl mx-auto">
        
        {/* --- Form Card --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 px-8 py-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold tracking-tight">Host an Event</h2>
              <p className="mt-2 text-indigo-100 font-medium">Create unforgettable memories. Fill in the details below.</p>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 space-y-8">
            
            {/* SECTION 1: BASIC DETAILS */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Title */}
                <div className="md:col-span-2">
                  <Label icon={FaHeading} text="Event Title" required />
                  <input
                    placeholder="e.g. Annual Tech Symposium 2025"
                    {...register("title", { required: "Event title is required" })}
                    className={inputClass(errors.title)}
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <Label icon={FaList} text="Category" required />
                  <div className="relative">
                    <select
                      {...register("category", { required: "Category is required" })}
                      className={inputClass(errors.category) + " appearance-none"}
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                      ))}
                    </select>
                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                  {errors.category && <p className="mt-1 text-xs text-red-500 font-medium">{errors.category.message}</p>}
                </div>

                {/* Organizer */}
                <div>
                  <Label icon={FaUserTie} text="Organizer Name" required />
                  <input
                    placeholder="e.g. Student Council"
                    {...register("organizer", { required: "Organizer is required" })}
                    className={inputClass(errors.organizer)}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: GUESTS */}
            <div>
              <Label icon={FaUserTie} text="Chief Guests" />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentGuest}
                  onChange={(e) => setCurrentGuest(e.target.value)}
                  className={`flex-1 ${inputClass(false)}`}
                  placeholder="Type name and click add..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGuest(e)}
                />
                <button
                  type="button"
                  onClick={handleAddGuest}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-lg transition-colors flex items-center gap-2 font-medium"
                >
                  <FaPlus /> Add
                </button>
              </div>
              
              {/* Guest Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {chiefguests.map((guest, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {guest}
                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(index)}
                      className="ml-2 text-indigo-400 hover:text-indigo-600 focus:outline-none"
                    >
                      <FaXmark />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* SECTION 3: TIME & VENUE */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 mt-2">Time & Venue</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date */}
                <div className="md:col-span-2">
                  <Label icon={FaCalendarDays} text="Event Date" required />
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className={inputClass(errors.date)}
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <Label icon={FaClock} text="Start Time" required />
                  <input
                    type="time"
                    {...register("startTime", { required: "Required" })}
                    className={inputClass(errors.startTime)}
                  />
                </div>
                <div>
                  <Label icon={FaClock} text="End Time" required />
                  <input
                    type="time"
                    {...register("endTime", { required: "Required" })}
                    className={inputClass(errors.endTime)}
                  />
                </div>

                {/* Location Details */}
                <div>
                  <Label icon={FaMapLocationDot} text="Venue / Location" required />
                  <input
                    placeholder="e.g. Main Auditorium"
                    {...register("location", { required: "Location is required" })}
                    className={inputClass(errors.location)}
                  />
                </div>
                <div>
                  <Label icon={FaBuildingColumns} text="College / University" required />
                  <input
                    placeholder="e.g. IIT Bombay"
                    {...register("college", { required: "College is required" })}
                    className={inputClass(errors.college)}
                  />
                </div>

                {/* Map Link */}
                <div className="md:col-span-2">
                  <Label icon={FaMap} text="Google Maps Link" />
                  <input
                    type="url"
                    placeholder="https://goo.gl/maps/..."
                    {...register("maplink")}
                    className={inputClass(false)}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: MEDIA & PRICE */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 mt-2">Additional Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Price */}
                <div>
                  <Label icon={FaIndianRupeeSign} text="Ticket Price (₹)" required />
                  <input
                    type="number"
                    min="0"
                    {...register("price", { required: "Price is required", min: 0 })}
                    className={inputClass(errors.price)}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <Label icon={FaImage} text="Cover Image URL" />
                  <input
                    placeholder="https://..."
                    {...register("image")}
                    className={inputClass(false)}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label icon={FaAlignLeft} text="Description" required />
                  <textarea
                    rows={4}
                    placeholder="Tell people what makes your event special..."
                    {...register("desc", { required: "Description is required" })}
                    className={inputClass(errors.desc)}
                  />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status !== 'Create Event' && status !== 'Success!'}
                className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {status}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;