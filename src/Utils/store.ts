import { DateRange } from "react-day-picker";
import { create } from 'zustand'


export type DateRangeSelect = {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  
  export type Booking = {
    checkIn: Date;
    checkOut: Date;
  };


type PropertyState = {
    propertyId: string;
    price: number;
    bookings: Booking[];
    range: DateRange | undefined;
  };
  
  // Create the store
  export const useProperty = create<PropertyState>(() => {
    return {
      propertyId: '',
      price: 0,
      bookings: [],
      range: undefined,
    };
  });
  