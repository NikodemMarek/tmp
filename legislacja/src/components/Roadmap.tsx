import { useState } from 'react';
import { legislationSteps } from '../legislationSteps';
import { Directive } from '../types'; // Import Directive to access StepDetail type

type RoadmapProps = {
  currentStep: number;
  stepDetails?: Directive['stepDetails']; // Use the StepDetail type from Directive
};

const getStatusText = (status: 'ukończono' | 'w toku' | 'do zrobienia') => {
  switch (status) {
    case 'ukończono':
      return 'Ukończono';
    case 'w toku':
      return 'W trakcie realizacji'; // More descriptive
    case 'do zrobienia':
      return 'Planowane'; // More descriptive
    default:
      return status;
  }
};

export const Roadmap = ({ currentStep, stepDetails }: RoadmapProps) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(currentStep);
  const [aiSummaryText, setAiSummaryText] = useState<string | null>(null); // New state for appended summary
  const [isSummarizing, setIsSummarizing] = useState(false); // New state for spinner

  const handleStepClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index);
    // Clear AI summary when changing or closing a step
    setAiSummaryText(null);
    setIsSummarizing(false);
  };

  const handleSummarizeClick = (fileLinks: { name: string; url: string }[]) => {
    setIsSummarizing(true); // Start summarizing
    setAiSummaryText(null); // Clear previous summary
    const linksText = fileLinks.map(link => `- ${link.name}: ${link.url}`).join('\n');
    const mockupSummary = `
      <h3>Podsumowanie AI (symulacja)</h3>
      <p>To jest przykładowe podsumowanie wygenerowane przez AI na podstawie powiązanych dokumentów dotyczących projektu ustawy. W rzeczywistej aplikacji AI analizowałoby treść tych dokumentów i wyodrębniło najważniejsze informacje.</p>
      <h4>Najważniejsze punkty:</h4>
      <ul>
        <li><strong>Dokument 1 (np. ${fileLinks[0]?.name || 'Dokument A'}):</strong> Opisuje ramy prawne oraz wymagania zgodności związane z ustawą.</li>
        <li><strong>Dokument 2 (np. ${fileLinks[1]?.name || 'Dokument B'}):</strong> Zawiera szczegółowe wytyczne techniczne oraz zalecenia wdrożeniowe.</li>
        <li><strong>Wpływ ustawy:</strong> Dokumenty wspólnie przedstawiają kompleksowe podejście do regulacji wybranego obszaru.</li>
      </ul>
      <h4>Powiązane dokumenty:</h4>
      <pre>${linksText}</pre>
      <p><em>(Uwaga: To jest przykładowe podsumowanie.)</em></p>
    `;


    // Simulate a brief loading time before showing the dialog
    setTimeout(() => {
      setAiSummaryText(mockupSummary);
      setIsSummarizing(false); // End summarizing after dialog is shown
    }, 1000); // 1 second delay for spinner visibility
  };



  return (
    <section className="roadmap" aria-labelledby="roadmap-heading">
      <h3 id="roadmap-heading">Harmonogram Legislacyjny</h3>
      <ul>
      {legislationSteps.map((step, index) => {
        const detail = stepDetails?.[index];
        const isCompleted = index < currentStep;
        const isInProgress = index === currentStep;

        let dotClassName = '';
        if (isCompleted) {
          dotClassName = 'completed';
        } else if (isInProgress) {
          dotClassName = 'active';
        }

        return (
          <li key={step.name} className="roadmap-step-container">
            <button className="roadmap-button" onClick={() => handleStepClick(index)}>
              <div className={`roadmap-dot ${dotClassName}`} />
              <div className="roadmap-label">{step.name}</div>
            </button>
            {selectedStep === index && detail && (
              <div className="roadmap-details">
                <p className="description-text"><strong>Status:</strong> {getStatusText(detail.status)}</p>
                {detail.previousDescription ? (
                  <>
                    <p className="description-text"><strong>Zmiany w Opisie:</strong></p>
                    <p className="description-text diff-view">
                      <span className="diff-removed">Poprzedni Opis: {detail.previousDescription}</span>
                      <br/>
                      <span className="diff-added">Aktualny Opis: {detail.description}</span>
                    </p>
                  </>
                ) : (
                  <p className="description-text">{detail.description}</p>
                )}
                {detail.fileLinks && detail.fileLinks.length > 0 && (
                  <div className="document-links-container">
                    <strong>Dokumenty:</strong>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '0.5rem' }}>
                      {detail.fileLinks.map((link, linkIndex) => (
                        <li key={linkIndex} style={{ marginBottom: '0.2rem' }}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--md-sys-color-primary)' }}>
                            📎 {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="summarize-documents-button secondary-button"
                      onClick={() => handleSummarizeClick(detail.fileLinks || [])}
                      disabled={isSummarizing} // Disable button while summarizing
                      style={{ marginTop: '1rem', cursor: isSummarizing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      {isSummarizing ? '🔄 Analizowanie dokumentów...' : '🤖 Podsumuj dokumenty'}
                    </button>
                    {aiSummaryText && (
                      <div className="ai-summary-display" style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--md-sys-color-outline)', borderRadius: '5px', backgroundColor: 'var(--md-sys-color-surface-container-lowest)' }}>
                        <div dangerouslySetInnerHTML={{ __html: aiSummaryText }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {selectedStep === index && !detail && (
              <div className="roadmap-details">
                <p>Brak szczegółów dla tego kroku.</p>
              </div>
            )}
          </li>
        );
      })}
      </ul>
    </section>
  );
};
