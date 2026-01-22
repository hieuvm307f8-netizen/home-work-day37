import { useFormContext } from 'react-hook-form';

const StepResult = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Congratulations!</h2>
      <p className="text-gray-300">
        You did it <span className="font-bold text-white">{values.firstName} {values.lastName}</span>! 🎉
      </p>
      <p className="text-gray-400 text-sm">Here's your input:</p>
      
      <div className="bg-black p-4 rounded border border-gray-700 font-mono text-sm text-green-400">
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
};

export default StepResult;