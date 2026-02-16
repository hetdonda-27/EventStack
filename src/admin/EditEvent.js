import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../services/eventservices";
import { 
  FaHeading, FaList, FaUserTie, FaCalendarDays, FaClock, 
  FaMapLocationDot, FaMap, FaBuildingColumns, FaIndianRupeeSign, 
  FaImage, FaAlignLeft, FaPlus, FaXmark, FaFloppyDisk 
} from "react-icons/fa6";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Update Event");
  const [currentGuest, setCurrentGuest] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const chiefguests = watch("chiefguests", []);

  // --- 1. Load Data ---
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const result = await getEventById(id);
        if (result.success && result.data) {
          const event = result.data;
          
          // Format date for HTML input (YYYY-MM-DD)
          if(event.date) {
            event.date = new Date(event.date).toISOString().split('T')[0];
          }

          Object.keys(event).forEach((key) => {
            setValue(key, event[key]);
          });
        } else {
          console.error("Error fetching event:", result.error);
        }
      } catch (err) {
        console.error("Failed to load event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, setValue]);

  // --- 2. Handlers ---
  const handleAddGuest = (e) => {
    e.preventDefault();
    if (currentGuest.trim()) {
      const newGuests = [...(chiefguests || []), currentGuest.trim()];
      setValue("chiefguests", newGuests);
      setCurrentGuest("");
    }
  };

  const handleRemoveGuest = (index) => {
    const newGuests = chiefguests.filter((_, i) => i !== index);
    setValue("chiefguests", newGuests);
  };

  const onFormSubmit = async (data) => {
    setStatus("Updating...");
    try {
      const result = await updateEvent(id, data);
      if (result.success) {
        setStatus("Success!");
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        setStatus(`Failed: ${result.error || "Unknown error"}`);
      }
    } catch (err) {
      setStatus("Error");
      console.error("Update error:", err);
    }
  };

  // --- 3. Style Helpers ---
  const Label = ({ icon: Icon, text }) => (
    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1.5">
      <Icon className="text-indigo-500 text-base" />
      {text}
    </label>
  );

  const inputClass = `
    w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
    focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
    transition-all duration-200 outline-none
  `;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Main Card --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold tracking-tight">Edit Event Details</h2>
              <p className="mt-2 text-indigo-100 font-medium opacity-90">Modify the information for your upcoming event.</p>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 space-y-8">
            
            {/* SECTION: BASIC INFO */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Title */}
                <div className="md:col-span-2">
                  <Label icon={FaHeading} text="Event Title" />
                  <input
                    {...register("title", { required: true })}
                    className={inputClass}
                    placeholder="Event Name"
                  />
                  {errors.title && <span className="text-xs text-red-500 mt-1">Title is required</span>}
                </div>

                {/* Category */}
                <div>
                  <Label icon={FaList} text="Category" />
                  <div className="relative">
                    <select {...register("category")} className={`${inputClass} appearance-none`}>
                      <option value="">Select a category</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Conference">Conference</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Organizer */}
                <div>
                  <Label icon={FaUserTie} text="Organizer" />
                  <input {...register("organizer")} className={inputClass} />
                </div>
              </div>
            </div>

            {/* SECTION: GUESTS */}
            <div>
               <Label icon={FaUserTie} text="Chief Guests" />
               <div className="flex gap-2">
                 <input
                   type="text"
                   value={currentGuest}
                   onChange={(e) => setCurrentGuest(e.target.value)}
                   className={`flex-1 ${inputClass}`}
                   placeholder="Type name and press Add"
                   onKeyPress={(e) => e.key === 'Enter' && handleAddGuest(e)}
                 />
                 <button
                   type="button"
                   onClick={handleAddGuest}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-lg font-medium transition-colors flex items-center gap-2"
                 >
                   <FaPlus /> Add
                 </button>
               </div>
               
               {/* Guest Tags */}
               <div className="flex flex-wrap gap-2 mt-3">
                 {chiefguests && chiefguests.map((guest, index) => (
                   <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                     {guest}
                     <button
                       type="button"
                       onClick={() => handleRemoveGuest(index)}
                       className="ml-2 text-indigo-400 hover:text-red-500 focus:outline-none transition-colors"
                     >
                       <FaXmark />
                     </button>
                   </span>
                 ))}
               </div>
            </div>

            {/* SECTION: TIME & VENUE */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 mt-2">Time & Venue</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date */}
                <div className="md:col-span-2">
                  <Label icon={FaCalendarDays} text="Date" />
                  <input type="date" {...register("date")} className={inputClass} />
                </div>

                {/* Time */}
                <div>
                  <Label icon={FaClock} text="Start Time" />
                  <input type="time" {...register("startTime")} className={inputClass} />
                </div>
                <div>
                  <Label icon={FaClock} text="End Time" />
                  <input type="time" {...register("endTime")} className={inputClass} />
                </div>

                {/* Location */}
                <div>
                  <Label icon={FaMapLocationDot} text="Location" />
                  <input {...register("location")} className={inputClass} />
                </div>
                <div>
                  <Label icon={FaBuildingColumns} text="College" />
                  <input {...register("college")} className={inputClass} />
                </div>

                {/* Map Link */}
                <div className="md:col-span-2">
                  <Label icon={FaMap} text="Map Link" />
                  <input type="url" {...register("maplink")} className={inputClass} placeholder="https://..." />
                </div>
              </div>
            </div>

            {/* SECTION: DETAILS */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 mt-2">More Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Price */}
                <div>
                  <Label icon={FaIndianRupeeSign} text="Price (₹)" />
                  <input type="number" {...register("price")} className={inputClass} />
                </div>

                {/* Image */}
                <div>
                  <Label icon={FaImage} text="Image URL" />
                  <input type="url" {...register("image")} className={inputClass} />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label icon={FaAlignLeft} text="Description" />
                  <textarea rows={4} {...register("desc")} className={inputClass} />
                </div>
              </div>
            </div>

            {/* SECTION: ACTIONS */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "Success!"}
                className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <FaFloppyDisk />
                {status}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;