import { Directive } from './types';
import { legislationSteps } from './legislationSteps';

const generateStepDetails = (currentStep: number, creationDate: string) => {
  return legislationSteps.map((step, index) => {
    if (index < currentStep) {
      const stepDate = new Date(creationDate);
      stepDate.setDate(stepDate.getDate() + (index + 1) * 5); // Arbitrary date progression
      const currentDesc = `Zakończono: ${step} w dniu ${stepDate.toISOString().split('T')[0]}. Wszystkie niezbędne dokumenty zostały złożone i zatwierdzone.`;
      const prevDesc = `Stan początkowy: ${step} został rozpoczęty. Zarysowano podstawowe wymagania.`;
      return {
        description: currentDesc,
        previousDescription: prevDesc,
        status: 'ukończono',
      };
    } else if (index === currentStep) {
      return {
        description: `Obecnie w toku: ${step}. Oczekuje na opinie odpowiednich komisji/interesariuszy.`,
        status: 'w toku',
      };
    } else {
      return {
        description: `Planowane: ${step}. Trwają przygotowania do nadchodzącej fazy.`,
        status: 'do zrobienia',
      };
    }
  });
};

export const directives: Directive[] = [
  {
    title: 'Ustawa 2024/01',
    creationDate: '2024-01-15',
    status: 'ukończono',
    description: 'Ta dyrektywa dotyczy standardów jakości wody. Pomyślnie przeszła przez wszystkie etapy legislacyjne.',
    currentStep: 7,
    tags: ['środowisko', 'woda', 'zdrowie'],
    stepDetails: generateStepDetails(7, '2024-01-15'),
  },
  {
    title: 'Projekt ustawy',
    creationDate: '2024-02-20',
    status: 'w toku',
    description: 'Ta dyrektywa dotyczy wykorzystania odnawialnych źródeł energii. Obecnie znajduje się w fazie komisji.',
    currentStep: 3,
    tags: ['energia', 'odnawialne', 'środowisko'],
    stepDetails: generateStepDetails(3, '2024-02-20'),
  },
  {
    title: 'Projetk ustawy',
    creationDate: '2024-03-10',
    status: 'anulowano',
    description: 'Ta dyrektywa dotyczyła gospodarki odpadami, ale została anulowana z powodu nowych priorytetów polityki.',
    currentStep: 1, // Cancelled early
    tags: ['odpady', 'środowisko'],
    stepDetails: generateStepDetails(1, '2024-03-10'),
  },
  {
    title: 'Ustawa 2023/12',
    creationDate: '2023-12-01',
    status: 'ukończono',
    description: 'Ta dyrektywa dotyczy redukcji odpadów plastikowych. Została w pełni wdrożona.',
    currentStep: 7,
    tags: ['środowisko', 'plastik', 'odpady'],
    stepDetails: generateStepDetails(7, '2023-12-01'),
  },
];
