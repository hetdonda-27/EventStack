import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Categories/Search';

// 1. High-quality Unsplash images representing different types of events
const eventImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1170&auto=format&fit=crop",
    alt: "Concert Crowd"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    alt: "Conference Hall"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1468234847176-28606331216a?q=80&w=1477&auto=format&fit=crop",
    alt: "Formal Event"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=2070&auto=format&fit=crop",
    alt: "Celebration"
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === eventImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query) => {
    navigate(`/events?query=${encodeURIComponent(query)}`);
  };

  return (
    <section className="sticky relative w-full h-[500px] md:h-[570px] flex items-center justify-center overflow-hidden">

      {eventImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={image.url} 
            alt={image.alt} 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
        </div>
      ))}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg animate-fade-in-up ">
          Discover Amazing Events
        </h2>
        
        <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md font-normal">
          Life’s Best Moments Start Here.<br className="hidden md:block" />
          <span className="text-yellow-400 font-semibold">Explore, Join Every Moment!</span>
        </p>

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto transform transition-all hover:scale-[1.01]">
          <SearchBar
            onSearch={handleSearch}
            showFilters={false}
            initialQuery=""
          />
        </div>

      </div>

      {/* --- BOTTOM DOTS INDICATORS --- */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
        {eventImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;