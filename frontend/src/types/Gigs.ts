import { Coordinates } from "./Coordinate";

export type Gig = {
  description: string;
  id: string;
  location: GigLocation;
  title: string;
};

export type GigLocation = {
  address: string;
  coordinates: Coordinates;
};

export type GigsResponse = Gig[];
