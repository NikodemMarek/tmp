import { Directive } from './types';
import { legislationSteps } from './legislationSteps';

const generateStepDetails = (currentStep: number, creationDate: string) => {
  return legislationSteps.map((step, index) => {
    if (index < currentStep) {
      const stepDate = new Date(creationDate);
      stepDate.setDate(stepDate.getDate() + (index + 1) * 5); // Arbitrary date progression
      return {
        description: `Completed: ${step} on ${stepDate.toISOString().split('T')[0]}. All necessary documents have been submitted and approved.`,
        status: 'completed',
      };
    } else if (index === currentStep) {
      return {
        description: `Currently in progress: ${step}. Awaiting feedback from relevant committees/stakeholders.`,
        status: 'in progress',
      };
    } else {
      return {
        description: `Planned: ${step}. Preparations are underway for the upcoming phase.`,
        status: 'to do',
      };
    }
  });
};

export const directives: Directive[] = [
  {
    title: 'Directive 2024/01',
    creationDate: '2024-01-15',
    status: 'completed',
    description: 'This directive is about the standards for water quality. It has successfully passed through all legislative stages.',
    currentStep: 7,
    tags: ['environment', 'water', 'health'],
    stepDetails: generateStepDetails(7, '2024-01-15'),
  },
  {
    title: 'Directive 2024/02',
    creationDate: '2024-02-20',
    status: 'in progress',
    description: 'This directive is about the use of renewable energy. It is currently in the committee phase.',
    currentStep: 3,
    tags: ['energy', 'renewable', 'environment'],
    stepDetails: generateStepDetails(3, '2024-02-20'),
  },
  {
    title: 'Directive 2024/03',
    creationDate: '2024-03-10',
    status: 'cancelled',
    description: 'This directive was about waste management, but has been cancelled due to new policy priorities.',
    currentStep: 1, // Cancelled early
    tags: ['waste', 'environment'],
    stepDetails: generateStepDetails(1, '2024-03-10'),
  },
  {
    title: 'Directive 2023/12',
    creationDate: '2023-12-01',
    status: 'completed',
    description: 'This directive is about the reduction of plastic waste. It has been fully implemented.',
    currentStep: 7,
    tags: ['environment', 'plastic', 'waste'],
    stepDetails: generateStepDetails(7, '2023-12-01'),
  },
];
