import React from 'react';
import ButtonPrimery from './ButtonPrimery';

const TopFooter = () => {
  return (
    <div className="w-full bg-lightBlue">
      <div className="py-10 flex flex-col gap-4 justify-center items-center">
        <p>We will love to hear what you think!</p>

        <button
          className="text-red hover:text-lightRed bg-lightRed hover:bg-red ring-1 ring-red p-2 text-sm font-bold rounded-full duration-300 flex items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default TopFooter;
