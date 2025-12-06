import { useState } from 'react';
import { legislationSteps } from '../legislationSteps';
import { Directive } from '../types'; // Import Directive to access StepDetail type

type RoadmapProps = {
  currentStep: number;
  stepDetails?: Directive['stepDetails']; // Use the StepDetail type from Directive
};

export const Roadmap = ({ currentStep, stepDetails }: RoadmapProps) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index);
  };

  return (
    <div className="roadmap">
      <h3>Harmonogram Legislacyjny</h3>
      {legislationSteps.map((step, index) => {
        const detail = stepDetails?.[index];
        const isCompleted = index < currentStep;
        const isInProgress = index === currentStep;

        let dotClassName = '';
        if (isCompleted) {
          dotClassName = 'completed';
        } else if (isInProgress) {
          dotClassName = 'active';
        }

        return (
          <div key={step.name} className="roadmap-step-container">
            <button className="roadmap-button" onClick={() => handleStepClick(index)}>
              <div className={`roadmap-dot ${dotClassName}`} />
              <div className="roadmap-label">{step.name}</div>
            </button>
            {selectedStep === index && detail && (
              <div className="roadmap-details">
                <p><strong>Status:</strong> {detail.status}</p>
                {detail.previousDescription && (
                  <>
                    <p className="description-text"><strong>Zmiany w Opisie:</strong></p>
                    <p className="description-text diff-view">
                      <span className="diff-removed">Poprzedni Opis: {detail.previousDescription}</span>
                      <br/>
                      <span className="diff-added">Aktualny Opis: {detail.description}</span>
                    </p>
                  </>
                )}
                {!detail.previousDescription && (
                  <p className="description-text">{detail.description}</p>
                )}
              </div>
            )}
            {selectedStep === index && !detail && (
              <div className="roadmap-details">
                <p>Brak szczegółów dla tego kroku.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
