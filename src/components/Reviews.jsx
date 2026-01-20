import React, { useState, useEffect } from "react";
import { fetchReviews, fetchSeriesReviews } from "../api/fetch";
import { splitReviewsDate } from "../utils";

function Reviews({ id, type = 'movie' }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    type === 'movie' ? fetchReviews(id, setReviews) : fetchSeriesReviews(id, setReviews);
  }, [id]);
  return (
    <div
      id='reviews'
      className={`w-full ${
        Object.keys(reviews).length > 0 && "py-4"
      } space-y-4`}
    >
      {Object.keys(reviews).length > 0
        ? reviews.map((review, index) => (
            <div key={index} className='space-y-2 p-4 bg-secondary rounded-xl'>
              <p>
                Written by{" "}
                <span className='text-quaternary'>{review.author}</span>
                <br />
                Posted at{" "}
                <span className='text-quaternary'>
                  {splitReviewsDate(review.created_at)}
                </span>
              </p>
              <p className='flex flex-col w-full'>
                <span className='w-full max-h-48 overflow-y-hidden'>
                  {review.content}
                </span>
                <span className='w-full text-right text-quaternary'>
                  Latest updated at {splitReviewsDate(review.updated_at)}
                </span>
              </p>
            </div>
          ))
        : null}
    </div>
  );
}

export default Reviews;
