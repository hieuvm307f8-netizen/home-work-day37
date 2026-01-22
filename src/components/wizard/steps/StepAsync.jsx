import React from 'react';

const StepAsync = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Async</h2>
      <p className="text-gray-300">
        Pressing "Next" does async operation that takes 2 seconds before we proceed to the next step.
      </p>
    </div>
  );
};

export default StepAsync;