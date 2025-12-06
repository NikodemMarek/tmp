import { Directive } from './types';
import { legislationSteps } from './legislationSteps';

const generateStepDetails = (currentStepIndex: number, creationDateStr: string) => {
  const currentDate = new Date(creationDateStr);
  const details = [];

  for (let i = 0; i < legislationSteps.length; i++) {
    const step = legislationSteps[i];
    let status: 'ukończono' | 'w toku' | 'do zrobienia';
    let stepDescriptionText = 'Szczegóły dotyczące tego etapu procesu legislacyjnego.'; // Hardcoded sensible text
    let previousDescriptionText = undefined; // Hardcoded to undefined for simplicity

    if (i < currentStepIndex) {
      currentDate.setDate(currentDate.getDate() + step.averageDurationDays);
      status = 'ukończono';
      stepDescriptionText = `Etap '${step.name}' został pomyślnie zakończony w dniu ${currentDate.toISOString().split('T')[0]}. W trakcie tego etapu, dokument został zaopiniowany przez odpowiednie komisje parlamentarne, a niezbędne poprawki zostały naniesione. Decyzja o ukończeniu etapu została podjęta po wnikliwej analizie zgodności z obowiązującym prawem.`;
      previousDescriptionText = `Wstępne informacje dla etapu '${step.name}'.`;
    } else if (i === currentStepIndex) {
      currentDate.setDate(currentDate.getDate() + step.averageDurationDays / 2); // Halfway through for current step
      status = 'w toku';
      stepDescriptionText = `Etap '${step.name}' jest obecnie w trakcie realizacji. Trwają konsultacje z ekspertami oraz zbieranie opinii od zainteresowanych stron. Przewiduje się, że w najbliższym czasie zostaną wprowadzone kluczowe zmiany wynikające z zgłoszonych uwag.`;
    } else {
      currentDate.setDate(currentDate.getDate() + step.averageDurationDays); // Add full duration for future steps
      status = 'do zrobienia';
      stepDescriptionText = `Etap '${step.name}' jest planowany do realizacji. Obecnie przygotowywana jest wstępna dokumentacja oraz harmonogram prac. Wkrótce rozpocznie się faza zbierania propozycji i sugestii od podmiotów zewnętrznych.`;
    }

    const fileLinks = [];
    if (i % 3 === 0) { // Every third step has two links
      fileLinks.push(
        { name: `Dokumentacja Etapu ${i + 1} (A)`, url: `https://example.com/step-${i + 1}-doc-a.pdf` },
        { name: `Raport Techniczny Etapu ${i + 1} (B)`, url: `https://example.com/step-${i + 1}-doc-b.pdf` }
      );
    } else if (i % 2 === 0) { // Every second step has one link
      fileLinks.push({ name: `Główny Dokument Etapu ${i + 1}`, url: `https://example.com/step-${i + 1}-main-doc.pdf` });
    }

    details.push({
      description: stepDescriptionText,
      previousDescription: previousDescriptionText,
      status: status,
      fileLinks: fileLinks.length > 0 ? fileLinks : undefined, // Assign generated file links
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
    status: 'odrzucono',
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
