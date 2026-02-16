import { useState, useEffect } from "react";
import Card from "../Page/Card"; // Import the new single card component

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/Event");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Trending Events🔥</h1>
        </div>
        <div className="container mx-auto px-6 text-center">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Trending Events🔥</h1>
        </div>
        <div className="container mx-auto px-6 text-center text-red-600">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Trending Events🔥</h1>
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Page;