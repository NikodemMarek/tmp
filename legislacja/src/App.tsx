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

type Page = 'directives' | 'actProposals' | 'info';

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
      <header className="app-header">
        <nav className="header">
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
        <button 
            className={currentPage === 'info' ? 'active' : ''}
            onClick={() => {
              setCurrentPage('info');
              setSelectedDirective(null);
              setSearchQuery('');
            }}
        >
            Czym jest legislacja?
        </button>
        <button className="add-act-proposal-button" onClick={() => setIsAddModalOpen(true)}>
          Dodaj Propozycję Ustawy
        </button>
        </nav>

        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </header>

      <main className="main-content-container">
        <div className={`list-container ${selectedDirective ? 'list-view-open' : ''}`}>
          {currentPage === 'directives' ? (
            <DirectiveList directives={filteredItems} onSelectDirective={handleSelectDirective} />
          ) : currentPage === 'actProposals' ? (
            <ActProposalsList actProposals={filteredItems} onSelectActProposal={handleSelectActProposal} />
          ) : (
              <div className="info-page">
                <h2>Jak powstaje ustawa w Polsce?</h2>
                <p>
                  W Polsce nowe ustawy mogą zaproponować: Prezydent, Rada Ministrów (rząd), Senat, grupa co najmniej 15 posłów lub komisja sejmowa, a także grupa minimum 100 tysięcy obywateli.
                </p>
                <p>
                  W zależności od tego, kto zgłasza projekt, mówimy o projekcie prezydenckim, rządowym, senackim, poselskim lub obywatelskim. Projekt może zmieniać istniejące prawo lub wprowadzać nowe przepisy.
                </p>
                <h3>Sejm</h3>
                <p>
                  Projekt ustawy najpierw trafia do Sejmu. Tam jest omawiany i analizowany przez posłów, często z pomocą ekspertów. Sejm rozpatruje projekt w trzech etapach (czytaniach). W trakcie prac można zgłaszać poprawki. Na końcu posłowie głosują nad całością ustawy.
                </p>
                <ol>
                  <li>Najpierw można odrzucić cały projekt.</li>
                  <li>Później głosuje się nad poprawkami do poszczególnych artykułów.</li>
                  <li>Na końcu głosuje się nad całą ustawą.</li>
                </ol>
                <h3>Senat</h3>
                <p>
                  Po uchwaleniu przez Sejm, ustawa trafia do Senatu. Senat może ją przyjąć bez zmian, wprowadzić poprawki lub odrzucić. Jeśli Senat nic nie zrobi przez 30 dni, ustawa przechodzi dalej.
                </p>
                <p>
                  Jeśli Senat wprowadzi poprawki lub odrzuci ustawę, Sejm może je odrzucić odpowiednią większością głosów.
                </p>
                <h3>Prezydent</h3>
                <p>
                  Ostatni etap to podpis Prezydenta. Prezydent może podpisać ustawę, zawetować ją (czyli odesłać do ponownego rozpatrzenia przez Sejm) lub skierować do Trybunału Konstytucyjnego, jeśli ma wątpliwości co do zgodności z Konstytucją.
                </p>
                <p>
                  Jeśli Sejm odrzuci weto Prezydenta większością 3/5 głosów, Prezydent musi ustawę podpisać. Po podpisaniu ustawa jest publikowana i po 14 dniach (chyba że ustalono inaczej) wchodzi w życie.
                </p>
                <h4>Wyjątki</h4>
                <ul>
                  <li>Pilne ustawy mogą być rozpatrywane szybciej.</li>
                  <li>Ustawy budżetowe i zmiany Konstytucji mają własne, szczególne zasady.</li>
                </ul>
              </div>
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
          isOpen={isAddModalOpen}
        />
      )}
    </div>
  );
}

export default App;
