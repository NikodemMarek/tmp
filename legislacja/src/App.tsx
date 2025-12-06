// filepath: src/App.tsx
import { useState, useMemo } from 'react';
import { DirectiveList } from './components/DirectiveList';
import { directives } from './mockData';
import { Directive } from './types';
import { DirectiveDetail } from './components/DirectiveDetail';
import { SearchBar } from './components/SearchBar';
import { ActProposalsList } from './components/ActProposalsList'; // Import the new component
import { actProposals } from './mockActProposals'; // Import the mock data for act proposals
import './App.css';

type Page = 'directives' | 'actProposals';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('directives');
  const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectDirective = (directive: Directive) => {
    setSelectedDirective(directive);
  };

  const handleSelectActProposal = (actProposal: Directive) => {
    // For now, treat act proposals details similarly to directives
    setSelectedDirective(actProposal);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredItems = useMemo(() => {
    const items = currentPage === 'directives' ? directives : actProposals;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        (item.title.toLowerCase().includes(lowerCaseQuery) ||
          item.description.toLowerCase().includes(lowerCaseQuery))
    );
  }, [currentPage, searchQuery]);

  return (
    <div className="app-container">
      <div className="header">
        <button
          className={currentPage === 'directives' ? 'active' : ''}
          onClick={() => {
            setCurrentPage('directives');
            setSelectedDirective(null);
            setSearchQuery('');
          }}
        >
          Dyrektywy
        </button>
        <button
          className={currentPage === 'actProposals' ? 'active' : ''}
          onClick={() => {
            setCurrentPage('actProposals');
            setSelectedDirective(null);
            setSearchQuery('');
          }}
        >
          Propozycje ustaw
        </button>
      </div>

      <div className="main-content-container">
        <div className={`list-container ${selectedDirective ? 'list-view-open' : ''}`}>
          <h1>{currentPage === 'directives' ? 'Dyrektywy' : 'Propozycje ustaw'}</h1>
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          {currentPage === 'directives' ? (
            <DirectiveList directives={filteredItems} onSelectDirective={handleSelectDirective} />
          ) : (
            <ActProposalsList actProposals={filteredItems} onSelectActProposal={handleSelectActProposal} />
          )}
        </div>
        {selectedDirective && (
          <div className="directive-detail-container">
            <DirectiveDetail directive={selectedDirective} onClose={() => setSelectedDirective(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
