import { useState, useMemo } from 'react';
import { DirectiveList } from './components/DirectiveList';
import { directives } from './mockData';
import { Directive } from './types';
import { DirectiveDetail } from './components/DirectiveDetail';
import { SearchBar } from './components/SearchBar';
import { ActProposalsList } from './components/ActProposalsList';
import { actProposals as initialActProposals } from './mockActProposals'; // Rename import
import { AddActProposalModal } from './components/AddActProposalModal'; // Import the new modal component
import './App.css';

type Page = 'directives' | 'actProposals';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('directives');
  const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for modal visibility
  const [currentActProposals, setCurrentActProposals] = useState<Directive[]>(initialActProposals); // State for act proposals

  const handleSelectDirective = (directive: Directive) => {
    setSelectedDirective(directive);
  };

  const handleSelectActProposal = (actProposal: Directive) => {
    setSelectedDirective(actProposal);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddActProposal = (newActProposal: Directive) => {
    setCurrentActProposals((prevProposals) => [
      ...prevProposals,
      { ...newActProposal, id: `act-${Date.now()}` }, // Assign a simple ID for now
    ]);
    setIsAddModalOpen(false); // Close modal after adding
  };

  const filteredItems = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    if (currentPage === 'directives') {
      return directives.filter(
        (directive) =>
          (directive.title.toLowerCase().includes(lowerCaseQuery) ||
            directive.description.toLowerCase().includes(lowerCaseQuery))
      );
    } else { // currentPage === 'actProposals'
      return currentActProposals.filter( // Use currentActProposals here
        (actProposal) =>
          actProposal.title.toLowerCase().includes(lowerCaseQuery) ||
          actProposal.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
  }, [currentPage, searchQuery, currentActProposals]); // Add currentActProposals to dependencies

  return (
    <div className="app-container">
      <header className="header">
        <nav>
        <button
          className={currentPage === 'directives' ? 'active' : ''}
          onClick={() => {
            setCurrentPage('directives');
            setSelectedDirective(null);
            setSearchQuery('');
          }}
        >
          Ustawy
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
        <button className="add-act-proposal-button" onClick={() => setIsAddModalOpen(true)}>
          Dodaj Propozycję Ustawy
        </button>
        </nav>
      </header>

      <main className="main-content-container">
        <div className={`list-container ${selectedDirective ? 'list-view-open' : ''}`}>
          <h1>{currentPage === 'directives' ? 'Ustawy' : 'Propozycje ustaw'}</h1>
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
      </main>

      {isAddModalOpen && (
        <AddActProposalModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddActProposal}
        />
      )}
    </div>
  );
}

export default App;
