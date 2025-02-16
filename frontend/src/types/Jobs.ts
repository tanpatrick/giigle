import { Coordinates } from "./Coordinate";

export type Job = {
  description: string;
  id: string;
  location: JobLocation;
  title: string;
};

export type JobLocation = {
  address: string;
  coordinates: Coordinates;
};

export type JobsResponse = {
  items: Job[];
};
