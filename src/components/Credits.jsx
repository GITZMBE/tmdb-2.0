import React, { useEffect, useRef, useState } from "react";
import { fetchMovieCredits } from "../api/fetch";

function Credits({ id }) {
  const [cast, setCast] = useState([]);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetchMovieCredits(id, setCast);
  }, [id]);
  const baseUrl = "https://image.tmdb.org/t/p/w780";

  const handleMouseDown = (e) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      scrollContainerRef.current.style.cursor = "grabbing";
    }
  };
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div id='credits' className='w-full space-y-4'>
      <h2 className='font-bold text-3xl'>Credits</h2>
      <div
        className='flex flex-nowrap lg:flex-wrap lg:justify-between gap-4 max-h-[912px] overflow-y-hidden overflow-x-auto hide-scrollbar'
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {Object.keys(cast).length > 0
          ? cast.map((person, index) => (
              <div
                key={index}
                className='flex flex-col lg:flex-row lg:w-[400px] gap-4 lg:space-x-4 items-center'
              >
                <img
                  src={
                    person.profile_path
                      ? baseUrl + person.profile_path
                      : "https://www.blunttech.com/storage/blunttech/no-image-available.png"
                  }
                  className='min-w-[100px] w-[25vw] lg:max-w-[96px] aspect-square image-center rounded-full'
                  alt=''
                ></img>
                <p className='w-full flex flex-col text-center lg:text-left'>
                  <span>{person.name}</span>
                  <span className='text-gray-500'>{person.character}</span>
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Credits;
