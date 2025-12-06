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
      <h3>Mock AI Summary</h3>
      <p>This is a simulated AI-generated summary of the linked documents. In a real application, an AI would process the content of these documents and extract key information.</p>
      <h4>Key Points:</h4>
      <ul>
        <li><strong>Document 1 (e.g., ${fileLinks[0]?.name || 'Document A'}):</strong> Focuses on the regulatory framework and compliance requirements.</li>
        <li><strong>Document 2 (e.g., ${fileLinks[1]?.name || 'Document B'}):</strong> Details the technical specifications and implementation guidelines.</li>
        <li><strong>Overall Impact:</strong> The documents collectively outline a comprehensive approach to addressing [specific topic related to directive].</li>
      </ul>
      <h4>Linked Documents:</h4>
      <pre>${linksText}</pre>
      <p><em>(Note: This is a placeholder summary.)</em></p>
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
                      {isSummarizing ? '🔄 Summarizing...' : '🤖 Summarize Documents'}
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
