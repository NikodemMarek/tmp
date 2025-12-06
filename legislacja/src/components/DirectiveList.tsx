import { Directive } from '../types';

type DirectiveListProps = {
  directives: Directive[];
  onSelectDirective: (directive: Directive) => void;
};

export const DirectiveList = ({ directives, onSelectDirective }: DirectiveListProps) => {
  return (
    <ul className="directive-list">
      {directives.map((directive) => (
        <li className="directive-card card" key={directive.id}>
          <div className="card-header">
            <div className="date-and-status">
              <p className="date">{directive.creationDate}</p>
              <span className={`status status-${directive.status.replace(' ', '-')}`}>
                {directive.status}
              </span>
            </div>
          </div>
          <h2>{directive.title}</h2>
          <p>{directive.description}</p>
          <button onClick={() => onSelectDirective(directive)}>Pokaż</button>
        </li>
      ))}
    </ul>
  );
};
