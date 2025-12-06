import { legislationSteps } from '../legislationSteps';

type RoadmapProps = {
  currentStep: number;
};

export const Roadmap = ({ currentStep }: RoadmapProps) => {
  return (
    <div className="roadmap">
      {legislationSteps.map((step, index) => (
        <div key={step} className="roadmap-step">
          <div className={`roadmap-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`} />
          <div className="roadmap-label">{step}</div>
        </div>
      ))}
    </div>
  );
};
