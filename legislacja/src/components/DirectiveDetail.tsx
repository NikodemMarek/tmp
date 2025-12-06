import { Directive } from '../types';
import { Roadmap } from './Roadmap';

type DirectiveDetailProps = {
  directive: Directive;
  onClose: () => void;
};

export const DirectiveDetail = ({ directive, onClose }: DirectiveDetailProps) => {
  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-in-progress';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="directive-detail-card">
      <div className="card-header">
        <h2>{directive.title}</h2>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
      <div className="directive-properties">
        <p className="date"><strong>Creation Date:</strong> {directive.creationDate}</p>
        <p><strong>Status:</strong> <span className={`status ${getStatusClassName(directive.status)}`}>{directive.status}</span></p>
        <p><strong>Description:</strong> {directive.description}</p>
        {directive.tags && directive.tags.length > 0 && (
          <p>
            <strong>Tags:</strong>{' '}
            {directive.tags.map((tag) => (
              <span key={tag} className="tag-item">
                {tag}
              </span>
            ))}
          </p>
        )}
      </div>
      <Roadmap currentStep={directive.currentStep} stepDetails={directive.stepDetails} />
    </div>
  );
};
