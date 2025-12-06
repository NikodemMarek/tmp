import { Directive } from '../types';
import { Roadmap } from './Roadmap';

type DirectiveDetailProps = {
  directive: Directive;
  onClose: () => void;
};

export const DirectiveDetail = ({ directive, onClose }: DirectiveDetailProps) => {
  return (
    <div className="directive-detail-card">
      <div className="card-header">
        <h2>{directive.title}</h2>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
      <Roadmap currentStep={directive.currentStep} />
    </div>
  );
};
