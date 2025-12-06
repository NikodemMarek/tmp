import { useState } from 'react';
import { DirectiveList } from './components/DirectiveList';
import { directives } from './mockData';
import { Directive } from './types';
import { DirectiveDetail } from './components/DirectiveDetail';
import './App.css';

function App() {
  const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);

  const handleSelectDirective = (directive: Directive) => {
    setSelectedDirective(directive);
  };

  return (
    <div className="app-container">
      <div className={`directive-list-container ${selectedDirective ? 'list-view-open' : ''}`}>
        <h1>Directives</h1>
        <DirectiveList directives={directives} onSelectDirective={handleSelectDirective} />
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
