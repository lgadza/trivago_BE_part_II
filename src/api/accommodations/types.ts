import { Model, Document } from "mongoose";

interface Accommodation {
  name: string;
  host: string;
  description: string;
  city: string;
  maxGuests: number;
}

export interface AccommodationDocument extends Accommodation, Document {}
