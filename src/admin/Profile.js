import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(4);

  const showmore = () => {
    setVisible(events.length);
  };
  const showless = () => {
    setVisible(4);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (!token || !userId || (role !== "user" && role !== "admin")) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load profile");

        setUser({
          fullname: `${data.firstname} ${data.middlename || ""} ${data.lastname}`.trim(),
          email: data.email,
          mobileno: data.mobileno,
        });
        setEvents(data.bookedEvents || []);
      } catch (err) {
        console.error("Profile fetch error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-400 font-medium animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Decor Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>

      {/* Main Glass Card - Changed to max-w-lg for Medium Size */}
      <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Banner / Header */}
        <div className="relative h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          {/* Avatar Circle - Adjusted position for compact card */}
          <div className="absolute -bottom-12">
            <div className="w-24 h-24 rounded-full bg-[#0f172a] border-4 border-[#0f172a] flex items-center justify-center shadow-xl">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {user.fullname.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-16 pb-8 px-6 sm:px-8">

          {/* User Name */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">{user.fullname}</h1>
            <p className="text-slate-400 text-sm mt-1">Student Member</p>
          </div>

          {/* User Info - Stacked Vertical for Medium Look */}
          <div className="space-y-4 mb-8">
            <div className="group p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email Address</h2>
                <p className="text-slate-200 text-sm font-medium truncate">{user.email}</p>
              </div>
            </div>

            <div className="group p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Phone Number</h2>
                <p className="text-slate-200 text-sm font-medium">{user.mobileno}</p>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Booked Events
              </h2>
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/10 text-slate-400">
                {events.length}
              </span>
            </div>

            {events.length > 0 ? (
              <div className="space-y-2.5">
                {events.slice(0, visible).map((event, idx) => (
                  <div
                    key={idx}
                    className="group p-3 rounded-lg bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {/* Little dot accent */}
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-blue-400"></div>
                      <div>
                        <h3 className="text-slate-200 text-lg font-semibold group-hover:text-white transition-colors">{event.eventName}</h3>
                        <p className="text-slate-500 text-sm">{event.eventDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                <p className="text-slate-500 text-sm">No events yet</p>
              </div>
            )}

            {events.length > 4 && (
              <div className="mt-4 flex justify-center">
                <button onClick={visible < events.length ? showmore : showless} className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wide transition-colors">
                  {visible < events.length ? "Show More ↓" : "Show Less ↑"}
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 rounded-xl font-semibold transition-all duration-300 text-sm flex items-center justify-center gap-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}