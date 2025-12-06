export type Directive = {
  title: string;
  creationDate: string;
  status: 'in progress' | 'completed' | 'cancelled';
  description: string;
  currentStep: number;
  tags: string[];
  stepDetails?: {
    description: string;
    status: 'completed' | 'in progress' | 'to do';
  }[];
};
