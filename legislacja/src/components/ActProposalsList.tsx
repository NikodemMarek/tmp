import { Directive } from '../types';

type ActProposalsListProps = {
  actProposals: Directive[];
  onSelectActProposal: (actProposal: Directive) => void;
};

export const ActProposalsList = ({ actProposals, onSelectActProposal }: ActProposalsListProps) => {
  return (
    <div className="act-proposals-list">
      {actProposals.map((actProposal) => (
        <div className="act-proposal-card" key={actProposal.title}>
          <div className="card-header">
            <h2>{actProposal.title}</h2>
            {actProposal.signaturesCollected !== undefined && (
              <span className="signatures-collected">
                Zebrane podpisy: {actProposal.signaturesCollected.toLocaleString()}/100,000
              </span>
            )}
          </div>
          <p>{actProposal.description}</p>
          <p className="date">{actProposal.creationDate}</p>
          <button onClick={() => onSelectActProposal(actProposal)}>Pokaż</button>
        </div>
      ))}
    </div>
  );
};
