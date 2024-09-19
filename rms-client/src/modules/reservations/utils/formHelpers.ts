export interface RoomFormState {
    roomId: string | number | readonly string[] | undefined;
    roomType: string;
    rating: number;
    price: number;
    description: string;
    image: File | null;
  }
  
  export const initialRoomFormState: RoomFormState = {
    roomId: 0,
    roomType: '',
    rating: 0,
    price: 0,
    description: '',
    image: null,
  };
  