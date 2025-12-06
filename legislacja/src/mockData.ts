import { Directive } from './types';
import { legislationSteps } from './legislationSteps';

const generateStepDetails = (currentStepIndex: number, creationDateStr: string) => {
  let currentDate = new Date(creationDateStr);
  const details = [];

  for (let i = 0; i < legislationSteps.length; i++) {
    const step = legislationSteps[i];
    let stepDescription = '';
    let status: 'ukończono' | 'w toku' | 'do zrobienia';
    let previousDescription = undefined;

    if (i < currentStepIndex) {
      currentDate.setDate(currentDate.getDate() + step.averageDurationDays);
      stepDescription = `Zakończono: ${step.name} w dniu ${currentDate.toISOString().split('T')[0]}. Wszystkie niezbędne dokumenty zostały złożone i zatwierdzone.`;
      previousDescription = `Stan początkowy: ${step.name} został rozpoczęty. Zarysowano podstawowe wymagania.`;
      status = 'ukończono';
    } else if (i === currentStepIndex) {
      currentDate.setDate(currentDate.getDate() + step.averageDurationDays / 2); // Halfway through for current step
      stepDescription = `Obecnie w toku: ${step.name}. Oczekuje na opinie odpowiednich komisji/interesariuszy. Data rozpoczęcia etapu: ${currentDate.toISOString().split('T')[0]}.`;
      status = 'w toku';
    } else {
      currentDate.setDate(currentDate.getDate() + step.averageDurationDays); // Add full duration for future steps
      stepDescription = `Planowane: ${step.name}. Trwają przygotowania do nadchodzącej fazy. Orientacyjna data rozpoczęcia: ${currentDate.toISOString().split('T')[0]}.`;
      status = 'do zrobienia';
    }

    details.push({
      description: stepDescription,
      previousDescription: previousDescription,
      status: status,
    });
  }
  return details;
};

export const directives: Directive[] = [
  {
    id: 'd1',
    title: 'Dyrektywa UE w sprawie cyberbezpieczeństwa sieci i systemów informatycznych (NIS2)',
    creationDate: '2024-01-15',
    status: 'ukończono',
    description: 'Dyrektywa NIS2 ma na celu zwiększenie odporności na cyberataki w całej Unii Europejskiej. Rozszerza zakres sektorów objętych regulacją (m.in. energetyka, transport, zdrowie, bankowość cyfrowa, dostawcy usług cyfrowych), nakłada nowe obowiązki w zakresie zarządzania ryzykiem cyberbezpieczeństwa oraz zgłaszania incydentów. Polska ustawa implementująca NIS2 została uchwalona i weszła w życie, wprowadzając rygorystyczne kary za nieprzestrzeganie przepisów.',
    currentStep: 7, // Corresponds to 'Dziennik Ustaw'
    tags: ['cyberbezpieczeństwo', 'UE', 'technologia', 'prawo'],
    stepDetails: generateStepDetails(7, '2024-01-15'),
  },
  {
    id: 'd2',
    title: 'Projekt polskiej ustawy implementującej Dyrektywę o odnawialnych źródłach energii (RED III)',
    creationDate: '2024-02-20',
    status: 'w toku',
    description: 'Polska przygotowuje ustawę transponującą Dyrektywę RED III, która podnosi unijne cele w zakresie udziału OZE w zużyciu energii do co najmniej 42,5% do 2030 roku. Projekt ustawy skupia się na uproszczeniu procedur wydawania pozwoleń na budowę instalacji OZE, wprowadzeniu nowych systemów wsparcia dla biometanu i wodoru odnawialnego oraz na wspieraniu rozwoju społeczności energetycznych. Obecnie znajduje się w fazie konsultacji międzyresortowych i społecznych.',
    currentStep: 3, // Corresponds to 'Drugie czytanie' (start)
    tags: ['energia', 'odnawialne', 'środowisko', 'UE', 'prawo energetyczne'],
    stepDetails: generateStepDetails(3, '2024-02-20'),
  },
  {
    id: 'd3',
    title: 'Projekt ustawy o przeciwdziałaniu wykorzystywaniu sektora finansowego do prania pieniędzy oraz finansowania terroryzmu (AML)',
    creationDate: '2024-03-10',
    status: 'anulowano',
    description: 'Projekt ustawy AML, mający na celu dalsze uszczelnienie systemu przeciwdziałania praniu pieniędzy i finansowaniu terroryzmu, został wycofany z dalszych prac legislacyjnych. Powodem były liczne kontrowersje dotyczące zakresu obowiązków nakładanych na niektóre podmioty (np. dostawców usług wirtualnych aktywów) oraz obawy o nadmierną biurokratyzację. Zdecydowano o ponownym przemyśleniu strategii i przygotowaniu nowego, bardziej wyważonego projektu w przyszłości.',
    currentStep: 1, // Cancelled early, so 'Pierwsze czytanie'
    tags: ['finanse', 'bezpieczeństwo', 'AML', 'prawo'],
    stepDetails: generateStepDetails(1, '2024-03-10'),
  },
  {
    id: 'd4',
    title: 'Dyrektywa UE w sprawie przejrzystości wynagrodzeń (Pay Transparency Directive)',
    creationDate: '2023-12-01',
    status: 'ukończono',
    description: 'Dyrektywa o przejrzystości wynagrodzeń ma na celu walkę z luką płacową między kobietami i mężczyznami. Wprowadza obowiązek raportowania informacji o wynagrodzeniach przez firmy, prawo pracowników do żądania informacji o zarobkach na podobnych stanowiskach oraz ułatwia dochodzenie roszczeń w przypadku dyskryminacji płacowej. Polska ustawa implementująca tę dyrektywę została uchwalona i wdrożona, zobowiązując pracodawców do publikowania zakresów wynagrodzeń w ogłoszeniach o pracę oraz regularnego raportowania.',
    currentStep: 7, // Corresponds to 'Dziennik Ustaw'
    tags: ['praca', 'prawo pracy', 'równość', 'UE', 'wynagrodzenia'],
    stepDetails: generateStepDetails(7, '2023-12-01'),
  },
  {
    id: 'd5',
    title: 'Projekt ustawy o gospodarce odpadami z uwzględnieniem zasad gospodarki o obiegu zamkniętym',
    creationDate: '2023-11-05',
    status: 'w toku',
    description: 'Polska ustawa o gospodarce odpadami jest dostosowywana do nowych unijnych celów w zakresie recyklingu i redukcji składowania. Projekt promuje zasady gospodarki o obiegu zamkniętym (GOZ), wprowadzając rozszerzoną odpowiedzialność producenta, nowe wymogi dotyczące segregacji u źródła oraz systemy kaucji za opakowania. Celem jest minimalizacja ilości odpadów i maksymalizacja ich ponownego wykorzystania. Obecnie projekt jest w fazie uzgodnień międzyresortowych.',
    currentStep: 4, // Corresponds to 'Trzecie czytanie' (start)
    tags: ['środowisko', 'odpady', 'recykling', 'GOZ', 'UE'],
    stepDetails: generateStepDetails(4, '2023-11-05'),
  },
];
