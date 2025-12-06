import { Directive } from '../types';

type TagFilterProps = {
  directives: Directive[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
};

export const TagFilter = ({ directives, selectedTags, onTagToggle }: TagFilterProps) => {
  const allTags = Array.from(new Set(directives.flatMap((directive) => directive.tags)));

  return (
    <div className="tag-filter">
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
          onClick={() => onTagToggle(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
