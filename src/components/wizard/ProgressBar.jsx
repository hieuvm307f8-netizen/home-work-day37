import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
      <motion.div
        className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ProgressBar;