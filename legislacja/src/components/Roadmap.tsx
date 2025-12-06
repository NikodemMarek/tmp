import { useState } from 'react';
import { legislationSteps } from '../legislationSteps';

type RoadmapProps = {
  currentStep: number;
};

export const Roadmap = ({ currentStep }: RoadmapProps) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index);
  };

  return (
    <div className="roadmap">
      {legislationSteps.map((step, index) => (
        <div key={step} className="roadmap-step-container">
          <button className="roadmap-button" onClick={() => handleStepClick(index)}>
            <div className={`roadmap-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`} />
            <div className="roadmap-label">{step}</div>
          </button>
          {selectedStep === index && (
            <div className="roadmap-details">
              <p>Placeholder information for {step}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
