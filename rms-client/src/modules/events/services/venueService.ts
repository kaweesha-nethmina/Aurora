export interface Venue {
  id: number;
  name: string;
  description: string;
  images: string[];
}

export const fetchVenues = async (): Promise<Venue[]> => {
  const response = await fetch('/api/venues');
  return response.json();
};



/*export interface Venue {
    id: number;
    name: string;
    description: string;
    images: string[];
  }
  
  export const fetchVenues = async (): Promise<Venue[]> => {
    // Simulating an API call
    return [
      {
        id: 1,
        name: 'Venue 1',
        description: 'This is venue 1',
        images: ['image5.jpg', 'image6.jpg'],
      },
      {
        id: 2,
        name: 'Venue 2',
        description: 'This is venue 2',
        images: ['image7.jpg', 'image8.jpg'],
      },
    ];
  };*/
  