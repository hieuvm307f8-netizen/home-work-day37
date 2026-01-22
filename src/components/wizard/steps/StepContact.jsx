import React from 'react';
import { useFormContext } from 'react-hook-form';

const StepContact = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
      
      {/* Email & Age Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email")}
            placeholder="e.g. john@doe.com"
            className="w-full bg-slate-700 rounded p-2 border border-slate-600 focus:border-blue-500 outline-none"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            {...register("age")}
            placeholder="e.g. 18"
            className="w-full bg-slate-700 rounded p-2 border border-slate-600 focus:border-blue-500 outline-none"
          />
          {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age.message}</p>}
        </div>
      </div>

      {/* Name Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            {...register("lastName")}
            placeholder="e.g. Doe"
            className="w-full bg-slate-700 rounded p-2 border border-slate-600 focus:border-blue-500 outline-none"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            {...register("firstName")}
            placeholder="e.g. John"
            className="w-full bg-slate-700 rounded p-2 border border-slate-600 focus:border-blue-500 outline-none"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default StepContact;