import { Coordinates } from "./Coordinate";

export type Gig = {
  date: string;
  description: string;
  id: string;
  location: GigLocation;
  pay: number;
  payType: string;
  title: string;
};

export type GigLocation = {
  address: string;
  coordinates: Coordinates;
};

export type GigsResponse = {
  gigs: Gig[];
};
