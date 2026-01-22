import { useState, useEffect } from "react";
import Draggable from "./ui/Draggable";
import SeriesPoster from "./SeriesPoster";

function SeriesContainer({ title, fetchFunction }) {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    fetchFunction(setSeries);
  }, [fetchFunction]);

  return (
    <div className='min-w-screen py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>{title}</h2>
      <Draggable>
        <div className='flex gap-4'>
          {Object.keys(series).length > 0
            ? series.map((serie) => (
                <SeriesPoster key={serie.id} series={serie} />
              ))
            : null}
        </div>
      </Draggable>
    </div>
  );
}

export default SeriesContainer;
