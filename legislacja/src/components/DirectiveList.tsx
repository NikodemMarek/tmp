import { Directive } from '../types';

type DirectiveListProps = {
  directives: Directive[];
  onSelectDirective: (directive: Directive) => void;
};

export const DirectiveList = ({ directives, onSelectDirective }: DirectiveListProps) => {
  return (
    <div className="directive-list">
      {directives.map((directive) => (
        <div className="directive-card" key={directive.title}>
          <div className="card-header">
            <h2>{directive.title}</h2>
            <span className={`status status-${directive.status.replace(' ', '-')}`}>
              {directive.status}
            </span>
          </div>
          <p>{directive.description}</p>
          <p className="date">{directive.creationDate}</p>
          <button onClick={() => onSelectDirective(directive)}>Pokaż</button>
        </div>
      ))}
    </div>
  );
};
