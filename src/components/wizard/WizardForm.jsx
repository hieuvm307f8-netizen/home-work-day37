import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { wizardSchema } from "../../schemas/wizardSchema";

import StepContact from "./steps/StepContact";
import StepUsername from "./steps/StepUsername";
import StepAsync from "./steps/StepAsync";
import StepResult from "./steps/StepResult";
import ProgressBar from "./ProgressBar";

const STEPS = [
  { component: StepContact, fields: ["email", "firstName", "lastName", "age"] },
  { component: StepUsername, fields: ["username"] },
  { component: StepAsync, fields: [] }, 
  { component: StepResult, fields: [] },
];

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(wizardSchema),
    mode: "all", 
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      username: "",
    },
  });

  const { trigger, handleSubmit } = methods;

  const handleNext = async () => {
    const stepConfig = STEPS[currentStep];
    
    const isStepValid = await trigger(stepConfig.fields);
    if (!isStepValid) return;

    if (currentStep === 2) { 
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    }

    setDirection(1);
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 rounded-lg shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-slate-700 bg-slate-800 z-10 relative">
          <h1 className="text-xl font-bold flex items-center gap-2">
            rhf-wizard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Step {currentStep + 1} / {STEPS.length}</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white">
              <svg height="24" viewBox="0 0 16 16" width="24" className="fill-current"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>
          </div>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />

        <FormProvider {...methods}>
          <div className="flex-1 p-8 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </FormProvider>

        {!isLastStep && (
          <div className="p-6 border-t border-slate-700 flex justify-between bg-slate-800 z-10">
            <button
              onClick={handlePrev}
              disabled={isFirstStep || isLoading}
              className={`px-6 py-2 rounded font-semibold transition-colors flex items-center gap-2
                ${isFirstStep 
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
            >
               ← PREVIOUS
            </button>

            <button
              onClick={handleNext}
              disabled={isLoading}
              className="px-6 py-2 rounded font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2"
            >
              {isLoading ? "PROCESSING..." : "NEXT →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}