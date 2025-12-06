import { Directive } from '../types';

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
      <p>This is a placeholder for the directive detail.</p>
    </div>
  );
};
