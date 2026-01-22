import React from 'react';
import { useFormContext } from 'react-hook-form';

const StepUsername = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Username</h2>
      <p className="text-gray-400 text-sm mb-4">
        Username should include your first name. This step is to demonstrate custom validation based on previous input.
      </p>

      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          {...register("username")}
          placeholder="Type your username"
          className="w-full bg-slate-700 rounded p-2 border border-slate-600 focus:border-blue-500 outline-none"
        />
        {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
      </div>
    </div>
  );
};

export default StepUsername;