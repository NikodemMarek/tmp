export type Directive = {
  title: string;
  creationDate: string;
  status: 'w toku' | 'ukończono' | 'anulowano';
  description: string;
  currentStep: number;
  tags: string[];
  stepDetails?: {
    description: string;
    previousDescription?: string; // Added for diffing
    status: 'ukończono' | 'w toku' | 'do zrobienia';
  }[];
};
