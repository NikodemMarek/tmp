export type Directive = {
  title: string;
  creationDate: string;
  status: 'w toku' | 'ukończono' | 'anulowano';
  description: string;
  currentStep: number;
  tags: string[];
  fileLink?: string; // New: Link to the act proposal file
  signaturesCollected?: number; // New: Number of signatures collected
  stepDetails?: {
    description: string;
    previousDescription?: string; // Added for diffing
    status: 'ukończono' | 'w toku' | 'do zrobienia';
  }[];
};
