export interface Event {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  capacity: number;
  price: number;
}

const events: Event[] = [
  { id: 1, name: 'Wedding', category: 'wedding', image: 'https://picsum.photos/200/300', description: 'This is a wedding event', capacity: 100, price: 5000 },
  { id: 2, name: 'Conference', category: 'conference', image: 'https://picsum.photos/200/301', description: 'This is a conference event', capacity: 500, price: 10000 },
  { id: 3, name: 'Party', category: 'party', image: 'https://picsum.photos/200/302', description: 'This is a party event', capacity: 200, price: 2000 },
  { id: 4, name: 'Meeting', category: 'meeting', image: 'https://picsum.photos/200/303', description: 'This is a meeting event', capacity: 50, price: 1000 },
  { id: 5, name: 'Seminar', category: 'seminar', image: 'https://picsum.photos/200/304', description: 'This is a seminar event', capacity: 300, price: 8000 },
];

// Mock fetch function for getting events from the server or API
export const fetchEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 1000);  // Simulating network latency
  });
};








/*export interface Event {
  id: number;
  name: string;
  description: string;
  images: string[];
  venue: string;
  availableDates: Date[];
}

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch('/api/events');
  return response.json();
};*/





/*export interface Event {
    id: number;
    name: string;
    description: string;
    images: string[];
    venue: string;
    availableDates: Date[];
  }
  
  export const fetchEvents = async (): Promise<Event[]> => {
    // Simulating an API call
    return [
      {
        id: 1,
        name: 'Event 1',
        description: 'This is event 1',
        images: ['image1.jpg', 'image2.jpg'],
        venue: 'Venue 1',
        availableDates: [new Date('2024-03-16T10:00:00'), new Date('2024-03-17T10:00:00')],
      },
      {
        id: 2,
        name: 'Event 2',
        description: 'This is event 2',
        images: ['image3.jpg', 'image4.jpg'],
        venue: 'Venue 2',
        availableDates: [new Date('2024-03-18T10:00:00'), new Date('2024-03-19T10:00:00')],
      },
    ];
  };
  */