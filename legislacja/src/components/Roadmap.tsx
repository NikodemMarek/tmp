import { useState } from 'react';
import { legislationSteps } from '../legislationSteps';
import { Directive } from '../types'; // Import Directive to access StepDetail type

type RoadmapProps = {
  currentStep: number;
  stepDetails?: Directive['stepDetails']; // Use the StepDetail type from Directive
};

const getStatusText = (status: 'ukończono' | 'w toku' | 'do zrobienia') => {
  switch (status) {
    case 'ukończono':
      return 'Ukończono';
    case 'w toku':
      return 'W trakcie realizacji'; // More descriptive
    case 'do zrobienia':
      return 'Planowane'; // More descriptive
    default:
      return status;
  }
};

export const Roadmap = ({ currentStep, stepDetails }: RoadmapProps) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(currentStep);

  const handleStepClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index);
  };

  return (
    <section className="roadmap" aria-labelledby="roadmap-heading">
      <h3 id="roadmap-heading">Harmonogram Legislacyjny</h3>
      <ul>
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
          <li key={step.name} className="roadmap-step-container">
            <button className="roadmap-button" onClick={() => handleStepClick(index)}>
              <div className={`roadmap-dot ${dotClassName}`} />
              <div className="roadmap-label">{step.name}</div>
            </button>
            {selectedStep === index && detail && (
              <div className="roadmap-details">
                <p className="description-text"><strong>Status:</strong> {getStatusText(detail.status)}</p>
                {detail.previousDescription ? (
                  <>
                    <p className="description-text"><strong>Zmiany w Opisie:</strong></p>
                    <p className="description-text diff-view">
                      <span className="diff-removed">Poprzedni Opis: {detail.previousDescription}</span>
                      <br/>
                      <span className="diff-added">Aktualny Opis: {detail.description}</span>
                    </p>
                  </>
                ) : (
                  <p className="description-text">{detail.description}</p>
                )}
                {detail.fileLinks && detail.fileLinks.length > 0 && (
                  <div className="description-text">
                    <strong>Dokumenty:</strong>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '0.5rem' }}>
                      {detail.fileLinks.map((link, linkIndex) => (
                        <li key={linkIndex} style={{ marginBottom: '0.2rem' }}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--md-sys-color-primary)' }}>
                            📎 {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {selectedStep === index && !detail && (
              <div className="roadmap-details">
                <p>Brak szczegółów dla tego kroku.</p>
              </div>
            )}
          </li>
        );
      })}
      </ul>
    </section>
  );
};
