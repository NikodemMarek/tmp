import { Comment } from './types';

export const mockComments: Comment[] = [
  {
    id: '1',
    author: { id: 'user1', name: 'Anna Kowalska' },
    timestamp: '2023-11-20T10:00:00Z',
    content: 'Uważam, że projekt ustawy o zmianie ustawy o ochronie danych osobowych jest bardzo potrzebny. Aktualne przepisy są zbyt archaiczne.',
    upvotes: 15,
    downvotes: 2,
    replies: [
      {
        id: '1.1',
        author: { id: 'user2', name: 'Jan Nowak' },
        timestamp: '2023-11-20T10:30:00Z',
        content: 'Zgadzam się w pełni. Szczególnie podoba mi się propozycja dotycząca anonimizacji danych.',
        upvotes: 8,
        downvotes: 1,
      },
      {
        id: '1.2',
        author: { id: 'user3', name: 'Maria Wiśniewska' },
        timestamp: '2023-11-20T11:00:00Z',
        content: 'A czy ktoś pomyślał o kosztach implementacji dla małych firm? To może być spory problem.',
        upvotes: 5,
        downvotes: 3,
        replies: [
          {
            id: '1.2.1',
            author: { id: 'user1', name: 'Anna Kowalska' },
            timestamp: '2023-11-20T11:45:00Z',
            content: 'Dobre pytanie. Myślę, że powinny być przewidziane jakieś mechanizmy wsparcia, np. dotacje lub ulgi podatkowe.',
            upvotes: 7,
            downvotes: 0,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    author: { id: 'user4', name: 'Piotr Zieliński' },
    timestamp: '2023-11-21T09:15:00Z',
    content: 'Projekt ustawy o wspieraniu odnawialnych źródeł energii to krok w dobrą stronę, ale obawiam się, że tempo zmian jest zbyt wolne.',
    upvotes: 10,
    downvotes: 0,
  },
];
