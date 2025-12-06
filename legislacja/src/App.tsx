import { useState, useMemo } from 'react';
import { DirectiveList } from './components/DirectiveList';
import { directives } from './mockData';
import { Directive } from './types';
import { DirectiveDetail } from './components/DirectiveDetail';
import { SearchBar } from './components/SearchBar';
import './App.css';

function App() {
  const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectDirective = (directive: Directive) => {
    setSelectedDirective(directive);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredDirectives = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return directives.filter(
      (directive) =>
        directive.title.toLowerCase().includes(lowerCaseQuery) ||
        directive.description.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  return (
    <div className="app-container">
      <div className={`directive-list-container ${selectedDirective ? 'list-view-open' : ''}`}>
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
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
