import { Directive } from '../types';

type ActProposalsListProps = {
  actProposals: Directive[];
  onSelectActProposal: (actProposal: Directive) => void;
};

export const ActProposalsList = ({ actProposals, onSelectActProposal }: ActProposalsListProps) => {
  return (
    <ul className="act-proposals-list">
      {actProposals.map((actProposal) => (
        <li className="act-proposal-card card" key={actProposal.id}>
          <div className="card-header">
            <div className="date-and-signatures">
              <p className="date">{actProposal.creationDate}</p>
              {actProposal.signaturesCollected !== undefined && (
                <span className="signatures-collected">
                  {actProposal.signaturesCollected.toLocaleString()}/100,000
                </span>
              )}
            </div>
          </div>
          <h2>{actProposal.title}</h2>
          <p>{actProposal.description}</p>
          <button onClick={() => onSelectActProposal(actProposal)}>Szczegóły</button>
        </li>
      ))}
    </ul>
  );
};
