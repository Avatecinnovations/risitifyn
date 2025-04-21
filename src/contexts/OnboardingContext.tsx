"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingData {
  logo?: string;
  companyName?: string;
  industry?: string;
  timezone?: string;
}

interface OnboardingContextType {
  isOnboarding: boolean;
  setIsOnboarding: (value: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    logo: undefined,
    companyName: undefined,
    industry: undefined,
    timezone: undefined,
  });

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        setIsOnboarding,
        currentStep,
        setCurrentStep,
        onboardingData,
        setOnboardingData,
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
