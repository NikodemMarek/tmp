import { useState, useMemo } from 'react';
import { DirectiveList } from './components/DirectiveList';
import { directives } from './mockData';
import { Directive } from './types';
import { DirectiveDetail } from './components/DirectiveDetail';
import { SearchBar } from './components/SearchBar';
import { TagFilter } from './components/TagFilter';
import './App.css';

function App() {
  const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSelectDirective = (directive: Directive) => {
    setSelectedDirective(directive);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const filteredDirectives = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return directives.filter(
      (directive) =>
        (directive.title.toLowerCase().includes(lowerCaseQuery) ||
          directive.description.toLowerCase().includes(lowerCaseQuery)) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => directive.tags.includes(tag)))
    );
  }, [directives, searchQuery, selectedTags]);

  return (
    <div className="app-container">
      <div className={`directive-list-container ${selectedDirective ? 'list-view-open' : ''}`}>
        <h1>Dyrektywy</h1>
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <TagFilter directives={directives} selectedTags={selectedTags} onTagToggle={handleTagToggle} />
        <DirectiveList directives={filteredDirectives} onSelectDirective={handleSelectDirective} />
      </div>
      {selectedDirective && (
        <div className="directive-detail-container">
          <DirectiveDetail directive={selectedDirective} onClose={() => setSelectedDirective(null)} />
        </div>
      )}
    </div>
  );
}

export default App;
