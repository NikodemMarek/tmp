import { Directive } from '../types';
import { Roadmap } from './Roadmap';
import { DiscussionSection } from './DiscussionSection'; // Import the new component

type DirectiveDetailProps = {
  directive: Directive;
  onClose: () => void;
};

export const DirectiveDetail = ({ directive, onClose }: DirectiveDetailProps) => {
  const isActProposal = directive.fileLink !== undefined || directive.signaturesCollected !== undefined;

  return (
    <div className="directive-detail-card">
      <div className="card-header">
        <h2>{directive.title}</h2>
        <button onClick={onClose} className="close-button">Zamknij</button>
      </div>
      <div className="directive-properties">
        <p className="date"><strong>Data Utworzenia:</strong> {directive.creationDate}</p>
        {!isActProposal && directive.status && (
          <p><strong>Status:</strong> <span className={`status status-${directive.status.replace(' ', '-')}`}>{directive.status}</span></p>
        )}
        {isActProposal && directive.signaturesCollected !== undefined && (
          <p><strong>Zebrane podpisy:</strong> <span className="signatures-collected">{directive.signaturesCollected.toLocaleString()}</span></p>
        )}
        <p><strong>Opis:</strong> {directive.description}</p>
        {directive.tags && directive.tags.length > 0 && (
          <p>
            <strong>Tagi:</strong>{' '}
            {directive.tags.map((tag) => (
              <span key={tag} className="tag-item">
                {tag}
              </span>
            ))}
          </p>
        )}
        {isActProposal && directive.fileLink && (
          <p>
            <strong>Plik ustawy:</strong>{' '}
            <a href={directive.fileLink} target="_blank" rel="noopener noreferrer">
              Pobierz projekt
            </a>
          </p>
        )}
        {isActProposal && (
          <button className="mobywatel-button" onClick={() => alert('Przekierowanie do mObywatel w celu podpisania projektu.')}>
            Podpisz z mObywatel
          </button>
        )}
        {/* New notification button */}
        <button className="notification-button" onClick={() => alert('Zostaniesz powiadomiony o zmianach.')}>
          Powiadom o zmianach
        </button>
      </div>
      {isActProposal && <DiscussionSection />} {/* Use the new DiscussionSection component */}
      {!isActProposal && directive.currentStep !== undefined && <Roadmap currentStep={directive.currentStep} stepDetails={directive.stepDetails} />}
    </div>
  );
};
