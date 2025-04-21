"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextType {
  isOnboarding: boolean;
  setIsOnboarding: (value: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        setIsOnboarding,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
