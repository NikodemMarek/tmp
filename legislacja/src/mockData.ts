import { Directive } from './types';

export const directives: Directive[] = [
  {
    title: 'Directive 2024/01',
    creationDate: '2024-01-15',
    status: 'completed',
    description: 'This directive is about the standards for water quality.',
    currentStep: 7,
    tags: ['environment', 'water', 'health'],
  },
  {
    title: 'Directive 2024/02',
    creationDate: '2024-02-20',
    status: 'in progress',
    description: 'This directive is about the use of renewable energy.',
    currentStep: 3,
    tags: ['energy', 'renewable', 'environment'],
  },
  {
    title: 'Directive 2024/03',
    creationDate: '2024-03-10',
    status: 'cancelled',
    description: 'This directive was about waste management, but has been cancelled.',
    currentStep: 1,
    tags: ['waste', 'environment'],
  },
  {
    title: 'Directive 2023/12',
    creationDate: '2023-12-01',
    status: 'completed',
    description: 'This directive is about the reduction of plastic waste.',
    currentStep: 7,
    tags: ['environment', 'plastic', 'waste'],
  },
];
